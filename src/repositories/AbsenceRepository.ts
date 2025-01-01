import { AppDataSource } from "../data-source";
import { Absence } from "../entities/Absence";

export const absenceRepository = AppDataSource.getRepository(Absence);