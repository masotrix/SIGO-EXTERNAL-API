export default async ({ MODELS }) => {

    const patientObjs = await MODELS.patients.findAll();

    const patients = patientObjs.map(patientObj => patientObj.toJSON());

    return { body: patients };
}
