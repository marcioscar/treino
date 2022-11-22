import { prisma } from "./prisma.server";

export const getAulas = async () => {
  return prisma.classes.findMany({
    orderBy: {
      start: "asc",
    },
  });
};
export const getAulasNome = async () => {
  return prisma.classes.findMany({
    orderBy: {
      turma: "asc",
    },
  });
};

export const getAulaId = async (id: string) => {
  return prisma.classes.findUnique({
    where: {
      id: id,
    },
  });
};

export const createAula = async (values: any, dias: any) => {
  var icone = values.classe + ".png";

  return prisma.classes.create({
    data: {
      start: values.inicio,
      finish: values.final,
      classe: values.classe,
      turma: values.turma,
      icon: icone,
      days: dias,
    },
  });
};

export const updateAula = async (values: any, dias: any) => {
  return prisma.classes.update({
    where: {
      id: values.id,
    },
    data: {
      start: values.inicio,
      finish: values.final,
      classe: values.classe,
      turma: values.turma,
      icon: values.icon,
      days: dias,
    },
  });
};

export const deleteAula = async (id: string) => {
  return prisma.classes.delete({
    where: {
      id: id,
    },
  });
};
