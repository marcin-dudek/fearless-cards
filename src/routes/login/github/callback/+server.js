import { OAuth2RequestError } from 'arctic';
import { generateId } from 'lucia';
import { getGithub, getLucia } from '$lib/auth';
import { serializeCookie } from 'oslo/cookie';

export const GET = async (context) => {
	let url = new URL(context.request.url);
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');
	const cookie = context.cookies.get('github_oauth_state') ?? null;
	const session_cookie = context.cookies.get('auth_session') ?? null;

	console.log("state  = ", state);
	console.log("cookie = ", cookie);
	console.log("session_cookie = ", session_cookie);

	if (session_cookie) {
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	}

	if (!code || !state || !cookie || state !== cookie) {
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

		const db = context.platform.env.DB;
		const existingUser = await db.prepare('SELECT * FROM user WHERE auth_provider = "github" and foreign_id = ? limit 1')
			.bind(githubUser.id)
			.first();

		let userId = null;
		if (existingUser) {
			userId = existingUser.id;
			let update = db.prepare('UPDATE user SET username = ?, avatar_url = ? WHERE id = ?');
			await update.bind(githubUser.name ?? githubUser.login, githubUser.avatar_url, userId).run();
		} else {
			userId = generateId(15);
			let insert = db.prepare('INSERT INTO user (id, username, auth_provider, foreign_id, avatar_url) VALUES (?, ?, ?, ?, ?)');
			await insert.bind(userId, githubUser.name ?? githubUser.login, 'github', githubUser.id.toString(), githubUser.avatar_url).run();
		}

		const session = await getLucia(context).createSession(userId, {});
		const sessionCookie = getLucia(context).createSessionCookie(session.id);

		return new Response(null, {
			status: 302,
			headers: {
				Location: '/',
				'Set-Cookie': serializeCookie(sessionCookie.name, sessionCookie.value, {
					path: '.',
					...sessionCookie.attributes
				})
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
