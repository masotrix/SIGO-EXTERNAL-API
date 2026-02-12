import { randomUUID } from 'crypto';

//const getMappedMigrationHistory = (newPatient, newCase, newUser) => {
const getMappedMigrationHistory = (newPatient, newCase) => {

    return {
        id: randomUUID(),

        eventType: 'MIGRATE_CASE',

        //userId: newUser.id,

        patientId: newPatient.id,

        caseId: newCase.id,

        targetOrganizationId: newPatient.organizationId,
    };
};

export default getMappedMigrationHistory;
