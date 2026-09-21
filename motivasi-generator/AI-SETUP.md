# AI Background Generation

NurMotivasi now supports AI-generated backgrounds. The browser sends the user's background prompt to /api/generate-image. The serverless endpoint calls OpenAI's Images API, then the image is combined with the quote in the browser. The existing Download PNG button exports the final composition.

## Vercel setup

1. Deploy the repository as a Vercel project.
2. Add an environment variable named OPENAI_API_KEY in Vercel Project Settings.
3. Redeploy.
4. Open /motivasi-generator/.

Never put the API key in browser-side JavaScript. The endpoint keeps it server-side.

The endpoint uses OpenAI's current image-generation model gpt-image-2.
