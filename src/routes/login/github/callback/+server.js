import { OAuth2RequestError } from 'arctic';
import { generateId } from 'lucia';
import { getGithub, getLucia } from '$lib/auth';
import { serializeCookie } from 'oslo/cookie';

export const GET = async (context) => {
	let url = new URL(context.request.url);
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');
	const storedState = context.request.headers.get('Set-Cookie') ?? null;

	//console.log("url", context.request.url);
	//console.log("storedState", state, storedState);

	if (!code || !state) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await getGithub(context).validateAuthorizationCode(code);
		const githubUserResponse = await fetch('https://api.github.com/user', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});

		const githubUser = await githubUserResponse.json();
		console.log(githubUser);

		const db = context.platform.env.DB;
		const existingUser = await db.prepare('SELECT * FROM user WHERE auth_provider = "github" and foreign_id = ? limit 1')
			.bind(githubUser.id)
			.first();

		let userId = null;
		if (existingUser) {
			userId = existingUser.id;
		} else {
			userId = generateId(15);
			let insert = db.prepare('INSERT INTO user (id, username, auth_provider, foreign_id) VALUES (?, ?, ?, ?)');
			await insert.bind(userId, githubUser.login, 'github', githubUser.id).run();
		}

		const session = await getLucia(context).createSession(userId, {});
		const sessionCookie = getLucia(context).createSessionCookie(session.id);
		console.log(sessionCookie);

		context.request.headers.set('set-cookie', serializeCookie(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		}));

		console.log("Headers", context.request.headers);

		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	} catch (e) {
		console.log(e);
		if (e instanceof OAuth2RequestError) {
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
	}
};
