import validate from './validate.js';

export default async ({ body, MODELS }) => {

    const validation = await validate({
        body, MODELS, model: 'patients' });

    if (validation) {
        return { status: 400, body: validation };
    }

    const newPatient = await MODELS.patients.create(body);

    return { body: newPatient.toJSON() };
}
