import postEmail from './postEmail/handler.js';
import postSharedFile from './postSharedFile/handler.js';

export default {
    name: 'ses',
    endpoints: {
        postEmail,
        postSharedFile,
    }
};
