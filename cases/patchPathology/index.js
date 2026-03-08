import validate from './validate.js';

export default async ({ body, MODELS, MODULES }) => {

    const theCaseObj = await MODELS.cases.findOne({
        where: { id: body.id } });

    let theCase = theCaseObj.toJSON()
    body.patientId = theCase.patientId;
    const previousValue = theCase.patologyCode;

    const validation = await validate({
        body, MODELS, model: 'cases' });

    if (validation) {
        return { status: 400, body: validation };
    }

    await theCaseObj.update({ patologyCode: body.patologyCode });

    theCase = theCaseObj.toJSON()

    console.log('theCase', theCase, previousValue, theCase.patologyCode);

    const newHistory = await MODULES.history.postEditCasePathology({
        patientId: theCase.patientId,
        caseId: theCase.id,
        originOrganizationId: theCase.organizationId,
        previousValue,
        newValue: theCase.patologyCode,
    });

    if (newHistory.status === 400) {
        return { status: 400, body: newHistory.body };
    }

    //console.log('newHistory', newHistory);

    return { body: theCase };
}
