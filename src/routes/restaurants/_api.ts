import type { Request } from "@sveltejs/kit";
import PrismaClient from "$lib/prisma";

const prisma = new PrismaClient();

export const api = async (request: Request, data?: Record<string, unknown>) => {
  let body = {};
  let status = 500;

  switch (request.method.toUpperCase()) {
    case "GET":
      if (request.query.has("rid")) {
        body = await prisma.restaurant.findUnique({
          where: {
            id: Number(request.query.get("rid")),
          },
        });
      } else {
        body = await prisma.restaurant.findMany();
      }
      status = 200;
      break;
    case "POST":
      body = await prisma.restaurant.create({
        data: {
          name: data.name as string,
          location: data.location as string,
          rating: data.rating as number,
        },
      });
      status = 201;
      break;
    case "DELETE":
      body = await prisma.restaurant.delete({
        where: {
          id: Number(request.params.id),
        },
      });
      status = 200;
      break;
    case "PATCH":
      body = await prisma.restaurant.update({
        where: {
          id: Number(request.params.id),
        },
        data: {
          location: data.location,
          rating: data.rating,
        },
      });
      status = 200;
      break;

    default:
      break;
  }

  if (
    request.method.toUpperCase() !== "GET" &&
    request.headers.accept !== "application/json"
  ) {
    return {
      status: 303,
      headers: {
        location: "/",
      },
    };
  }

  return {
    status,
    body,
  };
};
