export default async (oldPatient, newModels, newOrganizationsMap) => {
    if (!oldPatient.patient) {
        return `Paciente oncologico sin paciente real asociado (patient=${oldPatient.patient})`;
    }

    if (!oldPatient.organization) {
        return `Paciente oncologico sin organization (organization=${oldPatient.organization})`;
    }

    if (!(oldPatient.organization.deisCode in newOrganizationsMap)) {
        return `Organizacion de paciente oncologico no presente en nueva base (deisCode=${oldPatient.organization.deisCode})`;
    }

    const previousPatient = await newModels.Patient.findOne({ where: {
        documentNumber: oldPatient.patient.identifierValue } });

    if (previousPatient) {
        return `Paciente con el mismo identificador ya presente en plataforma`;
    }

    if (!oldPatient.registers.length) {
        return `Paciente sin casos`;
    }
}
