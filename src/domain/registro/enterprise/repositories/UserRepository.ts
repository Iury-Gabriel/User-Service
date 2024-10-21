// src/domain/registro/enterprise/repositories/UserRepository.ts
import User from "../entities/User";

export default abstract class UserRepository {
    // Método para salvar um usuário
    abstract save(user: User): Promise<Omit<User, 'password'> | undefined>;

    // Método para encontrar um usuário pelo ID
    abstract findById(id: string): Promise<User | undefined>;

    // Método para encontrar um usuário pelo e-mail
    abstract findByEmail(email: string): Promise<User | undefined>;

    abstract getAll(): Promise<Omit<User, 'password'>[] | undefined>;

    abstract deleteUser(id: string): Promise<Omit<User, 'password'> | undefined>;
}
