import { randomUUID } from 'crypto';

import * as validations from '../../validations.js';

const statusV = [
    'PENDING',
    'CONFIRMED',
    'REJECTED',
];

export default async ({ body, MODELS, model }) => {

    const validationDic = {

        organizationId:
            async (field, body) => await validations.exists({
                field, body, MODELS, model: 'organizations' }),

        caseId:
            async (field, body) => await validations.exists({
                field, body, MODELS, model: 'cases' }),

        originOrganizationId:
            async (field, body) => await validations.exists({
                field, body, MODELS, model: 'organizations' }),

        status:
            (field, body) => validations.optional({ body },
                validations.categorical({
                    field, body, categories: statusV })),
    };

    const defaultDic = { id: randomUUID() }

    return await validations.validate({
        body, validationDic, MODELS, model, defaultDic });
}
