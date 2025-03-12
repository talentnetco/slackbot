require('dotenv').config();
const { App } = require('@slack/bolt');

// Initialize the Slack app
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// Listen for messages containing "hello"
app.message('hello', async ({ message, say }) => {
  await say(`Hey there <@${message.user}>!`);
});

// Handle the /echo command
app.command('/echo', async ({ command, ack, respond }) => {
  // Acknowledge command request
  await ack();

  // Respond to the command
  await respond(`You said: ${command.text}`);
});

// Start the app
(async () => {
  const port = process.env.PORT || 3000;
  await app.start(port);
  console.log(`⚡️ Slackbot is running on port ${port}!`);
})();
