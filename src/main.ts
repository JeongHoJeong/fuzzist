import { cyan } from "https://deno.land/std/fmt/colors.ts";

import { getGistToken } from "./get-token.ts";
import { Gist, GistDetail } from "./types.ts";

const token = getGistToken();
const { log } = console;

// https://developer.github.com/v3/gists/
async function githubAPI(path: string) {
  return fetch("https://api.github.com" + path, {
    method: "GET",
    headers: [
      ["Content-Type", "application/json"],
      ["User-Agent", "Deno-Fuzzist"],
      ["Authorization", `token ${token}`],
    ],
  });
}

const res = await githubAPI("/gists");

if (res.ok) {
  log(cyan("Fetched gists."));

  const body: Array<Gist> = await res.json();

  await Promise.all(body.map(async (gist) => {
    log(`Reading gist ${gist.id}`);
    const resp = await githubAPI(`/gists/${gist.id}`);
    const gistDetail: GistDetail = await resp.json();
    log(`Retrieved ${gistDetail.id}, ${gistDetail.description}`);
  }));
} else {
  log('Failed to fetch gists.')
}

// TODO: Store files in the user directory and index them.
// TODO: Provide a nice way to view & copy each gist content.
