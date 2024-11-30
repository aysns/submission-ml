const tf = require('@tensorflow/tfjs-node');
 
async function predictImage(model, image) {
  try{
    let tensor = tf.node.decodeImage(image);
	
    if (tensor.shape[2] === 1)
    	tensor = tf.repeat(tensor, 3, -1); 

    tensor = tensor.resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat()
  
    const prediction = await model.predict(tensor).data();

    const label = prediction[0] > 0.5 ? 'Cancer' : 'Non-cancer';
  
    let suggestion;
    if (label === 'Cancer')
       suggestion = "Segera periksa ke dokter!"
    if (label === 'Non-cancer')
       suggestion = "Penyakit kanker tidak terdeteksi."

    return { isValid: true, label, suggestion };
  }
  catch (error) {
    console.error('Prediction error:', error);
		
		return {
			isValid: false,
			status: 'fail',
			message: 'Terjadi kesalahan saat memprediksi model.',
		};
	}
}
 
module.exports = predictImage;