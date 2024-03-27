import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { getGithub, getLucia } from "$lib/auth";

const onRequestGet = async (context) => {
  const code = context.request.url.searchParams.get("code");
  const state = context.request.url.searchParams.get("state");
  const storedState = context.request.cookies.get("github_oauth_state") ?? null;

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400
    });
  }

  try {
    const tokens = await getGithub(context).validateAuthorizationCode(code);
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`
      }
    });
    const githubUser = await githubUserResponse.json();

    // Replace this with your own DB client.
    const existingUser = await context.env.DB.prepare("SELECT * FROM user WHERE github_id = ? limit 1")
      .bind(githubUser.id)
      .first();

    let userId = null;
    if (existingUser) {
      userId = existingUser.id;
    } else {
      userId = generateId(15);

      let insert = context.env.DB.prepare("INSERT INTO user (id, username, github_id) VALUES (?, ?, ?)");
      await insert.bind(userId, githubUser.login, githubUser.id).run();
    }

    const session = await getLucia(context).createSession(userId, {});
    const sessionCookie = getLucia(context).createSessionCookie(session.id);
    context.request.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    });

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/"
      }
    });
  } catch (e) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400
      });
    }
    return new Response(null, {
      status: 500
    });
  }
}

export default { onRequestGet };