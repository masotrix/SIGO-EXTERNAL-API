import { randomUUID } from 'crypto';

const getLatestHistoricStage = oldRegister => {

    let maxDate = null;
    let maxHistoricStage = null;

    for (const historic of oldRegister.historics) {
        for (const historicStage of historic.historicStages) {

            const curDate = new Date(historicStage.dateStage);

            if (maxDate===null || curDate > maxDate) {
                maxDate = curDate;
                maxHistoricStage = historicStage;
            }
        }
    }

    //console.log('max historic stage', maxHistoricStage?.stage?.name);
    return maxHistoricStage;
}

const getMappedSharedCase = (newPatient,
    newCase, newOrganizationsIdMap, oldRegister, oldOrganizationSubscription) => {

    const oldHistoricStage = getLatestHistoricStage(oldRegister);

    return {
        id: randomUUID(),

        caseId: newCase.id,

        organizationId: newOrganizationsIdMap[
            oldOrganizationSubscription.id],
           // oldOrganizationSubscription.organizationId],

        originOrganizationId: newPatient.organizationId,

        //reason: '<reason>',

        //createdBy: '<createdBy>',

        status: 'CONFIRMED',
    };
};

export default getMappedSharedCase;
