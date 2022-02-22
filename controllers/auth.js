const ApiError = require('../error/ApiError');
const authService = require('../services/auth');
const errorCodes = require('../error/errorCodes')
require('dotenv').config()

class AuthController {
  async createUser(req, res, next) {
    try {
      const id = await authService.createUser(req.body);
      res.status(201).json(id);
    } catch (err) {
      if (err.code === errorCodes.MISSING_INPUT) {
        next(ApiError.badRequest(err.message))
      } else if (err.code === '23505') {
        next(ApiError.badRequest(err.constraint + ' already exists'))
      } else {
        next(err)
      }
    }
  }

  async login(req, res, next) {
    try {
      const tokens = await authService.login(req.body);
      res.status(201).json(tokens);
    } catch (err) {
      if (err.code === errorCodes.UNAUTHORIZED) {
        next(ApiError.badRequest(err.message))
      } else {
        next(err)
      }
    }
  }

  async refreshToken(req, res, next) {
    try {
      const accessToken = await authService.refreshToken(req.body);
      res.status(201).json(accessToken);
    } catch (err) {
      next(err)
    }
  }
}

module.exports = new AuthController();
