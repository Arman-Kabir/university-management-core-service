import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AcademicDepartmentService } from "./academicDepartment.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";


const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await AcademicDepartmentService.insertIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Department created",
        data: result
    })
});


export const AcademicDepartmentController = {
    insertIntoDB
}