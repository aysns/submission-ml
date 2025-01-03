const tf = require('@tensorflow/tfjs-node');
require('dotenv').config();

async function loadModel() {
    try {
        return await tf.loadGraphModel(process.env.MODEL_URL);
 
    } catch (error) {
        console.error('Error loading model:', error);
        throw error;
    }
}
 
module.exports = loadModel;