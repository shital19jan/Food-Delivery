import express from 'express';
import UserController from '../controllers/UserController';
import validateMiddleware from '../middleware/validateMiddleware';
import userValidateSchema from '../validators/userValidators';
import authMiddleware from '../middleware/authMiddleware';
import authorizeMiddleware from '../middleware/authorizeMiddleware';

const router = express.Router();

const userController = new UserController();

router.post('/login', userController.login)
router.post('/create', validateMiddleware.validate(userValidateSchema) , userController.createUser);
router.put('/:id', validateMiddleware.validate(userValidateSchema) ,userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);
router.get('/', userController.getAllUsers);
router.put("/:id/activate",authMiddleware,authorizeMiddleware("RES_OWNER"),userController.activateUser)

export default router;