import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Form,
  Link,
  Outlet,
  useLoaderData,
  useTransition,
} from "@remix-run/react";

import {
  getAluno,
  getHistorico,
  getTreinos,
  updateHistorico,
} from "../../utils/aluno.server";
import { getWeek } from "date-fns";
import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";
import { useEffect, useRef, useState } from "react";
import _ from "lodash";
import {
  FaCheck,
  FaSyncAlt,
  FaDumbbell,
  FaExclamationCircle,
} from "react-icons/fa";
import { FiVideo } from "react-icons/fi";
import { Navbar } from "~/components/Navbar";

type grupo = {
  grupo: string;
  id: string;
  exercicios: [];
  semana: number;
};
//Loader dos dados dos alunos e  treinos da semana atual
export const loader: LoaderFunction = async ({ request, params }) => {
  const aluno = await getAluno(Number(params.treino));
  const treinosGrupo = await getTreinos(getWeek(new Date()));
  const historicoTreinos = await getHistorico(Number(params.treino));
  return json({ aluno, treinosGrupo, historicoTreinos });
};
export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  let values = Object.fromEntries(form);
  await updateHistorico(values);

  return redirect(`aluno/${values.aluno}`);
};

export default function Treino() {
  const { aluno, treinosGrupo, historicoTreinos } = useLoaderData();
  const [grupo, setGrupo] = useState();
  const [treino, setTreino] = useState();
  const [checked, setChecked] = useState([]);
  const transition = useTransition();
  const ultimosTreinos = _.takeRight(historicoTreinos?.treinos, 3);

  const handleGrupo = (event: any) => {
    setGrupo(event.target.value);
    // setChecked([]);
    var inputs = document.querySelectorAll("[id=done]");
    for (var i = 0; i < inputs.length; i++) {
      // @ts-ignore
      inputs[i].checked = false;
    }
  };

  const handleCheck = (event: any) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      // @ts-ignore
      updatedList = [...checked, event.target.value];
    } else {
      // @ts-ignore
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }

    setChecked(updatedList);
  };

  var isChecked = (item: any) =>
    // @ts-ignore
    checked.includes(item)
      ? "bg-green-300 mb-2  font-light  p-2 rounded-lg  shadow-md"
      : "bg-stone-100 mb-2  font-light  p-2 rounded-lg  ";

  var isCheckedTitle = (item: any) =>
    // @ts-ignore
    checked.includes(item)
      ? "text-decoration-line: line-through   "
      : "text font-medium text-green-600  ";

  useEffect(() => {
    setTreino(
      // @ts-ignore
      _.filter(treinosGrupo, ["grupo", grupo])
    );
  }, [grupo, treinosGrupo]);
  const textInput = useRef(null);

  return (
    <>
      <Outlet />
      <Navbar />
      <div className=" px-2 mx-auto ">
        <div className="text-center">
          <img
            src={aluno.photo}
            className="rounded-full shadow-lg w-24 h-24 m-4 mx-auto"
            alt="Avatar"
          />
          <h5 className="text-xl  leading-tight mb-2">
            {aluno.firstName} {aluno.lastName} -{" "}
            <span className="font-mono text-gray-400"> {aluno.idMember}</span>
          </h5>
          {ultimosTreinos && (
            <>
              <h2 className="  text-blue-600 rounded-md  text-md mt-4">
                ÚLTIMOS TREINOS
              </h2>
              <div className="text-gray-500 grid  gap-2 grid-cols-3">
                {ultimosTreinos.map((u: any, index) => (
                  <div key={index} className="">
                    <div className="mt-1 mb-4  py-2 px-2 rounded-md my-4">
                      <div className="font-semibold text-blue-600">
                        {u.treino}
                      </div>
                      <div>
                        {format(new Date(u.data), "EEEEEE - dd/MM", {
                          locale: ptBR,
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className=" max-w-lg flex mx-auto ">
          <select
            className="form-select block  justify-center w-full px-3 py-1.5 font-light text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
            aria-label="Selecione o treino"
            defaultValue="Selecione o Treino"
            value={grupo}
            // @ts-ignore
            onChange={handleGrupo}
          >
            <option>Selecione o Treino</option>
            {treinosGrupo.map((grupo: grupo) => (
              <option key={grupo.grupo} value={grupo.grupo}>
                {grupo.grupo}
              </option>
            ))}
          </select>
        </div>

        {grupo && (
          <Form method="post">
            <input readOnly hidden type="text" name="treino" value={grupo} />
            <input
              hidden
              type="number"
              name="aluno"
              defaultValue={aluno.idMember}
            />

            <div className=" block justify-center mx-auto max-w-xl ">
              <div className="flex flex-row  justify-evenly  font-bold text-orange-500 items-center m-2 text-xl">
                {grupo}
                <button className="bg-blue-500   inline-flex gap-3 items-center px-3 py-2 text-sm shadow-sm font-medium tracking-wider border text-white rounded-md  hover:shadow-lg hover:bg-green-800">
                  <FaCheck />

                  {transition.state === "submitting"
                    ? "Atualizando..."
                    : "Feito"}
                </button>
              </div>
            </div>

            {
              // @ts-ignore
              treino?.map((e: any, index: any) => (
                <div
                  className=" grid  gap-2 sm:grid-cols-2 lg:grid-cols-3  "
                  key={index}
                >
                  {e.exercicios.map((exe: any, index: any) => (
                    <div className={isChecked(exe.nome)} key={index}>
                      <div className="flex mb-2 flex-row justify-between ">
                        <div className={isCheckedTitle(exe.nome)}>
                          {exe.nome}
                        </div>

                        <input
                          className=" w-6 h-6 accent-green-500 mr-4"
                          value={exe.nome}
                          type="checkbox"
                          onChange={handleCheck}
                          id="done"
                          name="done"
                          ref={textInput}
                        />
                      </div>
                      <div className="flex mb-2 shrink-0 items-center content-around  ">
                        <FaSyncAlt className="shrink-0 mr-3 " />
                        {exe.Repeticoes}
                      </div>
                      <div className="flex  mb-2  items-center content-around lowercase">
                        <FaDumbbell className=" shrink-0 mr-3" />
                        {exe.carga}
                      </div>

                      <div className="flex mb-2  shrink-0 items-center content-around lowercase ">
                        <FaExclamationCircle className="shrink-0 mr-3" />
                        {exe.obs}
                      </div>
                      {exe.video !== null && (
                        <div className=" flex justify-end  text-l mr-4 text-white ">
                          <Link
                            className="bg-orange-300 rounded-lg px-6 p-2 "
                            to={`${exe.video}`}
                          >
                            <FiVideo />
                          </Link>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))
            }
          </Form>
        )}
      </div>
    </>
  );
}
