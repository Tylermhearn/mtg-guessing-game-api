const ApiError = require('../error/ApiError');
const userService = require('../services/user');
const errorCodes = require('../error/errorCodes')

class UserController {
  async getUser(req, res, next) {
    try {
      const id = await userService.findUser({ userId: req.params.userId });
      res.status(201).json(id);
    } catch (err) {
      if (err.code === errorCodes.MISSING_INPUT) {
        next(ApiError.badRequest(err.message))
      } else {
        next(err)
      }
    }
  }
}

module.exports = new UserController();
