# cowin_vaccine_notifier
Script to search vaccine and notify on different channels.

# Covid19 Vaccine – CoWIN – Script to search slot and get notified.

I have been trying to book a slot on the Co-WIN web application, and it always says booked! – do you feel the same as me?

### What is CoWIN?
Let us understand eVIN (electronic vaccine intelligence network). India has been using eVIN for real-time information on vaccine stocks and flows, and storage temperatures across all cold chain points. CoWIN is an extension of eVIN, it is a cloud-based web application use for managing, monitoring, and evaluating Covid-19 vaccination in India.

### CoWIN API
CoWIN has launched public API’s which can be used by any third party to find and download vaccine appointments.

You may refer to full API documentation on API Setu: https://apisetu.gov.in/public/marketplace/api/cowin/cowin-public-v2

### Why the script?
If you have used the CoWIN portal, we all know the login to the portal has a login session duration and it will log you out at some point in time.
Instead of following the login steps every time, which was a tedious process. I came up writing this script.

The script allows me to set various search options and also send a notification on different channels. I have been using Email (Mailgun) and Slack. For you can configure and add more channels as you desire.
Dive in

The code is written in JavaScript and you can run it on node.js

##### Why Javascript? 
– so that any developer can adapt and make changes to it

### The Setup
– Install node.js
– git clone https://github.com/prajyotpro/cowin_vaccine_notifier.git
– cd cowin_vaccine_notifier
– cp .env_example .env
– add configuration to .env
```
ENABLE_MAILGUN=false
MAILGUN_API_KEY=mailgun api key
MAILGUN_DOMAIN=mailgun domain
MAILGUN_RECEIPIENTS=["email1@example.com", "email2@example.com"]

ENABLE_SLACK=true
SLACK_HOOK_URL=slack web hook
```

– script parameters
```
--date DD-MM-YYYY // mandatory, default current date
--district 151 // district id - required if no pincode, default - 151
--pincode 403001 // pincode - required if no district
--age 18 // age limit (18,45), default - 18
--dose 1 // dose (1,2), default - 1
```

## Running the script
`
node index.js --date 20-05-2021 --district 151 --age 18 --dose 1
`

### Data Output:

##### Slack Notification:
I’ve set up a notification hook on a covid channel.
Now what? How do I book an appointment?

Running the script every moment does not make sense? So I have setup a cronjob along with a shell command:
`
*/1 * * * * /bin/sh /Users/prajyot/Projects/prajyot/cowin_vaccine_notifier/script.sh
`
Once I received slack notification I try to book on the [CoWIN web portal](https://selfregistration.cowin.gov.in/),
Oh no! go ahead make it automated, feel free to add to the script and auto book an appointment – explore and explode 🙂
