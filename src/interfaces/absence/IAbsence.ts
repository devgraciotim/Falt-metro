import { Absence } from "../../entities/Absence";
import { Course } from "../../entities/Course";

export interface IAbsence {
    absence_id?: number;
    justification?: string;
    course: Course;
}