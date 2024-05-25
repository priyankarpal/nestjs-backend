import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.usersRepository.create(createUserDto);
        return this.usersRepository.save(user);
    }
    async findAll(): Promise<User[]> {
        const users = await this.usersRepository.find();
        if (!users.length) {
            throw new NotFoundException(`Users not found`);
        }
        return users;
    }

    async findOne(id: number): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.usersRepository.update(id, updateUserDto);
        return this.usersRepository.findOne({ where: { id } });

    }

    async remove(id: number): Promise<{ data: string; }> {
        const user = await this.usersRepository.findOne({ where: { id } });
        await this.usersRepository.remove(user);
        return { data: 'User deleted' };
    }
}
