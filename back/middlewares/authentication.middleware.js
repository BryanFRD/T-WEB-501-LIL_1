const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.js');

const authenticateToken = async (req, res, next) => {
  const method = req.method;
  const url = req.url.replace(/\/+$/, '').split('?')[0];
  
  const routeName = `${method.toUpperCase()}${url.toLowerCase()}`;
  const restrictedRoute = authConfig.RESTRICTED_ROUTES[routeName];
  
  if(restrictedRoute){
    const token = req.cookie.token;
    
    const userToken = await jwt.verify(token, process.env.TOKEN, (err, user) => {
      if(!err)
        return user;
    });
    
    const userData = await sequelize.models.UserData.findByPk(userToken.id)
      .then((data) => data)
      .catch(() => null);
      
    if(!userData || userData.updatedAt !== userToken.updatedAt){
      res.cookie('token', '', {expires: new Date(0)});
      return next();
    }
    
    let user = await sequelize.models.Client.findOne({where: {associatedId: userData.id}})
      .then((user) => user)
      .catch(() => null);
    if(!user){
      user = await sequelize.models.Company.findOne({where: {associatedId: userData.id}})
        .then((user) => user)
        .catch(() => null);
    }
    
    if(!user){
      user = await sequelize.models.Admin.findOne({where: {associatedId: userData.id}})
        .then((user) => user)
        .catch(() => null);
    }
    
    if(user && restrictedRoute({user, body: req.body, isAdmin: req.isAdmin ?? false})){
      req.user = user;
      req.user.isAdmin = req.isAdmin ?? false;
      return next();
    }
    
  } else {
    return next();
  }
  
  return res.sendStatus(401);
}

module.exports = authenticateToken;