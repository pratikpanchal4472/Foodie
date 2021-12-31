import type { Request } from "@sveltejs/kit";
import PrismaClient from "$lib/prisma";

const prisma = new PrismaClient();

export const api = async (request: Request, data?: Record<string, unknown>) => {
  let body = {};
  let status = 500;

  switch (request.method.toUpperCase()) {
    case "GET":
      body = await prisma.menuItem.findMany({
        where: {
          restaurantId: Number(request.query.get("rid")),
        },
      });
      status = 200;
      break;
    case "POST":
      body = await prisma.menuItem.create({
        data: {
          name: data.name as string,
          category: data.category as string,
          unitPrice: data.rating as number,
          restaurantId: data.restaurantId as number
        },
      });
      status = 201;
      break;
    case "DELETE":
      body = await prisma.menuItem.delete({
        where: {
          id: Number(request.params.id),
        },
      });
      status = 200;
      break;
    case "PATCH":
      body = await prisma.menuItem.update({
        where: {
          id: Number(request.params.id),
        },
        data: {
          unitPrice: data.unitPrice,
          name: data.name,
          category: data.category,
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
