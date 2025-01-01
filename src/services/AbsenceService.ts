import { absenceRepository } from "../repositories/AbsenceRepository";
import { IAbsence } from "../interfaces/absence/IAbsence";
import { Absence } from "../entities/Absence";

interface IAbsenceService {
    /**
     * Cria uma nova ausência no banco de dados.
     * 
     * Este método cria uma nova ausência usando os dados fornecidos e os salva no banco de dados.
     * 
     * @param {IAbsence} absenceData - Objeto que contém todas as informações necessárias para criar uma ausência.
     * 
     * @returns {Promise<Absence>} Retorna uma Promise que resolve para o objeto da ausência criada.
     */
    create(absenceData: IAbsence): Promise<Absence>;

    /**
     * Retorna todas as ausências cadastradas no banco de dados.
     * 
     * Este método recupera todas as ausências que estão cadastradas no banco de dados e retorna uma lista
     * com as informações dessas ausências.
     * 
     * @returns {Promise<Absence[]>} Retorna uma Promise que resolve para um array de objetos `Absence`, representando todas
     * as ausências cadastradas no sistema.
     */
    findAll(): Promise<Absence[]>;

    /**
     * Retorna uma ausência específica pelo seu ID.
     * 
     * Este método busca e retorna uma ausência do banco de dados, dado o seu `absence_id`.
     * 
     * @param {number} absence_id - O ID da ausência que se deseja buscar.
     * 
     * @returns {Promise<Absence | null>} Retorna uma Promise que resolve para o objeto `Absence` correspondente ao ID
     * fornecido, ou `null` caso a ausência não seja encontrada.
     */
    findById(absence_id: number): Promise<Absence | null>;

    /**
     * Atualiza as informações de uma ausência específica.
     * 
     * Este método busca uma ausência pelo seu `absence_id` e atualiza suas informações com os dados fornecidos.
     * Caso a ausência não seja encontrada, o método retorna `null`.
     * 
     * @param {number} absence_id - O ID da ausência a ser atualizada.
     * @param {IAbsence} absenceData - Objeto contendo os dados a serem atualizados na ausência.
     * 
     * @returns {Promise<Absence | null>} Retorna uma Promise que resolve para o objeto `Absence` atualizado, ou `null`
     * se a ausência não for encontrada.
     */
    update(absence_id: number, absenceData: IAbsence): Promise<Absence | null>;

    /**
     * Deleta uma ausência do banco de dados.
     * 
     * Este método deleta uma ausência do banco de dados pelo seu `absence_id`.
     * Caso a ausência não seja encontrada, o método retorna `false`.
     * 
     * @param {number} absence_id - O ID da ausência a ser deletada.
     * 
     * @returns {Promise<boolean>} Retorna uma Promise que resolve para `true` se a ausência foi deletada com sucesso,
     * ou `false` caso a ausência não tenha sido encontrada.
     */
    delete(absence_id: number): Promise<boolean>;
}

export class AbsenceService implements IAbsenceService {
    async create(absenceData: IAbsence): Promise<Absence> {
        const newAbsence = absenceRepository.create(absenceData);
        return await absenceRepository.save(newAbsence);
    }

    async findAll(): Promise<Absence[]> {
        return await absenceRepository.find();
    }

    async findById(absence_id: number): Promise<Absence | null> {
        return await absenceRepository.findOne({
            where: { absence_id }
        });
    }

    async update(absence_id: number, absenceData: IAbsence): Promise<Absence | null> {
        const absence = await absenceRepository.findOne({
            where: { absence_id }
        });

        if (!absence) {
            return null;
        }

        absence.justification = absenceData.justification ?? absence.justification;
        absence.course = absenceData.course ?? absence.course;

        return await absenceRepository.save(absence);
    }

    async delete(absence_id: number): Promise<boolean> {
        const absence = await absenceRepository.findOne({
            where: { absence_id }
        });

        if (!absence) {
            return false;
        }

        await absenceRepository.remove(absence);
        return true;
    }
}