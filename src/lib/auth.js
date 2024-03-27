import { Lucia } from "lucia";
import { dev } from "$app/environment";
import { GitHub } from "arctic";
import { D1Adapter } from "@lucia-auth/adapter-sqlite";


export const getLucia = (context) => {
  const adapter = new D1Adapter(context.env.DB, {
    user: "user",
    session: "session"
  });
  return new Lucia(adapter);
};

export const getGithub = (context) => {
  new GitHub(
    context.secrets.GITHUB_CLIENT_ID,
    context.secrets.GITHUB_CLIENT_SECRET
  )
};

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