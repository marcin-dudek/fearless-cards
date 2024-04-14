export const load = async ({ platform, locals, url }) => {
  console.log('/[...id] user:', locals.user?.id);

  let collection = null;
  if (url.pathname.startsWith('/c/')) {
    const id = url.pathname.slice(3);
    console.log('collection id:', id);
    let teams = await getTeams(platform.env.DB, id);
    collection = await getCollection(platform.env.DB, id);
    collection.teams = teams;
  }

  console.log('collection:', collection);

  return {
    user: locals.user,
    session: locals.session,
    collection: collection
  };
};

const getCollection = async (db, id) => {
  const query = db.prepare('select id, name, owner, is_public, sort_order from collection where id = ?');
  let result = await query.bind(id).run();
  return result.results[0];
};

const getTeams = async (db, collectionId) => {
  const query = db.prepare('select id, collection_id, description from team where collection_id = ?');
  let result = await query.bind(collectionId).run();
  return result.results;
};
