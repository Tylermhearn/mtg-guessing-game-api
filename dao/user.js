const db = require('../knexfile');

class UserDao {
  async createUser(emailAddress, password, username, userId) {
    const [id] = await db('users')
      .insert({
        email_address: emailAddress,
        password,
        username,
        user_uuid: userId
      })
      .returning('user_uuid');
    return id;
  }
}

module.exports = new UserDao();
