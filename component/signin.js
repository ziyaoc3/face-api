

const handleSignIn = (req, res, db, bcrypt)=> {
	const {password, email} = req.body;
	if (!email || !password) {
	    return res.status(400).json('incorrect form submission');
	}
	db('login').where ({email : email}).select('secret', 'email')
		.then(data => {
			const isValid = bcrypt.compareSync(password, data[0].secret);
			if (isValid){
			db('users').where({ email: email})
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

module.exports = {handleSignIn : handleSignIn};
