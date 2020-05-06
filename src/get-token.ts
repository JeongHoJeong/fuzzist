export function getGistToken() {
  const token = Deno.env.get("GIST_TOKEN");
  if (!token) {
    console.error("GIST_TOKEN environmental variable not set.");
    console.error("Get a token here: https://github.com/settings/tokens");
    Deno.exit(1);
  }
  return token;
}
