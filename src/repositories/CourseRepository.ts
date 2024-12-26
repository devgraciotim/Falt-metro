import { AppDataSource } from "../data-source";
import { Course } from "../entities/Course";

export const roomRepository = AppDataSource.getRepository(Course);