import validate from './validate.js';

export default async ({ body, MODELS, MODULES }) => {

    const validation = await validate({
        body, MODELS, model: 'cases' });

    if (validation) {
        return { status: 400, body: validation };
    }

    const theCaseObj = await MODELS.cases.findOne({
        where: { id: body.id } });

    let theCase = theCaseObj.toJSON()
    const previousValue =
        new Date(theCase.diagnosisDate).toISOString().split("T")[0];

    await theCaseObj.update({ diagnosisDate: body.diagnosisDate });

    theCase = theCaseObj.toJSON()

    //console.log('theCase', theCase);

    const newHistory = await MODULES.history.postEditCaseDiagnosisDate({
        patientId: theCase.patientId,
        caseId: theCase.id,
        originOrganizationId: theCase.organizationId,
        previousValue,
        newValue: body.diagnosisDate,
    });

    if (newHistory.status === 400) {
        return { status: 400, body: newHistory.body };
    }

    //console.log('newHistory', newHistory);

    return { body: theCase };
}
