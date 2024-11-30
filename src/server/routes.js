const prediction = require('../handler/predictHandler');
const history  = require('../handler/historyHandler');
 
const routes = [
	{
		path: '/predict',
		method: 'POST',
		handler: prediction,
		options: {
			payload: {
				allow: 'multipart/form-data',
				maxBytes: 1000000,
				multipart: true
			}
		}
	},
	{
		path: '/predict/histories',
		method: 'GET',
		handler: history,
	}
]
 
module.exports = routes;