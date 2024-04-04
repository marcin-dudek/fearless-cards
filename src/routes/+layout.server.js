export const load = async (event) => {
  console.log("/layout ", event.locals);
  return event.locals;
};