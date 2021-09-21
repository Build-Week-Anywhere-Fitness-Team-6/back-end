const jwt = require('jsonwebtoken')


function tokenBuilder (user) {
    const payload = {
      subject: user.user_id,
      username: user.user_name,
      role_name: user.role,
    }
    const options = {
      expiresIn: '1d'
    }
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      options,
    )
    return token
  }

  module.exports = tokenBuilder