// src/domain/registro/application/use-cases/RegisterUserUseCase.ts
import KafkaProducer from '../../../../infrastructure/kafka/KafkaProducer';
import User from '../../enterprise/entities/User';
import UserRepository from '../../enterprise/repositories/UserRepository';

export default class DeleteUserUseCase {
    private userRepository: UserRepository;
    private kafkaProducer: KafkaProducer;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
        this.kafkaProducer = new KafkaProducer();
    }

    async execute(data: string): Promise<Omit<User, 'password'> | undefined> {
        const deletedUser = await this.userRepository.deleteUser(data);

        if(!deletedUser) {
            throw new Error('User not found');
        }

        await this.kafkaProducer.connect();
        const notificationMessage = {
            id: deletedUser.id,
            name: deletedUser.name,
            email: deletedUser.email,
        };
        await this.kafkaProducer.sendMessage('user-delete-topic', notificationMessage);
        await this.kafkaProducer.disconnect();

        return deletedUser;
    }
}
