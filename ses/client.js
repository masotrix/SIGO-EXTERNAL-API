import { fromSSO } from "@aws-sdk/credential-providers";
import ses from "@aws-sdk/client-ses";

export default new ses.SESClient(
  process.env.DEV_ENV === "TRUE"
    ? { credentials: fromSSO({ profile: process.env.AWS_PROFILE }) }
    : { region: process.env.AWS_REGION }
);
