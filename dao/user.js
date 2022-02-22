const db = require('../knexfile');

class UserDao {
  async findUser(emailAddress, username, userId) {
    let whereClause = ''
    let sqlParams = ''

    if (emailAddress) {
      whereClause += 'email_address = ?'
      sqlParams = emailAddress
    } else if (username) {
      whereClause += 'username = ?'
      sqlParams = username
    } else {
      whereClause += 'user_uuid = ?'
      sqlParams = userId
    }

    const user = await db('users')
      .select('email_address as emailAddress',
        'password',
        'username',
        'last_logged_in as lastLoggedIn',
        'user_uuid as userId'
      )
      .whereRaw(whereClause, [sqlParams])
    return user[0];
  }
}

module.exports = new UserDao();
