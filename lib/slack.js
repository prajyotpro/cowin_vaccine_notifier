const axios = require("axios").default;

// send slack notification
function sendSlack(message) {
  const HOOK = process.env.SLACK_HOOK_URL;
  if (message.length == 0) {
    return null;
  }
  axios
    .post(
      HOOK,
      { text: JSON.stringify(message) },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {})
    .catch((err) => console.log("api Erorr: ", err.response));
}

module.exports = {
  sendSlack,
};
