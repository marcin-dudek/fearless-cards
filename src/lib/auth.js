import { Lucia } from 'lucia';
import { GitHub } from 'arctic';
import { D1Adapter } from '@lucia-auth/adapter-sqlite';

export const getLucia = (context) => {
	const adapter = new D1Adapter(context.env.DB, {
		user: 'user',
		session: 'session'
	});
	return new Lucia(adapter);
};

export const getGithub = (context) => {
	return new GitHub(context.platform.env.Github_ClientId, context.platform.env.Github_Secret);
};
