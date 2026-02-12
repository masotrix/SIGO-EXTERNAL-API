import { randomUUID } from 'crypto';

const getName = oldRegisterTreatment => {
    const mapping = {
        1: 'Cirugía',
        2: 'Tratamiento Sistémico - Quimioterapia',
        3: 'Tratamiento Localizado - Radioterapia',
        4: 'Tratamiento Sistémico - Terapia Dirigida',
        5: 'Tratamiento Sistémico - Inmunoterapia',
        6: 'Trasplante de progenitores hematopoyéticos (TPH)',
        7: 'Tratamiento Sistémico - Terapia Hormonal',
        8: 'Derivar a Cuidados Paliativos',
        9: 'Tratamiento Sistémico - Radioisótopos',
        10: 'Tratamiento Localizado - Braquiterapia',
        11: 'Radioyodoterapia',
    };

    //console.log('register treatment sess name:', oldRegisterTreatment.treatment)

    return mapping[oldRegisterTreatment.treatment.id];
}

const getStatus = oldSession => {
    const mapping = {
        '1': 'PENDING',
        '2': 'IN_PROGRESS',
        '3': 'COMPLETED',
        '-1': 'PENDING',
    };

    //console.log('session', oldSession);

    return mapping[oldSession.fieldState];
}

const getLabel = oldSession => {
    return `Sesión ${oldSession.fieldSessionNumber}`;
}

const getResponsibleOrganization = (newOrganizationsIdMap, oldRegisterTreatment) => {

    const dynamicFields = oldRegisterTreatment.dynamicFields;
    if (typeof dynamicFields === 'string') {
	dynamicFields = JSON.parse(dynamicFields)
    }

    return newOrganizationsIdMap[dynamicFields.executionPlace];
}

//const getMappedTreatmentSessionTask = (newCase, newResolution,
const getMappedTreatmentSessionTask = (newCase,
    newOrganizationsIdMap, oldRegisterTreatment, oldSession) => {

    return {
        id: randomUUID(),

        caseId: newCase.id,

        name: getName(oldRegisterTreatment),

        administrativeStatus: 'TREATMENT',

        startDate: oldSession.fieldDate,

        //dueDate: ,
        //reminderDayBefore: ,
        
        status: getStatus(oldSession),

        label: getLabel(oldSession),
        
        comments: oldSession.fieldObservations,

        responsibleOrganizationId: getResponsibleOrganization(
            newOrganizationsIdMap, oldRegisterTreatment),

        //resolutionId: newResolution.id,
    };
};

export default getMappedTreatmentSessionTask;
