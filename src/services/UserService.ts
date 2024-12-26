import { userRepository } from "../repositories/UserRepository"
import { User } from "../entities/User"

export class UserService {
    async create(name: string, password: string, email: string, instituicion?: string, ): Promise<User> {
        const newUser = userRepository.create({ name });
        return await userRepository.save(newUser);
    }
}