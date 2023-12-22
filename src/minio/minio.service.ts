import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';

@Injectable()
export class MinioService {
  private endPoint;
  private port;
  private useSSL;
  private accessKey;
  private secretKey;
  private minioclient;
  constructor(private readonly configservice: ConfigService) {
    this.endPoint = configservice.getOrThrow('END_POINT');
    this.port = configservice.getOrThrow('PORT');
    this.useSSL = configservice.getOrThrow('USESSL');
    this.accessKey = configservice.getOrThrow('ACCESS_KEY');
    this.secretKey = configservice.getOrThrow('SECRET_KEY');

    this.minioclient = new Minio.Client({
      endPoint: this.endPoint,
      port: this.port,
      useSSL: this.useSSL,
      accessKey: this.accessKey,
      secretKey: this.secretKey,
    });
  }

  async uploadImage(image: Buffer, key: string) {
    this.minioclient.putObject(
      this.configservice.get('BUCKET_NAME'),
      key,
      image,
      function (err, objinfo) {
        if (err) return console.log(err);
        console.log('succes', objinfo);
      },
    );
  }
}
