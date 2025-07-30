import React from "react";
import { Link} from "react-router-dom";

const Landing = () => {
  return (
    <>
      <nav class="bg-white  fixed w-full z-20 top-0 start-0 border-b border-gray-200 ">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="https://images.scalebranding.com/green-yoga-logo-ef0593e8-5c43-4eb3-a597-9c92970b30e9.jpg"
              class="h-8"
              alt="Flowbite Logo"
            />
            <span class="self-center text-2xl font-semibold whitespace-nowrap text-gray-700">
              Arvyax
            </span>
          </a>
          <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <Link to="/login">
            <button
              type="button"
              class="mx-2 text-white bg-[#349e7a] hover:bg-[#349e7a] focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 text-center"
            >
             Login
            </button>
            </Link>
             <Link to="/register">
            <button
              type="button"
              class="mx-2 text-white bg-[#349e7a] hover:bg-[#349e7a] focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 text-center"
            >
              Register
            </button>
            </Link>
          </div>
        </div>
      </nav>

       <div class=" bg-center bg-no-repeat bg-cover bg-[url('https://png.pngtree.com/thumb_back/fh260/background/20250512/pngtree-a-woman-sits-cross-legged-on-cushion-in-serene-forest-surrounded-image_17277214.jpg')] bg-gray-700 bg-blend-multiply">
        <div class="flex flex-col justify-center items-center text-center px-4 mx-auto max-w-screen-xl h-auto lg:h-screen py-24">
          <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
            Wellness Sessions for a Healthier You
          </h1>
          <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
            Discover guided sessions designed to support your mental, physical,
            and emotional well-being — accessible anytime, anywhere.
          </p>
          <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <Link
              to="/login"
             
              class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-white rounded-lg bg-[#349e7a] hover:bg-[#349e7a] focus:ring-4 focus:ring-blue-300"
            >
             Get Stated!
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
