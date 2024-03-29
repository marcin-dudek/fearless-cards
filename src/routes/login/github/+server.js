import { redirect } from '@sveltejs/kit';
import { generateState } from 'arctic';
import { serializeCookie } from 'oslo/cookie';
import { getGithub } from '$lib/auth';

export const GET = async (context) => {
	const state = generateState();
	const github = getGithub(context);
	const url = await github.createAuthorizationURL(state);

	const cookie = serializeCookie('github_oauth_state', state, {
		secure: context.platform.env.IsProduction,
		path: '/',
		httpOnly: true,
		maxAge: 600,
		sameSite: 'lax'
	});

	context.request.headers.set('set-cookie', cookie);

	redirect(302, url.toString());
};
