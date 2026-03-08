export default async ({ MODELS }) => {

    const resolutionObjs = await MODELS.resolutions.findAll();

    const resolutions =
        resolutionObjs.map(resolutionObj => resolutionObj.toJSON());

    return { body: resolutions };
}
