import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import s3Client from '../client.js';

export default async ({ body }) => {

  const putParams = {
      Bucket: process.env.USER_FILES_BUCKET,
      Key: body.fileName
  };
  const getCommand = new GetObjectCommand(putParams);
  const url = await getSignedUrl(s3Client, getCommand,
      { expiresIn: 600 });

  return { body: { signedGetURL: url } };
}
