[Skip to main content](https://wasp.sh/docs/advanced/email#__docusaurus_skipToContent_fallback)

**Have a Wasp app in production?** 🐝 [We'll send you some swag! 👕](https://e44cy1h4s0q.typeform.com/to/EPJCwsMi)

Version: 0.21

On this page

With Wasp's email-sending feature, you can easily integrate email functionality into your web application.

main.wasp

```wasp
app Example {
  ...
  emailSender: {
    provider: <provider>,
    defaultFrom: {
      name: "Example",
      email: "hello@itsme.com"
    },
  }
}
```

Choose from one of the providers:

- `Dummy` (development only),
- `Mailgun`,
- `SendGrid`
- or the good old `SMTP`.

Optionally, define the `defaultFrom` field, so you don't need to provide it whenever sending an email.

## Sending Emails [​](https://wasp.sh/docs/advanced/email\#sending-emails-1 "Direct link to Sending Emails")

Before jumping into details about setting up various providers, let's see how easy it is to send emails.

You import the `emailSender` that is provided by the `wasp/server/email` module and call the `send` method on it.

- JavaScript
- TypeScript

src/actions/sendEmail.js

```js
import { emailSender } from "wasp/server/email";

// In some action handler...
const info = await emailSender.send({
  from: {
    name: "John Doe",
    email: "john@doe.com",
  },
  to: "user@domain.com",
  subject: "Saying hello",
  text: "Hello world",
  html: "Hello <strong>world</strong>",
});
```

src/actions/sendEmail.ts

```ts
import { emailSender } from "wasp/server/email";

// In some action handler...
const info = await emailSender.send({
  from: {
    name: "John Doe",
    email: "john@doe.com",
  },
  to: "user@domain.com",
  subject: "Saying hello",
  text: "Hello world",
  html: "Hello <strong>world</strong>",
});
```

Read more about the `send` method in the [API Reference](https://wasp.sh/docs/advanced/email#javascript-api).

The `send` method returns an object with the status of the sent email. It varies depending on the provider you use.

## Providers [​](https://wasp.sh/docs/advanced/email\#providers "Direct link to Providers")

We'll go over all of the available providers in the next section. For some of them, you'll need to set up some env variables. You can do that in the `.env.server` file.

### Using the Dummy Provider [​](https://wasp.sh/docs/advanced/email\#dummy "Direct link to Using the Dummy Provider")

Dummy Provider is not for production use

The `Dummy` provider is not for production use. It is only meant to be used during development. If you try building your app with the `Dummy` provider, the build will fail.

To speed up development, Wasp offers a `Dummy` email sender that `console.log`s the emails in the console. Since it doesn't send emails for real, it doesn't require any setup.

Set the provider to `Dummy` in your `main.wasp` file.

main.wasp

```wasp
app Example {
  ...
  emailSender: {
    provider: Dummy,
  }
}
```

### Using the SMTP Provider [​](https://wasp.sh/docs/advanced/email\#smtp "Direct link to Using the SMTP Provider")

First, set the provider to `SMTP` in your `main.wasp` file.

main.wasp

```wasp
app Example {
  ...
  emailSender: {
    provider: SMTP,
  }
}
```

Then, add the following env variables to your `.env.server` file.

.env.server

```properties
SMTP_HOST=
SMTP_USERNAME=
SMTP_PASSWORD=
SMTP_PORT=
```

Many transactional email providers (e.g. Mailgun, SendGrid but also others) can also use SMTP, so you can use them as well.

SMTP ports might be blocked

Some hosting providers (for example, **Railway** on its free tier, or **Hetzner**) block outbound SMTP ports to prevent spam.
If you run into issues, check their documentation for a solution, or consider using a dedicated provider integration like [Mailgun](https://wasp.sh/docs/advanced/email#mailgun) or [SendGrid](https://wasp.sh/docs/advanced/email#sendgrid) instead of plain SMTP.

### Using the Mailgun Provider [​](https://wasp.sh/docs/advanced/email\#mailgun "Direct link to Using the Mailgun Provider")

Set the provider to `Mailgun` in the `main.wasp` file.

main.wasp

```wasp
app Example {
  ...
  emailSender: {
    provider: Mailgun,
  }
}
```

Then, get the Mailgun API key and domain and add them to your `.env.server` file.

#### Getting the API Key and Domain [​](https://wasp.sh/docs/advanced/email\#getting-the-api-key-and-domain "Direct link to Getting the API Key and Domain")

1. Go to [Mailgun](https://www.mailgun.com/) and create an account.
2. Go to [Domains](https://app.mailgun.com/mg/sending/new-domain) and create a new domain.
3. Copy the domain and add it to your `.env.server` file.
4. Create a new Sending API key under `Send > Sending > Domain settings` and find `Sending API keys`.
5. Copy the API key and add it to your `.env.server` file.

.env.server

```properties
MAILGUN_API_KEY=
MAILGUN_DOMAIN=
```

#### Using the EU Region [​](https://wasp.sh/docs/advanced/email\#using-the-eu-region "Direct link to Using the EU Region")

If your domain region is in the EU, you need to set the `MAILGUN_API_URL` variable in your `.env.server` file:

.env.server

```properties
MAILGUN_API_URL=https://api.eu.mailgun.net
```

### Using the SendGrid Provider [​](https://wasp.sh/docs/advanced/email\#sendgrid "Direct link to Using the SendGrid Provider")

SendGrid Free Plan Retired

As of May 27, 2025, SendGrid has [retired its free plans](https://www.twilio.com/en-us/changelog/sendgrid-free-plan). A paid SendGrid plan is now required to send emails. Consider using [Mailgun](https://wasp.sh/docs/advanced/email#mailgun) or [SMTP](https://wasp.sh/docs/advanced/email#smtp) with another provider if you need a free tier option.

Set the provider field to `SendGrid` in your `main.wasp` file.

main.wasp

```wasp
app Example {
  ...
  emailSender: {
    provider: SendGrid,
  }
}
```

Then, get the SendGrid API key and add it to your `.env.server` file.

#### Getting the API Key [​](https://wasp.sh/docs/advanced/email\#getting-the-api-key "Direct link to Getting the API Key")

1. Go to [SendGrid](https://sendgrid.com/) and create an account (paid plan required).
2. Go to [API Keys](https://app.sendgrid.com/settings/api_keys) and create a new API key.
3. Copy the API key and add it to your `.env.server` file.

.env.server

```properties
SENDGRID_API_KEY=
```

## API Reference [​](https://wasp.sh/docs/advanced/email\#api-reference "Direct link to API Reference")

### `emailSender` dict [​](https://wasp.sh/docs/advanced/email\#emailsender-dict "Direct link to emailsender-dict")

main.wasp

```wasp
app Example {
  ...
  emailSender: {
    provider: <provider>,
    defaultFrom: {
      name: "Example",
      email: "hello@itsme.com"
    },
  }
}
```

The `emailSender` dict has the following fields:

- `provider: Provider`required

The provider you want to use. Choose from `Dummy`, `SMTP`, `Mailgun` or `SendGrid`.



Dummy Provider is not for production use





The `Dummy` provider is not for production use. It is only meant to be used during development. If you try building your app with the `Dummy` provider, the build will fail.

- `defaultFrom: dict`

The default sender's details. If you set this field, you don't need to provide the `from` field when sending an email.


### JavaScript API [​](https://wasp.sh/docs/advanced/email\#javascript-api "Direct link to JavaScript API")

Using the `emailSender` in :

- JavaScript
- TypeScript

src/actions/sendEmail.js

```js
import { emailSender } from "wasp/server/email";

// In some action handler...
const info = await emailSender.send({
  from: {
    name: "John Doe",
    email: "john@doe.com",
  },
  to: "user@domain.com",
  subject: "Saying hello",
  text: "Hello world",
  html: "Hello <strong>world</strong>",
});
```

src/actions/sendEmail.ts

```ts
import { emailSender } from "wasp/server/email";

// In some action handler...
const info = await emailSender.send({
  from: {
    name: "John Doe",
    email: "john@doe.com",
  },
  to: "user@domain.com",
  subject: "Saying hello",
  text: "Hello world",
  html: "Hello <strong>world</strong>",
});
```

The `send` method accepts an object with the following fields:

- `from: object`

The sender's details. If you set up `defaultFrom` field in the `emailSender` dict in Wasp file, this field is optional.
  - `name: string`

    The name of the sender.

  - `email: string`

    The email address of the sender.
- `to: string`required

The recipient's email address.

- `subject: string`required

The subject of the email.

- `text: string`required

The text version of the email.

- `html: string`required

The HTML version of the email


- [Sending Emails](https://wasp.sh/docs/advanced/email#sending-emails-1)
- [Providers](https://wasp.sh/docs/advanced/email#providers)
  - [Using the Dummy Provider](https://wasp.sh/docs/advanced/email#dummy)
  - [Using the SMTP Provider](https://wasp.sh/docs/advanced/email#smtp)
  - [Using the Mailgun Provider](https://wasp.sh/docs/advanced/email#mailgun)
  - [Using the SendGrid Provider](https://wasp.sh/docs/advanced/email#sendgrid)
- [API Reference](https://wasp.sh/docs/advanced/email#api-reference)
  - [`emailSender` dict](https://wasp.sh/docs/advanced/email#emailsender-dict)
  - [JavaScript API](https://wasp.sh/docs/advanced/email#javascript-api)

We use cookies primarily for analytics to enhance your experience. By accepting, you agree to our use of these cookies. You can manage your preferences or [learn more about our cookie policy](https://wasp.sh/privacy-policy).

Reject allAccept all