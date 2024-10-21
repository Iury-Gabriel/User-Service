
import { PrismaClient } from '@prisma/client';
import User from '../../domain/registro/enterprise/entities/User';
import UserRepository from '../../domain/registro/enterprise/repositories/UserRepository';

export default class UserRepositoryImpl extends UserRepository {
    private prisma: PrismaClient;

    constructor() {
        super();
        this.prisma = new PrismaClient();
    }

    async save(user: User): Promise<Omit<User, 'password'> | undefined> {
        const newUser = await this.prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
                createdAt: user.createdAt,
            },
        });

        
        return {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            createdAt: newUser.createdAt,
        };
    }

    async getAll(): Promise<Omit<User, 'password'>[] | undefined> { 
        const users = await this.prisma.user.findMany();
        
        return users.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt, 
        }));
    }
    

    async findById(id: string): Promise<User | undefined> {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        return user ? new User(user.id, user.name, user.email, user.password) : undefined;
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        return user ? new User(user.id, user.name, user.email, user.password) : undefined;
    }

    async deleteUser(id: string): Promise<Omit<User, 'password'> | undefined> { 
        const deletedUser = await this.prisma.user.delete({
            where: { id },
            select: { id: true, name: true, email: true, createdAt: true }
        });

        if (!deletedUser) {
            throw new Error('User not found');
        }

        return {
            id: deletedUser.id,
            name: deletedUser.name,
            email: deletedUser.email,
            createdAt: deletedUser.createdAt,
        };
    }
}
