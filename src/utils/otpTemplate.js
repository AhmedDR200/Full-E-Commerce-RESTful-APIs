const otpTemplate = (user, resetCode) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: 'Roboto', sans-serif;
                background-color: #f4f7fa; /* Light grey background */
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                margin: 40px auto;
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                border: 2px solid #ccc; /* Neutral grey border */
            }
            .email-header {
                background-color: #4CAF50; /* Green header */
                color: #ffffff;
                text-align: center;
                padding: 30px;
            }
            .email-header img {
                width: 60px;
                height: 60px;
            }
            .email-body {
                padding: 20px;
                color: #333333; /* Dark grey text */
            }
            .email-body p {
                margin-bottom: 20px;
                line-height: 1.6;
            }
            .reset-code {
                background-color: #f9f9f9; /* Light grey code box */
                border-left: 5px solid #4CAF50; /* Green accent */
                padding: 10px 20px;
                font-size: 20px;
                font-weight: bold;
                color: #333333;
            }
            .email-footer {
                text-align: center;
                padding: 20px;
                background-color: #f2f2f2; /* Light grey footer */
                font-size: 14px;
                color: #777777;
            }
            .email-footer a {
                color: #4CAF50;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="email-header">
                <img src="https://i.pinimg.com/originals/ab/ca/4c/abca4c51c7e166b2980105b5e98b7ac2.jpg" alt="E-Commerce Logo" style="width: 120px; height: 120px;">
                <h1>Password Reset Request</h1>
            </div>
            <div class="email-body">
                <p>Dear ${user.name},</p>
                <p>We received a request to reset the password for your account on our E-commerce platform.</p>
                <p class="reset-code">Reset Code: ${resetCode}</p>
                <p>Please enter this code on the password reset page to proceed. The code will expire shortly.</p>
                <p>If you did not request this reset, please contact our support team immediately.</p>
                <p>Best regards,<br>The E-commerce Team</p>
            </div>
            <div class="email-footer">
                <p>If you have any questions, feel free to <a href="mailto:support@ecommerceapp.com">contact our support team</a>.</p>
            </div>
        </div>
    </body>
    </html>
`;

module.exports = otpTemplate;
