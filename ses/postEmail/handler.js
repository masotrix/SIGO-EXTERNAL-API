import ses from '@aws-sdk/client-ses';

import sesClient from '../client.js';

const getRawEmailContent = ({
    fromAddress, subject, toAddress, content,
    attachmentB64, attachmentName
}) => {

  const rawEmailContent = [
    `From: ${fromAddress}\n`+
    `To: ${toAddress}\n`+
    `Subject: ${subject}\n`+
    `MIME-Version: 1.0\n`,
    "Content-Type: multipart/mixed; "+
    "boundary=\"NextPart\"\n\n--NextPart\n",
    `Content-Type: text/html\n\n${content}\n\n--NextPart\n`,
  ];

  if (attachmentB64) {
    rawEmailContent.push(
      `Content-Type: application/octet-stream; `+
      `name=\"${attachmentName}\"\n`+
      `Content-Transfer-Encoding: base64\n`,
      `Content-Disposition: attachment\n\n`+
      `${attachmentB64.replace(/([^\0]{76})/g, "$1\n")}\n\n`
      `--NextPart--`,
    );
  }

  return rawEmailContent.join('');
}

export default async ({ body }) => {
  const fromAddress = process.env.NOREPLY_EMAIL;

  const postEmailParams = {
    Source: fromAddress,
    RawMessage: {
        Data: Buffer.from(getRawEmailContent({ ...body, fromAddress }))
    },
  };

  const postCommand = new ses.SendRawEmailCommand(postEmailParams);
  return await sesClient.send(postCommand);
};
