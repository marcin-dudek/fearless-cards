import { redirect } from "@sveltejs/kit";
import { generateState } from "arctic";
import { github } from "$lib/auth";

const GET = async (event) => {
  const state = generateState();
  const url = await github.createAuthorizationURL(state);

  event.cookies.set("github_oauth_state", state, {
    path: "/",
    secure: import.meta.env.PROD,
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax"
  });

  redirect(302, url.toString());
}

export default { GET };