import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { facultyService } from "./faculty.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";


const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await facultyService.insertIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Faculty created successfully",
        data: result
    })
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const result = await facultyService.getAllFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Faculty data fetched successfully",
        data: result
    })
});

export const facultyController = {
    insertIntoDB,
    getAllFromDB
}