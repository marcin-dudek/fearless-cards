import { redirect } from '@sveltejs/kit';
import { generateState } from 'arctic';
import { getGithub } from '$lib/auth';

// @type RequestEvent
export const GET = async (context) => {
  const state = generateState();
  const github = getGithub(context);
  const url = await github.createAuthorizationURL(state);

  context.cookies.set('github_oauth_state', state, {
    secure: context.platform?.env?.IsProduction ?? true,
    path: '/',
    httpOnly: true,
    maxAge: 600,
    sameSite: 'lax'
  });
  redirect(302, url.toString());
};
