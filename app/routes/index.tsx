import { Navbar } from "~/components/Navbar";
import { FaMapMarkedAlt, FaWhatsapp, FaClock } from "react-icons/fa";
import Aulas from "~/components/Aulas";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getAulas } from "~/utils/aulas.server";
import { useLoaderData } from "@remix-run/react";
import Eventos from "~/components/Eventos";

export const loader: LoaderFunction = async ({ request }) => {
  const TodasAulas = await getAulas();
  return json({ TodasAulas });
};

export default function Index() {
  const { TodasAulas } = useLoaderData();

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-[#2BC0E4] to-[#EAECC6]">
        {/* <div className="bg-gradient-to-r from-[#8e9eab] to-[#eef2f3]"> */}
        <div className="text-gray-600 body-font bg-no-repeat min-h-screen bg-contain bg-center bg-[url('/bola50.svg')]">
          <div className="container mx-auto content-center  py-6 px-2 md:px-0 md:grid md:gap-x-6  md:gap-y-4 md:grid-cols-3">
            <div className="bg-white/75  py-6 mb-2 flex flex-col items-center rounded-lg  drop-shadow-2xl  min-h-96 max-h-96">
              <div className="flex  items-center mb-3">
                <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-orange-500 text-white flex-shrink-0">
                  <FaMapMarkedAlt />
                </div>
                <h2 className="text-gray-900 text-lg title-font font-medium">
                  Onde Estamos
                </h2>
              </div>

              <div className="text-center ">
                <p className="font-semibold">Rua 5 Sul - Águas Claras - DF</p>
                <div className=" ">
                  <a
                    href="https://wa.me/5561993190568"
                    className="mt-2  font-semibold inline-flex items-center "
                  >
                    <FaWhatsapp className="text-green-600 text-2xl mr-2 " />
                    (61) 99319-0568
                  </a>
                  <a href="https://wa.me/5561993190568">
                    <button className="bg-green-400 tracking-tighter ml-5 px-2 py-1  text-white inline-flex items-center space-x-2 rounded">
                      <FaWhatsapp />
                      <span>Aula experimental</span>
                    </button>
                  </a>
                </div>
              </div>
              <div className="flex mt-10  items-center mb-3">
                <div className="w-8 h-8  mr-3 inline-flex items-center justify-center rounded-full bg-blue-500 text-white flex-shrink-0">
                  <FaClock />
                </div>
                <h2 className="text-gray-900 text-lg title-font font-medium">
                  Horário de Funcionamento
                </h2>
              </div>
              <div className="flex-grow text-center">
                <p className="leading-relaxed ">
                  <span className=" text-gray-900 ">Segunda a Sexta:</span>{" "}
                  6:00h às 23:00h
                </p>
                <p className="leading-relaxed  ">
                  <span className=" text-gray-900 ">Sábados e Feriados:</span>{" "}
                  8:00h às 12:00h
                </p>
              </div>
            </div>
            <div className="bg-white/75 overflow-auto rounded-lg mb-2 max-h-96 min-h-96 drop-shadow-2xl col-span-2">
              <Aulas aulas={TodasAulas} />
            </div>
            <div className="mb-2 ">
              <img src="/black_musc.jpg" alt="black musc" />
            </div>
            <div className="mb-2">
              <img src="/black_pillates.jpg" alt="black pilates" />
            </div>
            <div className="mb-2">
              <img src="/black_judo.jpg" alt="black pilates" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
