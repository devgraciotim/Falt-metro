import { courseRepository } from "../repositories/CourseRepository";
import { Course } from "../entities/Course";
import { ICourse } from "../interfaces/course/ICourse";

interface ICourseService {
    /**
         * Cria um novo Curso no banco de dados.
         * 
         * Este método cria um novo Curso usando os dados fornecidos e os salva no banco de dados.
         * 
         * @param {ICourse} courseData - Objeto que contém todas as informações necessárias para criar um Curso.
         * Os dados esperados incluem: `course_name`, `user`, `instituition`, entre outros.
         * 
         * @returns {Promise<Course>} Retorna uma Promise que resolve para o objeto do curso criado.
         */
        create(courseData: ICourse): Promise<Course>;
    
        /**
         * Retorna todos os cursos cadastrados no banco de dados.
         * 
         * Este método recupera todos os cursos que estão cadastrados no banco de dados e retorna uma lista
         * com as informações desses cursos.
         * 
         * @returns {Promise<Course[]>} Retorna uma Promise que resolve para um array de objetos `Course`, representando todos
         * os cursos cadastrados no sistema.
         */
        findAll(): Promise<Course[]>
    
        /**
         * Retorna um curso específico pelo seu ID.
         * 
         * Este método busca e retorna um curso do banco de dados, dado o seu `course_id`.
         * 
         * @param {number} course_id - O ID do curso que se deseja buscar.
         * 
         * @returns {Promise<Course | null>} Retorna uma Promise que resolve para o objeto `Course` correspondente ao ID
         * fornecido, ou `null` caso o curso não seja encontrado.
         */
        findById(course_id: number): Promise<Course | null>;
    
        /**
         * Atualiza as informações de um curso específico.
         * 
         * Este método busca um curso pelo seu `course_id` e atualiza suas informações com os dados fornecidos.
         * Caso o curso não seja encontrado, o método retorna `null`.
         * 
         * @param {number} course_id - O ID do curso a ser atualizado.
         * @param {ICourse} courseData - Objeto contendo os dados a serem atualizados no curso.
         * 
         * @returns {Promise<Course | null>} Retorna uma Promise que resolve para o objeto `Course` atualizado, ou `null`
         * se o curso não for encontrado.
         */
        update(course_id: number, courseData: ICourse): Promise<Course | null>;
    
        /**
         * Deleta um curso do banco de dados.
         * 
         * Este método deleta um curso do banco de dados pelo seu `course_id`.
         * Caso o curso não seja encontrado, o método retorna `false`.
         * 
         * @param {number} course_id - O ID do curso a ser deletado.
         * 
         * @returns {Promise<boolean>} Retorna uma Promise que resolve para `true` se o curso foi deletado com sucesso,
         * ou `false` caso o curso não tenha sido encontrado.
         */
        delete(course_id: number): Promise<boolean>;
}

export class CourseService {
    async create(courseData: ICourse): Promise<Course> {
            const newCourse = courseRepository.create(courseData);
            return await courseRepository.save(newCourse);
        }
    
        async findAll(): Promise<Course[]> {
            return await courseRepository.find();
        }
    
        async findById(course_id: number): Promise<Course | null> {
            return await courseRepository.findOne({
                where: { course_id }
            });
        }
    
        async update(course_id: number, courseData: ICourse): Promise<Course | null> {
            const course = await courseRepository.findOne({
                where: { course_id }
            });
    
            if (!course) {
                return null;
            }
    
            course.course_name = courseData.course_name ?? course.course_name;
            course.user = courseData.user ?? course.user;
            course.instituition = courseData.instituition ?? course.instituition;
            course.total_classes = courseData.total_classes ?? course.total_classes;
            course.total_absences_allowed = courseData.total_absences_allowed ?? course.total_absences_allowed;
            course.total_absences = courseData.total_absences ?? course.total_absences;
            course.max_absences_percentage = courseData.max_absences_percentage ?? course.max_absences_percentage;
            course.class_days = courseData.class_days ?? course.class_days;
            course.course_start_date = courseData.course_start_date ?? course.course_start_date;
            course.course_end_date = courseData.course_end_date ?? course.course_end_date;
            course.absences = courseData.absences ?? course.absences;
    
            return await courseRepository.save(course);
        }
    
        async delete(course_id: number): Promise<boolean> {
            const course = await courseRepository.findOne({
                where: { course_id }
            });
    
            if (!course) {
                return false;
            }
    
            await courseRepository.remove(course);
            return true;
        }
}