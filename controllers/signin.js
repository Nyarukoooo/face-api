//const  handleSignin = (req, res) => (bcrypt, db) => {
const handleSignin = (req, res, bcrypt, db) => {
	const {email, password} = req.body;
	if(!email || !password){
	return res.status(400).json('incorrect form submission');
	}
	db.select('email', 'hash').from('login')
	  .where('email', '=', email)
	  .then(data => { //这里的data就是col-email（和req里相同的email）和hash
	  	const isValid = bcrypt.compareSync(password, data[0].hash);
	  	if (isValid) {
	  		return db.select('*').from('users')
	  		  .where('email', '=', email)
	  		  .then(user => {
	  		  	res.json(user[0]);
	  		  }).catch(err => {
				res.status(400).json('unable to get user')})
	  }else {
	  	return res.status(400).json('wrong password');
	  }
	}).catch(err =>{
	  	res.status(400).json('wrong credentials')
	  })
}

module.exports = {
	handleSignin: handleSignin
}