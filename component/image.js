const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'c40d63db0c6a4f6997a7605b19cc5693'
});

const handleApp = (req, res) => {
	app.models.initModel({id: Clarifai.FACE_DETECT_MODEL})
			.then(faceModel =>  faceModel.predict (req.body.input))
			.then (data => res.json(data))
			.catch(err => res.status (400).json('unable to get image'))
};
	 
const handleImage = (req, res,db)=> {
	const {id } =req.body;
	db('users')
		.where('id', '=', id)
		.increment('entries' , 1)
		.returning ('entries')
		.then (entry => res.json(entry[0]))
		.catch (err => res.status (400).json('unable to get ENTRIES'))
	
};

module.exports = {handleImage: handleImage, handleApp: handleApp};