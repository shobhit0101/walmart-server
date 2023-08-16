const nodemailer = require('nodemailer');

const headers = `
<head>
	<style>
		* {
			box-sizing: border-box;
			margin: 0px;
		}

		.container {
			display: flex;
			min-height: 100vh;
			/* justify-content: center; */
		}

		.card {
			width: 40%;
			height: 5%;
			display: flex;
			flex-direction: row;
			border: 2px solid black;
			border-radius: 10px;
		}

		.middle {
			flex-grow: 3;
			display: flex;
			flex-direction:column;
			margin-top: 1rem;
			font-size: 25px;
		}

		.end {
			margin-top: 1.2rem;
			flex-grow: 1;
		}

		.price {
			font-size: 18px;
			font-weight: bold;
		}

		.quant {
			font-size: 18px;
			font-style: italic;
		}
		
		a {
			text-decoration: none;
			color: black;
		}
	</style>
</head>
`;

const listItem = (img, name, description, price, quantity, link) => `
			<li style="width:inherit ;margin: 0px;padding-inline-start: 0px;">
			<a href=${link}>
				<div class="card">
					<img class="img"
						src="${img}"
						alt="">
					<div class="middle">
						<div class="title">${name}</div>
						<div class="description">${description}</div>
					</div>
					<div class="end">
						<div class="price">${price}</div>
						<div class="quant">${quantity}</div>
					</div>
				</div>
				</a>
			</li>`

function getHtml(data) {
	let items = '';
	data.forEach(item => {
		items += listItem(...item);
	});
	return `<html>${headers}<body><div class="container"><ul style="list-style-type:none">${items}</ul></div></body></html>`;;
}

exports.sendMail = async (mail, cartItems) => {
	const mailServer = nodemailer.createTransport({
		service: "gmail",
		host: 'smtp.gmail.com',
		secure: true,
		auth: {
			user: process.env.MAIL_ID,
			pass: process.env.MAIL_PASSWORD,
		},
	});
	const mailOptions = {
		from: process.env.MAIL_ID,
		to: mail,
		subject: "You Order has been placed",
		html: getHtml(cartItems)
	}
	mailServer.sendMail(mailOptions, (err, info) => {
		if (err) {
			console.log(err);
		} else {
			console.log(info);
		}
	});
}

