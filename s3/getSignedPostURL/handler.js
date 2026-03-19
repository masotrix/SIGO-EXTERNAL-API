//import { createPresignedPost } from '@aws-sdk/s3-request-presigner';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import s3Client from '../client.js';

export default async ({ body, MODULES }) => {
  const todaysDate = MODULES.dayjs.getTimezonedTimestamp({ dateOnly: 'true' });
  const { url, fields } = await createPresignedPost(s3Client, {
    Bucket: process.env.AWS_BUCKET_USER_FILES,
    Expires: 600, // 10 minute
    Fields: { 'Content-Type': 'application/pdf', },
    Conditions: [['content-length-range', 1, 5 * 1024 ** 2]], // 5MB
    Key: body.fileName,
  });

  return { body: { signedPostURL: url, signedPostFields: fields } };
}
