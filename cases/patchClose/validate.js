import * as validations from '../../validations.js';

export default async ({ body, MODELS, model }) => {

    const validationDic = {
        id: async (field, body) => await validations.exists({
                field, body, MODELS, model: 'cases' }),
    };

    const defaultDic = {
        administrativeStatus: 'CASE_CLOSED',
        status: 'CLOSED',
    }

    return await validations.validate({
        body, validationDic, MODELS, model, defaultDic });
}
