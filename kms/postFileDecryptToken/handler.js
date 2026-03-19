import kms from '@aws-sdk/client-kms';

import kmsClient from '../client.js';

export default async ({ body, MODULES }) => {

    const fileName = body.fileName;
    const GranteePrincipal =
        `arn:aws:iam::${process.env.AWS_ACCOUNT}:`+
        `role/${process.env.IDP_ROLE_NAME}`

    const sanitizedFileName =
        fileName.replace(/[^a-zA-Z0-9:/_-]/g, '-');

    const safeGrantName =
        `Encrypt-File-${sanitizedFileName}`.substring(0, 256);

    const generateCommand = new kms.CreateGrantCommand({
        KeyId: process.env.FILE_ENCRYPTION_KEY_ID,
        GranteePrincipal,
        Operations: ['Decrypt'],
        //Constraints: { EncryptionContextEquals: { fileName } },
        Constraints: { EncryptionContextSubset: { fileName } },
        Name: safeGrantName,
    });
    const generateResponse = await kmsClient.send(generateCommand);

    return {
        body: {
          grantId: generateResponse.GrantId,
          grantToken: generateResponse.GrantToken,
        }
    };
};
