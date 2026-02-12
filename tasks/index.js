import get from './get/index.js'
import postExam from './postExam/index.js'
import model from './model.js'

export default {
    name: 'tasks',
    model,
    endpoints: {
        get,
        postExam,
    }
};
