import get from './get/index.js'
import post from './post/index.js'
import patchStatus from './patchStatus/index.js'
import model from './model.js'

export default {
    name: 'sharedCases',
    model,
    endpoints: {
        get,
        post,
        patchStatus,
    }
};
