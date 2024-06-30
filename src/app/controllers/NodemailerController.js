const nodemailer = require('nodemailer');

class NodemailerController {

    async sendEmail(req, res) {
        const { toEmail, emailBody } = req.body; // Assuming these are passed from the client or another part of your application

        const email = "brechostoreoficial@outlook.com";
        const pass = 'S3nhabrecho';

        try {
            const transporter = nodemailer.createTransport({
                host: 'smtp-mail.outlook.com',
                port: 587,
                secure: false,
                auth: {
                    user: email,
                    pass: pass
                }
            });

            const configEmail = {
                from: email,
                to: toEmail,
                subject: "Atualização de pedido - Brecho Store", // Default subject if not provided
                html: emailBody // Default body if not provided
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