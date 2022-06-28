import React from "react";

const Navbar = ({ onNavChange, filterValue, onFilterChange }) => {
  return (
    <div className="navbar bg-base-300 w-full sm:w-1/2 mx-auto rounded-xl my-4">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Pokedex</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control hidden md:grid">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered"
            value={filterValue}
            onChange={(e) => onFilterChange(e.target.value)}
          />
        </div>
        <ul className="menu menu-horizontal p-0">
          <li tabIndex="0">
            <a>
              Region
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
            <ul className="p-2 bg-base-300">
              <li>
                <a onClick={() => onNavChange("kanto")}>Kanto</a>
              </li>
              <li>
                <a onClick={() => onNavChange("original-johto")}>Johto</a>
              </li>
              <li>
                <a onClick={() => onNavChange("hoenn")}>Hoenn</a>
              </li>
              <li>
                <a onClick={() => onNavChange("original-sinnoh")}>Sinnoh</a>
              </li>
              <li>
                <a onClick={() => onNavChange("original-unova")}>Unova</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
