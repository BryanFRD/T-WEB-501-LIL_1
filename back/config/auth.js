const config = {
  RESTRICTED_ROUTES: {
    'GET/admins': ({user}) => user.isAdmin,
    'POST/admins': ({user}) => user.isAdmin,
    'PUT/admins': ({user}) => user.isAdmin,
    'DELETE/admins': ({user}) => user.isAdmin,
    'GET/userdata': ({user}) => user.isAdmin,
    'GET/userdata/:id': ({user}) => user.isAdmin,
    'GET/auth/isadmin': ({user}) => user.isAdmin,
    'PUT/userdata/:id': ({user, datas}) => user.isAdmin,
  }
}

module.exports = config;