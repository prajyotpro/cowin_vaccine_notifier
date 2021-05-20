const mailgun = require("mailgun-js")({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

function sendEmail(message) {
  if (message.length == 0) {
    return null;
  }
  const message = JSON.stringify(message);
  const subject = "COWIN SCRIPT ALERT";
  const recipients = process.env.MAILGUN_RECEIPIENTS;
  const envelope = {
    from: "COWIN ALERT SCRIPT <cowinalert@mail.net >",
    to: recipients,
    subject: subject,
    html: "You have a new message: " + message,
  };

  mailgun.messages().send(envelope, function (error, body) {});
}

module.exports = {
  sendEmail,
};
