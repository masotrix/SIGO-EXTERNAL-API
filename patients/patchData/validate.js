import { randomUUID } from 'crypto';

import * as validations from '../../validations.js';
import communeMap from '../../communeMap.js';
import provinceMap from '../../provinceMap.js';
import regionMap from '../../regionMap.js';
import nationalityMap from '../../nationalityMap.js';

export const sexMap = {
    'HOMBRE': '1',
    'MUJER': '2',
    'INTERSEXUAL': '3',
    'NO INFORMADO': '93',
    'DESCONOCIDO': '99',
};

export const inverseSexMap = Object.fromEntries(
  Object.entries(sexMap).map(([key, value]) => [value, key])
);

export const documentTypeMap = {
    'RUT': '1',
    'RUT PROGENITOR/A': '2',
    'FOLIO COMPROBANTE DE PARTO': '3',
    'PASAPORTE': '4',
    'IDENTIFICADOR DOCUMENTO PAIS DE ORIGEN': '5',
    'IDENTIFICADOR FONASA': '6',
};

export const healthInsuranceMap = {
  'FONASA': '1',
  'ISAPRE': '2',
  'CAPREDENA': '3',
  'DIPRECA': '4',
  'SISA': '5',
  'NINGUNA': '6',
  'DESCONOCIDO': '96',
};

export default async ({ body, MODELS, model }) => {

    const validationDic = {
        /*
        documentType:
            (field, body) => validations.optional({ field, body },
                validations.categorical({ field, body,
                    categories: Object.keys(documentTypeMap) })),

        documentNumber:
            async (field, body) => validations.optional({ field, body },
                await validations.rut({
                    field, body, MODELS, model })),
        */

        id: async (field, body) => await validations.exists({
                field, body, MODELS, model: 'patients' }),

        names:
            (field, body) => validations.optional({ field, body },
                validations.string({ field, body })),

        lastName:
            (field, body) => validations.optional({ field, body },
                validations.string({ field, body })),

        secondLastName:
            (field, body) => validations.optional({ field, body },
                validations.string({ field, body })),

        socialName:
            (field, body) => validations.optional({ field, body },
                validations.string({ field, body })),

        bornDate:
            (field, body) => validations.optional({ field, body },
                validations.date({ field, body })),

        isDeceased:
            (field, body) => validations.optional({ field, body },
                validations.bool({ field, body })),

        biologicalSex:
            (field, body) => validations.optional({ field, body },
                validations.categorical({ field, body,
                    categories: Object.keys(sexMap) })),

        //genderCode:

        region:
            (field, body) => validations.optional({ field, body },
                validations.categorical({ field, body,
                    categories: Object.keys(regionMap) })),

        commune:
            (field, body) => validations.optional({ field, body },
                validations.categorical({ field, body,
                    categories: Object.keys(communeMap) })),

        province:
            (field, body) => validations.optional({ field, body },
                validations.categorical({ field, body,
                    categories: Object.keys(provinceMap) })),

        nationality:
            (field, body) => validations.optional({ field, body },
                validations.categorical({ field, body,
                    categories: Object.keys(nationalityMap) })),

        //forecastCode:
        healthInsurance:
            (field, body) => validations.optional({ field, body },
                validations.categorical({ field, body,
                    categories: Object.keys(healthInsuranceMap) })),

        address:
            (field, body) => validations.optional({ field, body },
                validations.string({ field, body })),

        addressNumber:
            (field, body) => validations.optional({ field, body },
                validations.string({ field, body })),

        /*
        //trackCode:

        phoneNumber:
            (field, body) => validations.optional({ field, body },
                validations.string({ field, body })),

        email:
            (field, body) => validations.optional({ field, body },
                validations.email({ field, body })),

        */
        /*
        spFullName:
            (field, body) => validations.optional({ field, body },
                validations.string({ field, body })),

        spPhoneNumber:
            (field, body) => validations.optional({ field, body },
                validations.string({ field, body })),

        spEmail:
            (field, body) => validations.optional({ field, body },
                validations.email({ field, body })),
        */
    };

    const defaultDic = {


        //documentTypeCode: body?.documentType ?
        //    documentTypeMap[body.documentType] : undefined,

        //documentNumber: body?.documentNumber ?
        //    body.documentNumber : undefined,

        names: body?.names ?
            body.names : undefined,

        lastName:body?.lastName ?
            body.lastName : undefined,

        secondLastName: body?.secondLastName ?
            body.secondLastName : undefined,

        socialName: body?.socialName ?
            body.socialName : undefined,

        bornDate: body?.bornDate ?
            body.bornDate : undefined,

        isDeceased: body?.isDeceased ?
            body.isDedeaced : undefined,

        biologicalSexCode: body?.biologicalSex ?
            sexMap[body.biologicalSex] : undefined,

        communeCode: body?.commune ?
            communeMap[body.commune] : undefined,

        provinceCode: body?.province ?
            provinceMap[body.province] : undefined,

        regionCode: body?.region ? regionMap[body.region] : undefined,

        nationalityCode:
            body?.nationality ?
                nationalityMap[body.nationality] : undefined,

        forecastCode: body?.healthInsurance ?
            healthInsuranceMap[body.healthInsurance] : undefined,

        //trackCode: '9',
    }

    return await validations.validate({
        body, validationDic, MODELS, model, defaultDic });
}
