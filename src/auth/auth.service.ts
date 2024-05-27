import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';
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
            // console.log('user found:', user);
            // console.log('user password:', user.password); password;
            if (!user.password) {
                console.error('password error');
                return null;
            }
            if (!password) {
                console.error('password error');
                return null;
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            console.log('Password valid:', isPasswordValid);
            if (isPasswordValid) {
                return user;
            }
        } else {
            console.error('User not found');
        }
        return null;
    }
    async login(user: User): Promise<string> {
        const payload = { email: user.email, sub: user.id };
        return `user logged in `;
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
    };
}
