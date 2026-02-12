import { randomUUID } from 'crypto';

import * as validations from '../../validations.js';

const statusV = [
    'ACTIVE',
    'INACTIVE',
];

export default async ({ body, MODELS, model }) => {

    const validationDic = {
        caseId:
            async (field, body) => await validations.exists({
                field, body, MODELS, model: 'cases' }),

        content:
            (field, body) => validations.string({ field, body }),

        status:
            (field, body) => validations.optional({ body },
                validations.categorical({
                    field, body, categories: statusV })),
    };

    const defaultDic = {
        id: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    return await validations.validate({
        body, validationDic, MODELS, model, defaultDic });
}
