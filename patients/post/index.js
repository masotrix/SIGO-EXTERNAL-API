/* Dudas: {
 *  trackCode: Seguimos poniendo 9?
 * }
 */

import { randomUUID } from 'crypto';

import {
    sexMap,
    documentTypeMap,
    healthInsuranceMap
} from './validate.js';
import validate from './validate.js';

import communeMap from '../../communeMap.js'
import regionMap from '../../regionMap.js'
import provinceMap from '../../provinceMap.js'
import nationalityMap from '../../nationalityMap.js'

export default async ({ body, MODELS }) => {

    const validation = await validate({
        body, MODELS, model: 'patients' });

    if (validation) {
        return { status: 400, body: validation };
    }

    const newPatientMap = {
        id: randomUUID(), trackCode: '9',
        documentTypeCode: documentTypeMap[body.documentType],
        biologicalSexCode: sexMap[body.biologicalSex],
        forecastCode: healthInsuranceMap[body.healthInsurance],

        communeCode: body.commune ? communeMap[body.commune] : null,
        provinceCode: body.province ? provinceMap[body.province] : null,
        regionCode: body.region ? regionMap[body.region] : null,
        nationalityCode:
            body.nationality ? nationalityMap[body.nationality] : null,

        ...body
    }

    const newPatient = await MODELS.patients.create(newPatientMap);

    return {
        body: newPatient.toJSON()
    };
}
