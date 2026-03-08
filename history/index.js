import get from './get/index.js'
import postCase from './postCase/index.js'
import postCloseCase from './postCloseCase/index.js'
import postDeleteCase from './postDeleteCase/index.js'
import postEditCasePathology from './postEditCasePathology/index.js'
import postEditCaseLaterality from './postEditCaseLaterality/index.js'
import postEditCaseDiagnosisDate
    from './postEditCaseDiagnosisDate/index.js'
import postUpdateCaseClinicalStatus
    from './postUpdateCaseClinicalStatus/index.js'
import postUpdateCaseAdministrativeStatus
    from './postUpdateCaseAdministrativeStatus/index.js'
import postSharedCase from './postSharedCase/index.js'
import postConfirmSharedCase from './postConfirmSharedCase/index.js'
import postClinicalNote from './postClinicalNote/index.js'
import postEditClinicalNote from './postEditClinicalNote/index.js'
import postDeleteClinicalNote from './postDeleteClinicalNote/index.js'
import postMandatoryNotification
    from './postMandatoryNotification/index.js'
import postResolution from './postResolution/index.js';

import model from './model.js'

export default {
    name: 'history',
    model,
    endpoints: {
        get,
        postCase,
        postCloseCase,
        postDeleteCase,
        postSharedCase,
        postConfirmSharedCase,
        postEditCasePathology,
        postEditCaseLaterality,
        postEditCaseDiagnosisDate,
        postUpdateCaseClinicalStatus,
        postUpdateCaseAdministrativeStatus,
        postClinicalNote,
        postEditClinicalNote,
        postDeleteClinicalNote,
        postMandatoryNotification,
        postResolution,
    }
};


















