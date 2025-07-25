import { NavbarData } from "../data/Navbar";
import { NavLink } from "react-router-dom";
import { ScrollText } from "lucide-react";

const Navbar = () => {
  return (
    <div className="w-full h-[45px] flex items-center p-4 bg-gray-800 gap-x-5 text-white">
      <ScrollText />
      <div className=" text-white font-medium text-xl">CodeDrops</div>
      <div className="flex items-center gap-x-5 mx-135 ">
        {NavbarData.map((link, idx) => (
          <NavLink
            key={idx}
            to={link.path}
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-semibold text-xl"
                : "text-white font-medium text-xl"
            }
          >
            {link.title}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
