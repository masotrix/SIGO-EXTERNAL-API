import validate from './validate.js';

export default async ({ body, MODELS, MODULES }) => {

    const validation = await validate({
        body, MODELS, model: 'cases' });

    if (validation) {
        return { status: 400, body: validation };
    }

    const newCaseObj = await MODELS.cases.create(body);
    const newCase = newCaseObj.toJSON()

    const newHistory = await MODULES.history.postCase({
        patientId: newCase.patientId,
        caseId: newCase.id,
        originOrganizationId: newCase.organizationId,
    });

    return { body: newCase };
}
