// Generated from docs/legal/source.md (m2cdev/App, legal/audit adcd3c3).
// Legal text is verbatim: edit only to resolve a [TBD], never to reword.
const doc = {
  "slug": "subprocessors",
  "title": "Mappy Sub-processor List",
  "dateLabel": "Last updated",
  "byline": "Map2Close Inc. · legal@map2close.com",
  "blocks": [
    {
      "type": "p",
      "text": "Map2Close uses the sub-processors below to provide Mappy. Each is bound by a written contract with data protection obligations at least as protective as our Data Processing Addendum, and AI and transcription providers are prohibited from training their models on customer data. We give at least 30 days' notice before adding a new sub-processor; to receive notices, ask your account administrator or email legal@map2close.com."
    },
    {
      "type": "table",
      "head": [
        "Sub-processor",
        "Purpose",
        "Customer data processed",
        "Location"
      ],
      "rows": [
        [
          "Vercel Inc.",
          "Cloud hosting and compute",
          "All Customer Data",
          "[TBD]"
        ],
        [
          "Railway Corporation",
          "Cloud hosting and compute",
          "All Customer Data",
          "[TBD]"
        ],
        [
          "Supabase, Inc.",
          "Database and file storage",
          "All Customer Data",
          "[TBD]"
        ],
        [
          "OpenAI",
          "Large language model (AI) processing",
          "Transcripts, CRM context, cards, prompts",
          "United States"
        ],
        [
          "Anthropic, PBC",
          "Large language model (AI) processing",
          "Transcripts, CRM context, cards, prompts",
          "United States"
        ],
        [
          "Deepgram, Inc.",
          "Speech-to-text transcription",
          "Call audio",
          "United States"
        ],
        [
          "Twilio Inc.",
          "Telephony and dialer",
          "Call audio, phone numbers",
          "United States"
        ],
        [
          "Resend, Inc.",
          "Transactional email",
          "Names, email addresses, message content",
          "[TBD]"
        ],
        [
          "Stripe, Inc.",
          "Payments",
          "Billing contact details (card data handled by the processor)",
          "[TBD]"
        ],
        [
          "Inngest, Inc.",
          "Background job orchestration",
          "Job data, which can include call transcripts, contact email addresses and phone numbers",
          "[TBD]"
        ],
        [
          "Apollo.io (ZenLeads, Inc.)",
          "Data enrichment",
          "Lead names, company names and domains, LinkedIn URLs",
          "[TBD]"
        ],
        [
          "FullEnrich",
          "Data enrichment",
          "Lead names, company names and domains, LinkedIn URLs, email addresses",
          "[TBD]"
        ],
        [
          "Verifalia",
          "Email verification",
          "The user's own sending email address",
          "[TBD]"
        ],
        [
          "[TBD] (Redis provider)",
          "Parallel dialer state and cache",
          "Prospect phone numbers and names, call identifiers",
          "[TBD]"
        ]
      ]
    },
    {
      "type": "p",
      "text": "Connected Accounts that a customer chooses to link, such as its CRM or calendar, are not our sub-processors; they act for the customer under the customer's own agreement with them."
    }
  ]
};

export default doc;
