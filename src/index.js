const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')
const lateEmail = require('./email')
const user = require('./userMock')

const port = process.env.PORT

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res)=>{
	res.send("hello!")
})

app.post('/register', async (req,res)=> {
	let handle = req.query.handle
	let email = req.query.email

	try{
		let githubResponse = await axios({
			method: 'GET',
			url: `https://api.github.com/users/${handle}`,
			headers: {"Accept": "application/vnd.github.v3+json"}
		})

		let user = {
			name: githubResponse.data.name,
			handle: handle,
			profile: githubResponse.data.avatar_url,
			email: email
			}

		res.status(200).send({status: 200, user})
	}catch(e){
		res.status(200).send({status: 400, user})
	}
})

app.post('/email', async (req,res)=> {
	let userEmail = req.body.chosenUser.email
	let userName = req.body.chosenUser.name
	let userSituation = req.body.situation
	try {
		lateEmail(userEmail,userName,userSituation)
		res.status(200).send({status: 200, message:"success"})
	} catch(e) {
		res.status(200).send({status: 400, message:"fail"})
	}
})

app.listen(port, ()=>{
	console.log("Server is up on port ", port)
})