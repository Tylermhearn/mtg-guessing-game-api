const userDao = require('../dao/user');
const uuid = require('uuid')
const bcrypt = require('bcryptjs')
const CustomError = require('../error/customError')
const errorCodes = require('../error/errorCodes')

class UserService {
  async createUser(userDto) {
    const { emailAddress, password, username } = userDto;
    if (!emailAddress || !password || !username) {
      throw new CustomError(errorCodes.MISSING_INPUT, (!emailAddress ? '(Email Address) ' : '') +
        (!password ? '(Password) ' : '') +
        (!username ? '(Username) ' : '')
        + 'cannot be empty')
    }
    const userId = uuid.v4()
    const encryptedPassword = await bcrypt.hash(password, 10)
    return userDao.createUser(emailAddress, encryptedPassword, username, userId);
  }
}

module.exports = new UserService();
