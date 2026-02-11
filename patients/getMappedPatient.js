import { randomUUID } from 'crypto';

const isValidDate = (date) => {
  const d = new Date(date);
  return d instanceof Date && !isNaN(d);
};

const getBornDate = oldPatient => {
    if (isValidDate(oldPatient.birthDate)) return oldPatient.birthDate;

    else return null;
}

const getMappedPatient = (oldOncologyPatient, newOrganizationsMap) => {

    const oldPatient = oldOncologyPatient.patient;

    const mappedPatient = {
        id: randomUUID(),

        //organizationId: oldPatient.organization.id,
        organizationId: newOrganizationsMap[
            oldOncologyPatient.organization.deisCode],
            //oldPatient.organization.deisCode],

        documentNumber: oldPatient.identifierValue,

        //documentTypeCode: oldPatient.identifierType,
        documentTypeCode: oldPatient.documentType?.code ?
            oldPatient.documentType.code :
            {'RUN':'1','RUT':'1','rut':'1','passport':'4',
              'Número de Identificador FONASA':'6'}
            [oldPatient.identifierType],

        names: oldPatient.givenName,
        lastName: oldPatient.fatherFamilyName,
        secondLastName: oldPatient.motherFamilyName,
        socialName: oldPatient.socialName,
        bornDate: getBornDate(oldPatient),
        isDeceased: oldPatient.isDeceased ?
            oldPatient.isDeceased : false,
        

        // ADHOC CODES
        biologicalSexCode: oldPatient.biologicalSex?.code,
        //biologicalSexCode: '1',
        genderCode: oldPatient.genderIdentity?.code,
        //genderCode: '1',
        nationalityCode: oldPatient.nationality?.numeric,
        //nationalityCode: '148',
        regionCode: oldPatient.region?.code,
        //regionCode: '13',
        communeCode: oldPatient.commune?.code,
        //communeCode: '1101',
        provinceCode: oldPatient.province?.code,
        //provinceCode: '11',
        forecastCode: oldPatient.prevision?.code,
        //forecastCode: '1',


        trackCode: '9',
        //countryCode, // ?
        address: oldPatient.address, // ?? !!! (incluye numero)

        addressNumber: oldPatient.address, // *** (todo junto)

        //addressNumber: oldPatient.address, // ??
        //addressInfo, // ??
        phoneNumber: oldPatient.phone, // "" *** (puede ser "")
        //phoneNumber2, // ??
        email: oldPatient.email,
        spFullName: oldOncologyPatient.contactName,
        spPhoneNumber: oldOncologyPatient.contactPhone,
        spEmail: oldOncologyPatient.contactEmail,
        //ecogStage, // ??
    };

    //newPatientsMap[oldPatient.id] = newPatient.id;

    //console.log(newPatient.id, 'created');

    return mappedPatient;
};

export default getMappedPatient;
