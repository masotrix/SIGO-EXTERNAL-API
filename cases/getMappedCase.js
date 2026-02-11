import { randomUUID } from 'crypto';

const getClinicalStatus = (oldHistoricStage, oldRegister) => {
    if (oldRegister.closureTypeId === 3) return 'REFUTED';

    const mapping = {
        'Sospecha': 'SUSPECTED',
        'SOSPECHA': 'SUSPECTED',
        'Confirmación': 'CONFIRMED',
        'DIAGNÓSTICO': 'CONFIRMED',
        'Confirmación diagnóstica': 'CONFIRMED',
        'Confirmación Diagnóstica': 'CONFIRMED',
        'Tratamiento': 'CONFIRMED',
        'TRATAMIENTO': 'CONFIRMED',
        'Seguimiento': 'CONFIRMED',
        'SEGUIMIENTO': 'CONFIRMED',
    };

    return mapping[oldHistoricStage.stage.name];
}

const getAdministrativeStatus = (oldHistoricStage, oldRegister) => {
    if (oldRegister.closureTypeId === 3) return 'CASE_CLOSED';

    const mapping = {
        'Sospecha': 'DIAGNOSIS',
        'SOSPECHA': 'DIAGNOSIS',
        'Confirmación': 'STAGING',
        'DIAGNÓSTICO': 'STAGING',
        'Confirmación diagnóstica': 'STAGING',
        'Confirmación Diagnóstica': 'STAGING',
        'Tratamiento': 'TREATMENT',
        'TRATAMIENTO': 'TREATMENT',
        'Seguimiento': 'SURVEILLANCE',
        'SEGUIMIENTO': 'SURVEILLANCE',
    };

    return mapping[oldHistoricStage.stage.name];
}

const getStatus = oldRegister => {
    if (!oldRegister.closureType) return 'OPEN';

    const mapping = {
        1: 'CLOSED',
        2: 'CLOSED',
        3: 'CLOSED',
    };

    return mapping[oldRegister.closureType.id];
}

const getDiagnosticDate = (oldHistoricStage, oldRegister) => {
    const clinicalStatus = getClinicalStatus(oldHistoricStage, oldRegister);

    if (clinicalStatus==='CONFIRMED') return oldHistoricStage.dateStage;

    return null;
}

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

const getPatologyCode = oldPatology => {
    if (!oldPatology.code) return oldPatology.name;

    return oldPatology.code;
}

const getLateraly = oldRegister => {
    return oldRegister.diagnosticConfirm
        ?.diagnosticConfirmSolids?.[0]
        ?.laterality
        ?.name
}

const getMappedCase = (oldRegister, newPatient) => {

    const oldHistoricStage = getLatestHistoricStage(oldRegister);

    return {
        id: randomUUID(),

        organizationId: newPatient.organizationId,
        // No es redundante, no esta en patient ?

        patientId: newPatient.id,

        laterality: getLateraly(oldRegister),

        clinicalStatus: getClinicalStatus(oldHistoricStage, oldRegister),

        administrativeStatus: getAdministrativeStatus(
            oldHistoricStage, oldRegister),

        patologyCode: getPatologyCode(oldRegister.patology),

        diagnosisDate: getDiagnosticDate(oldHistoricStage, oldRegister),

        status: getStatus(oldRegister),

        createdAt: oldRegister.createdAt,
    };
};

export default getMappedCase;
