import { randomUUID } from 'crypto';

import * as validations from '../../validations.js';

export default async ({ body, MODELS, model }) => {

    const validationDic = {
        id: async (field, body) => await validations.exists({
                field, body, MODELS, model: 'patients' }),

        spFullName:
            (field, body) => validations.optional({ field, body },
                validations.string({ field, body })),

        spPhoneNumber:
            (field, body) => validations.optional({ field, body },
                validations.string({ field, body })),

        spEmail:
            (field, body) => validations.optional({ field, body },
                validations.email({ field, body })),
    };

    const defaultDic = {
    }

    return await validations.validate({
        body, validationDic, MODELS, model, defaultDic });
}
