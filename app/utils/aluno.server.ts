import { prisma } from "./prisma.server";
import axiosAPI from "axios";
const EVO_AUTH = process.env.NEXT_PUBLIC_EVO_AUTH;

export const getAluno = async (matricula: number) => {
  const aluno = await axiosAPI(
    `https://evo-integracao.w12app.com.br/api/v1/members/${matricula}`,

    {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(EVO_AUTH as string),
      },
    }
  );

  return aluno.data;
};

export const getTreinos = async (semana: number) => {
  return prisma.treinos.findMany({
    where: {
      semana: semana,
    },
  });
};

export const updateHistorico = async (historico: any) => {
  return prisma.historico.upsert({
    where: {
      aluno: parseInt(historico.aluno),
    },
    update: {
      treinos: {
        push: {
          treino: historico.treino,
          data: new Date(),
        },
      },
    },
    create: {
      aluno: parseInt(historico.aluno),
      treinos: {
        treino: historico.treino,
        data: new Date(),
      },
    },
  });
};

export const getHistorico = async (historico: any) => {
  return prisma.historico.findUnique({
    where: {
      aluno: parseInt(historico),
    },
  });
};
