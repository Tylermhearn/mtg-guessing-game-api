const db = require('../knexfile');

class AuthDao {
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

  async createRefreshToken(refreshToken, userId) {
    await db('refreshTokens')
      .insert({
        token: refreshToken,
        created_date: new Date(),
        user_uuid: userId
      })
  }

  async findRefreshToken(refreshToken) {
    const token = await db('refreshTokens')
      .select()
      .where({
        token: refreshToken
      })
      .returning('token');
    return token[0];
  }
}

module.exports = new AuthDao();
