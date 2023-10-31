const {sequelize} = require('../models');

const generate = () => {
  sequelize.models.UserData.findAll({
    where: {email: 'admin@jobhub.fr'}})
    .then((data) => {
      if(data.length > 0)  
        return;
      
      sequelize.models.Admin.create({
        name: 'Admin',
        firstname: 'Admin',
        lastname: 'Admin',
        userData: {
          email: 'admin@jobhub.fr',
          password: 'admin',
        }
      }, {
        include: ['userData']
      })})
      .catch(() => null);
}

module.exports = generate;