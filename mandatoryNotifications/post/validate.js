import { randomUUID } from 'crypto';

import * as validations from '../../validations.js';

import { inverseSexMap } from '../../patients/post/validate.js'

import topo from './topo.js';
import { morpho, inverseMorpho } from './morpho.js';

const extensionV = [
    'In situ',
    'Localizado',
    'Regional',
    'Metástasis',
    'Desconocido',
]

const behaviorMap = {
    'Maligno, incierto si es primario o metastásico / 9': '9',
    'Maligno, sitio metastásico / 6': '6',
    'Maligno / 3': '3',
    'Benigno / 0': '0',
    'In situ / 2': '2',
    'Incierto / 1': '1',
}

const differentiationGradeV = [
    'Bien diferenciado',
    'Moderadamente diferenciado',
    'Poco diferenciado',
    'Anaplásico',
    'No determinado / No procede',
]

const stagingPrefixMap = {
    'Clínica': 1,
    'Patologica': 2,
    'Neoadyuvancia': 3,
    'Desconocido': 4
}

const tV = ['T0', 'T1', 'T2', 'T3', 'T4', 'TX', 'Tis']
const nV = ['N0', 'N1', 'N2', 'N3', 'NX', 'Nis']
const mV = ['M0', 'M1', 'M2', 'MX']

const morphologyDescriptionValidation = (field, body) => {

    const morphoCodeErrors = validations.categorical({
        field: 'morphologyCode', body,
        categories: Object.keys(morpho) });
    if (morphoCodeErrors) return false;

    const morphoGeneralTextErrors =
        validations.categorical({ field, body,
            categories: Object.values(morpho).flat() });

    if (!morphoGeneralTextErrors) {

        const morphoTextErrors =
            validations.categorical({ field, body,
                categories: Object.values(
                    morpho[body['morphologyCode']]) });

        if (!morphoTextErrors) { return false; }

        console.log('check', `'${body[field]}'`,
            morpho[body['morphologyCode']]);

        return {
            [field]: `Descripción morfológica '${body[field]}' `+
                `tiene código morfológico asociado `+
                `'${inverseMorpho[body[field]]}', `+
                `pero el código morfológico entregado es `+
                `'${body['morphologyCode']}'.`
        };
    };

    const initialSuggestions =
        validations.getFuzzyExamples({ field, body, categories:
            Object.values(morpho[body['morphologyCode']]) });
    const textInitialSuggestions = initialSuggestions.map(r => r[0]);

    const rawSecondarySuggestions = morpho[body['morphologyCode']];

    const textSecondarySuggestions = []
    for (let suggestion of rawSecondarySuggestions) {
        if (!textInitialSuggestions.includes(suggestion)) {
            textSecondarySuggestions.push(suggestion);
        }
    }

    const rawExtraSuggestions = validations.getFuzzyExamples({
        field, body, categories: Object.values(morpho).flat() });

    const extraSuggestions = []
    for (let suggestion of rawExtraSuggestions) {
        if (!textInitialSuggestions.includes(suggestion[0]) &&
            !textSecondarySuggestions.includes(suggestion[0])) {

            extraSuggestions.push(suggestion);
        }
    }

    let finalSuggestions = '', suggIdx=1;
    for (let suggestion of initialSuggestions) {
        finalSuggestions +=
            `${suggIdx}: `+
            `'${suggestion[0]}' (código `+
            `'${inverseMorpho[suggestion[0]]}', `+
            `similitud ${suggestion[1]}%)\n`;
        ++suggIdx;
    }

    for (let suggestion of extraSuggestions) {
        finalSuggestions +=
            `${suggIdx}: `+
            `'${suggestion[0]}' (código `+
            `'${inverseMorpho[suggestion[0]]}', `+
            `similitud ${suggestion[1]}%)\n`;
        ++suggIdx;
    }

    for (let suggestion of textSecondarySuggestions) {
        finalSuggestions +=
            `${suggIdx}: `+
            `'${suggestion}' (código `+
            `'${inverseMorpho[suggestion]}')\n`;
        ++suggIdx;
    }

    return { [field]: `Descripción morfológica '${body[field]}' `+
        `no existe para código morfológico `+
        `'${body['morphologyCode']}'. `+
        `Descripciones lexicográficamente similares: \n` +
        finalSuggestions };
}


export default async ({ body, MODELS, model }) => {

    const validationDic = {
        organizationId:
            async (field, body) => await validations.exists({
                field, body, MODELS, model: 'organizations' }),

        caseId:
            async (field, body) => await validations.exists({
                field, body, MODELS, model: 'cases' }),

        topographyCode:
            (field, body) => validations.categorical({
                field, body, categories: Object.keys(topo) }),

        topographyDescription:
            (field, body) => validations.categorical({
                field, body, categories: Object.values(topo) }),

        morphologyCode:
            (field, body) => validations.categorical({ field, body,
                categories: Object.keys(morpho) }),

        morphologyDescription: morphologyDescriptionValidation,

        behavior:
            (field, body) => validations.categorical({
                field, body, categories: Object.keys(behaviorMap) }),

        differentiationGrade:
            (field, body) => validations.categorical({ field, body,
                categories: differentiationGradeV }),

        extension:
            (field, body) => validations.optional({ body },
                validations.categorical({ field, body,
                    categories: extensionV })),

        stagingPrefix:
            (field, body) => validations.optional({ body },
                validations.categorical({ field, body,
                    categories: Object.keys(stagingPrefixMap) })),

        t: (field, body) => validations.optional({ body },
                validations.categorical({ field, body,
                    categories: tV })),

        n: (field, body) => validations.optional({ body },
                validations.categorical({
                    field, body, categories: nV })),

        m: (field, body) => validations.optional({ body },
                validations.categorical({
                    field, body, categories: mV })),

        sampleCollectionDate:
            (field, body) => validations.optional({ body },
                validations.date({ field, body })),

        resultDate:
            (field, body) => validations.date({ field, body }),

        notifierName:
            (field, body) => validations.optional({ body },
                validations.string({ field, body })),

        notifierDocumentNumber: 
            async (field, body) => await validations.rut({ field, body,
                MODELS, model: 'users', checkExistence: false }),

    };

    const defaultDic = {
        id: randomUUID(),
        topographyGroup: body?.topographyCode?.split('.')[0],
        morphology: body?.morphologyCode,
        diagnosticBasis: 'SOLID_TUMOR',
        examType: 'BIOPSY',
    }

    return await validations.validate({
        body, validationDic, MODELS, model, defaultDic });
}




