import { generateId } from 'lucia';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ platform, cookies, locals }) => {
  console.log('GET /api/collections', locals.user.id);
  let session = cookies.get('auth_session');
  if (session !== null && locals.user !== null) {
    const query = platform.env.DB.prepare(
      'select id, name, owner, is_public, sort_order from collection where owner = ?'
    );
    let result = await query.bind(locals.user.id).run();
    //console.log('result', result);
    return new Response(JSON.stringify(result.results));
  }

  return new Response(JSON.stringify([]));
};

export const POST = async ({ platform, locals, request, cookies }) => {
  console.log('POST /api/collections', locals.user.id);
  let session = cookies.get('auth_session');
  console.log('ctx.auth', session);
  const body = await request.json();
  console.log('body', body);

  if (session !== null && session === locals.session.id) {
    const id = generateId(12);
    await platform.env.DB.prepare(
      'INSERT INTO collection (id, name, owner, is_public, sort_order) VALUES (?, ?, ?, ?, ?)'
    )
      .bind(id, body.name, locals.user.id, body.is_public, 1)
      .run();

    console.log('session matched');
    return new Response('OK');
  }

  return new Response('Unauthorized', { status: 401 });
};
