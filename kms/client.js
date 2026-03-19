import { fromSSO } from "@aws-sdk/credential-providers";
import kms from '@aws-sdk/client-kms';

export default new kms.KMSClient(process.env.DEV_ENV==='TRUE' ?
  { credentials: fromSSO({ profile: process.env.AWS_PROFILE }) } :
  { region: process.env.AWS_REGION }
);

