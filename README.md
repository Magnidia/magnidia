# Magnidia

Magnidia is an event ticketing and management platform, designed with users in mind.

## What do I Need to Install?

- Git
- VS Code
- Docker
- Node.js
  - npm install -g pnpm

## How do I set up the development environment?

### Cloning the Repository

GitHub Repository: https://github.com/Magnidia/magnidia

### VS Code

Although not necessarily required, it is highly recommended to use VS code for development of this project. Follow the following steps:

Open the project in VS code

- Import the code-profile in the root directory of the project
  - This is done to keep settings and extensions consistent between everyone
- Go to Settings > Profiles > Import Profile… and select the file called magnidia.code-profile
- Make sure git is setup within VS code on the left tab

### Install Modules

We also need to install our dependencies for this project before running anything else so please run the following command:

```bash
pnpm install
```

### Running Postgres Docker

Our database (PostgreSQL) currently runs on a docker container that you run as part of the dev environment. Either of the following works:

- Run the following command in terminal within the root project directory:

  ```bash
  docker compose up
  ```

- Open VS Code Run & Debug section and run “Postgres Container”

### Connecting to DB (optional)

Check if psql is installed in your terminal
Install it following this guide if not
Either of the following work:

- Run the following command

  ```bash
  psql -h localhost -p 5432 -U postgres -d magnidia_dev
  ```

- Open VS Code Run & Debug section and run “Connect to DB”
- You should now be able to run SQL queries

Run the following command to check current databases:

```bash
\dt
```

This is a good way to make sure everything is setup correctly within Docker

### Creating Environment File

We need to create a .env file in the root directory of the project. The reason we don’t commit this file to GitHub is because it can contain potentially sensitive information.

Follow the following steps:

- Create a file called .env in the root directory
- Copy and paste the code located in the #environment channel in Slack into this file

### Running Prisma Migrations

We also need to run migrations to setup the database once it is created in docker. After running migrations we also need to regenerate the Prisma client. Run the following commands in terminal:

```bash
pnpm prisma migrate deploy
pnpm prisma generate
```

### Running the Dev Server

The dev server runs the frontend code on localhost:3000, you will want to be running this whenever you are developing so that you can see live code changes.

Either of the following start the dev server:

- Run the following command:

  ```bash
  pnpm dev
  ```

- Open VS Code Run & Debug section and run “pnpm dev”
- Navigate to http://localhost:3000 and the dev server should be running

### Running the Chrome Debugger

Once the dev server is up and running, we want to use VS Code to boot up a Chrome instance that can be used as a debugger. This can be used to create breakpoints within the code itself. Do the following:

- Open VS Code Run & Debug section and run “Chrome”

## How do I Make Code Changes?

### GitHub Issues

Making any code changes starts with an issue in GitHub first. This issue will detail requirements and other specifications for the feature/bug/improvement that you are working on.

Project Board: https://github.com/orgs/Magnidia/projects/1

Once you have selected your issue you want to work on, the following steps must be taken:

- Create a new branch within the issue on GitHub
- Pull new branch to your local repository and checkout that branch
- Move the associated GitHub issue to “In Progress”
- Start coding!

### Merging Changes

Once you have finished coding your changes locally, you are going to want to push those changes to the GitHub repository on your branch and create a pull request.

- Push changes to GitHub repository
- Create a pull request and assign a reviewer
- Once it has been reviewed, merge that pull request in
- Move the associated GitHub issue to "Done"
