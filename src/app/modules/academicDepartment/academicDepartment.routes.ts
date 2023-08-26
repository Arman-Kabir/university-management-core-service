import express from "express";
import { AcademicDepartmentController } from "./academicDepartment.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicDepartmentValidation } from "./academicDepartment.validation";

const router = express.Router();

router.get('/', AcademicDepartmentController.getAllFromDB)

router.post(
    '/',
    validateRequest(AcademicDepartmentValidation.create),
    AcademicDepartmentController.insertIntoDB
)


export const academicDepartmentRoutes = router;