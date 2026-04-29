export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Clé API manquante dans Vercel' });
  }

  try {
    const { prompt, model = 'mistral-large-latest' } = req.body;

    const mistralRes = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 4096
      })
    });

    const data = await mistralRes.json();
    if (!mistralRes.ok) return res.status(mistralRes.status).json(data);
    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: 'Erreur serveur', details: err.message });
  }
}
