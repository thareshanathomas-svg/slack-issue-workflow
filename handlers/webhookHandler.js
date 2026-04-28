const { buildInitialModal } = require("../views/modalBuilder");

async function handleWebhook(req, res, app) {
  const { trigger_id } = req.body;

  res.status(200).send();

  if (!trigger_id) {
    console.error("Webhook received without trigger_id — cannot open modal");
    return;
  }

  try {
    await app.client.views.open({
      trigger_id,
      view: buildInitialModal(),
    });
  } catch (err) {
    console.error("Failed to open modal:", err?.data?.error || err.message);
  }
}

module.exports = { handleWebhook };
