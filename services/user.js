const userDao = require('../dao/user');

class UserService {
  async findUser(userDto) {
    const { emailAddress, userId, username } = userDto;
    if (!emailAddress && !userId && !username) {
      throw new CustomError(errorCodes.MISSING_INPUT, 'Missing Input')
    }
    return userDao.findUser(emailAddress, username, userId)
  }
}

module.exports = new UserService();
