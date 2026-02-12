export default async ({ MODELS }) => {

    const caseObjs = await MODELS.cases.findAll();

    const cases = caseObjs.map(caseObj => caseObj.toJSON());

    return { body: cases };
}
