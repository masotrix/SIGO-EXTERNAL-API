import get from './get/index.js'
import post from './post/index.js'
import model from './model.js';

export default {
    name: 'organizations',
    model,
    endpoints: {
        get,
        post
    }
};
