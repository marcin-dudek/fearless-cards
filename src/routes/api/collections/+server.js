
/** @type {import('./$types').RequestHandler} */
export const GET = async (ctx) => {
  console.log('ctx.auth', ctx.cookies.get('auth_session'));
  let session = ctx.cookies.get('auth_session');
  if (session !== null) {
    let result = [{ id: 'asdf1', name: 'Collection 1', public: true }, { id: 'asdf2', name: 'Collection 2', public: false }, { id: 'asdf3', name: 'Collection 3', public: false }];
    return new Response(JSON.stringify(result));
  }

  return new Response(JSON.stringify([]));
}
