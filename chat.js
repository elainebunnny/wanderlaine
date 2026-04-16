// Vercel serverless function: POST /api/chat
// Proxies chat to Anthropic's Messages API using the ANTHROPIC_API_KEY env var.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    res.status(200).json({
      reply:
        "Hi! The AI chat isn't configured yet — the site owner needs to add an ANTHROPIC_API_KEY environment variable in Vercel. In the meantime, try browsing the Explore tab for personal recommendations ✨"
    })
    return
  }

  try {
    const { summary, messages } = req.body || {}

    const systemPrompt = `You are Wanderlaine's friendly AI travel concierge. You help visitors explore Elaine's personal travel journal.

IMPORTANT RULES:
- ONLY recommend places that exist in the collection below. Do not invent places or recommend anything outside this list.
- When you recommend a place, briefly mention what makes it special based on Elaine's review.
- Be warm, concise, and specific. Use emojis sparingly (1-2 per message max).
- If asked about a destination not in the collection, say so honestly and suggest the closest alternative from the list.
- If asked for logistics (booking, reservations), refer to the pro tips when available.

ELAINE'S PLACES & ITINERARIES:
${summary || '(no places loaded)'}
`

    const apiRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt,
        messages: messages || []
      })
    })

    if (!apiRes.ok) {
      const errText = await apiRes.text()
      console.error('Anthropic API error:', apiRes.status, errText)
      res.status(200).json({
        reply: "Sorry — I'm having trouble reaching my brain right now. Please try again in a moment."
      })
      return
    }

    const data = await apiRes.json()
    const reply = (data.content || [])
      .filter((c) => c.type === 'text')
      .map((c) => c.text)
      .join('\n')
      .trim()

    res.status(200).json({ reply: reply || "Hmm, I didn't catch that. Could you try rephrasing?" })
  } catch (err) {
    console.error('chat handler error:', err)
    res.status(200).json({
      reply: "Something went sideways on my end — please try again!"
    })
  }
}
