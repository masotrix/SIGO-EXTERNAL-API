import { randomUUID } from 'crypto';

import * as validations from '../../validations.js';

const statusV1 = [
    'PENDING',
];
const statusV2 = [
    'CONFIRMED',
    'REJECTED',
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

        targetOrganizationId:
            async (field, body) => await validations.exists({
                field, body, MODELS, model: 'organizations' }),

        previousValue:
            (field, body) => validations.categorical({ field, body,
                MODELS, categories: statusV1 }),

        newValue:
            (field, body) => validations.categorical({ field, body,
                MODELS, categories: statusV2 }),

        /*
        observations:
            (field, body) => validations.optional({ field, body },
                validations.string({ field, body })),
        */
    };

    const defaultDic = {
        id: randomUUID(),
        eventType: 'CONFIRM_SHARE',
        observations: 'EXTERNAL_API'
    }

    return await validations.validate({
        body, validationDic, MODELS, model, defaultDic });
}




