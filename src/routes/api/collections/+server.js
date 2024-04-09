
/** @type {import('./$types').RequestHandler} */
export const GET = async ({ cookies }) => {
  console.log('ctx.auth', cookies.get('auth_session'));
  let session = cookies.get('auth_session');
  if (session !== null) {
    let result = [{ id: 'asdf1', name: 'Collection 1', public: true }, { id: 'asdf2', name: 'Collection 2', public: false }, { id: 'asdf3', name: 'Collection 3', public: false }];
    return new Response(JSON.stringify(result));
  }

  return new Response(JSON.stringify([]));
}

export const POST = async ({ locals, request, cookies }) => {
  let session = cookies.get('auth_session');
  console.log('ctx.auth', session);
  const body = await request.json();
  console.log('body', body);
  if (session === locals.session.id) {
    console.log('session matched');
    return new Response('OK');
  }

  return new Response('Unauthorized', { status: 401 });
}