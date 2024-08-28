import React from "react";
const Nav: React.FC = () => {
  return (
    <div className="bg-black h-screen text-white px-4 gap-6 py-6 w-max flex flex-col items-center">
      <button className="hover:bg-gray-800 px-2 py-2 rounded-xl">
        {" "}
        <i className="fas fa-user-circle text-2xl"></i>
      </button>
      <button className="hover:bg-gray-800 px-2 py-2 rounded-xl">
        <i className="fas fa-comments text-2xl"></i>
      </button>
    </div>
  );
};
export default Nav;
