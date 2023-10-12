const {sequelize} = require('../models');

const generate = () => {
  sequelize.models.Admin.findOrCreate({
    where: {name: 'Admin'},
    defaults: {
      name: 'Admin',
      firstname: 'Admin',
      lastname: 'Admin',
      userData: {
        email: 'admin@jobhub.fr',
        password: 'admin',
      }
    },
    include: ['userData']
  });
}

module.exports = generate;