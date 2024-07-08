import {
  NextFunction,
  Request, Response,
} from 'express';
import BadRequestError from '../errors/bad-request-error';
import ForbiddenError from '../errors/forbidden-error';
import NotFoundError from '../errors/not-found-error';
import Card from '../models/card';

const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

const createCard = (req: Request, res: Response, next: NextFunction) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  Card.findById(id)
    .orFail(() => new NotFoundError('Нет карточки по заданному id'))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нельзя удалить чужую карточку');
      } else {
        return Card.deleteOne({ _id: card._id })
          .then(() => res.send({ data: card }));
      }
    })
    .catch(next);
};

const updateLike = (req: Request, res: Response, next: NextFunction, method: string) => {
  const { params: { id } } = req;
  Card.findByIdAndUpdate(id, { [method]: { likes: req.user._id } }, { new: true })
    .orFail(() => new NotFoundError('Нет карточки по заданному id'))
    .then((card) => {
      res.send({ data: card });
    })
    .catch(next);
};

const likeCard = (req: Request, res: Response, next: NextFunction) => updateLike(req, res, next, '$addToSet');

const dislikeCard = (req: Request, res: Response, next: NextFunction) => updateLike(req, res, next, '$pull');

export {
  createCard,
  deleteCard, dislikeCard, getCards, likeCard,
};
