import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://images.scalebranding.com/green-yoga-logo-ef0593e8-5c43-4eb3-a597-9c92970b30e9.jpg"
              className="h-8"
              alt="Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Arvyax
            </span>
          </a>

          {/* Right Section */}
          <div className="flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse">
            <button className="mx-2 text-white bg-[#349e7a] hover:bg-[#349e7a] focus:ring-4 font-medium rounded-lg text-sm px-4 py-2 text-center">
              Logout
            </button>

            {/* Toggle Button */}
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:ring-2 focus:ring-gray-200"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Menu */}
          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
              isMenuOpen ? "block" : "hidden"
            }`}
            id="navbar-language"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900">
              <li>
                <Link
                  to="/home"
                  className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#349e7a]"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  onClick={openModal}
                  className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#349e7a]"
                >
                  Account
                </Link>
              </li>
              <li>
                <Link
                  to="/myactivity"
                  className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#349e7a]"
                >
                  My Activity
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="fixed top-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            {/* Modal Content */}
            <div className="relative bg-white rounded-lg shadow">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b rounded-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">
                  My Account
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                >
                  <svg
                    className="w-3 h-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                    />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="p-4 space-y-4">
                <div class="flex flex-col items-center pb-10">
                  <img
                    class="w-24 h-24 mb-3 rounded-full shadow-lg"
                    src="/docs/images/people/profile-picture-3.jpg"
                    alt="Bonnie image"
                  />
                  <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    Bonnie Green
                  </h5>
                  <span class="text-sm text-gray-500 dark:text-gray-400">
                    Visual Designer
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
