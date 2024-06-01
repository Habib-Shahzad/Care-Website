import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { ConfigKeys } from '../config/app.configuration';
import { UploadFile } from './models/upload.file.model';

@Injectable()
export class StorageService {
  private readonly bucket: AWS.S3;
  private readonly appBucket: string;
  private readonly region = 'ap-southeast-1';
  private readonly basePath: string;
  constructor(private readonly config: ConfigService) {
    this.appBucket = this.config.get(ConfigKeys.IMAGE_BUCKET);
    this.basePath = `https://${this.appBucket}.s3.amazonaws.com`;
    const accessKey = this.config.get(ConfigKeys.AWS_ACCESS_KEY_ID);
    const secretKey = this.config.get(ConfigKeys.AWS_SECRET_ACCESS_KEY);
    this.bucket = new AWS.S3({
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
    });
  }

  async upload(file: UploadFile): Promise<string> {
    console.log('Received upload request');
    AWS.config.update({ region: this.region });

    const key = file.name;
    const params = {
      Bucket: this.appBucket,
      Key: key,
      Body: file.file.buffer,
      ACL: 'public-read',
    };
    await this.bucket.putObject(params).promise();

    console.log('Uploaded file');
    return `${this.basePath}/${key}`;
  }

  async delete(key: string): Promise<void> {
    const params = {
      Bucket: this.appBucket,
      Key: key,
    };
    await this.bucket.deleteObject(params).promise();
  }
}
