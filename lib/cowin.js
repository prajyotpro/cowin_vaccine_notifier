// config
const BASE_URL = "https://cdn-api.co-vin.in/api/v2/";
const SEARCH_BY_DISTRICT_ENDPOINT = "appointment/sessions/calendarByDistrict";
const SEARCH_BY_PINCODE_ENDPOINT = "appointment/sessions/calendarByPin";
const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:88.0) Gecko/20100101 Firefox/88.0";

var date = new Date();
var month = (date.getMonth() + 1).toString();
month = month.length == 1 ? "0" + month : month;
const DEFAULT_DATE = date.getDate() + "-" + month + "-" + date.getFullYear();
const DEFAULT_AGE_LIMIT = 18;
const DEFAULT_DOSE = 1;
const DEFAULT_DISTRICT = 151;

const axios = require("axios").default;

function prepareUrl(options) {
  let date = options.date ? options.date : DEFAULT_DATE;
  let queryString = `?date=${date}&`;
  let url = BASE_URL;
  if (options.pincode) {
    queryString += `pincode=${options.pincode}`;
    url += SEARCH_BY_PINCODE_ENDPOINT + queryString;
    return url;
  }
  if (options.district) {
    queryString += `district_id=${options.district}`;
    url += SEARCH_BY_DISTRICT_ENDPOINT + queryString;
    return url;
  }
  let defaultUrl =
    BASE_URL +
    SEARCH_BY_DISTRICT_ENDPOINT +
    queryString +
    `district_id=${DEFAULT_DISTRICT}`;
  return defaultUrl;
}

function requestCowin(options) {
  let url = prepareUrl(options);
  console.log(`GET - ${url}`);
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        headers: {
          "User-Agent": USER_AGENT,
        },
      })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => reject(err));
  });
}

async function processResponse(options) {
  const result = await requestCowin(options);

  if (!result.data) {
    return result.status;
  }

  let centers = result.data.centers;

  let availableSlots = [];
  const ageLimit = options.age ? options.age : DEFAULT_AGE_LIMIT;
  const dose = options.dose ? options.dose : DEFAULT_DOSE;
  const availableCapacityDose = `available_capacity_dose${dose}`;

  centers.forEach((center) => {
    let sessions = center.sessions;
    sessions.forEach((session) => {
      if (
        session.min_age_limit == ageLimit &&
        session[availableCapacityDose] > 0
      ) {
        let message =
          "SLOT AVAILABLE AT " +
          center.name +
          " - " +
          center.pincode +
          " - " +
          center.address;
        availableSlots.push(message);
      }
    });
  });
  return availableSlots;
}

module.exports = {
  search: processResponse,
};
