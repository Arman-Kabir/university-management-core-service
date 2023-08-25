import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.post(
    '/',
    validateRequest(AcademicFacultyValidation.create),
    AcademicFacultyController.insertIntoDB
)

export const AcademicFacultyRoutes = router;