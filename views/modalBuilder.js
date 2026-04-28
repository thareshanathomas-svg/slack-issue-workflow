const { issueTypes, incentiveQueues } = require("../data/issueTypes");

const queueOptions = Object.keys(issueTypes).map((key) => ({
  text: { type: "plain_text", text: issueTypes[key].label },
  value: key,
}));

function buildInitialModal() {
  return {
    type: "modal",
    callback_id: "issue_modal",
    title: { type: "plain_text", text: "Report an Issue" },
    submit: { type: "plain_text", text: "Submit" },
    close: { type: "plain_text", text: "Cancel" },
    private_metadata: JSON.stringify({}),
    blocks: [
      {
        type: "section",
        text: { type: "mrkdwn", text: "*Step 1 of 3* — Select a queue to get started." },
      },
      { type: "divider" },
      {
        type: "input",
        block_id: "block_queue",
        label: { type: "plain_text", text: "What is the issue about?" },
        element: {
          type: "static_select",
          action_id: "action_queue_selected",
          placeholder: { type: "plain_text", text: "Select a queue..." },
          options: queueOptions,
        },
        dispatch_action: true,
      },
      {
        type: "context",
        elements: [{ type: "mrkdwn", text: "Sub-issue and breakdown options will appear after you select a queue." }],
      },
    ],
  };
}

function buildModalWithL2(l1Value) {
  const l1 = issueTypes[l1Value];
  const subIssueOptions = Object.keys(l1.subIssues).map((key) => ({
    text: { type: "plain_text", text: l1.subIssues[key].label },
    value: key,
  }));

  return {
    type: "modal",
    callback_id: "issue_modal",
    title: { type: "plain_text", text: "Report an Issue" },
    submit: { type: "plain_text", text: "Submit" },
    close: { type: "plain_text", text: "Cancel" },
    private_metadata: JSON.stringify({ l1: l1Value }),
    blocks: [
      {
        type: "section",
        text: { type: "mrkdwn", text: `*Step 2 of 3* — Queue: \`${l1.queue}\`` },
      },
      { type: "divider" },
      {
        type: "input",
        block_id: "block_queue",
        label: { type: "plain_text", text: "What is the issue about?" },
        element: {
          type: "static_select",
          action_id: "action_queue_selected",
          options: queueOptions,
          initial_option: { text: { type: "plain_text", text: l1.label }, value: l1Value },
        },
        dispatch_action: true,
      },
      {
        type: "input",
        block_id: "block_subissue",
        label: { type: "plain_text", text: "Sub-issue" },
        element: {
          type: "static_select",
          action_id: "action_subissue_selected",
          placeholder: { type: "plain_text", text: "Select sub-issue..." },
          options: subIssueOptions,
        },
        dispatch_action: true,
      },
      {
        type: "context",
        elements: [{ type: "mrkdwn", text: "Breakdown options will appear after you select a sub-issue." }],
      },
    ],
  };
}

function buildModalWithL3(l1Value, l2Value) {
  const l1 = issueTypes[l1Value];
  const l2 = l1.subIssues[l2Value];

  const subIssueOptions = Object.keys(l1.subIssues).map((key) => ({
    text: { type: "plain_text", text: l1.subIssues[key].label },
    value: key,
  }));

  const l3Options = l2.l3.map((item) => ({
    text: { type: "plain_text", text: item.label },
    value: item.value,
  }));

  const showIncentiveField = incentiveQueues.includes(l1Value);

  const blocks = [
    {
      type: "section",
      text: { type: "mrkdwn", text: "*Step 3 of 3* — Fill in all details below. Fields marked * are required." },
    },
    { type: "divider" },
    { type: "header", text: { type: "plain_text", text: "Issue Classification" } },
    {
      type: "input",
      block_id: "block_queue",
      label: { type: "plain_text", text: "What is the issue about? *" },
      element: {
        type: "static_select",
        action_id: "action_queue_selected",
        options: queueOptions,
        initial_option: { text: { type: "plain_text", text: l1.label }, value: l1Value },
      },
      dispatch_action: true,
    },
    {
      type: "input",
      block_id: "block_subissue",
      label: { type: "plain_text", text: "Sub-issue *" },
      element: {
        type: "static_select",
        action_id: "action_subissue_selected",
        options: subIssueOptions,
        initial_option: { text: { type: "plain_text", text: l2.label }, value: l2Value },
      },
      dispatch_action: true,
    },
    {
      type: "input",
      block_id: "block_breakdown",
      label: { type: "plain_text", text: "Breakdown *" },
      element: {
        type: "static_select",
        action_id: "action_breakdown_selected",
        placeholder: { type: "plain_text", text: "Select breakdown..." },
        options: l3Options,
      },
    },
    { type: "divider" },
    { type: "header", text: { type: "plain_text", text: "Driver Details" } },
    {
      type: "input",
      block_id: "block_driver_id",
      label: { type: "plain_text", text: "Driver ID *" },
      element: {
        type: "plain_text_input",
        action_id: "input_driver_id",
        placeholder: { type: "plain_text", text: "e.g. D-123456789" },
      },
    },
    {
      type: "input",
      block_id: "block_zendesk_id",
      label: { type: "plain_text", text: "Zendesk ID" },
      hint: { type: "plain_text", text: "Fill in if DAX sent in a ticket or called in before" },
      optional: true,
      element: {
        type: "plain_text_input",
        action_id: "input_zendesk_id",
        placeholder: { type: "plain_text", text: "e.g. ZD-0000000" },
      },
    },
    {
      type: "input",
      block_id: "block_booking_id",
      label: { type: "plain_text", text: "Booking ID" },
      hint: { type: "plain_text", text: "Optional — fill in if relevant to the issue" },
      optional: true,
      element: {
        type: "plain_text_input",
        action_id: "input_booking_id",
        placeholder: { type: "plain_text", text: "e.g. B-xxxxxxxxxx" },
      },
    },
  ];

  if (showIncentiveField) {
    blocks.push({
      type: "input",
      block_id: "block_incentive_scheme_id",
      label: { type: "plain_text", text: "Incentive Scheme ID" },
      hint: { type: "plain_text", text: "Optional — fill in if DAX is asking about an incentive scheme" },
      optional: true,
      element: {
        type: "plain_text_input",
        action_id: "input_incentive_scheme_id",
        placeholder: { type: "plain_text", text: "e.g. INC-0000" },
      },
    });
  }

  blocks.push(
    { type: "divider" },
    { type: "header", text: { type: "plain_text", text: "Issue Details" } },
    {
      type: "input",
      block_id: "block_explain",
      label: { type: "plain_text", text: "Briefly explain the issue *" },
      element: {
        type: "plain_text_input",
        action_id: "input_explain",
        multiline: true,
        placeholder: { type: "plain_text", text: "Describe what happened..." },
        min_length: 10,
      },
    },
    {
      type: "input",
      block_id: "block_affected_date",
      label: { type: "plain_text", text: "Affected Date *" },
      element: {
        type: "datepicker",
        action_id: "input_affected_date",
        placeholder: { type: "plain_text", text: "Select date" },
      },
    },
    {
      type: "input",
      block_id: "block_action_done",
      label: { type: "plain_text", text: "What action have you done? *" },
      element: {
        type: "plain_text_input",
        action_id: "input_action_done",
        multiline: true,
        placeholder: { type: "plain_text", text: "e.g. Checked the wallet, verified transaction history..." },
        min_length: 5,
      },
    },
    {
      type: "input",
      block_id: "block_action_needed",
      label: { type: "plain_text", text: "What action do we need? *" },
      element: {
        type: "plain_text_input",
        action_id: "input_action_needed",
        multiline: true,
        placeholder: { type: "plain_text", text: "e.g. Please escalate to billing team to investigate..." },
        min_length: 5,
      },
    }
  );

  return {
    type: "modal",
    callback_id: "issue_modal",
    title: { type: "plain_text", text: "Report an Issue" },
    submit: { type: "plain_text", text: "Submit" },
    close: { type: "plain_text", text: "Cancel" },
    private_metadata: JSON.stringify({ l1: l1Value, l2: l2Value }),
    blocks,
  };
}

module.exports = { buildInitialModal, buildModalWithL2, buildModalWithL3 };
