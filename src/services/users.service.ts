import { NotFoundError } from "../errors/not-found-error";
import { User } from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";

export class UserService {

    private userRepository = new UserRepository();

    constructor() {
        this.userRepository = new UserRepository();
    }
    async getAll(): Promise<User[]> {
        return await this.userRepository.getAll();
    }

    async getById(id: string): Promise<User | null> {
        const user = await this.userRepository.getById(id);
        if (!user) {
            throw new NotFoundError("Usuário não encontrado");
        }
        return user;
    }

    async save(user: User): Promise<void> {
        await this.userRepository.save(user);
    }

    async update(id: string, user: User): Promise<void> {
        const _user = await this.userRepository.getById(id);
        if (!_user) {
            throw new NotFoundError("Usuário não encontrado");
        }
        
        _user.nome = user.nome;
        _user.email = user.email;

        await this.userRepository.update(_user);
    }

    async delete(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }

}