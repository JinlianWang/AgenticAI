# Guardrails Demo

This repository is a minimal example of using the [`@openai/guardrails`](https://www.npmjs.com/package/@openai/guardrails) SDK to wrap OpenAI responses with input/output checks. It loads guardrails from `guardrail_config.json`, sends a single prompt to GPT-5, and logs the resulting response or guardrail violation.

## Prerequisites

- Node.js 18+ (the sample was tested with Node 24)
- An OpenAI API key exported as `OPENAI_API_KEY`

## Installation

```
npm install
```

## Running the demo

```
export OPENAI_API_KEY=sk-...
node guardrail.js               # default: violent prompt to trigger moderation
node guardrail.js safe          # benign prompt that should pass
node guardrail.js "Custom text"   # run any custom prompt (quote if it has spaces)
# or set GUARDRAIL_PROMPT_PRESET=safe|violation and call node guardrail.js
```

The script prints coarse-grained request lifecycle logs, the generated text (for safe prompts), and the entire response payload. If a guardrail fires, the catch block prints the guardrail info instead.

## Example runs

```
# 1. Violent preset (triggers moderation guardrail before API call)
export GUARDRAIL_PROMPT_PRESET=violation
node guardrail.js

# 2. Safe preset (passes all guardrails and prints a quote)
node guardrail.js safe

# 3. Custom prompt with URL (URL filter input guardrail trips)
node guardrail.js "Summarize https://example.com"

# 4. Custom prompt that requests PII in the output (output guardrail blocks)
node guardrail.js "Invent a fictional character and include their phone number"
```

You can mix CLI args and the `GUARDRAIL_PROMPT_PRESET` environment variable—arguments always win if both are provided. Each run will either log the safe completion or print JSON for the guardrail that blocked the request, making it easy to observe how each rule behaves.

## Guardrail configuration

`guardrail_config.json` sets up:

- **Input guardrails**
  - `URL Filter`: rejects prompts containing URLs.
  - `Moderation`: blocks prompts flagged for the `hate` or `violence` categories.
- **Output guardrails**
  - `Contains PII`: scans model output for emails or phone numbers and blocks if detected.

Because the input prompt intentionally contains violent content, the moderation guardrail trips before the LLM call is sent, demonstrating how guardrails prevent disallowed content from being processed.

## Customizing

- Update `guardrail.js` to change the model, prompt, or logging.
- Edit `guardrail_config.json` to add/remove guardrails or tweak options (e.g., enable `detect_encoded_pii`).

## Troubleshooting

- **`OPENAI_API_KEY` missing**: ensure the environment variable is exported before running Node.
- **Network errors**: a sandboxed environment may block outbound requests; rerun with network access if needed.
- **Module warning**: the project already declares `"type": "module"`, so Node treats the script as ESM; ensure your Node version supports it.
