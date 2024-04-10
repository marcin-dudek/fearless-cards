export const load = async ({ locals, url }) => {
  console.log('/[...id] ', locals.user?.id);

  // let user = locals.user ?? null;
  // if (user !== null) {

  // }
  let collection = null;
  if (url.pathname.startsWith('/c/')) {
    collection = {
      id: url.pathname.slice(3),
      name: 'Collection ' + url.pathname.slice(3),
      public: true,
      teams: [
        { code: '[7498,7498,1266,6890,3046,3,2,2,3,1,1,1,14035]', sort_order: 1 },
        { code: '[7498,6726,7423,1426,3012,3,2,2,3,1,1,1,14035]', sort_order: 2 }
      ]
    };
  }

  //console.log('/[...id]', url)

  return {
    user: locals.user,
    session: locals.session,
    collection: collection
  };
};
