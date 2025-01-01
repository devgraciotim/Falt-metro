import { userRepository } from "../repositories/UserRepository"
import { User } from "../entities/User"
import { IUser } from "../interfaces/user/IUser";

interface IUserService {
    /**
     * Cria um novo usuário no banco de dados.
     * 
     * Este método cria um novo usuário usando os dados fornecidos e os salva no banco de dados.
     * 
     * @param {IUser} userData - Objeto que contém todas as informações necessárias para criar um usuário.
     * Os dados esperados incluem: `name`, `password`, `email`, `institution`, `photo`, entre outros.
     * 
     * @returns {Promise<User>} Retorna uma Promise que resolve para o objeto do usuário criado.
     */
    create(userData: IUser): Promise<User>;

    /**
     * Retorna todos os usuários cadastrados no banco de dados.
     * 
     * Este método recupera todos os usuários que estão cadastrados no banco de dados e retorna uma lista
     * com as informações desses usuários.
     * 
     * @returns {Promise<User[]>} Retorna uma Promise que resolve para um array de objetos `User`, representando todos
     * os usuários cadastrados no sistema.
     */
    findAll(): Promise<User[]>

    /**
     * Retorna um usuário específico pelo seu ID.
     * 
     * Este método busca e retorna um usuário do banco de dados, dado o seu `user_id`.
     * 
     * @param {number} user_id - O ID do usuário que se deseja buscar.
     * 
     * @returns {Promise<User | null>} Retorna uma Promise que resolve para o objeto `User` correspondente ao ID
     * fornecido, ou `null` caso o usuário não seja encontrado.
     */
    findById(user_id: number): Promise<User | null>;

    /**
     * Atualiza as informações de um usuário específico.
     * 
     * Este método busca um usuário pelo seu `user_id` e atualiza suas informações com os dados fornecidos.
     * Caso o usuário não seja encontrado, o método retorna `null`.
     * 
     * @param {number} user_id - O ID do usuário a ser atualizado.
     * @param {IUser} userData - Objeto contendo os dados a serem atualizados no usuário.
     * 
     * @returns {Promise<User | null>} Retorna uma Promise que resolve para o objeto `User` atualizado, ou `null`
     * se o usuário não for encontrado.
     */
    update(user_id: number, userData: IUser): Promise<User | null>;

    /**
     * Deleta um usuário do banco de dados.
     * 
     * Este método deleta um usuário do banco de dados pelo seu `user_id`.
     * Caso o usuário não seja encontrado, o método retorna `false`.
     * 
     * @param {number} user_id - O ID do usuário a ser deletado.
     * 
     * @returns {Promise<boolean>} Retorna uma Promise que resolve para `true` se o usuário foi deletado com sucesso,
     * ou `false` caso o usuário não tenha sido encontrado.
     */
    delete(user_id: number): Promise<boolean>;
}

export class UserService implements IUserService {
    async create(userData: IUser): Promise<User> {
        const newUser = userRepository.create(userData);
        return await userRepository.save(newUser);
    }

    async findAll(): Promise<User[]> {
        return await userRepository.find();
    }

    async findById(user_id: number): Promise<User | null> {
        return await userRepository.findOne({
            where: { user_id }
        });
    }

    async update(user_id: number, userData: IUser): Promise<User | null> {
        const user = await userRepository.findOne({
            where: { user_id }
        });

        if (!user) {
            return null;
        }

        user.name = userData.name ?? user.name;
        user.password = userData.password ?? user.password;
        user.email = userData.email ?? user.email;
        user.institution = userData.institution ?? user.institution;
        user.photo = userData.photo ?? user.photo;
        user.bio = userData.bio ?? user.bio;
        user.country = userData.country ?? user.country;
        user.state = userData.state ?? user.state;
        user.city = userData.city ?? user.city;
        user.date_of_birth = userData.date_of_birth ?? user.date_of_birth;
        user.social_links = userData.social_links ?? user.social_links;

        return await userRepository.save(user);
    }

    async delete(user_id: number): Promise<boolean> {
        const user = await userRepository.findOne({
            where: { user_id }
        });

        if (!user) {
            return false;
        }

        await userRepository.remove(user);
        return true;
    }
}