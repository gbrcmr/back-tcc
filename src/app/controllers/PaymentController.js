const EfiPay = require('sdk-node-apis-efi')
const options = require('../../pixpay/credentials.js');
const efipay = new EfiPay(options);
const uuid = require('uuid');


class PaymentController {

    async buscaProduto(req, res) {
        let params = {
            inicio: '2022-01-22T16:01:35Z',
            fim: '2025-11-30T20:10:00Z',
        };

        try {
            const resposta = await efipay.pixListCharges(params);
            res.json(resposta);
        } catch (error) {
            console.error('Erro ao listar cobranças Pix:', error);
            res.status(500).send('Erro ao listar cobranças Pix');
        }
    }

    async pixQrCode(req, res) {

        const { id } = req.params;
        let params = {
            id: id,
        };

        try {
            const resposta = await efipay.pixGenerateQRCode(params);
            res.json(resposta);
        } catch (error) {
            console.error('errou:', error)
        }
    }

    async pixDetail(req, res) {

        const { txid } = req.params;
        let params = {
            txid: txid,
        }

        try {
            const resposta = await efipay.pixDetailCharge(params);
            res.json(resposta);
        } catch (error) {
            console.error('errou:', error)
        }
    }


    async createCharge(req, res) {
        const { cpfDevedor, nomeDevedor, valorPago } = req.body;
        const uniqueId = uuid.v4().replace(/-/g, '');


        if (!cpfDevedor || !nomeDevedor || !valorPago) {
            return res.status(400).send('Parâmetros "cpfDevedor", "nomeDevedor" e "valorPago" são obrigatórios');
        }

        const formattedValue = parseFloat(valorPago).toFixed(2);

        let params = {
            txid: uniqueId,
        }

        let body = {
            calendario: {
                expiracao: 3600 // 1 hora de expiração
            },
            devedor: {
                cpf: cpfDevedor,
                nome: nomeDevedor
            },
            valor: {
                original: formattedValue
            },
            chave: '53bb7be5-b129-406c-a519-9566c30997d8',
            solicitacaoPagador: 'Pagamento Brecho Store'
        };

        try {
            const resposta = await efipay.pixCreateCharge(params, body);
            res.json(resposta);
        } catch (error) {
            console.error('Erro ao criar cobrança Pix:', error);
            res.status(500).send('Erro 500');
        }
    }

}
module.exports = new PaymentController();