import { Navbar } from "~/components/Navbar";
import { z } from "zod";
import { makeDomainFunction } from "domain-functions";
import { Form, performMutation } from "remix-forms";
import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { updateTreino } from "~/utils/treinos.server";
import { Outlet, useFetcher, useTransition } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { values } from "lodash";

const schema = z.object({
  grupo: z
    .string()
    .min(4, { message: "Descrição do grupo com no mínimo 4 caracteres" }),
  semana: z.number().min(1, { message: "Informe o número da Semana" }),
  nome: z.string().min(1, { message: "Informe o nome do exercício" }),
  repeticoes: z.string().min(1, { message: "Repetições do exercício" }),
  carga: z.string().min(1, { message: "Informe as cargas do exercício " }),
  obs: z.string(),
});
const mutation = makeDomainFunction(schema)(async (values) => {
  const treinos = await updateTreino(values);

  return treinos;
});

// export const action: ActionFunction = async ({ request }) =>
//   formAction({
//     request,
//     schema,
//     mutation,
//     successPath: `/cadastro/`,
//   });
export const action: ActionFunction = async ({ request }) => {
  const result = await performMutation({ request, schema, mutation });
  if (!result.success) return json(result, 400);

  // return json({ customName: result.data.id });

  return redirect(`/cadastro/${result.data.id}`);
};

export default function Cadastro() {
  let transition = useTransition();

  let adicionando = transition.state === "submitting";
  useEffect(() => {
    if (!adicionando) {
      console.log("limpando");
    }
  }, [adicionando]);

  return (
    <div className="w-full bg-stone-100 font-Roboto ">
      <Navbar />
      <div className="h-full mt-6 items-center flex flex-col gap-y-4">
        <h2 className="text-2xl font-extrabold text-slate-700">
          Cadastro de Exercício
        </h2>
        <div className="block p-6 rounded-lg shadow-lg bg-white w-3/4 ">
          <Form schema={schema}>
            {({ Field, Errors, Button, register }) => (
              <div className="grid grid-cols-2 gap-4">
                <Field name="grupo" label="Grupo">
                  {({ Label, Errors }) => (
                    <>
                      <div className="form-group ">
                        <Label
                          htmlFor="grupo"
                          className="form-label font-light inline-block  text-gray-400"
                        >
                          Grupo
                        </Label>

                        <select
                          // type="email"
                          {...register("grupo")}
                          className="rounded-md border-2 form-control block
                          w-full "
                        >
                          <option value="PEITORAL">PEITORAL</option>
                          <option value="OMBROS">OMBROS</option>
                          <option value="MEMBROS SUPERIORES 1">
                            MEMBROS SUPERIORES 1
                          </option>
                          <option value="COSTAS">COSTAS</option>
                          <option value="MEMBROS SUPERIORES 2">
                            MEMBROS SUPERIORES 2
                          </option>
                          <option value="BICEPS">BICEPS</option>
                          <option value="TRICEPS">TRICEPS</option>
                          <option value="QUADS">QUADS</option>
                          <option value="POSTERIORES DE COXAS">
                            POSTERIORES DE COXAS
                          </option>
                          <option value="GLUTEOS">GLUTEOS</option>
                          <option value="PANTURRILHA">PANTURRILHA</option>
                          <option value="ABDOME">ABDOME</option>
                          <option value="MEMBROS INFERIORES GERAL">
                            MEMBROS INFERIORES GERAL
                          </option>
                          <option value="MEMBROS SUPERIORES GERAL">
                            MEMBROS SUPERIORES GERAL
                          </option>
                        </select>
                        <Errors className="text-red-500" />
                      </div>
                    </>
                  )}
                </Field>
                <Field name="semana" label="Semana">
                  {({ Label, Errors }) => (
                    <>
                      <div className="form-group">
                        <Label className="form-label font-light inline-block  text-gray-400" />
                        <select
                          // type="number"
                          {...register("semana")}
                          className="rounded-md border-2 form-control block
                          w-full "
                        >
                          <option value="01">01 - (01/01 a 07/01)</option>
                          <option value="02">02 - (08/01 a 14/01)</option>
                          <option value="03">03 - (15/01 a 21/01)</option>
                          <option value="04">04 - (22/01 a 28/01)</option>
                          <option value="05">05 - (29/01 a 04/02)</option>
                          <option value="06">06 - (05/02 a 11/02)</option>
                        </select>
                        <Errors className="text-red-500" />
                      </div>
                    </>
                  )}
                </Field>
                <Field name="nome" label="Exercicio">
                  {({ Label, Errors }) => (
                    <>
                      <div className="form-group">
                        <Label className="form-label font-light inline-block  text-gray-400" />
                        <input
                          type="text"
                          {...register("nome")}
                          className="rounded-md border-2 form-control block
                          w-full "
                        />
                        <Errors className="text-red-500" />
                      </div>
                    </>
                  )}
                </Field>
                <Field name="repeticoes" label="Repetições">
                  {({ Label, Errors }) => (
                    <>
                      <div className="form-group ">
                        <Label className="form-label font-light inline-block  text-gray-400" />
                        <input
                          type="text"
                          {...register("repeticoes")}
                          className="rounded-md border-2 form-control block
                          w-full "
                        />
                        <Errors className="text-red-500" />
                      </div>
                    </>
                  )}
                </Field>
                <Field name="carga" label="Carga">
                  {({ Label, Errors }) => (
                    <>
                      <div className="form-group ">
                        <Label className="form-label font-light inline-block  text-gray-400" />
                        <input
                          type="text"
                          {...register("carga")}
                          className="rounded-md border-2 form-control block
                          w-full "
                        />
                        <Errors className="text-red-500" />
                      </div>
                    </>
                  )}
                </Field>
                <Field name="obs" label="Observação">
                  {({ Label, Errors }) => (
                    <>
                      <div className="form-group ">
                        <Label className="form-label font-light inline-block  text-gray-400" />
                        <input
                          type="text"
                          {...register("obs")}
                          className="rounded-md border-2 form-control block
                          w-full "
                        />
                        <Errors className="text-red-500" />
                      </div>
                    </>
                  )}
                </Field>
                <Errors />

                <Button
                  type="submit"
                  className="rounded-xl w-32 bg-green-600 px-3 py-2 text-white font-semibold hover:bg-green-800"
                >
                  {transition.state === "submitting"
                    ? "Cadastrando..."
                    : "Cadastrar"}
                </Button>
                {/* <Button
                  type="submit"
                  className="rounded-xl w-32 bg-blue-600  px-3 py-2 text-white font-semibold hover:bg-blue-800"
                >
                  Pesquisar
                </Button> */}
              </div>
            )}
          </Form>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
