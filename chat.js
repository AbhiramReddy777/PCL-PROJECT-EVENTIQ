const router = require('express').Router();
const Groq = require('groq-sdk');
const { verifyToken } = require('../middleware/auth');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are EventIQ, a friendly and knowledgeable AI event planning assistant for Indian consumers.

Your job is to help people plan events by providing clear, practical, itemised cost estimates in Indian Rupees (₹).

When a user describes an event:
1. Acknowledge what they want to plan warmly.
2. Provide a clear itemised cost breakdown using this exact HTML format for the table:
<div class="cost-table">
  <div class="cost-row"><span class="item">Item name</span><span class="price">₹X,XXX – ₹X,XXX</span></div>
  <div class="cost-row total"><span class="item">Estimated Total</span><span class="price">₹X,XXX – ₹X,XXX</span></div>
</div>
3. After the table, add 2–3 short practical tips to save money or improve the event.
4. End with a follow-up question like "Would you like me to adjust any of these items, or explore a specific category in more detail?"

Important rules:
- Always give realistic Indian market rates (not US/UK prices).
- If the user specifies a city, tailor costs to that city (metro cities like Mumbai/Delhi/Bangalore are more expensive; tier-2 cities like Pune/Jaipur/Lucknow are cheaper).
- Mention that costs vary by city and season where relevant.
- Keep your language warm, simple, and conversational — not formal or robotic.
- If the user gives a budget, work within it and flag if it's tight.
- Respond in plain HTML using only <p>, <strong>, <ul>, <li>, and the cost-table div format above. No markdown. No code blocks.
- Keep responses concise but complete. Don't pad or repeat yourself.`;

// ── POST /api/chat ────────────────────────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const { messages, city } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages array is required.' });
    }

    // Build system prompt — inject city context if provided
    let systemContent = SYSTEM_PROMPT;
    if (city && city !== 'India (general)') {
      systemContent += `\n\nThe user is planning an event in: ${city}. Tailor all cost estimates to that city.`;
    }

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1024,
      temperature: 0.7,
      messages: [
        { role: 'system', content: systemContent },
        ...messages
      ]
    });

    const reply = completion.choices?.[0]?.message?.content?.trim()
      || '<p>Sorry, I couldn\'t get a response. Please try again.</p>';

    res.json({ reply });
  } catch (err) {
    console.error('Chat error:', err);
    const status = err.status || 500;
    const message = err.error?.message || err.message || 'Something went wrong.';
    res.status(status).json({ error: message });
  }
});

module.exports = router;
