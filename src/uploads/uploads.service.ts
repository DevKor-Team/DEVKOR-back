import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class UploadsService {
  private readonly s3: AWS.S3;
  private readonly ACL: string;
  constructor(private readonly config: ConfigService) {
    AWS.config.update({
      credentials: {
        accessKeyId: this.config.get('AWS_ACCESS_KEY'),
        secretAccessKey: this.config.get('AWS_SECRET_ACCESS_KEY'),
      },
      region: this.config.get('AWS_REGION'),
    });
    this.ACL = 'public-read';
    this.s3 = new AWS.S3();
  }

  async uploadFile(file: Express.Multer.File, dir: string) {
    const AWS_S3_BUCKET = 'devkor';

    const params = {
      Bucket: AWS_S3_BUCKET,
      Key: String(file.originalname),
      Body: file.buffer,
    };

    try {
      const response = await this.s3.upload(params).promise();
      return response;
    } catch (e) {
      throw new Error('Failed to upload file.');
    }
  }
}
