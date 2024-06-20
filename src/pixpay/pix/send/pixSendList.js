const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
	inicio: '2023-01-22T16:01:35Z',
	fim: '2023-11-30T20:10:00Z',
}

const efipay = new EfiPay(options)

efipay.pixSendList(params)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
