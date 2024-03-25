import { Lucia } from "lucia";
import { dev } from "$app/environment";
import { GitHub } from "arctic";


export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: !dev
    }
  },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      githubId: attributes.github_id,
      username: attributes.username
    };
  }
});

//export const github = new GitHub("clientId", "clientSecret");
export const github = new GitHub(
  import.meta.env.GITHUB_CLIENT_ID,
  import.meta.env.GITHUB_CLIENT_SECRET
);

//https://lucia-auth.com/tutorials/github-oauth/sveltekit