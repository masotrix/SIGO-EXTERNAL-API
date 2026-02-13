import validate from './validate.js';

export default async ({ body, MODELS, MODULES }) => {

    const validation = await validate({
        body, MODELS, model: 'mandatoryNotifications' });

    if (validation) {
        return { status: 400, body: validation };
    }

    const newMandatoryNotificationObj =
        await MODELS.mandatoryNotifications.create(body);
    const newMandatoryNotification =
        newMandatoryNotificationObj.toJSON()

    const associatedCaseObj = await MODELS.cases.findOne({
        where: { id: newMandatoryNotification.caseId } });
    const associatedCase = associatedCaseObj.toJSON();

    const newHistory = await MODULES.history.postMandatoryNotification({
        patientId: associatedCase.patientId,
        caseId: newMandatoryNotification.caseId,
        originOrganizationId: newMandatoryNotification.organizationId,
    });

    //console.log('newHistory', newHistory);

    return { body: newMandatoryNotification };
}
