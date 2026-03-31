# Develop full-stack web appsfaster.

Rails-like framework for React, Node.js and Prisma. Build your app in a day and deploy it with a single CLI command.

[Get Started](https://wasp.sh/docs/quick-start) [Documentation](https://wasp.sh/docs)

Works with

![React](https://wasp.sh/img/lp/react-logo-gray.svg)![Node](https://wasp.sh/img/lp/nodejs-logo-gray.svg)![Prisma](https://wasp.sh/img/lp/prisma-logo-gray.svg)

Backed by![YC](https://wasp.sh/img/lp/yc-logo-rounded.webp)

[todoApp.wasp· Wasp config file](https://github.com/wasp-lang/wasp/blob/release/examples/tutorials/TodoAppTs/main.wasp)

```wasp
app todoApp {
  title: "ToDo App",  // visible in the browser tab
  auth: { // full-stack auth out-of-the-box
    userEntity: User,
    methods: { google: {}, gitHub: {}, email: {...} }
  }
}

route RootRoute { path: "/", to: MainPage }
page MainPage {
  authRequired: true, // Limit access to logged in users.
  component: import Main from "@client/Main" // Your React code.
}

query getTasks {
  fn: import { getTasks } from "@server/tasks", // Your Node.js code.
  entities: [Task] // Automatic cache invalidation.
}
```

[schema.prisma· Wasp entities schema](https://github.com/wasp-lang/wasp/blob/release/examples/tutorials/TodoAppTs/schema.prisma)

```prisma
model Task { ... } // Your Prisma data model
```

Open Source

This is the way. Wasp is fully open-source and you're welcome to contribute!


[Learn more](https://github.com/wasp-lang/wasp)

Full-stack Auth

Add login with social providers or email in a few lines of code with powerful UI helpers. No third party vendor lock-in.


[Learn more](https://wasp.sh/blog/2023/04/12/auth-ui)

RPC (Client <-> Server)

Wasp provides a typesafe RPC layer that instantly brings your data models and server logic to the client.


[Learn more](https://wasp.sh/docs/data-model/operations/overview)

Simple Deployment

Deploy your app to any platform. Wasp offers CLI helpers for the most popular options.


[Learn more](https://wasp.sh/docs/deployment/intro)

Jobs

Easily define, schedule and run specialized server tasks.
Persistent, retryable, delayable.


[Learn more](https://wasp.sh/docs/advanced/jobs)

Email Sending

All you need to do is connect an email provider and you can send emails!


[Learn more](https://wasp.sh/docs/advanced/email)

Full-stack Type Safety

Full support for TypeScript with auto-generated types that span the whole stack.


[Learn more](https://wasp.sh/docs/tutorial/queries#implementing-a-query)

And More!

Custom API routes, database seeding, optimistic updates, automatic cache invalidation on the client, ...


[Learn more](https://wasp.sh/docs)

## How does it work? 🧐

Given a simple `.wasp` configuration file that describes the high-level details of your web app, and`.js(x)/.css/...`, source files with your unique logic, Wasp compiler generates the full source of your web app in the target stack: front-end, back-end and deployment.

This unique approach is what makes Wasp "smart" and gives it its super powers!

#### Simple config language

Declaratively describe high-level details of your app.

[Learn more](https://wasp.sh/docs/general/language)

#### Wasp CLI

All the handy commands at your fingertips.

[Learn more](https://wasp.sh/docs/general/cli)

#### React / Node.js / Prisma

You are still writing 90% of the code in your favorite technologies.

#### Goodbye boilerplate

Write only the code that matters, let Wasp handle the rest.

[Learn more](https://www.youtube.com/watch?v=x5nsBbLvKnU)

![React](https://wasp.sh/img/lp/wasp-compilation-diagram.webp)

## Show, don't tell.

Take a look at examples - see how things work and get inspired for your next project.

#### Todo App (TypeScript) ✅

A famous To-Do list app, implemented in TypeScript.

![wasp GitHub profile picture](https://avatars.githubusercontent.com/u/55102317)wasp

[TodoAppTs](https://github.com/wasp-lang/wasp/tree/release/examples/tutorials/TodoAppTs)

[See the code](https://github.com/wasp-lang/wasp/tree/release/examples/tutorials/TodoAppTs)

#### CoverLetterGPT 🤖

Generate cover letters based on your CV and the job description. Powered by ChatGPT.

![vincanger GitHub profile picture](https://avatars.githubusercontent.com/u/70215737)vincanger

[coverlettergpt](https://github.com/vincanger/coverlettergpt)

[See the code](https://github.com/vincanger/coverlettergpt) [Demo](https://coverlettergpt.xyz/)

#### Realtime voting via WebSockets 🔌

A realtime, websockets-powered voting app built with Wasp and TypeScript.

![wasp GitHub profile picture](https://avatars.githubusercontent.com/u/55102317)wasp

[websockets-realtime-voting](https://github.com/wasp-lang/wasp/tree/release/examples/websockets-realtime-voting)

[See the code](https://github.com/wasp-lang/wasp/tree/release/examples/websockets-realtime-voting) [Demo](https://websockets-voting-client.fly.dev/login)

[See all examples](https://github.com/wasp-lang/wasp/tree/release/examples)

## You're in a good crowd

Here's what folks using Wasp say about it. Join [our Discord](https://discord.gg/rzdnErX) for more!

[![](https://wasp.sh/img/lp/tm/reyero.webp)\\
\\
**Joan Reyero**\\
\\
@joanreyero\\
\\
![](https://wasp.sh/img/lp/ph-logo.webp)\\
\\
I spent the one weekend building with Wasp and it was amazing, a real pleasure. I normally develop in Vue.js, but in a weekend I had time to learn Wasp, React and finish a full-stack app (only missing styling). This would have been impossible before.\\
\\
So glad to see Wasp in Beta! 🍻](https://www.producthunt.com/posts/wasp-lang-beta?comment=2048094)

[![](https://wasp.sh/img/lp/tm/tskaggs.webp)\\
\\
**Tim ✌️**\\
\\
@tskaggs\\
\\
![](https://wasp.sh/img/lp/twitter-logo.webp)\\
\\
The simplification of the main.wasp file is 👍. And it feels like a very light weight version of a few larger frameworks.](https://twitter.com/tskaggs/status/1602513968207101954)

[![](https://wasp.sh/img/lp/tm/attila.webp)\\
\\
**Attila Vago**\\
\\
@AttilaTheDev\\
\\
![](https://wasp.sh/img/lp/twitter-logo.webp)\\
\\
@WaspLang has been in the back of my mind for months now. It left an impression, and I’m really not easy to impress. That’s gotta mean something… #programming #webdevelopment #FullStack](https://twitter.com/AttilaTheDev/status/1583530646047117317)

🐝 Load more

## 🏆 Showcase Gallery 🏆

See what others are building with Wasp.

[![](https://wasp.sh/img/lp/showcase/farnance-dashboard.webp)\\
\\
**Farnance: SaaS marketplace for farmers** \\
\\
hackathonmaterial-ui\\
\\
See how Julian won HackLBS 2021 among 250 participants and why Wasp was instrumental for the team's victory.](https://wasp.sh/blog/2022/10/28/farnance-hackathon-winner)

[![](https://wasp.sh/img/lp/showcase/grabbit-hero.webp)\\
\\
**Grabbit: Easily manage dev environments** \\
\\
internal-tools\\
\\
See how Michael built and deployed an internal tool for managing dev resources at StudentBeans.](https://wasp.sh/blog/2022/11/26/michael-curry-usecase)

[![](https://wasp.sh/img/lp/showcase/amicus-landing.webp)\\
\\
**Amicus: Task and workflow management for legal teams** \\
\\
startupmaterial-ui\\
\\
See how Erlis rolled out fully-fledged SaaS as a team of one in record time and got first paying customers.](https://wasp.sh/blog/2022/11/26/erlis-amicus-usecase)

## Stay up to date 📬

Be the first to know when we ship new features and updates!

Subscribe

## 🚧 Roadmap 🚧

Work on Wasp never stops: [get a glimpse](https://github.com/orgs/wasp-lang/projects/5) of what is coming next!

[![Roadmap](https://wasp.sh/img/lp/wasp-roadmap.webp)](https://github.com/orgs/wasp-lang/projects/5)

## Frequently asked questions

For anything not covered here, join [our Discord](https://discord.gg/rzdnErX)!

How is Wasp different from Next.js / Nuxt.js / Gatsby?

How is Wasp different from Ruby on Rails or Django?

How hard is it to learn Wasp?

Do you support only React & Node.js currently?

We use cookies primarily for analytics to enhance your experience. By accepting, you agree to our use of these cookies. You can manage your preferences or [learn more about our cookie policy](https://wasp.sh/privacy-policy).

Reject allAccept all