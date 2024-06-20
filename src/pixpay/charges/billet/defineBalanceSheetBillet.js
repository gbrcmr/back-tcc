const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
	id: 0,
}

let body = {
	title: 'Balancete Demonstrativo',
	body: [
		{
			header: 'Demonstrativo de Consumo',
			tables: [
				{
					rows: [
						[
							{
								align: 'left',
								color: '#000000',
								style: 'bold',
								text: 'Exemplo de despesa',
								colspan: 2,
							},
							{
								align: 'left',
								color: '#000000',
								style: 'bold',
								text: 'Total lançado',
								colspan: 2,
							},
						],
						[
							{
								align: 'left',
								color: '#000000',
								style: 'normal',
								text: 'Instalação',
								colspan: 2,
							},
							{
								align: 'left',
								color: '#000000',
								style: 'normal',
								text: 'R$ 100,00',
								colspan: 2,
							},
						],
					],
				},
			],
		},
		{
			header: 'Balancete Geral',
			tables: [
				{
					rows: [
						[
							{
								align: 'left',
								color: '#000000',
								style: 'normal',
								text: 'Confira na documentação da efipay. todas as configurações possíveis de um boleto balancete.',
								colspan: 4,
							},
						],
					],
				},
			],
		},
	],
}

const efipay = new EfiPay(options)

efipay.defineBalanceSheetBillet(params, body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
