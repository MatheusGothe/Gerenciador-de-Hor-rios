import express from 'express';
import { createUser, getAllUsers,deleteUser,gerUserById, updateUser } from '../controllers/UserController.js';
import { validateUpdateUser, validateUser } from '../validations/UserValidations.js';
import { checkUserLinks } from '../middlewares/User.js';

const router = express.Router();

router.get("/", getAllUsers)
router.post("/",validateUser, createUser);
router.delete("/:id", checkUserLinks, deleteUser);
router.get("/:id", gerUserById);
router.put("/:id",validateUpdateUser, updateUser);


export default router;
