import { RequestHandler } from 'express';
import BadRequest from '../errors/bad-request-error';

// мидлвара не нужна в случае использования celebrate
const checkPassword: RequestHandler = (req, res, next) => {
  const { password } = req.body;

  if (!password || !password.trim()) {
    next(new BadRequest('Поле "password" должно быть заполнено'));
  } else {
    next();
  }
};

export default checkPassword;
