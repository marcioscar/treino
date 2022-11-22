import { NavLink } from "@remix-run/react";

export function Navbar() {
  const activeClassName = "text-orange-500";
  const NoaActiveClassName = "text-orange-white";
  return (
    <nav className="bg-black text-white border-gray-200 px-2  sm:px-4 py-2.5  ">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <NavLink to="/" className="flex items-center">
          <img
            src="/logo_branco.svg"
            className="mr-3 h-10 sm:h-9"
            alt="Quattor Logo"
          />
        </NavLink>
        <div className="flex space-x-8 font-light">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeClassName : NoaActiveClassName
            }
          >
            HOME
          </NavLink>
          <NavLink
            to="/aluno"
            className={({ isActive }) =>
              isActive ? activeClassName : NoaActiveClassName
            }
          >
            TREINOS
          </NavLink>
          {/* <NavLink
            to="/cadastro"
            className={({ isActive }) =>
              isActive ? activeClassName : NoaActiveClassName
            }
          >
            CADASTRO
          </NavLink>
          <NavLink
            to="/cadaulas"
            className={({ isActive }) =>
              isActive ? activeClassName : NoaActiveClassName
            }
          >
            AULAS
          </NavLink> */}
        </div>
      </div>
    </nav>
  );
}
