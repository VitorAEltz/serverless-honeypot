export function generateResponse(data: any, status: number = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function unauthorized(message: string = 'Unauthorized'): Response {
  return generateResponse({ error: message }, 401);
}

export function badRequest(message: string = 'Bad Request'): Response {
  return generateResponse({ error: message }, 400);
}

export function success(data: any): Response {
  return generateResponse(data, 200);
}
