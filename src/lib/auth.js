import { Lucia } from 'lucia';
import { GitHub } from 'arctic';
import { D1Adapter } from '@lucia-auth/adapter-sqlite';

export const getLucia = (context) => {
  const adapter = new D1Adapter(context.platform.env.DB, {
    user: 'user',
    session: 'session'
  });
  return new Lucia(adapter, {
    sessionCookie: {
      attributes: {
        secure: context.platform.env.IsProduction
      }
    },
    getUserAttributes: (attributes) => {
      return {
        id: attributes.id,
        username: attributes.username,
        avatar_url: attributes.avatar_url
      };
    }
  });
};

export const getGithub = (context) => {
  return new GitHub(context.platform.env.Github_ClientId, context.platform.env.Github_Secret);
};
