import { randomUUID } from 'crypto';

import * as validations from '../../validations.js';

export const administrativeStatusV1 = [
    'CASE_CLOSED',
    'DIAGNOSIS',
    'STAGING',
    'TREATMENT',
    'SURVEILLANCE',
];
export const administrativeStatusV2 = [
    'DIAGNOSIS',
    'STAGING',
    'TREATMENT',
    'SURVEILLANCE',
];

export default async ({ body, MODELS, model }) => {

    const validationDic = {
        patientId:
            async (field, body) => await validations.exists({
                field, body, MODELS, model: 'patients' }),

        caseId:
            async (field, body) => await validations.exists({
                field, body, MODELS, model: 'cases' }),

        originOrganizationId:
            async (field, body) => await validations.exists({
                field, body, MODELS, model: 'organizations' }),

        previousValue:
            (field, body) => validations.categorical({ field, body,
                MODELS, categories: administrativeStatusV1 }),

        newValue:
            (field, body) => validations.categorical({ field, body,
                MODELS, categories: administrativeStatusV2 }),

        /*
        observations:
            (field, body) => validations.optional({ field, body },
                validations.string({ field, body })),
        */
    };

    const defaultDic = {
        id: randomUUID(),
        eventType: 'UPDATE_ADMINISTRATIVE_STATUS',
        observations: 'EXTERNAL_API',
    }

    return await validations.validate({
        body, validationDic, MODELS, model, defaultDic });
}




