[Skip to main content](https://wasp.sh/docs/advanced/jobs#__docusaurus_skipToContent_fallback)

**Have a Wasp app in production?** 🐝 [We'll send you some swag! 👕](https://e44cy1h4s0q.typeform.com/to/EPJCwsMi)

Version: 0.21

On this page

In most web apps, users send requests to the server and receive responses with some data. When the server responds quickly, the app feels responsive and smooth.

What if the server needs extra time to fully process the request? This might mean sending an email or making a slow HTTP request to an external API. In that case, it's a good idea to respond to the user as soon as possible and do the remaining work in the background.

Wasp supports background jobs that can help you with this:

- Jobs persist between server restarts,
- Jobs can be retried if they fail,
- Jobs can be delayed until a future time,
- Jobs can have a recurring schedule.

## Using Jobs [​](https://wasp.sh/docs/advanced/jobs\#using-jobs "Direct link to Using Jobs")

### Job Definition and Usage [​](https://wasp.sh/docs/advanced/jobs\#job-definition-and-usage "Direct link to Job Definition and Usage")

Let's write an example Job that will print a message to the console and return a list of tasks from the database.

1. Start by creating a Job declaration in your `.wasp` file:

- JavaScript
- TypeScript

main.wasp

```wasp
job mySpecialJob {
  executor: PgBoss,
  perform: {
    fn: import { foo } from "@src/workers/bar"
  },
  entities: [Task],
}
```

main.wasp

```wasp
job mySpecialJob {
  executor: PgBoss,
  perform: {
    fn: import { foo } from "@src/workers/bar"
  },
  entities: [Task],
}
```

2. After declaring the Job, implement its worker function:

- JavaScript
- TypeScript

src/workers/bar.js

```js
export const foo = async ({ name }, context) => {
  console.log(`Hello ${name}!`)
  const tasks = await context.entities.Task.findMany({})
  return { tasks }
}
```

src/workers/bar.ts

```ts
import { type MySpecialJob } from 'wasp/server/jobs'
import { type Task } from 'wasp/entities'

type Input = { name: string; }
type Output = { tasks: Task[]; }

export const foo: MySpecialJob<Input, Output> = async ({ name }, context) => {
  console.log(`Hello ${name}!`)
  const tasks = await context.entities.Task.findMany({})
  return { tasks }
}
```

The worker function

The worker function must be an `async` function. The function's return value represents the Job's result.

The worker function accepts two arguments:

- `args`: The data passed into the job when it's submitted.
- `context: { entities }`: The context object containing entities you put in the Job declaration.

3. After successfully defining the job, you can submit work to be done in your [Operations](https://wasp.sh/docs/data-model/operations/overview) or [setupFn](https://wasp.sh/docs/project/server-config#setup-function) (or any other NodeJS code):

- JavaScript
- TypeScript

someAction.js

```js
import { mySpecialJob } from 'wasp/server/jobs'

const submittedJob = await mySpecialJob.submit({ job: "Johnny" })

// Or, if you'd prefer it to execute in the future, just add a .delay().
// It takes a number of seconds, Date, or ISO date string.
await mySpecialJob
  .delay(10)
  .submit({ name: "Johnny" })
```

someAction.ts

```ts
import { mySpecialJob } from 'wasp/server/jobs'

const submittedJob = await mySpecialJob.submit({ job: "Johnny" })

// Or, if you'd prefer it to execute in the future, just add a .delay().
// It takes a number of seconds, Date, or ISO date string.
await mySpecialJob
  .delay(10)
  .submit({ name: "Johnny" })
```

And that's it. Your job will be executed by `PgBoss` as if you called `foo({ name: "Johnny" })`.

In our example, `foo` takes an argument, but passing arguments to jobs is not a requirement. It depends on how you've implemented your worker function.

### Recurring Jobs [​](https://wasp.sh/docs/advanced/jobs\#recurring-jobs "Direct link to Recurring Jobs")

If you have work that needs to be done on some recurring basis, you can add a `schedule` to your job declaration:

- JavaScript
- TypeScript

main.wasp

```wasp
job mySpecialJob {
  executor: PgBoss,
  perform: {
    fn: import { foo } from "@src/workers/bar"
  },
  schedule: {
    cron: "0 * * * *",
    args: {=json { "job": "args" } json=} // optional
  }
}
```

main.wasp

```wasp
job mySpecialJob {
  executor: PgBoss,
  perform: {
    fn: import { foo } from "@src/workers/bar"
  },
  schedule: {
    cron: "0 * * * *",
    args: {=json { "job": "args" } json=} // optional
  }
}
```

In this example, you _don't_ need to invoke anything in . You can imagine `foo({ job: "args" })` getting automatically scheduled and invoked for you every hour.

## Job executors [​](https://wasp.sh/docs/advanced/jobs\#job-executors "Direct link to Job executors")

Wasp supports Jobs through the use of **job executors**. A job executor is responsible for handling the scheduling, monitoring, and execution of jobs.

Currently, Wasp only has support for one job executor, `PgBoss`.

### `PgBoss` [​](https://wasp.sh/docs/advanced/jobs\#pgboss "Direct link to pgboss")

[`PgBoss`](https://github.com/timgit/pg-boss/tree/8.4.2) is a lightweight job queue built on top of PostgreSQL. It is suitable for low-volume production use cases and does not require any additional infrastructure or complex management. By using PostgreSQL (and [SKIP LOCKED](https://www.2ndquadrant.com/en/blog/what-is-select-skip-locked-for-in-postgresql-9-5/)) as its storage and synchronization mechanism, you get many benefits of a traditional job queue, on top of your existing Postgres database.

#### Requirements [​](https://wasp.sh/docs/advanced/jobs\#requirements "Direct link to Requirements")

`PgBoss` requires that your database provider is set to `"postgresql"` in your `schema.prisma` file. Read more about setting the provider [here](https://wasp.sh/docs/data-model/databases#postgresql).

#### Limitations [​](https://wasp.sh/docs/advanced/jobs\#limitations "Direct link to Limitations")

`PgBoss` runs together with your web server, whenever it is up. This means that it is not a separate process or service, but rather a part of your web server's application. As such, it is not suitable for CPU-heavy workloads, as it shares the CPU with your web server's application logic.

The `PgBoss` executor in Wasp does not (yet) support independent, horizontal scaling of pg-boss-only applications, nor starting them as separate workers/processes/threads. This means that your server must be running whenever you want to process jobs. If you need to scale your job processing, you will need to run multiple instances of your web server, each with its own `PgBoss` instance.

#### Customization [​](https://wasp.sh/docs/advanced/jobs\#pg_boss_new_options "Direct link to Customization")

If you need to customize the creation of the `PgBoss` instance, you can set an environment variable called `PG_BOSS_NEW_OPTIONS` to a stringified JSON object containing the initialization parameters. See the [pg-boss documentation](https://github.com/timgit/pg-boss/tree/8.4.2/docs#newoptions).

Please note that setting `PG_BOSS_NEW_OPTIONS` environment variable overwrites all Wasp defaults, so you must include the `connectionString` parameter inside it as well.

For example, to set the connection string and change the job archival and deletion settings, you can set the environment variable like this:

```bash
# In an .env file
PG_BOSS_NEW_OPTIONS={"connectionString":"postgresql://user:password@server:5432/database","archiveCompletedAfterSeconds":86400,"deleteAfterDays":30,"maintenanceIntervalMinutes":5}

# In the shell
PG_BOSS_NEW_OPTIONS='{"connectionString":"postgresql://user:password@server:5432/database","archiveCompletedAfterSeconds":86400,"deleteAfterDays":30,"maintenanceIntervalMinutes":5}'
```

You can read more about escaping JSON in environment variables in the [JSON Env Vars documentation](https://wasp.sh/docs/project/env-vars#json-env-vars).

#### Database setup [​](https://wasp.sh/docs/advanced/jobs\#database-setup "Direct link to Database setup")

You don't need to set up the database manually

When using `PgBoss`, the database setup is automatically taken care of by the Wasp server, and doesn't need to be reflected in your schemas or migrations. The following information is given for your reference, and is explained in more detail in [the `PgBoss` documentation](https://github.com/timgit/pg-boss/blob/8.4.2/docs/readme.md).

All job data will be stored in a separate database schema called `pgboss`. It has some internal tracking tables, such as `job`, `archive`, and `schedule`. `PgBoss` tables have a `name` column in most tables that will correspond to your Job identifier. Additionally, these tables maintain arguments, states, return values, retry information, start and expiration times, and other metadata required by `PgBoss`.

#### Known issues [​](https://wasp.sh/docs/advanced/jobs\#known-issues "Direct link to Known issues")

- **Renaming scheduled jobs**

The job name/identifier in your `.wasp` file is the same name that will be used in the `name` column of `pgboss` tables. If you change a name that had a `schedule` associated with it, pg-boss will continue scheduling those jobs but they will have no handlers associated, and will thus become stale and expire. To resolve this, you can remove the applicable row from the `pgboss.schedule` table.

For example, if you renamed a job from `emailReminder` to `sendEmailReminder`, you would need to remove the old scheduled job with the following SQL query:





```sql
BEGIN;
DELETE FROM pgboss.schedule WHERE name = 'emailReminder';
COMMIT;
```









**Important:** Only modify the database directly if you're comfortable with SQL operations. If you're unsure, consider keeping the old job name or restarting with a fresh database in development.


#### Job data retention and cleanup [​](https://wasp.sh/docs/advanced/jobs\#job-data-retention-and-cleanup "Direct link to Job data retention and cleanup")

By default, `PgBoss` keeps job data for 12 hours after completion or failure. After that, it moves the data to an archive table, where it is kept for 7 days before being deleted. If you want to change this behavior, you can configure the `PG_BOSS_NEW_OPTIONS` environment variable to set custom values for job archival ( [`archivedCompletedAfterSeconds`/`archiveFailedAfterSeconds`](https://github.com/timgit/pg-boss/tree/8.4.2/docs#newoptions:~:text=v1%22%20or%20%22v4%22-,archiveCompletedAfterSeconds,-Specifies%20how%20long)) and removal ( [`deleteAfterSeconds`/`deleteAfterMinutes`/etc](https://github.com/timgit/pg-boss/tree/8.4.2/docs#newoptions:~:text=the%20skew%20warnings.-,Archive%20options,-When%20jobs%20in)).

```bash
PG_BOSS_NEW_OPTIONS={"connectionString":"...your postgress connection url...","archiveCompletedAfterSeconds":86400,"deleteAfterDays":30,"maintenanceIntervalMinutes":5}
```

## API Reference [​](https://wasp.sh/docs/advanced/jobs\#api-reference "Direct link to API Reference")

### Declaring Jobs [​](https://wasp.sh/docs/advanced/jobs\#declaring-jobs "Direct link to Declaring Jobs")

- JavaScript
- TypeScript

main.wasp

```wasp
job mySpecialJob {
  executor: PgBoss,
  perform: {
    fn: import { foo } from "@src/workers/bar",
    executorOptions: {
      pgBoss: {=json { "retryLimit": 1 } json=}
    }
  },
  schedule: {
    cron: "*/5 * * * *",
    args: {=json { "foo": "bar" } json=},
    executorOptions: {
      pgBoss: {=json { "retryLimit": 0 } json=}
    }
  },
  entities: [Task],
}
```

main.wasp

```wasp
job mySpecialJob {
  executor: PgBoss,
  perform: {
    fn: import { foo } from "@src/workers/bar",
    executorOptions: {
      pgBoss: {=json { "retryLimit": 1 } json=}
    }
  },
  schedule: {
    cron: "*/5 * * * *",
    args: {=json { "foo": "bar" } json=},
    executorOptions: {
      pgBoss: {=json { "retryLimit": 0 } json=}
    }
  },
  entities: [Task],
}
```

The Job declaration has the following fields:

- `executor: JobExecutor`required

The job executor to use for this job. Currently, the only supported executor is [`PgBoss`](https://wasp.sh/docs/advanced/jobs#pgboss).

- `perform: dict`required
  - `fn: ExtImport`required


    - An `async` function that performs the work. Since Wasp executes Jobs on the server, the import path must lead to a NodeJS file.
    - It receives the following arguments:
      - `args: Input`: The data passed to the job when it's submitted.
      - `context: { entities: Entities }`: The context object containing any declared entities.

Here's an example of a `perform.fn` function:

    - JavaScript
    - TypeScript

src/workers/bar.js

```js
export const foo = async ({ name }, context) => {
  console.log(`Hello ${name}!`)
  const tasks = await context.entities.Task.findMany({})
  return { tasks }
}
```

src/workers/bar.ts

```ts
import { type MySpecialJob } from 'wasp/server/jobs'

type Input = { name: string; }
type Output = { tasks: Task[]; }

export const foo: MySpecialJob<Input, Output> = async ({ name }, context) => {
  console.log(`Hello ${name}!`)
  const tasks = await context.entities.Task.findMany({})
  return { tasks }
}
```

Read more about type-safe jobs in the [Javascript API section](https://wasp.sh/docs/advanced/jobs#javascript-api).

  - `executorOptions: dict`

    Executor-specific default options to use when submitting jobs. These are passed directly through and you should consult the documentation for the job executor. These can be overridden during invocation with `submit()` or in a `schedule`.
    - `pgBoss: JSON`

      See the docs for [pg-boss](https://github.com/timgit/pg-boss/blob/8.4.2/docs/readme.md#sendname-data-options).
- `schedule: dict`
  - `cron: string`required

    A 5-placeholder format cron expression string. See rationale for minute-level precision [here](https://github.com/timgit/pg-boss/blob/8.4.2/docs/readme.md#scheduling).

    _If you need help building cron expressions, Check out_ _[Crontab guru](https://crontab.guru/#0_*_*_*_*)._

  - `args: JSON`

    The arguments to pass to the `perform.fn` function when invoked.

  - `executorOptions: dict`

    Executor-specific options to use when submitting jobs. These are passed directly through and you should consult the documentation for the job executor. The `perform.executorOptions` are the default options, and `schedule.executorOptions` can override/extend those.
    - `pgBoss: JSON`

      See the docs for [pg-boss](https://github.com/timgit/pg-boss/blob/8.4.2/docs/readme.md#sendname-data-options).
- `entities: [Entity]`

A list of entities you wish to use inside your Job (similar to [Queries and Actions](https://wasp.sh/docs/data-model/operations/queries#using-entities-in-queries)).


### JavaScript API [​](https://wasp.sh/docs/advanced/jobs\#javascript-api "Direct link to JavaScript API")

- Importing a Job:



  - JavaScript
  - TypeScript

someAction.js

```js
import { mySpecialJob } from 'wasp/server/jobs'
```

someAction.ts

```ts
import { mySpecialJob, type MySpecialJob } from 'wasp/server/jobs'
```

Type-safe jobs

Wasp generates a generic type for each Job declaration, which you can use to type your `perform.fn` function. The type is named after the job declaration, and is available in the `wasp/server/jobs` module. In the example above, the type is `MySpecialJob`.

The type takes two type arguments:

  - `Input`: The type of the `args` argument of the `perform.fn` function.
  - `Output`: The type of the return value of the `perform.fn` function.

- `submit(jobArgs, executorOptions)`


  - `jobArgs: Input`
  - `executorOptions: object`

Submits a Job to be executed by an executor, optionally passing in a JSON job argument your job handler function receives, and executor-specific submit options.

- JavaScript
- TypeScript

someAction.js

```js
const submittedJob = await mySpecialJob.submit({ job: "args" })
```

someAction.ts

```js
const submittedJob = await mySpecialJob.submit({ job: "args" })
```

- `delay(startAfter)`


  - `startAfter: int | string | Date`required

Delaying the invocation of the job handler. The delay can be one of:
  - Integer: number of seconds to delay. \[Default 0\]
  - String: ISO date string to run at.
  - Date: Date to run at.

- JavaScript
- TypeScript

someAction.js

```js
const submittedJob = await mySpecialJob
  .delay(10)
  .submit({ job: "args" }, { "retryLimit": 2 })
```

someAction.ts

```ts
const submittedJob = await mySpecialJob
  .delay(10)
  .submit({ job: "args" }, { "retryLimit": 2 })
```

#### Tracking [​](https://wasp.sh/docs/advanced/jobs\#tracking "Direct link to Tracking")

The return value of `submit()` is an instance of `SubmittedJob`, which has the following fields:

- `jobId`: The ID for the job in that executor.
- `jobName`: The name of the job you used in your `.wasp` file.
- `executorName`: The Symbol of the name of the job executor.

There are also some namespaced, job executor-specific objects.

- For pg-boss, you may access: `pgBoss`
  - `details()`: pg-boss specific job detail information. [Reference](https://github.com/timgit/pg-boss/blob/8.4.2/docs/readme.md#getjobbyidid)
  - `cancel()`: attempts to cancel a job. [Reference](https://github.com/timgit/pg-boss/blob/8.4.2/docs/readme.md#cancelid)
  - `resume()`: attempts to resume a canceled job. [Reference](https://github.com/timgit/pg-boss/blob/8.4.2/docs/readme.md#resumeid)

- [Using Jobs](https://wasp.sh/docs/advanced/jobs#using-jobs)
  - [Job Definition and Usage](https://wasp.sh/docs/advanced/jobs#job-definition-and-usage)
  - [Recurring Jobs](https://wasp.sh/docs/advanced/jobs#recurring-jobs)
- [Job executors](https://wasp.sh/docs/advanced/jobs#job-executors)
  - [`PgBoss`](https://wasp.sh/docs/advanced/jobs#pgboss)
- [API Reference](https://wasp.sh/docs/advanced/jobs#api-reference)
  - [Declaring Jobs](https://wasp.sh/docs/advanced/jobs#declaring-jobs)
  - [JavaScript API](https://wasp.sh/docs/advanced/jobs#javascript-api)

We use cookies primarily for analytics to enhance your experience. By accepting, you agree to our use of these cookies. You can manage your preferences or [learn more about our cookie policy](https://wasp.sh/privacy-policy).

Reject allAccept all