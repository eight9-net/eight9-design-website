import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
const ses = new SESClient({ region: "us-west-1" });

let app_cfg = {
  'eight9': {
    sender: 'info@eight9.net',
    title: 'Eight9.net Contact Form',
    company: 'Eight9 Design Network INC',
  },
  'awcs': {
    sender: 'alton@airworkscoolingsolutions.com',
    title: 'AirWorks Contact Form',
    company: 'AirWorks Cooling Solutions LLC.',
  },
  'mam': {
    sender: 'info@microgridam.com',
    title: 'MicrogridAM.com Contact Form',
    company: 'Microgrid Asset Management',
  },
  'atlas': {
    sender: 'info@eight9.net',
    title: 'Atlas Integrated Systems Contact Form',
    company: 'Atlas Integrated Systems',
  },
  'scada': {
    sender: 'info@eight9.net',
    title: 'SCADA Solutions Contact Form',
    company: 'SCADA Solutions',
  },
}

export const handler = async(event) => {
  // console.log("ENVIRONMENT VARIABLES\n" + JSON.stringify(process.env, null, 2));
  // console.info("EVENT\n" + JSON.stringify(event, null, 2));
  let msg = {}
  if (event.body) msg = JSON.parse(event.body);
  console.info("BODY\n" + JSON.stringify(msg, null, 2));
  let cfg = (msg.app_key && app_cfg[msg.app_key]) ? app_cfg[msg.app_key] : false;
  if (!cfg) throw new Error("Invalid Request, invalid 'app_key'");
  if (!msg.hasOwnProperty('honeypot') || (msg.honeypot && msg.honeypot.length > 0)) {
    console.error("Invalid Request: HP");
    return;
  }

  // First + Last Name
  if (msg.first_name && msg.last_name) {
    msg.name = msg.first_name + ' ' + msg.last_name;
  }

  // Extra Fields
  let extra_keys = [
    'address',
    'company',
    'title',
    'property_type',
    'communications',
    'other_communications',
    'needs',
    'timeframe',
  ];
  let extra_fields = {};

  extra_keys.forEach((key) => {
    if (msg[key] && msg[key].length > 0) {
      extra_fields[key] = msg[key];
    }
  });

  let extra_fields_str = '';
  for (const [key, value] of Object.entries(extra_fields)) {
    extra_fields_str += `<p><b>${capitalizeFirstLetters(key)}:</b> ${value}</p>`;;
  }

  let body = `
<html>
  <style>
    .body-wrap {
      font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; background-color: #f6f6f6; margin: 0;
    }
    .content-wrap {
      font-size: 14px; vertical-align: top; margin: 0; padding: 20px;
    }
    .content-wrap h1 {
      margin-top: 0;
    }
    .footer-wrap {
      width: 100%; clear: both; color: #999; margin: 100px 0; padding: 20px;
    }
  </style>
  <body class="body-wrap">
    <div class="content-wrap">
      <h1>${cfg.title}</h1>
      <p><b>Name:</b> ${msg.name}</p>
      <p><b>E-Mail:</b> <a href="mailto:${msg.email}">${msg.email}</a></p>
      <p><b>Phone:</b> ${msg.phone}</p>
      <p><b>Subject:</b> ${msg.subject}</p>
      ${extra_fields_str}
      <p><b>Message:</b> ${msg.message}</p>
    </div>
    <div class="footer-wrap">
      From ${cfg.company} Website Contact Form
    </div>
  </body>
</html>
  `;

  const command = new SendEmailCommand({
    Destination: {
      ToAddresses: [cfg.sender],
    },
    Message: {
      Body: {
        Html: {
          Data: body,
          Charset: 'UTF-8'
        }
      },

      Subject: {
        Data: `${cfg.title}: ${msg.subject}`,
        Charset: 'UTF-8'
      }
    },
    Source: cfg.sender,
    ReplyToAddresses: [msg.email],
  });

  try {
    let response = await ses.send(command);
    // process data.
    return response;
  }
  catch (error) {
    // error handling.
  }
  finally {
    // finally.
  }


  function capitalizeFirstLetters(str) {
    if (str.length === 0) {
      return str;
    }
    return str
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }
};
