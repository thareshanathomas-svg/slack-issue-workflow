require("dotenv").config();
const { App, ExpressReceiver } = require("@slack/bolt");
const { handleWebhook } = require("./handlers/webhookHandler");
const { handleL1Select, handleL2Select } = require("./handlers/actionHandler");
const { handleModalSubmit } = require("./handlers/submissionHandler");

const receiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver,
});

receiver.router.post("/webhook", (req, res) => {
  handleWebhook(req, res, app);
});

app.action("action_queue_selected", handleL1Select);
app.action("action_subissue_selected", handleL2Select);
app.view("issue_modal", handleModalSubmit);

(async () => {
  const port = process.env.PORT || 3000;
  await app.start(port);
  console.log(`Slack Issue Workflow app running on port ${port}`);
})();
