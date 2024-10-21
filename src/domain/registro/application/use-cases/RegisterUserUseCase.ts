// src/domain/registro/application/use-cases/RegisterUserUseCase.ts
import User from '../../enterprise/entities/User';
import KafkaProducer from '../../../../infrastructure/kafka/KafkaProducer';
import UserRepository from '../../enterprise/repositories/UserRepository';

interface RegisterUserData {
    id: string;
    name: string;
    email: string;
    password: string;
}

export default class RegisterUserUseCase {
    private userRepository: UserRepository;
    private kafkaProducer: KafkaProducer;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
        this.kafkaProducer = new KafkaProducer();
    }

    async execute(data: RegisterUserData): Promise<Omit<User, 'password'> | undefined> {
        const user = new User(data.id, data.name, data.email, data.password);
        const savedUser = await this.userRepository.save(user);

        if (!savedUser) {
            throw new Error('User not created');
        }

        // Enviar mensagem ao Kafka
        await this.kafkaProducer.connect();
        const notificationMessage = {
            id: savedUser.id,
            name: savedUser.name,
            email: savedUser.email,
        };
        await this.kafkaProducer.sendMessage('user-register-topic', notificationMessage);
        await this.kafkaProducer.disconnect();

        return savedUser;
    }
}
