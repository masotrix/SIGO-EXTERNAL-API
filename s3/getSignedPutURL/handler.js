import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import s3Client from '../client.js';

export default async ({ body }) => {

  const putParams = {
      Bucket: process.env.USER_FILES_BUCKET,
      Key: body.fileName,
  };

  const putCommand = new PutObjectCommand(putParams);
  const url = await getSignedUrl(s3Client, putCommand,
      { expiresIn: 600 });

  return { body: { signedPutURL: url } };
}
