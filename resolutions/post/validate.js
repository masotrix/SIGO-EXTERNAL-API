import { randomUUID } from 'crypto';

import * as validations from '../../validations.js';

export default async ({ body, MODELS, model }) => {

    const validationDic = {
        caseId:
            async (field, body) => await validations.exists({
                field, body, MODELS, model: 'cases' }),

        resolutionId:
            (field, body) => validations.string({ field, body }),

        comiteDate: (field, body) => validations.date({ field, body }),
    };

    const defaultDic = {
        id: randomUUID(),
    }

    return await validations.validate({
        body, validationDic, MODELS, model, defaultDic });
}
