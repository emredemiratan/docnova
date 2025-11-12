export const config = {
  runtime: 'edge',
};

const upstream = process.env.UPSTREAM_API_URL || 'https://api-dev.docnova.ai';

export default async function handler(req: Request) {
  const incomingUrl = new URL(req.url);
  const pathAfterProxy = incomingUrl.pathname.replace(/^\/api\/proxy/, '');
  const target = `${upstream}${pathAfterProxy}${incomingUrl.search}`;

  const method = req.method.toUpperCase();
  const isBodyless = method === 'GET' || method === 'HEAD';

  // Clone headers and strip problematic ones
  const forwardHeaders = new Headers(req.headers);
  forwardHeaders.delete('origin');
  forwardHeaders.delete('host');
  forwardHeaders.delete('referer');
  forwardHeaders.delete('x-forwarded-host');
  forwardHeaders.delete('x-forwarded-proto');

  const init: RequestInit = {
    method,
    headers: forwardHeaders,
    body: isBodyless ? undefined : await req.arrayBuffer(),
    redirect: 'manual',
  };

  const resp = await fetch(target, init);

  // Pass-through response
  const respHeaders = new Headers(resp.headers);
  // Optional: ensure CORS ok when accessed under same origin path
  respHeaders.delete('access-control-allow-origin');

  return new Response(resp.body, {
    status: resp.status,
    statusText: resp.statusText,
    headers: respHeaders,
  });
}


