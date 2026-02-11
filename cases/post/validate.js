import * as validations from '../../validations.js';

import { sexMap } from '../patients/post/valid.js'

import cieSexes from './cieSexes.js';
import cieTexts from './cieTexts.js';

const clinicalStatusV = ['SUSPECTED', 'REFUTED', 'CONFIRMED'];
const administrativeStatusV = [
    'CASE_CLOSED',
    'DIAGNOSIS',
    'STAGING',
    'TREATMENT',
    'SURVEILLANCE',
];
const lateralityV = [
    'Derecha',
    'Izquierda',
    'Bilateral',
    'No corresponde',
    'Desconocido',
];
const statusV = [
    'OPEN',
    'CLOSED',
    'DELETED',
];

const patologyCodeValidation = async ({ field, value, body }) => {

    const categoryError = validations.categorical({
            field, value, categories: Object.keys(cieSexes) })

    if (categoryError) return categoryError;

    const notExistsPatient = await validations.exists({
        field: 'patientId', value: body.patientId,
        MODESL, model: 'patients' });

    if (notExistsPatient) return false;

    const patientObj = await MODELS.patients.findOne({
        where: { id: body.patientId });

    const sex = sexMap[patientObj.toJSON().biologicalSexCode];

    if (sex !== cieSexes[value]) {
        return { [field]: `Sexo de paciente: '${sex}',` +
            ` sexo de patología "${value}": '${cieSexes[value]}'` };
    }

    const text = body.patologyText;

    if (text !== cieTexts[value]) {
        return { [field]: `Texto de patología "${value}" `+
            `recibido: '${text}', `+
            `texto asociado en base de datos: '${cieTexts[value]}'` };

    }
}

export default async ({ body, MODELS }) => {

    const validate = {
        organizationId:
            (field, value) => await validations.exists({
                field, value, MODELS, model: 'organizations' }),

        patientId:
            (field, value) => await validations.exists({
                field, value, MODELS, model: 'patients' }),

        laterality:
            (field, value) => validations.optional({ value },
                validations.categorical({
                    field, value, categories: lateralityV })),

        clinicalStatus:
            (field, value) => validations.categorical({
                field, value, categories: clinicalStatusV }),

        administrativeStatus:
            (field, value) => validations.categorical({
                field, value, categories: administrativeStatusV }),

        patologyCode:
            (field, value) => await patologyCodeValidation({
                field, value, body }),

        diagnostisDate:
            (field, value) => validations.categorical({
                field, value, categories: cieSexes }),

        status:
            (field, value) => validations.optional({ value },
                validations.categorical({
                    field, value, categories: statusV })),
    };

    const errors = [];

    for (let k in body) {
        if (!(k in validate)) {
            errors.push(
                { [k]: `Campo ${k} inválido. `+
                    `Campos válidos: ${Object.keys(validate)}` });
            continue;
        }

        const error = validate[k](k, body[k]);
        if (error) errors.push(error);
    }

    if (errors.length) return errors;
    return null;
}
