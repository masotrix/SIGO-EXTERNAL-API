// server.js
import { getServerFactory } from 'minimonolith';

import dotenv from 'dotenv';
dotenv.config({ path: './.env' })

const { lambdaHandler } = await import('./index.js');
const serverFactory = await getServerFactory();
const server = serverFactory(lambdaHandler);

server.listen(8080);
