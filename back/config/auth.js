const isSelf = (body, user) => body?.model?.id === user.id;

const config = {
  RESTRICTED_ROUTES: {
    'GET/usercredential': ({user, body}) => isSelf(body, user) || user.isAdmin,
    'PUT/usercredential': ({user, body}) => isSelf(body, user) || user.isAdmin,
    'DELETE/usercredential': ({user, body}) => isSelf(body, user) || user.isAdmin,
    'POST/useraccount': ({user}) => user.isAdmin,
    'PUT/useraccount': ({user, body}) => isSelf(body, user) || user.isAdmin,
    'DELETE/useraccount': ({user, body}) => isSelf(body, user) || user.isAdmin
  }
}

module.exports = config;