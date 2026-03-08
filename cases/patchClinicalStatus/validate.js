import { randomUUID } from 'crypto';

import * as validations from '../../validations.js';

const clinicalStatusV = ['SUSPECTED', 'REFUTED', 'CONFIRMED'];

export default async ({ body, MODELS, model }) => {

    const validationDic = {
        id: async (field, body) => await validations.exists({
                field, body, MODELS, model: 'cases' }),

        clinicalStatus:
            (field, body) => validations.categorical({
                    field, body, categories: clinicalStatusV }),
    };

    const defaultDic = {
        //id: randomUUID(),
    }

    return await validations.validate({
        body, validationDic, MODELS, model, defaultDic });
}
