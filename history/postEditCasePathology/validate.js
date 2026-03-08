import { randomUUID } from 'crypto';

import * as validations from '../../validations.js';

import cieTexts from '../../cases/post/cieTexts.js';

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
                MODELS, categories: Object.keys(cieTexts) }),

        newValue:
            (field, body) => validations.categorical({ field, body,
                MODELS, categories: Object.keys(cieTexts) }),

        /*
        observations:
            (field, body) => validations.optional({ field, body },
                validations.string({ field, body })),
        */
    };

    const defaultDic = {
        id: randomUUID(),
        eventType: 'EDIT_PATHOLOGY',
        observations: 'EXTERNAL_API',
    }

    return await validations.validate({
        body, validationDic, MODELS, model, defaultDic });
}




