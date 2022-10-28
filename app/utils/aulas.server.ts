import { prisma } from "./prisma.server";

export const getAulas = async () => {
  return prisma.classes.findMany({
    orderBy: {
      start: "asc",
    },
  });
};
