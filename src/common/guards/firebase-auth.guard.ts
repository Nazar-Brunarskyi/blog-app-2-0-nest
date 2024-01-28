import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/firebase/services/firebase.service';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private readonly firebaseAdminService: FirebaseService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split('Bearer ')[1];

    return this.validateToken(token);
  }

  async validateToken(authToken: string): Promise<boolean> {
    try {
      const firebaseUser = await this.firebaseAdminService.verifyIdToken(authToken);

      if (!firebaseUser) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }

      return true;
    } catch (error) {
      return false;
    }
  }
}
