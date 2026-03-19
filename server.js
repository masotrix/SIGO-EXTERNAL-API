// server.js
import { getServerFactory, getHttpsServerFactory } from 'minimonolith';
import fs from 'fs';
import path from 'path';

let serverFactory;

if (process.env.DEV_ENV==='TRUE') {
    const dotenv = await import('dotenv');
    dotenv.config({ path: './.env' });

    const key = fs.readFileSync(path.resolve('./certs/key.pem'));
    const cert = fs.readFileSync(path.resolve('./certs/cert.pem'));
    serverFactory = await getHttpsServerFactory({ key, cert });
} else {
    serverFactory = await getServerFactory();
}

const { lambdaHandler } = await import('./index.js');
const server = serverFactory(lambdaHandler);

server.listen(8080);
