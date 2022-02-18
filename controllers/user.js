const ApiError = require('../error/ApiError');
const userService = require('../services/user');
const errorCodes = require('../error/errorCodes')

class UserController {
  async createUser(req, res, next) {
    try {
      const id = await userService.createUser(req.body);
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

module.exports = new UserController();
