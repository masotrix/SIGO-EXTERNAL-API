import postFileDecryptToken from './postFileDecryptToken/handler.js';
import postFileEncryptToken from './postFileEncryptToken/handler.js';

export default {
    name: 'kms',
    endpoints: {
        postFileEncryptToken,
        postFileDecryptToken,
        //'postProjectGrantToken',
    }
};
