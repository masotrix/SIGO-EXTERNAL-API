import fetch from "cross-fetch";
import { v4 as uuidv4 } from "uuid";
//import dayjs from "dayjs";

export default async ({ body, claims, MODULES, MODELS }) => {

  const toAddress = body.toEmail;
  const nombres = body.name
  const apellido = body.lastname;
  const email = claims.email;
  const filename = body.filename;
  const subject = `LSP: Archivo compartido por ${email}`;
  const userName = nombres + ' ' + apellido;

  //const uuid = uuidv4();

  const resourcesUrl = "https://s3.amazonaws.com/" +
        process.env.RESOURCES_BUCKET;
  const emailBodyResponse = await fetch(resourcesUrl +
      "/shared-file.html");

  const html = (await emailBodyResponse.text())
    .replace(/VAR_USER_NAME/g, userName)
    .replace(/VAR_FILE_NAME/g, filename)
    //.replace(/VAR_ERROR_URL/g, 'https://' + process.env.WEB_URL +
    //    `/denyPdf/${uuid.toString()}`)
    .replace(/VAR_FILE_URL/g, 'https://' + process.env.WEB_URL)
    .replace(/VAR_LOGO_ICIM/g, resourcesUrl + "/logo-icim.png")
    .replace(/VAR_APP_URL/g, 'https://' + process.env.WEB_URL)

  await MODULES.ses.postEmail({
    toAddress,
    subject,
    content: html,
  });

  return { body: { message: "EMAIL_SENT" } };
}
