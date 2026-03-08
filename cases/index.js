import get from './get/index.js'
import post from './post/index.js'
import patchClose from './patchClose/index.js';
import patchDelete from './patchDelete/index.js'
import patchPathology from './patchPathology/index.js'
import patchLaterality from './patchLaterality/index.js'
import patchDiagnosisDate from './patchDiagnosisDate/index.js'
import patchClinicalStatus from './patchClinicalStatus/index.js'
import patchAdministrativeStatus
    from './patchAdministrativeStatus/index.js'
import model from './model.js'

export default {
    name: 'cases',
    model,
    endpoints: {
        get,
        post,
        patchClose,
        patchDelete,
        patchPathology,
        patchLaterality,
        patchDiagnosisDate,
        patchClinicalStatus,
        patchAdministrativeStatus,
    }
};
