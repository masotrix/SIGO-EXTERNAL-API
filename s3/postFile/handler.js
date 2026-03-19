import s3 from '@aws-sdk/client-s3';

import s3Client from '../client.js';

export default async ({ body }) => {

  const putObjectParams = {
    Bucket: process.env.AWS_BUCKET_USER_FILES,
    Key: body.fileName,
    Body: Buffer.from(body.fileB64, 'base64'),
  };

  const putObjectCommand = new s3.PutObjectCommand(putObjectParams);
  return { body: await s3Client.send(putObjectCommand) };
};
