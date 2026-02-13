import validate from './validate.js';

export default async ({ body, MODELS, MODULES }) => {

    const validation = await validate({
        body, MODELS, model: 'sharedCases' });

    if (validation) {
        return { status: 400, body: validation };
    }

    const newSharedCaseObj = await MODELS.sharedCases.create(body);
    const newSharedCase = newSharedCaseObj.toJSON();

    const associatedCaseObj = await MODELS.cases.findOne({
        where: { id: newSharedCase.caseId } });
    const associatedCase = associatedCaseObj.toJSON();

    const newHistory = await MODULES.history.postSharedCase({
        patientId: associatedCase.patientId,
        caseId: newSharedCase.caseId,
        originOrganizationId: newSharedCase.originOrganizationId,
        targetOrganizationId: newSharedCase.organizationId,
    });

    return { body: newSharedCase };
}
