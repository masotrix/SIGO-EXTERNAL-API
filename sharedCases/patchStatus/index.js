import validate from './validate.js';

export default async ({ body, MODELS, MODULES }) => {

    const validation = await validate({ body, MODELS,
        model: 'sharedCases' });

    if (validation) {
        return { status: 400, body: validation };
    }

    const theSharedCaseObj = await MODELS.sharedCases.findOne({
        where: { id: body.id }});

    let theSharedCase = theSharedCaseObj.toJSON()
    const previousValue = theSharedCase.status;

    await theSharedCaseObj.update({
        status: body.status,
    });

    theSharedCase = theSharedCaseObj.toJSON()

    const associatedCaseObj = await MODELS.cases.findOne({
        where: { id: theSharedCase.caseId }});

    const associatedCase = associatedCaseObj.toJSON();

    //console.log('theSharedCase', theSharedCase);

    const newHistory = await MODULES.history.postConfirmSharedCase({
        patientId: associatedCase.patientId,
        caseId: associatedCase.id,
        originOrganizationId: theSharedCase.originOrganizationId,
        targetOrganizationId: theSharedCase.organizationId,
        previousValue,
        newValue: theSharedCase.status,
    });

    if (newHistory.status===400) {
        return { status: 400, body: newHistory.status };
    }

    //console.log('newHistory', newHistory);

    return { body: theSharedCase };
}



















