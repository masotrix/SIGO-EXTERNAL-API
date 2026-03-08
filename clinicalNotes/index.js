import get from './get/index.js'
import post from './post/index.js'
import patchContent from './patchContent/index.js';
import patchDelete from './patchDelete/index.js';
import model from './model.js'

export default {
    name: 'clinicalNotes',
    model,
    endpoints: {
        get,
        post,
        patchContent,
        patchDelete,
    }
};
