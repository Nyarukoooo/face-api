const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '30ac5f95f0924943a5fc228f12ccb448'
});

const handleApiCall = (req, res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
			  .then(data => {
			  	res.json(data);
			  })
			  .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
	const {id} = req.body;
	return db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	}).catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage,
	handleApiCall
}
