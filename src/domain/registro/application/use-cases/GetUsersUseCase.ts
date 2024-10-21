// src/domain/registro/application/use-cases/RegisterUserUseCase.ts
import User from '../../enterprise/entities/User';
import UserRepository from '../../enterprise/repositories/UserRepository';

export default class GetUsersUseCase {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(): Promise<Omit<User, 'password'>[] | undefined> {
        const users = await this.userRepository.getAll();

        if(!users) {
            throw new Error('Users not found');
        }

        return users;
    }
}
