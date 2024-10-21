
import { Request, Response } from 'express';
import RegisterUserUseCase from '../../domain/registro/application/use-cases/RegisterUserUseCase';
import GetUsersUseCase from '../../domain/registro/application/use-cases/GetUsersUseCase';
import DeleteUserUseCase from '../../domain/registro/application/use-cases/DeleteUserUseCase';

export default class UserController {
    private registerUserUseCase: RegisterUserUseCase;
    private getUsersUseCase: GetUsersUseCase;
    private deleteUserUseCase: DeleteUserUseCase;

    constructor(registerUserUseCase: RegisterUserUseCase, getUsersUseCase: GetUsersUseCase, deleteUserUseCase: DeleteUserUseCase) {
        this.registerUserUseCase = registerUserUseCase;
        this.getUsersUseCase = getUsersUseCase;
        this.deleteUserUseCase = deleteUserUseCase;
    }

    async register(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.registerUserUseCase.execute(req.body);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.getUsersUseCase.execute();
            res.status(200).json(users);
        } catch (error: any) {  
            res.status(500).json({ error: error.message });
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const deletedUser = await this.deleteUserUseCase.execute(req.params.id);
            res.status(200).json(deletedUser);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
