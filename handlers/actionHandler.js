const { buildModalWithL2, buildModalWithL3 } = require("../views/modalBuilder");

async function handleL1Select({ ack, body, client }) {
  await ack();

  const l1Value = body.actions[0].selected_option.value;

  await client.views.update({
    view_id: body.view.id,
    hash: body.view.hash,
    view: buildModalWithL2(l1Value),
  });
}

async function handleL2Select({ ack, body, client }) {
  await ack();

  const l2Value = body.actions[0].selected_option.value;
  const metadata = JSON.parse(body.view.private_metadata || "{}");
  const l1Value = metadata.l1;

  if (!l1Value) return;

  await client.views.update({
    view_id: body.view.id,
    hash: body.view.hash,
    view: buildModalWithL3(l1Value, l2Value),
  });
}

module.exports = { handleL1Select, handleL2Select };
