import { randomUUID } from 'crypto';

import * as validations from '../../validations.js';

export default async ({ body, MODELS, model }) => {

    const validationDic = {
        id: async (field, body) => await validations.exists({
                field, body, MODELS, model: 'clinicalNotes' }),
    };

    const defaultDic = {
        //id: randomUUID(),
        status: 'INACTIVE',
    }

    return await validations.validate({
        body, validationDic, MODELS, model, defaultDic });
}
