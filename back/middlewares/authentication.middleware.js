const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.js');
const {sequelize} = require('../models');
const Logger = require('../helpers/logger.helper.js');

const authenticateToken = async (req, res, next) => {
  req.datas = {...(req.query ?? {}), ...(req.params ?? {}), ...(req.body ?? {})}
  
  const method = req.method;
  const url = req.url.replace(/\/+$/, '').split('?')[0];
  const splittedUrl = url.split('/');
  if(splittedUrl.length > 2){
    const isUuid = splittedUrl[2].match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/);
    if(isUuid){
      req.datas.id = splittedUrl[2];
      splittedUrl[2] = ':id';
    }
  }
  
  const routeName = `${method.toUpperCase()}${splittedUrl.join('/').toLowerCase()}`;
  const restrictedRoute = authConfig.RESTRICTED_ROUTES[routeName];
  
  Logger.route(routeName, Boolean(restrictedRoute), req.datas);
  
  if(restrictedRoute){
    const token = req.cookies?.token;
    
    if(!token){
      return res.status(401).json({success: false, message: 'Unanthorized'});
    }
    
    const userToken = await jwt.verify(token, process.env.TOKEN, (err, user) => {
      if(!err)
        return user;
    });
    
    const userData = await sequelize.models.UserData.findByPk(userToken.id)
      .then((data) => data)
      .catch(() => null);
    
    if(!userData || Date.parse(userData.updatedAt) !== Date.parse(userToken.updatedAt)){
      setCookies(res, '');
      return res.status(401).json({success: false, message: 'Unanthorized'});
    }
    
    let user = await sequelize.models.Client.findOne({where: {associatedId: userData.id}, include: ['userData']})
      .then((user) => user)
      .catch(() => null);
    if(!user){
      user = await sequelize.models.Company.findOne({where: {associatedId: userData.id}, include: ['userData']})
        .then((user) => user)
        .catch(() => null);
    }
    
    if(!user){
      user = await sequelize.models.Admin.findOne({where: {associatedId: userData.id}, include: ['userData']})
        .then((user) => user)
        .catch(console);
      
      if(user)
        user.isAdmin = true;
    }
    
    if(user && restrictedRoute({user, datas: req.datas ?? {}})){
      req.user = user;
      req.user.isAdmin = user.isAdmin ?? false;
      return next();
    }
  } else {
    return next();
  }
  
  return res.status(401).json({success: false, message: 'Unanthorized'});
}

module.exports = authenticateToken;