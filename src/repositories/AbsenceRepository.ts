import { AppDataSource } from "../data-source";
import { Absence } from "../entities/Absence";

export const roomRepository = AppDataSource.getRepository(Absence);