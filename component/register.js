const handleRegister = (req, res, db, bcrypt) => {
	const {email, name, password} =req.body;
	if (!email ||!name ||!password){
		res.status(400).json('incorrect to submit!')
	}
	const hash = bcrypt.hashSync(password);
	db.transaction ( trx => {
		trx.insert ({
			hash : hash,
			email: email
			})
		.into ('login')
		.transacting(trx)
		.returning ('email', 'id')
		.then((loginEmail, loginId) => {
			return trx('users')
				.returning('*')
				.insert({
					id : loginId,
					email: loginEmail[0],
					name: name,
					joined: new Date()
				})
				.then(user => {
					res.json(user[0]);
				})
			 })
			 .then(trx.commit)
			 .catch(trx.rollback)
		})
    .catch(err => res.status(400).json('unable to register'))
};

module.exports = {handleRegister};