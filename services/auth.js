const uuid = require('uuid')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authDao = require('../dao/auth');
const userDao = require('../dao/user');
const CustomError = require('../error/customError')
const errorCodes = require('../error/errorCodes')
require('dotenv').config()

class AuthService {
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
    return authDao.createUser(emailAddress, encryptedPassword, username, userId);
  }

  async login(loginDto) {
    const { emailAddress, password } = loginDto;
    if (!(emailAddress && password)) {
      throw new CustomError(errorCodes.MISSING_INPUT, "All input is required")
    }
    const user = await userDao.findUser(emailAddress);
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign({ userId: user.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
      const refreshToken = jwt.sign({ userId: user.userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '2m' })
      authDao.createRefreshToken(refreshToken, user.userId)
      return { accessToken, refreshToken }
    }
    throw new CustomError(errorCodes.UNAUTHORIZED, "Unauthorized")
  }

  async refreshToken(refreshDto) {
    const { refreshToken } = refreshDto;
    if (refreshToken == null) throw new CustomError(errorCodes.UNAUTHORIZED, "Unauthorized")
    const refreshTokenInDb = await authDao.findRefreshToken(refreshToken)
    if (!refreshTokenInDb) throw new CustomError(errorCodes.UNAUTHORIZED, "Unauthorized")
    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) throw new CustomError(errorCodes.UNAUTHORIZED, "Unauthorized")
      return jwt.sign({ userId: user.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' })
    })
  }
}

module.exports = new AuthService();
