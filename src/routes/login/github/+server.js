import { redirect } from "@sveltejs/kit";
import { generateState } from "arctic";
import { getGithub } from "$lib/auth";

export const GET = async (context) => {
  const state = generateState();
  const github = getGithub(context);
  const url = await github.createAuthorizationURL(state, { redirectURI: "http://localhost:5173/login/github/callback" });

  context.request.headers.set("set-cookie", `github_oauth_state=${state}; secure=false; Path=/; HttpOnly=true; MaxAge=600; SameSite=Lax`);
  console.log("state", state);
  // console.log(context.request.headers);
  redirect(302, url.toString());
}
