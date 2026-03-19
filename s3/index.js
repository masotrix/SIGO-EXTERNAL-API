import getSignedGetURL from './getSignedGetURL/handler.js';
import getSignedPutURL from './getSignedPutURL/handler.js';
import get from './get/handler.js';
/*
import postFile from './postFile/handler.js';
import getSignedPostURL from './getSignedPostURL/handler.js';
*/

export default {
    name: 's3',
    endpoints: {
        'getSignedGetURL:fileName': getSignedGetURL,
        'getSignedPutURL:fileName': getSignedPutURL,
        get,
        //'postFile': postFile,
        //'getSignedPostURL': getSignedPostURL,
    }
};
