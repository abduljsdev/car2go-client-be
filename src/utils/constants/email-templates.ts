const EMAIL_TEMPLATES_HEADER = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="style.css" />
  <title>Browser</title>
</head>
<body>
`;
const EMAIL_TEMPLATES_FOOTER = `</body></html>`;

export const FORGET_PASSWORD_EMAIL = `
${EMAIL_TEMPLATES_HEADER}
<h1>
    Below is your updated password !
</h1>
<h3>
    {{password}}
</h3>
${EMAIL_TEMPLATES_FOOTER}
`;

export const verificationCodeEmailTemplate = `${EMAIL_TEMPLATES_HEADER}
<div style="width:50%;margin:2% auto;padding:30px;border-radius:5px;border:2px solid rgb(160, 160, 160);">
<h2>verification code.</h2>
<p>{{verificationCode}}</p>
</div>
${EMAIL_TEMPLATES_FOOTER}`;

export const accountVerificationTemplate = `${EMAIL_TEMPLATES_HEADER}
<div style="width:50%;margin:2% auto;padding:30px;border-radius:5px;border:2px solid rgb(160, 160, 160);">
<h2>Car2Go</h2>
<p>Your account is verified.</p>
</div>
${EMAIL_TEMPLATES_FOOTER}`;
