
import User from "../entities/User";

export default abstract class UserRepository {
    abstract save(user: User): Promise<Omit<User, 'password'> | undefined>;

    abstract findById(id: string): Promise<User | undefined>;

    abstract findByEmail(email: string): Promise<User | undefined>;

    abstract getAll(): Promise<Omit<User, 'password'>[] | undefined>;

    abstract deleteUser(id: string): Promise<Omit<User, 'password'> | undefined>;
}
