import validate from './validate.js';

export default async ({ body, MODELS }) => {

    const validation = await validate({
        body, MODELS, model: 'patients' });

    if (validation) {
        return { status: 400, body: validation };
    }

    const thePatientObj = await MODELS.patients.findOne({
        where: { id : body.id } });

    await thePatientObj.update(body);

    const thePatient = thePatientObj.toJSON();


    return { body: thePatient };
}
