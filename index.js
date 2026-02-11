import { getNewAPI } from 'minimonolith';

import organizations from './organizations/index.js'
import patients from './patients/index.js'

/*
import cases from './cases/index.js'
import clinicalNotes from './clinicalNotes/index.js'
import history from './history/index.js'
import sharedCases from './sharedCases/index.js'
import task from './task/index.js'
import file from './file/index.js'
import resolutions from './resolutions/index.js'
import activities from './activities/index.js'
import mandatoryNotifications from './mandatoryNotifications/index.js'
*/

const API = await getNewAPI({
    ERROR_LEVEL: parseInt(process.env.ERROR_LEVEL)
});

await API.postModule(organizations);
await API.postModule(patients);

/*
await API.postModule(cases);
await API.postModule(clinicalNotes);
await API.postModule(history);
await API.postModule(sharedCases);
await API.postModule(task);
await API.postModule(file);
await API.postModule(resolutions);
await API.postModule(activities);
await API.postModule(mandatoryNotifications);
*/

await API.postDatabaseModule({
    DB_DIALECT: process.env.DB_DIALECT,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT ?
        parseInt(process.env.DB_PORT, 10) : undefined,
    DB_DB: process.env.DB_DB,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_STORAGE: process.env.DB_STORAGE,
});

export const lambdaHandler = await API.getSyncedHandler();
