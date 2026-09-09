import nodemailer from "nodemailer";

const getTransporter = () => {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASSWORD,
  } = process.env;

  if (
    !SMTP_HOST ||
    !SMTP_PORT ||
    !SMTP_USER ||
    !SMTP_PASSWORD
  ) {
    throw new Error(
      "SMTP settings are not configured"
    );
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure:
      process.env.SMTP_SECURE === "true",

    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  });
};

export const sendPasswordResetEmail = async ({
  email,
  name,
  resetToken,
}) => {
  const clientUrl =
    process.env.CLIENT_URL ||
    "http://localhost:5173";

  const resetUrl =
    `${clientUrl}/reset-password?token=${encodeURIComponent(
      resetToken
    )}`;

  const from =
    process.env.SMTP_FROM ||
    process.env.SMTP_USER;

  await getTransporter().sendMail({
    from,
    to: email,

    subject: "Reset your Blynk password",

    text: `
Hi ${name},

I'm the founder of Blynk.

I received a request to reset the password for your Blynk account.

You can reset your password using the link below:

${resetUrl}

This link will expire in one hour.

If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.

Keep focusing,
Blynk
    `.trim(),

    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>Reset your Blynk password</title>
</head>

<body
  style="
    margin: 0;
    padding: 0;
    background-color: #f8fafc;
    font-family:
      Inter,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Helvetica,
      Arial,
      sans-serif;
    color: #1e293b;
  "
>
  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    role="presentation"
    style="
      width: 100%;
      background-color: #f8fafc;
      padding: 40px 16px;
    "
  >
    <tr>
      <td align="center">

        <!-- Email Container -->
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="
            max-width: 560px;
            background-color: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 24px;
            overflow: hidden;
          "
        >

          <!-- Header -->
          <tr>
            <td
              style="
                padding: 32px 40px 20px;
              "
            >
              <div
                style="
                  font-size: 28px;
                  font-weight: 600;
                  letter-spacing: -0.8px;
                  color: #3b82f6;
                "
              >
                blynk
              </div>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td
              style="
                padding: 16px 40px 40px;
              "
            >
              <h1
                style="
                  margin: 0 0 16px;
                  font-size: 28px;
                  line-height: 1.25;
                  font-weight: 600;
                  letter-spacing: -0.5px;
                  color: #0f172a;
                "
              >
                Reset your password
              </h1>

              <p
                style="
                  margin: 0 0 18px;
                  font-size: 15px;
                  line-height: 1.7;
                  color: #64748b;
                "
              >
                Hi ${name},
              </p>

              <p
                style="
                  margin: 0 0 18px;
                  font-size: 15px;
                  line-height: 1.7;
                  color: #64748b;
                "
              >
                I'm the founder of Blynk. We received
                a request to reset the password for
                your account.
              </p>

              <p
                style="
                  margin: 0 0 28px;
                  font-size: 15px;
                  line-height: 1.7;
                  color: #64748b;
                "
              >
                Click the button below and we'll get
                you back into Blynk.
              </p>

              <!-- CTA -->
              <table
                cellpadding="0"
                cellspacing="0"
                role="presentation"
              >
                <tr>
                  <td
                    align="center"
                    bgcolor="#3b82f6"
                    style="
                      border-radius: 12px;
                    "
                  >
                    <a
                      href="${resetUrl}"
                      target="_blank"
                      style="
                        display: inline-block;
                        padding: 14px 24px;
                        font-size: 15px;
                        font-weight: 600;
                        color: #ffffff;
                        text-decoration: none;
                        background-color: #3b82f6;
                        border-radius: 12px;
                      "
                    >
                      Reset password
                    </a>
                  </td>
                </tr>
              </table>

              <p
                style="
                  margin: 28px 0 0;
                  font-size: 13px;
                  line-height: 1.7;
                  color: #94a3b8;
                "
              >
                This reset link will expire in
                <strong
                  style="
                    color: #64748b;
                  "
                >
                  one hour
                </strong>.
              </p>

              <!-- Security Message -->
              <div
                style="
                  margin-top: 28px;
                  padding: 16px 18px;
                  background-color: #eff6ff;
                  border-radius: 14px;
                "
              >
                <p
                  style="
                    margin: 0;
                    font-size: 13px;
                    line-height: 1.6;
                    color: #64748b;
                  "
                >
                  If you didn't request this password
                  reset, you can safely ignore this
                  email. Your password won't change.
                </p>
              </div>

              <!-- Fallback Link -->
              <p
                style="
                  margin: 28px 0 0;
                  font-size: 12px;
                  line-height: 1.6;
                  color: #94a3b8;
                  word-break: break-all;
                "
              >
                Button not working? Copy and paste
                this link into your browser:
                <br /><br />

                <a
                  href="${resetUrl}"
                  style="
                    color: #3b82f6;
                    text-decoration: none;
                  "
                >
                  ${resetUrl}
                </a>
              </p>
            </td>
          </tr>
        </table>

        <!-- Footer -->
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="
            max-width: 560px;
          "
        >
          <tr>
            <td
              align="center"
              style="
                padding: 24px 20px;
              "
            >
              <p
                style="
                  margin: 0;
                  font-size: 12px;
                  line-height: 1.6;
                  color: #94a3b8;
                "
              >
                Keep focusing.
                <br />
                Blynk
              </p>

              <p
                style="
                  margin: 10px 0 0;
                  font-size: 11px;
                  color: #cbd5e1;
                "
              >
                A simple space for focused work.
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>
    `,
  });
};