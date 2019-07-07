const express = require('express')
const app = express()
const cors = require('cors')
const lateEmail = require('./email')

const port = process.env.PORT

app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>{
	res.send("Hi. This is Running Late server!")
})

app.post('/email', async (req,res)=> {
	let { user, emailFrom, emailTo, situation } = req.body
	try {
		let sg_response = await lateEmail( user, emailFrom, emailTo, situation )
		if (sg_response[0].statusCode === 202) {
			res.status(200).send({status: sg_response[0].statusCode, message: "success"})
		} else {
			res.status(200).send({status: sg_response[0].statusCode, message:"fail"})
		}
	} catch(e) {
		res.status(200).send({status: 400, message:"fail"})
	}
})

app.listen(port, ()=>{
	console.log("Server is up on port ", port)
})