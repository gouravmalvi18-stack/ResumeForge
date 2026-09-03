export const genrateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const getOtpHtml = (otp) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #333;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Your OTP Code</h2>
        <p class="otp">${otp}</p>
        <p>Please use this code to verify your email address.</p>
    </div>
</body>
</html>`;
};

export const getFeedbackHtml = (text) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ResumeForge Feedback</title>
</head>
<body style="margin: 0; padding: 20px; background-color: #f4f4f4; font-family: Arial, sans-serif;">
  <div style="
    max-width: 600px;
    margin: auto;
    padding: 24px;
    background-color: #ffffff;
    border-radius: 8px;
  ">
    <h2 style="color: #2563eb;">ResumeForge Feedback</h2>

    <p style="color: #555;">
      A user has submitted feedback through ResumeForge Contact Us Page.
    </p>

    <div style="
      margin-top: 20px;
      padding: 16px;
      background-color: #f3f4f6;
      border-left: 4px solid #2563eb;
      color: #333;
      white-space: pre-wrap;
    ">${text}</div>

    <p style="margin-top: 24px; color: #777; font-size: 12px;">
      You can reply directly to this email to contact the user.
    </p>
  </div>
</body>
</html>`;
};
