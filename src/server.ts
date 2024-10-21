// src/index.ts
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser'; 
import UserController from './presentation/controllers/UserController';
import UserRepositoryImpl from './infrastructure/database/UserRepositoryImpl';
import RegisterUserUseCase from './domain/registro/application/use-cases/RegisterUserUseCase';
import GetUsersUseCase from './domain/registro/application/use-cases/GetUsersUseCase';
import DeleteUserUseCase from './domain/registro/application/use-cases/DeleteUserUseCase';

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Inicializando repositório e casos de uso
const userRepository = new UserRepositoryImpl();
const registerUserUseCase = new RegisterUserUseCase(userRepository);
const getUsersUseCase = new GetUsersUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const userController = new UserController(registerUserUseCase, getUsersUseCase, deleteUserUseCase);

// Rotas
app.post('/users', (req: Request, res: Response) => userController.register(req, res));
app.get('/users', (req: Request, res: Response) => userController.getUsers(req, res));
app.delete('/users/:id', (req: Request, res: Response) => userController.deleteUser(req, res));

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
