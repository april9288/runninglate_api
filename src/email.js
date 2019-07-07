const sg = require('@sendgrid/mail')
sg.setApiKey(process.env.SENDGRID_API_KEY)

const lateEmail = async (user, emailFrom, emailTo, situation) => {

	let modifiedSituation
	if (situation === "traffic") {
		modifiedSituation = "stuck in heavy traffic"
	} else if (situation === "accident") {
		modifiedSituation = "into a car accident"
	} else if (situation === "hurricane") {
		modifiedSituation = "stuck in hurricane"
	} else if (situation === "police") {
		modifiedSituation = "pulled over by the police"
	}

	let sg_response = await sg.send({
		to: emailTo,
		from: emailFrom,
		subject: "Sorry. I'm running late because...",
		text: `Hello. This is ${user}. I'm so sorry. I'm on my way in now, but I got ${modifiedSituation}. My apologies again. It shouldn’t be much longer. \n Thank you. \n ${emailFrom} \n ${user}` 
	})
	return sg_response
}

module.exports = lateEmail
