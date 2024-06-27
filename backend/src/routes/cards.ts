import { Router } from 'express';
import { validateObjId, validateCardBody } from '../middlewares/validatons';

const router = Router();
const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', validateCardBody, createCard);
router.delete('/:id', validateObjId, deleteCard);
router.put('/:id/likes', validateObjId, likeCard);
router.delete('/:id/likes', validateObjId, dislikeCard);

export default router;
