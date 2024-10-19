const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const sendEmail = async (email, name) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Junte-se a mim no Treasure!",
    html: `Olá, amigo(a)!<br><br>

          Espero que você esteja bem! Queria te convidar para se juntar a mim no <a href="http://localhost:3000"><strong>Treasure</strong></a>, um aplicativo incrível que estou usando para controlar minhas finanças de forma simples e eficiente.<br><br>

          Com o Treasure, você poderá:<br>
          - Registrar sua renda e despesas facilmente;<br>
          - Visualizar seu histórico de transações em tempo real;<br>
          - Definir limites de gastos e receber alertas quando estiver próximo de ultrapassá-los.<br><br>

          Vamos juntos transformar nossa forma de gerenciar as finanças e conquistar nossos objetivos!<br><br>

          Basta acessar o site e criar sua conta. Estou ansioso(a) para ter você na minha rede e compartilhar dicas e experiências!<br><br>

          Um grande abraço,<br>
          ${name}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: error.message };
  }
};

module.exports = { sendEmail };
