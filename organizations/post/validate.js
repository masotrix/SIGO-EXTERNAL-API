import { randomUUID } from 'crypto';

import * as validations from '../../validations.js';
import communeMap from '../../communeMap.js';
import provinceMap from '../../provinceMap.js';
import regionMap from '../../regionMap.js';
import nationalityMap from '../../nationalityMap.js';
import healthcareServices from './healthcareServices.js';

const organizationTypeMap = {
  'HOSPITAL TERCIARIO': '1',
  '[DELETED]': '2',
  'Hospital': '3',
}

export default async ({ body, MODELS, model }) => {

    const validationDic = {

        name:
            async (field, body) => { return await validations.unique({
                field, body, MODELS, model }) },

        description:
            (field, body) => validations.string({ field, body }),

        region:
            (field, body) => validations.categorical({ field, body,
                categories: Object.keys(regionMap) }),

        comuna:
            (field, body) => validations.categorical({ field, body,
                categories: Object.keys(communeMap) }),

        organizationType:
            (field, body) => validations.categorical({ field, body,
                    categories: Object.keys(organizationTypeMap) }),

        healthcareService:
            (field, body) => validations.categorical({ field, body,
                categories: healthcareServices }),

        deisCode:
            (field, body) => validations.string({ field, body }),
    };

    const defaultDic = { id: randomUUID(), };

    return await validations.validate({
        body, validationDic, MODELS, model, defaultDic });
}
