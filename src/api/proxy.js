export default async function handler(req, res) {
  const backendUrl = `http://103.245.237.125:8080${req.url.replace('/api/proxy', '')}`;

  const response = await fetch(backendUrl, {
    method: req.method,
    headers: {
      'Content-Type': 'application/json',
      ...req.headers,
    },
    body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
  });

  const data = await response.text();
  res.status(response.status).send(data);
}
