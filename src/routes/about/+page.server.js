export const load = async (event) => {
  console.log("/about ", event.locals);
  return event.locals;
};
