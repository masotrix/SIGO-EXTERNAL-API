import validate from './validate.js';

export default async ({ body, MODELS, MODULES }) => {

    const validation = await validate({
        body, MODELS, model: 'cases' });

    if (validation) {
        return { status: 400, body: validation };
    }

    const newResolutionObj = await MODELS.resolutions.create(body);
    const newResolution = newResolutionObj.toJSON()

    const theCaseObj = await MODELS.cases.findOne({
        where: { id: body.caseId } });

    const theCase = theCaseObj.toJSON();

    const newHistory = await MODULES.history.postResolution({
        patientId: theCase.patientId,
        caseId: newResolution.caseId,
        originOrganizationId: theCase.organizationId,
    });

    if (newHistory.status === 400) {
        return { status: 400, body: newHistory.body };
    }

    return { body: newResolution };
}
