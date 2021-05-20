require("dotenv").config();

var argv = require("minimist")(process.argv.slice(2));

const cowin = require("./lib/cowin");

function parseOptions(argv) {
  let options = {};
  if (argv.date) {
    options.date = argv.date;
  }
  if (argv.pincode) {
    options.pincode = argv.pincode;
  }
  if (argv.age) {
    options.age = argv.age;
  }
  if (argv.dose) {
    options.dose = argv.dose;
  }
  if (argv.district) {
    options.district = argv.district;
  }
  return options;
}

function sendNotification(response, isError = false) {
  if (process.env.ENABLE_MAILGUN == "true") {
    if (isError == false) {
      const mailgun = require("./lib/mailgun");
      mailgun.sendEmail(response);
    }
  }
  if (process.env.ENABLE_SLACK == "true") {
    const slack = require("./lib/slack");
    slack.sendSlack(response);
  }
  console.log(response);
}

// initialization
async function init() {
  try {
    const options = parseOptions(argv);
    const response = await cowin.search(options);
    sendNotification(response);
  } catch (error) {
    sendNotification(error, true);
  }
}

init();
