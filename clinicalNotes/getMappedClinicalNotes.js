import { randomUUID } from 'crypto';

const getLatestHistoricStage = oldRegister => {

    let maxDate = null;
    let maxHistoricStage = null;

    for (const historic of oldRegister.historics) {
        for (const historicStage of historic.historicStages) {

            //const curDate = new Date(historicStage.dateStage);
            const curDate = new Date(historicStage.createdAt);

            if (maxDate===null || curDate > maxDate) {
                maxDate = curDate;
                maxHistoricStage = historicStage;
            }
        }
    }

    //console.log('max historic stage', maxHistoricStage?.stage?.name);
    return maxHistoricStage;
}

const getMappedClinicalNotes = (newCase, oldRegister) => {

    const oldHistoricStage = getLatestHistoricStage(oldRegister);

    return {
        id: randomUUID(),

        caseId: newCase.id,

        //userId: newUser.id,

        content: oldHistoricStage.observations,

        createdAt: oldHistoricStage.createdAt,

        updatedAt: oldHistoricStage.createdAt,

        status: 'ACTIVE',
    };
};

export default getMappedClinicalNotes;
