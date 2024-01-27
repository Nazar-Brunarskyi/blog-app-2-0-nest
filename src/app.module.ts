import { Module } from '@nestjs/common';
import { FirebaseModule } from './firebase/firebase.module';
import { TestModule } from './test/test.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), FirebaseModule, TestModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
