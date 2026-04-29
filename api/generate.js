export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Clé API non configurée' });
  }

  try {
    const { prompt, model = 'mistral-large-latest' } = req.body;

    // Appel avec streaming activé
    const mistralRes = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content: `Tu es un expert WordPress senior. Tu génères du code propre, sécurisé et conforme aux standards WordPress.org.
Règles impératives :
- Utilise toujours esc_html(), esc_attr(), wp_kses() pour échapper les outputs
- Utilise wp_nonce_field() et check_admin_referer() pour la sécurité
- Utilise sanitize_text_field(), sanitize_email() pour les inputs
- Structure le code avec des fonctions courtes et documentées
- Ajoute des commentaires PHPDoc
- Génère un thème WordPress complet et fonctionnel`
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 4096,
        stream: true // ✅ Activation du streaming
      })
    });

    if (!mistralRes.ok) {
      const error = await mistralRes.json();
      return res.status(mistralRes.status).json(error);
    }

    // Retourne le stream directement au client
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const reader = mistralRes.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');
      
      for (const line of lines) {
        if (line.startsWith(' ')) {
          const data = line.slice(6);
          if (data === '[DONE]') {
            res.write('data: [DONE]\n\n');
          } else {
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices[0]?.delta?.content || '';
              if (content) {
                res.write(` ${JSON.stringify({ content })}\n\n`);
              }
            } catch (e) {
              // Ignore parsing errors
            }
          }
        }
      }
    }

    res.end();

  } catch (err) {
    return res.status(500).json({ error: 'Erreur serveur', details: err.message });
  }
}
