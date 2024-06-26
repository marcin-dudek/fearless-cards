import { getLucia } from '$lib/auth';

export const handle = async ({ event, resolve }) => {
  console.log('Auth hook - start');
  let lucia = getLucia(event);
  const sessionId = event.cookies.get(lucia.sessionCookieName);
  if (!sessionId) {
    console.log('Auth hook - (!sessionId)');
    event.locals.user = null;
    event.locals.session = null;
    return resolve(event);
  }

  const { session, user } = await lucia.validateSession(sessionId);
  if (session && session.fresh) {
    console.log('Auth hook - (session && session.fresh)');
    const sessionCookie = lucia.createSessionCookie(session.id);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes
    });
  }
  if (!session) {
    console.log('Auth hook - (!session)');
    const sessionCookie = lucia.createBlankSessionCookie();
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes
    });
  }

  event.locals.user = user;
  event.locals.session = session;
  console.log('Auth hook - resolve');
  return resolve(event);
};
