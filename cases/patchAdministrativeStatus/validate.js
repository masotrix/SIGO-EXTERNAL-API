import { randomUUID } from 'crypto';

import * as validations from '../../validations.js';

export const administrativeStatusV = [
    'DIAGNOSIS',
    'STAGING',
    'TREATMENT',
    'SURVEILLANCE',
];

export default async ({ body, MODELS, model }) => {

    const validationDic = {
        id: async (field, body) => await validations.exists({
                field, body, MODELS, model: 'cases' }),

        administrativeStatus:
            (field, body) => validations.categorical({
                    field, body, categories: administrativeStatusV }),
    };

    const defaultDic = {
        //id: randomUUID(),
    }

    return await validations.validate({
        body, validationDic, MODELS, model, defaultDic });
}
