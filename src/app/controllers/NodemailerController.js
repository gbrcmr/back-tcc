const nodemailer = require('nodemailer');

class NodemailerController {

    async sendEmail(req, res) {
        const email = "brechostoreoficial@outlook.com";
        const pass = 'S3nhabrecho';

        try {
            const transporter = nodemailer.createTransport({
                host: 'smtp-mail.outlook.com',
                port: 587,
                secure: false, // TLS requires secureConnection to be false
                auth: {
                    user: email,
                    pass: pass
                }
            });

            const configEmail = {
                from: email,
                to: "gabrielcamargo32@gmail.com",
                subject: "Atualização de pedido - Brecho Store",
                html: "<h1>Atualização do seu pedido! Aguardando pagamento</h1>"
            };

            const result = await transporter.sendMail(configEmail);
            console.log("Email sent:", result.response);

            transporter.close();

            // Respond to the client (if it's an API endpoint)
            res.status(200).json({ message: "Email sent successfully" });

        } catch (error) {
            console.error("Error sending email:", error);
            res.status(500).json({ error: "Failed to send email" });
        }
    }
}

module.exports = new NodemailerController();