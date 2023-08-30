import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { CourseService } from "./course.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { courseFilterAbleFields } from "./course.constants";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    console.log(req.body);

    const result = await CourseService.insertIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course created successfully",
        data: result
    });
});

const getAllFromDB = catchAsync(async(req: Request, res: Response)=>{
    console.log(req.query);

    const filters = pick(req.query,courseFilterAbleFields);
    const options = pick(req.query,['page','limit','sortBy','sortOrder']);
    console.log(filters,options);

    const result = await CourseService.getAllFromDB(filters,options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course updated successfully',
        data: result
    });
});

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    // console.log(id);
    const result = await CourseService.updateOneInDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course updated successfully',
        data: result
    });
});

export const CourseController = {
    insertIntoDB,
    getAllFromDB,
    updateOneInDB
}