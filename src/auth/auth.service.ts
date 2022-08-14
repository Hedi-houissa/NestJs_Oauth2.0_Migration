import { BadRequestException, Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(user: any) {
    const getUser = await this.usersService.findOne(user.username);
    if (getUser && getUser.password === user.password) {
      const payload = { username: user.username, sub: user.userId };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new BadRequestException('username or passwordt incorrect ');
  }
}
