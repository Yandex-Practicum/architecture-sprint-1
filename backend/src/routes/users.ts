import { Router } from 'express';
import {
  getUser, updateUserInfo, updateUserAvatar, getUsers, getCurrentUser,
} from '../controllers/users';
import { validateObjId, validateAvatar, validateProfile } from '../middlewares/validatons';

const router = Router();

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:id', validateObjId, getUser);
router.patch('/me/avatar', validateAvatar, updateUserAvatar);
router.patch('/me', validateProfile, updateUserInfo);

export default router;
