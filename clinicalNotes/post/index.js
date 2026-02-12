import validate from './validate.js';

export default async ({ body, MODELS }) => {

    const validation = await validate({
        body, MODELS, model: 'clinicalNotes' });

    if (validation) {
        return { status: 400, body: validation };
    }

    const newClinicalNote = await MODELS.clinicalNotes.create(body);

    return { body: newClinicalNote.toJSON() };
}
