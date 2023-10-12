const config = {
  RESTRICTED_ROUTES: {
    'GET/admins': ({isAdmin}) => isAdmin,
    'POST/admins': ({isAdmin}) => isAdmin,
    'PUT/admins': ({isAdmin}) => isAdmin,
    'DELETE/admins': ({isAdmin}) => isAdmin,
    'GET/userdata': ({isAdmin}) => isAdmin,
    'GET/admin/isadmin': ({isAdmin}) => isAdmin,
  }
}

module.exports = config;