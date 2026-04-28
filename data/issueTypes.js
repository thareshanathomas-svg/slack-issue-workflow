const issueTypes = {
  perkeso: {
    label: "Statutory Deductions — Perkeso & EPF & Zakat",
    queue: "Dax-Payments-Perkeso & EPF & Zakat-MY",
    subIssues: {
      perkeso_socso: {
        label: "Perkeso/SOCSO Issue",
        l3: [{ label: "SOCSO registration, deduction and coverage issues (missing/incorrect/clarification)", value: "socso_reg" }],
      },
      perkeso_epf: {
        label: "EPF Issue",
        l3: [{ label: "EPF registration, update & deduction/contribution issues", value: "epf_reg" }],
      },
      perkeso_zakat: {
        label: "Zakat Issue",
        l3: [
          { label: "Zakat setting change (opt-in / opt-out / change contribution)", value: "zakat_setting" },
          { label: "Zakat deduction & eligibility issues", value: "zakat_deduction" },
        ],
      },
    },
  },

  pricing: {
    label: "Payout & Commission — Pricing",
    queue: "Dax-Payments-Pricing-MY",
    subIssues: {
      pricing_fare: {
        label: "Fare / Earnings Amount Issue",
        l3: [{ label: "Fare amount & earnings statement issues (trip/daily/weekly)", value: "fare_stmt" }],
      },
      pricing_incentive: {
        label: "Incentive / Bonus Amount Issue",
        l3: [{ label: "Incentive / bonus calculation incorrect", value: "pricing_inc_calc" }],
      },
      pricing_commission: {
        label: "Commission / Fees Issue",
        l3: [{ label: "Commission / GSF rate incorrect (city / tier / OKU / promo)", value: "commission_rate" }],
      },
      pricing_clarification: {
        label: "Pricing / Earnings Clarification",
        l3: [{ label: "Driver earnings calculation & surge/dynamic pricing explanation", value: "earnings_clarity" }],
      },
    },
  },

  wallet: {
    label: "Wallet & Top-Up",
    queue: "Dax-Payments-Wallet-MY",
    subIssues: {
      wallet_balance: {
        label: "Wallet Balance Issue",
        l3: [{ label: "GrabPay wallet balance & transaction issues", value: "wallet_bal_tx" }],
      },
      wallet_topup: {
        label: "Top-Up Not Reflected",
        l3: [{ label: "Wallet top-up not credited / not reflected", value: "topup_not_credited" }],
      },
    },
  },

  statements: {
    label: "Statements & E-Invoice",
    queue: "Dax-Payments-Statements & E-Invoice-MY",
    subIssues: {
      stmt_deduction: {
        label: "Deduction Statement",
        l3: [{ label: "Statutory, commission & platform fee breakdown request", value: "stmt_fee_breakdown" }],
      },
      stmt_trip: {
        label: "Trip History/Report",
        l3: [{ label: "Trip earnings report & fare details issues (missing/incomplete)", value: "stmt_trip_issue" }],
      },
    },
  },

  incentives: {
    label: "Incentives & Bonus",
    queue: "Dax-Payments-Incentives-MY",
    subIssues: {
      inc_not_received: {
        label: "Incentive Not Received",
        l3: [{ label: "Incentive not credited / missing from earnings", value: "inc_missing" }],
      },
      inc_calc: {
        label: "Incentive Calculation Dispute",
        l3: [{ label: "Incentive amount & calculation issues (underpaid/incorrect)", value: "inc_underpaid" }],
      },
      inc_eligibility: {
        label: "Incentive Eligibility",
        l3: [{ label: "Incentive eligibility, visibility & terms clarification", value: "inc_terms" }],
      },
      inc_referral: {
        label: "Referral Bonus",
        l3: [{ label: "Referral bonus & tracking issues", value: "referral_tracking" }],
      },
      inc_regulation: {
        label: "Regulation Reimbursement",
        l3: [{ label: "Driver sign-on & activation bonus issues", value: "signon_bonus" }],
      },
      inc_peak: {
        label: "Peak/Surge Bonus",
        l3: [{ label: "Peak hour, surge & zone bonus issues (not applied/unclear)", value: "peak_not_applied" }],
      },
      inc_performance: {
        label: "Performance Bonus",
        l3: [{ label: "Weekly performance, rating & driver tier bonus issues", value: "perf_bonus" }],
      },
      inc_promo: {
        label: "Promotion/Campaign Bonus",
        l3: [{ label: "Special promotion/campaign bonus & reward terms issues", value: "promo_bonus" }],
      },
    },
  },

  cashout: {
    label: "Cash-Out",
    queue: "Dax-Payments-Cashout-MY",
    subIssues: {
      co_failed: {
        label: "Cash-Out Failed",
        l3: [{ label: "Cash-out withdrawal technical issues (errors/not working)", value: "co_tech_error" }],
      },
      co_not_received: {
        label: "Cash-Out Not Received",
        l3: [{ label: "Cash-out completed but payout not received / delayed", value: "co_payout_missing" }],
      },
      co_delay: {
        label: "Cash-Out Delay",
        l3: [{ label: "Cash-out processing time & delay inquiry", value: "co_processing" }],
      },
      co_instant: {
        label: "Instant Cash-Out Issue",
        l3: [{ label: "Instant cash-out availability & failure issues", value: "co_instant_fail" }],
      },
      co_history: {
        label: "Cash-Out History",
        l3: [{ label: "Missing cash-out record or records", value: "co_missing_record" }],
      },
    },
  },

  bank: {
    label: "Bank Details Update",
    queue: "Dax-Payments-Bank Details Update-MY",
    subIssues: {
      bank_update: {
        label: "Bank Details Update Issues",
        l3: [{ label: "Cash-out bank account & transfer issues (wrong/failed/rejected)", value: "bank_transfer_issue" }],
      },
    },
  },
};

// Queues that show the Incentive Scheme ID field
const incentiveQueues = ["incentives", "pricing"];

module.exports = { issueTypes, incentiveQueues };
