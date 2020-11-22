

const handleSignIn = (req, res, db, bcrypt)=> {
	const {password} = req.body;
	db('login').where ({email : req.body.email}).select('hash', 'email')
		.then(data => {
			const isValid = bcrypt.compareSync(password, data[0].hash);
			if (isValid){
			db('users').where({ email: req.body.email})
				.then (user => {
					res.json(user[0]) })
				.catch(err => console.log ('err1'))
			} else{
				res.status(400).json('invalid user or password')
			}
		})
		.catch (err => {
			res.status(400).json('invalid user or password')
		})
	
};

module.exports = {handleSignIn};
