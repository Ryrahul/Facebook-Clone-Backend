import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { PostController } from './post/post.controller';
import { PostService } from './post/post.service';
import { PostModule } from './post/post.module';
import { MinioService } from './minio/minio.service';
import { MinioModule } from './minio/minio.module';
import { CommentModule } from './comment/comment.module';
import { FriendsModule } from './friends/friends.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    MailModule,
    PostModule,
    MinioModule,
    CommentModule,
    FriendsModule,
  ],
  controllers: [AppController, UserController, PostController],
  providers: [
    AppService,
    UserService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    PostService,
    MinioService,
  ],
})
export class AppModule {}
