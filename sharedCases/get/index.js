export default async ({ MODELS }) => {

    const sharedCaseObjs = await MODELS.sharedCases.findAll();

    const sharedCases = sharedCaseObjs.map(
        sharedCaseObj => sharedCaseObj.toJSON());

    return { body: sharedCases };
}
