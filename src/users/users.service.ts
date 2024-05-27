import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const user = this.usersRepository.create(createUserDto);
        try {
            return await this.usersRepository.save(user);
        } catch (error) {
            throw new Error(`Failed to create user: ${error.message}`);
        }
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { email }, select: ['id', 'name', 'email', 'password', 'role'], });
    }

    async findAll(): Promise<User[]> {
        const users = await this.usersRepository.find();
        if (!users.length) {
            throw new NotFoundException(`Users not found`);
        }
        return users;
    }

    async findOne(id: string): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        await this.usersRepository.update(id, updateUserDto);
        return this.usersRepository.findOne({ where: { id } });
    }

    async remove(id: string): Promise<void> {
        const user = await this.usersRepository.findOne({ where: { id } });
        await this.usersRepository.remove(user);
    }

    // async comparePassword(enteredPassword: string, userPassword: string): Promise<boolean> {
    //     return bcrypt.compare(enteredPassword, userPassword);
    // }
}
