import { Absence } from "../../entities/Absence";
import { User } from "../../entities/User";
import { DaysOfWeek } from "../../enums/DaysOfWeek";

export interface ICourse {
    course_id?: number;
    course_name: string;
    user: User;
    instituition?: string;
    total_classes?: number;
    total_absences_allowed?: number;
    total_absences?: number;
    max_absences_percentage: number;
    class_days: DaysOfWeek[];
    course_start_date: Date;
    course_end_date: Date;
    absences?: Absence[];
}