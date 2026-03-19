import requests, sys
import uuid

from rut import rut_sin_dv, calcular_dv

#domain = 'http://localhost:8080';
domain = 'https://external.api-sigo-qa.minsal.cl';
#domain = 'http://50.18.20.221:8888';

def query(url):
    response = requests.get(url)
    data = response.json()
    return data;

model = 'organizations'
url = f"{domain}/{model}/get"
organizations = query(url);
print('organizations', organizations);

sys.exit();


print('Organizacion cargada...');

model = 'organizations'
url = f"{domain}/{model}/post"
payload = {
    "name": f"TestOrg2 {uuid.uuid4()}",
    "description": "Org2 needed for testing",
    "region": "De Tarapacá",
    "comuna": "Iquique",
    "healthcareService": "Servicio de Salud Metropolitano Sur",
    "organizationType": "Hospital",
    "deisCode": "54321",
}
organization2 = query(url, payload);
#print(organization);
print('Organizacion2 cargada...');

model = 'patients'
url = f"{domain}/{model}/post"
random_rut_sin_dv = str(rut_sin_dv());
random_rut_dv = calcular_dv(random_rut_sin_dv);
rut = str(random_rut_sin_dv) + '-' + str(random_rut_dv);
payload = {
    "organizationId": organization['id'],
    "documentNumber": rut,
    "documentType": "RUT",
    "names": "TestPatient",
    "lastName": "BeingTested",
    "secondLastName": "",
    "socialName": "",
    "bornDate": "1993-04-07",
    "isDeceased": "",
    "biologicalSex": "HOMBRE",
    "region": "De Tarapacá",
    #"region": "De Arica y Parinacota",
    "commune": "Iquique",
    "province": "Iquique",
    #"province": "Tamarugal",
    "nationality": "Chile",
    "healthInsurance": "FONASA",
    "address": "",
    "addressNumber": "",
    "phoneNumber": "",
    "email": "",
    "spFullName": "",
    "spPhoneNumber": "",
    "spEmail": "",
}
patient = query(url, payload);
print('Paciente cargado...');
#print(patient);

model = 'patients'
url = f"{domain}/{model}/patchData"
payload = {
    "id": patient['id'],
    "names": "TestPatientRename",
    "lastName": "BeingTestedRename",
    "secondLastName": "GivenWhenRenamed",
    "socialName": "SocialNameGivenWhenRenamed",
    "bornDate": '1993-04-08',
    "isDeceased": False,
    "biologicalSex": "HOMBRE",
    "region": "De Antofagasta",
    "commune": "Camiña",
    "province": "Copiapó",
    "nationality": "Afganistán",
    "healthInsurance": 'ISAPRE',
    "address": "TestAddressRename",
    "addressNumber": "TestAddressNumberRename",
}
case = query(url, payload, method='patch');
#print(case);
print('Datos de paciente actualizados...');

model = 'patients'
url = f"{domain}/{model}/patchContact"
payload = {
    "id": patient['id'],
    "phoneNumber": '+56999999999',
    "email": "a@b.c",
}
case = query(url, payload, method='patch');
#print(case);
print('Contacto de paciente actualizado...');

model = 'patients'
url = f"{domain}/{model}/patchSignificantPerson"
payload = {
    "id": patient['id'],
    "spFullName": 'TestSignificantPersonRename',
    "spPhoneNumber": '+56988888888',
    "spEmail": 'sp@b.c',
}
case = query(url, payload, method='patch');
#print(case);
print('Persona significativa de paciente actualizada...');

#sys.exit();

model = 'cases'
url = f"{domain}/{model}/post"
payload = {
    "organizationId": organization['id'],
    "patientId": patient['id'],
    "laterality": "Derecha",
    "clinicalStatus": "CONFIRMED",
    "administrativeStatus": "DIAGNOSIS",
    "patologyCode": "C501",
    "patologyText": "Tumor maligno de la porción central de la mama",
    "diagnosisDate": "2025-02-12",
    "status": ""
}
case = query(url, payload);
#print(case);
print('Caso cargada...');

model = 'cases'
url = f"{domain}/{model}/patchClose"
payload = {
    "id": case['id'],
}
case = query(url, payload, method='patch');
#print(case);
print('Caso editado...');

model = 'cases'
url = f"{domain}/{model}/patchDelete"
payload = {
    "id": case['id'],
}
case = query(url, payload, method='patch');
#print(case);
print('Caso eliminado...');

model = 'cases'
url = f"{domain}/{model}/patchPathology"
payload = {
    "id": case['id'],
    "patologyCode": 'C020',
    "patologyText": 'Tumor maligno de la cara dorsal de la lengua',
}
case = query(url, payload, method='patch');
#print(case);
print('Caso editado en patologia...');

model = 'cases'
url = f"{domain}/{model}/patchLaterality"
payload = {
    "id": case['id'],
    "laterality": 'Izquierda',
}
case = query(url, payload, method='patch');
#print(case);
print('Caso editado en lateralidad...');

model = 'cases'
url = f"{domain}/{model}/patchDiagnosisDate"
payload = {
    "id": case['id'],
    "diagnosisDate": '2025-02-13',
}
case = query(url, payload, method='patch');
#print(case);
print('Caso editado en diagnosisDate...');

model = 'cases'
url = f"{domain}/{model}/patchClinicalStatus"
payload = {
    "id": case['id'],
    "clinicalStatus": 'REFUTED',
}
case = query(url, payload, method='patch');
#print(case);
print('Caso editado en patologia...');

model = 'cases'
url = f"{domain}/{model}/patchAdministrativeStatus"
payload = {
    "id": case['id'],
    "administrativeStatus": 'STAGING',
}
case = query(url, payload, method='patch');
#print(case);
print('Caso editado en lateralidad...');


model = 'clinicalNotes'
url = f"{domain}/{model}/post"
payload = {
    "caseId": case['id'],
    "content": "Test content",
}
clinicalNote = query(url, payload);
#print(clinicalNote);
print('Nota clinica cargada...');

model = 'clinicalNotes'
url = f"{domain}/{model}/patchContent"
payload = {
    "id": clinicalNote['id'],
    "content": "Test2 content",
}
clinicalNote = query(url, payload, method='patch');
#print(clinicalNote);
print('Nota clinica editada...');

model = 'clinicalNotes'
url = f"{domain}/{model}/patchDelete"
payload = {
    "id": clinicalNote['id'],
}
clinicalNote = query(url, payload, method='patch');
#print(clinicalNote);
print('Nota clinica eliminada (desactivada)...');

model = 'sharedCases'
url = f"{domain}/{model}/post"
payload = {
    "organizationId": organization2['id'],
    "caseId": case['id'],
    "originOrganizationId": organization['id'],
}
sharedCase = query(url, payload);
#print(sharedCase);
print('Caso compartido cargado...');

model = 'sharedCases'
url = f"{domain}/{model}/patchStatus"
payload = {
    "id": sharedCase['id'],
    "status": 'REJECTED',
    #"organizationId": organization['id'],
    "organizationId": organization2['id'],
}
sharedCase = query(url, payload, method='patch');
#print(sharedCase);
print('Caso compartido rechazado...');

model = 'sharedCases'
url = f"{domain}/{model}/post"
payload = {
    "organizationId": organization2['id'],
    "caseId": case['id'],
    "originOrganizationId": organization['id'],
}
sharedCase = query(url, payload);
#print(sharedCase);
print('Caso2 compartido cargado...');

model = 'sharedCases'
url = f"{domain}/{model}/patchStatus"
payload = {
    "id": sharedCase['id'],
    "status": 'CONFIRMED',
    #"organizationId": organization['id'],
    "organizationId": organization2['id'],
}
sharedCase = query(url, payload, method='patch');
#print(sharedCase);
print('Caso2 compartido confirmada...');

#sys.exit();

model = 'tasks'
url = f"{domain}/{model}/postExam"
payload = {
    "caseId": case['id'],
    "startDate": '2026-02-12',
    "reminderDaysBefore": 1,
    "dueDate": '2026-02-12',
    "status": 'COMPLETED',
    "comments": '',
}
tareaExamen = query(url, payload);
#print(tareaExamen);
print('Tarea Exámen cargada...');

model = 'mandatoryNotifications'
url = f"{domain}/{model}/post"
random_rut_sin_dv = str(rut_sin_dv());
random_rut_dv = calcular_dv(random_rut_sin_dv);
rut = str(random_rut_sin_dv) + '-' + str(random_rut_dv);
payload = {
    "organizationId": organization['id'],
    "caseId": case['id'],
    "topographyCode": 'C00.0',
    "topographyDescription": 'Labio superior, cara externa',
    "morphologyCode": '8000/0',
    "morphologyDescription": 'Tumor benigno',
    "behavior": 'Benigno / 0',
    "differentiationGrade": 'Bien diferenciado',
    "extension": '',
    #"stagingPrefix": 'Patológica',
    "stagingPrefix": 'Patologica',
    "t": 'T1',
    "m": 'M1',
    "n": 'N1',
    "sampleCollectionDate": '2026-02-12',
    "resultDate": '2026-02-12',
    "notifierName": '',
    "notifierDocumentNumber": rut,
}
mandatoryNotification = query(url, payload);
#print(tareaExamen);
print('Notificación obligatoria cargada...');

model = 'resolutions'
url = f"{domain}/{model}/post"
payload = {
    "caseId": case['id'],
    "resolutionId": '1221',
    "comiteDate": '2025-09-01',
}
tareaExamen = query(url, payload);
#print(tareaExamen);
print('Resolución cargada...');










