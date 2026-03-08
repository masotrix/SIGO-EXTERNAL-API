import validate from './validate.js';

export default async ({ body, MODELS, MODULES }) => {

    const validation = await validate({
        body, MODELS, model: 'cases' });

    if (validation) {
        return { status: 400, body: validation };
    }

    const theCaseObj = await MODELS.cases.findOne({
        where: { id: body.id }});

    await theCaseObj.update({
        status: body.status,
    });

    const theCase = theCaseObj.toJSON()

    //console.log('theCase', theCase, body.status);

    const newHistory = await MODULES.history.postDeleteCase({
        patientId: theCase.patientId,
        caseId: theCase.id,
        originOrganizationId: theCase.organizationId,
    });

    if (newHistory.status === 400) {
        return { status: 400, body: newHistory.body };
    }

    //console.log('newHistory', newHistory)

    return { body: theCase };
}
