import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/firebase/services/firebase.service';
import { UserService } from 'src/app/user/services/user.service';

@Injectable()
export class FirebaseAuthInternalGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly firebaseAdminService: FirebaseService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split('Bearer ')[1];

    return this.validateToken(token, context);
  }

  async validateToken(authToken: string, context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const firebaseUser = await this.firebaseAdminService.verifyIdToken(authToken);

      const user = await this.userService.findforFbGuard(firebaseUser.uid);

      if (!user) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }

      request.user = user;

      return true;
    } catch (error) {
      return false;
    }
  }
}
