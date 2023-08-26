import { z } from 'zod';

const create = z.object({
    body: z.object({
        facultyId: z.string({
            required_error:'Faculty Id is required'
        }),
        firstName: z.string({
            required_error:'first Name is required'
        }),
        lastName: z.string({
            required_error:'last Name is required'
        }),
        middleName: z.string({
            required_error:'middle Name is required'
        }),
        profileImage: z.string({
            required_error:'profile Image is required'
        }),
        email: z.string({
            required_error:'email is required'
        }),
        contactNo: z.string({
            required_error:'contact Number is required'
        }),
        gender: z.string({
            required_error:'Gender is required'
        }),
        bloodGroup: z.string({
            required_error:'blood Group is required'
        }),
        designation: z.string({
            required_error:'designation is required'
        }),
        academicDepartmentId: z.string({
            required_error:'academicDepartmentId is required'
        }),
        academicFacultyId: z.string({
            required_error:'academicFacultyId is required'
        }),
    })
});

export const facultyValidation ={
    create
}