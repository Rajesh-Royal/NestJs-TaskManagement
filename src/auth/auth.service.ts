import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ){}

    public async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
            return await this.userRepository.signUp(authCredentialsDto);
    }

    public async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
            const user = await this.userRepository.validateUserPassword(authCredentialsDto);

            if(!user){
                throw new UnauthorizedException('Invalid Credentials');
            }
            return user;
    }
}
