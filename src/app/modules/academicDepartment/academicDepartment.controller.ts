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

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const result = await AcademicDepartmentService.getAllFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Department data fetched successfully",
        data: result
    })
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const result = await AcademicDepartmentService.getByIdFromDB(req.params.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Department single data fetched successfully",
        data: result
    })
});


export const AcademicDepartmentController = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB
}