import { fromSSO } from "@aws-sdk/credential-providers";
import s3 from '@aws-sdk/client-s3';

export default new s3.S3Client(process.env.DEV_ENV==='TRUE' ?
  { credentials: fromSSO({ profile: process.env.AWS_PROFILE }) } :
  { region: process.env.AWS_REGION }
);
