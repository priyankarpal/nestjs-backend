import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                return user;
            }
        }
        return null;
    }

    async login(user: any): Promise<{ accessToken: string; }> {
        const payload = { email: user.email, sub: user.id };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    async signUp(createUserDto: CreateUserDto): Promise<any> {
        const existingUser = await this.usersService.findByEmail(createUserDto.email);
        if (existingUser) {
            throw new ConflictException('Email is already in use');
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = await this.usersService.createUser({
            ...createUserDto,
            password: hashedPassword,
        });
        return user;
    }
}
