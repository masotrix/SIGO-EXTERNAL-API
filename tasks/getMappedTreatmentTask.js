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

    //console.log('register treatment name:', oldRegisterTreatment.treatment);

    return mapping[oldRegisterTreatment.treatment.id];
}

const getStatus = oldRegisterTreatment => {
    const mapping = {
        1: 'PENDING',
        2: 'IN_PROGRESS',
        3: 'COMPLETED',
    };

    //console.log('registertreatment state', oldRegisterTreatment);

    return mapping[oldRegisterTreatment.state];
}

const getResponsibleOrganization = (newOrganizationsIdMap,
    oldRegisterTreatment) => {

    let dynamicFields = oldRegisterTreatment.dynamicFields;
    if (typeof dynamicFields === 'string') {
	dynamicFields = JSON.parse(dynamicFields);
    }

    return newOrganizationsIdMap[dynamicFields.executionPlace];
}

//const getMappedTreatmentTask = (newCase, newResolution,
const getMappedTreatmentTask = (newCase,
    newOrganizationsIdMap, oldRegisterTreatment) => {

    let dynamicFields = oldRegisterTreatment.dynamicFields;
    if (typeof dynamicFields === 'string') {
	dynamicFields = JSON.parse(dynamicFields);
    }

    return {
        id: randomUUID(),

        caseId: newCase.id,

        name: getName(oldRegisterTreatment),

        administrativeStatus: 'TREATMENT',

        startDate: oldRegisterTreatment.dateTreatment,

        //dueDate: ,
        //reminderDayBefore: ,
        
        status: getStatus(oldRegisterTreatment),

        //label: ,
        
        comments: dynamicFields.observations,

        responsibleOrganizationId: getResponsibleOrganization(
            newOrganizationsIdMap, oldRegisterTreatment),

        //resolutionId: newResolution.id,
    };
};

export default getMappedTreatmentTask;
