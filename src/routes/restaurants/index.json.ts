import type { RequestHandler } from "@sveltejs/kit";
import { api } from "./_api";

export const get: RequestHandler = (request) => {
  return api(request);
};

export const post: RequestHandler<{}, FormData> = (request) => {
  const data = Object.fromEntries(request.body);
  return api(request, data);
};
