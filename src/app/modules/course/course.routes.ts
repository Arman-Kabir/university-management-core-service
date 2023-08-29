import express from 'express';
import { CourseController } from './course.controller';
import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/', CourseController.insertIntoDB)
router.get('/', CourseController.getAllFromDB)

router.patch(
    '/:id',
    // validateRequest(CourseValidation.update),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    CourseController.updateOneInDB
);

export const courseRoutes = router;