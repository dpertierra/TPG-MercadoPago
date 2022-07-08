require("dotenv").config();
// Step 7

const mercadoPago = require("mercadopago");
const credential = process.env.ACCESS_TOKEN;
let server = process.env.SERVER;
const feedback = `${server}/checkout/feedback`;
// const failure =
// const pending =

const mp = async (items, installments, shipping) => {
	try {
		// Magic
		mercadoPago.configure({
			accessToken: credential,
		});
		let config = {
			items: items,
			back_urls: {
				success: feedback,
				failure: feedback,
				pending: feedback,
			},
			payment_methods: {
				installments: installments,
			},
			auto_return: "approved",
			shipments: {
				cost: shipping,
				mode: "not_specified",
			},
		};
        
		return await mercadoPago.preferences.create(config);
	} catch (error) {
		throw new Error(error);
	}
};
module.exports = mp;
