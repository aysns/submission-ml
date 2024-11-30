const crypto = require('crypto');
const saveResult = require('../storeData');
const predictImage = require('../controller/predictController');
 
async function prediction(request, h) {
	try {
		const { image } = request.payload;

		const { model } = request.server.app;
		
		const { isValid, label, suggestion } = await predictImage(model, image);
		const id = crypto.randomUUID(); 
		const createdAt = new Date().toISOString();
		
		const data = {
			"id": id,
			"result": label,
			"suggestion": suggestion,
			"createdAt": createdAt
		}
		
		if(isValid){
			await saveResult(id, label, suggestion, createdAt);
			return h.response({
				status: 'success',
				message: 'Model is predicted successfully',
				data
			}).code(201);
		}

		return h.response({
			status: 'fail',
			message: 'Terjadi kesalahan dalam melakukan prediksi',
		}).code(400);
	} catch (error) {
		console.error(error);
		return h.response({
			status: 'fail',
			message: error.message,
		}).code(500);
	}
}
 
module.exports = prediction;