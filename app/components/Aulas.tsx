import {
  FaSearch
} from "react-icons/fa";

export default function Aulas(props: any) {
  const { aulas } = props;
  const now = new Date();

  var horaCerta = "";
  if (now.getHours() < 10) {
    horaCerta = "0" + now.getHours();
  }
  if (now.getHours() >= 10) {
    horaCerta = now.getHours();
  }
  const hourFilter = aulas.filter(
    (classes: any) =>
      classes.start >= horaCerta.toString() &&
      classes.days.includes(now.getDay())
  );

  return (
    <>
      <div className="flex flex-wrap mt-2">
        <div className="p-2 w-full md:w-1/2">
          <div className="font-bold mb-2 p-1  mt-6 text-blue-500 text-center">
            PRÓXIMAS AULAS
          </div>
          <div className="overflow-x-auto relative">
            <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs  text-gray-700 uppercase bg-stone-100 dark:bg-gray-700 dark:text-gray-400">
                <tr className="rounded-lg">
                  <th scope="col" className="py-3 px-6 ">
                    Aulas
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Horário
                  </th>
                </tr>
              </thead>
              <tbody>
                {hourFilter.map((aula: any) => (
                  <tr key={aula.id} className="bg-white dark:bg-gray-800">
                    <th
                      scope="row"
                      className="py-4 px-6 flex gap-x-2 items-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <img
                        className="avatar h-8 w-8 rounded-full "
                        src={aula.icon}
                        alt={aula.turma}
                      />
                      {aula.turma}
                    </th>
                    <td className="py-4 px-6">
                      {aula.start} - {aula.finish}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-2 w-full md:w-1/2">
          <div className="mt-6 mb-2  text-blue-500 text-center">
          <div className="relative  md:w-1/2">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <FaSearch/>
          </div>
          
          
            <input
              type="search"
              id="search"
              // value={filtrar}
              // onChange={(e) => setFiltrar(e.target.value)}
              placeholder="Procurar Aula"
              className="block p-1  pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  "
            />
            </div>
          </div>
          <div className="overflow-x-auto relative">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-stone-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6 ">
                    Aulas
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Horário
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Apple MacBook Pro 17"
                  </th>
                  <td className="py-4 px-6">1</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Microsoft Surface Pro
                  </th>
                  <td className="py-4 px-6">1</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Magic Mouse 2
                  </th>
                  <td className="py-4 px-6">1</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="font-semibold text-gray-900 dark:text-white">
                  <th scope="row" className="py-3 px-6 text-base">
                    Total
                  </th>
                  <td className="py-3 px-6">3</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
