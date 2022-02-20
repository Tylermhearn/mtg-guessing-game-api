const ApiError = require('../error/ApiError');
const authService = require('../services/auth');
const errorCodes = require('../error/errorCodes')

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
}

module.exports = new AuthController();
