import express from 'express';
import { facultyController } from './faculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { facultyValidation } from './faculty.validation';

const router = express.Router();

router.post('/',
    validateRequest(facultyValidation.create),
    facultyController.insertIntoDB
)

router.get('/', facultyController.getAllFromDB)
router.get('/:id', facultyController.getByIdFromDB)

export const facultyRoutes = router;