import { randomUUID } from 'crypto';

import * as validations from '../../validations.js';

const lateralityV = [
    'Derecha',
    'Izquierda',
    'Bilateral',
    'No corresponde',
    'Desconocido',
];

export default async ({ body, MODELS, model }) => {

    const validationDic = {
        id: async (field, body) => await validations.exists({
                field, body, MODELS, model: 'cases' }),

        laterality:
            (field, body) => validations.categorical({
                    field, body, categories: lateralityV }),
    };

    const defaultDic = {
        //id: randomUUID(),
    }

    return await validations.validate({
        body, validationDic, MODELS, model, defaultDic });
}
