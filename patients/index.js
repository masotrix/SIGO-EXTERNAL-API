import get from './get/index.js'
import post from './post/index.js'
import patchData from './patchData/index.js'
import patchContact from './patchContact/index.js'
import patchSignificantPerson from './patchSignificantPerson/index.js'
import model from './model.js';

export default {
    name: 'patients',
    model,
    endpoints: {
        get,
        patchData,
        patchContact,
        patchSignificantPerson,
        post,
    },
};
