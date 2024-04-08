export const load = async (event) => {
  console.log('/[..id] ', event.locals);
  return {
    user: event.locals.user,
    session: event.locals.session
  };
};
