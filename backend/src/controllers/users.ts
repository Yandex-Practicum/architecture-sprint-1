import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  Request,
  Response,
  NextFunction,
} from 'express';
import User from '../models/user';
import { JWT_SECRET } from '../config';
import BadRequestError from '../errors/bad-request-error';
import NotFoundError from '../errors/not-found-error';
import ConflictError from '../errors/conflict-error';

// POST /signin
const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET);
      // Студенты могут записывать jwt в куку, либо же отправлять в теле ответа. Оба варианта - ок
      res
        .cookie('jwt', token, {
          // jwt токен выпускается на определённый срок (например, 7 дней), а не даётся бессрочно
          maxAge: 3600000,
          httpOnly: true,
          sameSite: true,
        })
        .send({ data: user.toJSON() });
    })
    // UnauthorizedError теперь возвращается из findUserByCredentials.
    // Её можно смело передавать в next
    .catch(next);
};

// POST /signup
const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, password, email,
  } = req.body;
  // в контроллере createUser почта и хеш пароля записываются в базу
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((data) => res.status(201).send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с данным email уже существует'));
      } else {
        next(err);
      }
    });
};

// GET /users
const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const getUserData = (id: string, res: Response, next: NextFunction) => {
  User.findById(id)
    .orFail(() => new NotFoundError('Пользователь по заданному id отсутствует в базе'))
    .then((users) => res.send({ data: users }))
    .catch(next);
};

// GET /users/:userId
const getUser = (req: Request, res: Response, next: NextFunction) => {
  getUserData(req.params.id, res, next);
};

// GET /users/me
const getCurrentUser = (req: Request, res: Response, next: NextFunction) => {
  getUserData(req.user._id, res, next);
};

const updateUserData = (req: Request, res: Response, next: NextFunction) => {
  const { user: { _id }, body } = req;
  User.findByIdAndUpdate(_id, body, { new: true, runValidators: true })
    .orFail(() => new NotFoundError('Пользователь по заданному id отсутствует в базе'))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

// PATCH /users/me
const updateUserInfo = (
  req: Request,
  res: Response,
  next: NextFunction,
) => updateUserData(req, res, next);

// PATCH /users/me/avatar
const updateUserAvatar = (
  req: Request,
  res: Response,
  next: NextFunction,
) => updateUserData(req, res, next);

export {
  login,
  updateUserInfo,
  updateUserAvatar,
  createUser,
  getUsers,
  getUser,
  getCurrentUser,
};
