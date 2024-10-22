
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser'; 
import UserController from './presentation/controllers/UserController';
import UserRepositoryImpl from './infrastructure/database/UserRepositoryImpl';
import RegisterUserUseCase from './domain/registro/application/use-cases/RegisterUserUseCase';
import GetUsersUseCase from './domain/registro/application/use-cases/GetUsersUseCase';
import DeleteUserUseCase from './domain/registro/application/use-cases/DeleteUserUseCase';

const app = express();
const port = 3001;

app.use(bodyParser.json());

const userRepository = new UserRepositoryImpl();
const registerUserUseCase = new RegisterUserUseCase(userRepository);
const getUsersUseCase = new GetUsersUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const userController = new UserController(registerUserUseCase, getUsersUseCase, deleteUserUseCase);


app.post('/users', (req: Request, res: Response) => userController.register(req, res));
app.get('/users', (req: Request, res: Response) => userController.getUsers(req, res));
app.delete('/users/:id', (req: Request, res: Response) => userController.deleteUser(req, res));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
