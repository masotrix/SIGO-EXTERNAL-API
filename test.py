import requests, sys
import uuid

from rut import rut_sin_dv, calcular_dv

domain = 'http://localhost:8080';

def query(url, payload):
    headers = { "Content-Type": "application/json" }
    response = requests.post(url, json=payload, headers=headers)
    if response.status_code != 201:
        print("Error en consulta:", response.status_code)
        sys.exit()
    data = response.json()
    return data;

model = 'organizations'
url = f"{domain}/{model}/post"
payload = {
    "name": f"TestOrg {uuid.uuid4()}",
    "description": "Org needed for testing",
    "region": "De Tarapacá",
    "comuna": "Iquique",
    "healthcareService": "Servicio de Salud Metropolitano Sur",
    "organizationType": "Hospital",
    "deisCode": "12345"
}
organization = query(url, payload);
#print(organization);
print('Organizacion cargada...');

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
    "commune": "Iquique",
    "province": "Iquique",
    "nationality": "Chile",
    "healthInsurance": "FONASA",
    "address": "",
    "addressNumber": "",
    "phoneNumber": "",
    "email": "",
    "spFullName": "",
    "spPhoneNumber": "",
    "spEmail": ""
}
patient = query(url, payload);
print('Paciente cargado...');
#print(patient);


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


model = 'clinicalNotes'
url = f"{domain}/{model}/post"
payload = {
    "caseId": case['id'],
    "content": "Test content",
    "status": '',
}
clinicalNote = query(url, payload);
#print(clinicalNote);
print('Nota clinica cargada...');

model = 'sharedCases'
url = f"{domain}/{model}/post"
payload = {
    "organizationId": organization['id'],
    "caseId": case['id'],
    "originOrganizationId": organization['id'],
    "status": '',
}
sharedCase = query(url, payload);
#print(sharedCase);
print('Caso compartido cargado...');

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
    "stagingPrefix": 'Patológica',
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











