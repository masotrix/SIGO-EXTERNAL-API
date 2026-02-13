import get from './get/index.js'
import postCase from './postCase/index.js'
import postSharedCase from './postSharedCase/index.js'
import postMandatoryNotification
    from './postMandatoryNotification/index.js'
import model from './model.js'

export default {
    name: 'history',
    model,
    endpoints: {
        get,
        postCase,
        postSharedCase,
        postMandatoryNotification,
    }
};
