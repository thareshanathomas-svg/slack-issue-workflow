const { issueTypes } = require("../data/issueTypes");

async function handleModalSubmit({ ack, body, view, client }) {
  await ack();

  const values = view.state.values;
  const metadata = JSON.parse(view.private_metadata || "{}");

  const l1Key = values.block_queue?.action_queue_selected?.selected_option?.value || metadata.l1 || "N/A";
  const l2Key = values.block_subissue?.action_subissue_selected?.selected_option?.value || metadata.l2 || "N/A";
  const l3 = values.block_breakdown?.action_breakdown_selected?.selected_option?.text?.text || "N/A";

  const l1Data = issueTypes[l1Key];
  const queue = l1Data?.queue || "N/A";
  const l1Label = l1Data?.label || l1Key;
  const l2Label = l1Data?.subIssues?.[l2Key]?.label || l2Key;

  const driverId = values.block_driver_id?.input_driver_id?.value || "N/A";
  const zendeskId = values.block_zendesk_id?.input_zendesk_id?.value || "N/A";
  const bookingId = values.block_booking_id?.input_booking_id?.value || "N/A";
  const incentiveSchemeId = values.block_incentive_scheme_id?.input_incentive_scheme_id?.value || null;
  const explain = values.block_explain?.input_explain?.value || "N/A";
  const affectedDate = values.block_affected_date?.input_affected_date?.selected_date || "N/A";
  const actionDone = values.block_action_done?.input_action_done?.value || "N/A";
  const actionNeeded = values.block_action_needed?.input_action_needed?.value || "N/A";

  const submittedBy = body.user.id;
  const targetChannel = process.env.TARGET_CHANNEL_ID;

  const blocks = [
    {
      type: "header",
      text: { type: "plain_text", text: "New Issue Submitted", emoji: true },
    },
    { type: "divider" },
    {
      type: "section",
      fields: [
        { type: "mrkdwn", text: `*Queue*\n${queue}` },
        { type: "mrkdwn", text: `*L1 Symptom*\n${l1Label}` },
      ],
    },
    {
      type: "section",
      fields: [
        { type: "mrkdwn", text: `*L2 Symptom*\n${l2Label}` },
        { type: "mrkdwn", text: `*L3 Symptom*\n${l3}` },
      ],
    },
    { type: "divider" },
    {
      type: "section",
      fields: [
        { type: "mrkdwn", text: `*Driver ID*\n${driverId}` },
        { type: "mrkdwn", text: `*Zendesk ID*\n${zendeskId}` },
      ],
    },
    {
      type: "section",
      fields: [
        { type: "mrkdwn", text: `*Booking ID*\n${bookingId}` },
        { type: "mrkdwn", text: `*Affected Date*\n${affectedDate}` },
      ],
    },
  ];

  if (incentiveSchemeId) {
    blocks.push({
      type: "section",
      fields: [{ type: "mrkdwn", text: `*Incentive Scheme ID*\n${incentiveSchemeId}` }],
    });
  }

  blocks.push(
    { type: "divider" },
    {
      type: "section",
      text: { type: "mrkdwn", text: `*Issue Description*\n${explain}` },
    },
    {
      type: "section",
      text: { type: "mrkdwn", text: `*Action Done*\n${actionDone}` },
    },
    {
      type: "section",
      text: { type: "mrkdwn", text: `*Action Needed*\n${actionNeeded}` },
    },
    { type: "divider" },
    {
      type: "context",
      elements: [{ type: "mrkdwn", text: `Submitted by <@${submittedBy}>` }],
    }
  );

  await client.chat.postMessage({
    channel: targetChannel,
    text: `New issue report from <@${submittedBy}>: ${l1Label} > ${l2Label} > ${l3}`,
    blocks,
  });
}

module.exports = { handleModalSubmit };
