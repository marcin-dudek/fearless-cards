import { OAuth2RequestError } from 'arctic';
import { generateId } from 'lucia';
import { getGithub, getLucia } from '$lib/auth';

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
		console.log(context.platform);
		const githubUser = await githubUserResponse.json();
		// console.log(githubUser);

		const existingUser = await context.platform.DB.prepare(
			'SELECT * FROM user WHERE github_id = ? limit 1'
		)
			.bind(githubUser.id)
			.first();

		console.log(context.platform);
		let userId = null;
		if (existingUser) {
			userId = existingUser.id;
		} else {
			userId = generateId(15);

			let insert = context.platform.DB.prepare(
				'INSERT INTO user (id, username, github_id) VALUES (?, ?, ?)'
			);
			await insert.bind(userId, githubUser.login, githubUser.id).run();
		}

		const session = await getLucia(context).createSession(userId, {});
		const sessionCookie = getLucia(context).createSessionCookie(session.id);
		console.log(sessionCookie);

		context.request.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

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
