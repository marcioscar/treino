import { prisma } from "./prisma.server";

export const getExercicios = async (id: any) => {
  return prisma.treinos.findUnique({
    where: {
      id,
    },
  });
};

export const updateTreino = async (treino: any) => {
  const existe = await prisma.treinos.findFirst({
    where: {
      grupo: treino.grupo,
      semana: treino.semana,
    },
    select: {
      id: true,
    },
  });
  const idTreino = existe
    ? Object.values(existe).toString()
    : "000000000000000000000000";

  return prisma.treinos.upsert({
    where: {
      id: idTreino,
    },
    update: {
      exercicios: {
        push: {
          nome: treino.nome,
          Repeticoes: treino.repeticoes,
          carga: treino.carga,
          obs: treino.obs,
        },
      },
    },
    create: {
      grupo: treino.grupo,
      semana: treino.semana,
      exercicios: {
        nome: treino.nome,
        Repeticoes: treino.repeticoes,
        carga: treino.carga,
        obs: treino.obs,
      },
    },
  });
};
