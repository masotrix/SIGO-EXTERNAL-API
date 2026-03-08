import { randomUUID } from 'crypto';

import * as validations from '../../validations.js';

import { inverseSexMap } from '../../patients/post/validate.js'

import cieSexes from './cieSexes.js';
import cieTexts from './cieTexts.js';

const patologyCodeValidation = async ({ field, body, MODELS }) => {

    const categoryError = validations.categorical({
            field, body, categories: Object.keys(cieSexes) })

    if (categoryError) return categoryError;

    const notExistsPatient = await validations.exists({
        field: 'patientId', body, MODELS, model: 'patients' });

    if (notExistsPatient) {
        return { [field]: `Paciente con id='${body.patientId}' `+
            `no existe en base de datos` }
    };

    const patientObj = await MODELS.patients.findOne({
        where: { id: body.patientId } });

    const sex = inverseSexMap[patientObj.toJSON().biologicalSexCode];
    const value = body[field]

    if (cieSexes[value]!=='AMBOS' && sex !== cieSexes[value]) {
        return { [field]: `Sexo de paciente: '${sex}',` +
            ` sexo de patología "${value}": '${cieSexes[value]}'` };
    }

    const text = body.patologyText;

    if (text !== cieTexts[value]) {
        return { [field]: `Texto de patología "${value}" `+
            `recibido: '${text}', `+
            `texto asociado en base de datos: '${cieTexts[value]}'` };

    }

    return false;
}

export default async ({ body, MODELS, model }) => {

    const validationDic = {
        id:
            async (field, body) => await validations.exists({
                field, body, MODELS, model: 'cases' }),

        patientId:
            async (field, body) => await validations.exists({
                field, body, MODELS, model: 'patients' }),

        patologyCode:
            async (field, body) =>
                await patologyCodeValidation({ field, body, MODELS }),

        patologyText:
            (field, body) => validations.categorical({ field, body,
                categories: Object.values(cieTexts) }),
    };

    const defaultDic = {
        //id: randomUUID(),
    }

    return await validations.validate({
        body, validationDic, MODELS, model, defaultDic });
}
