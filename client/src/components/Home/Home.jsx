import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [formData, setFormData] = useState({
    title: "",
    tag: "",
    status: "draft",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = "http://localhost:8080/api/session";
      const formDataToSend = new FormData();

      // Append form data
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await fetch(url, {
        method: "POST",
         headers: {
           
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },

        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // const data = await response.json();
      // console.log("Session added", data);
    } catch (error) {
      console.error("Error Session adding ", error);
    }
  };
  return (
    <>
      <Navbar />
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
              to="#"
              onClick={openModal}
              class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-white rounded-lg bg-[#349e7a] hover:bg-[#349e7a] focus:ring-4 focus:ring-blue-300"
            >
              Add Session
            </Link>
          </div>
        </div>
      </div>

      <div className="coantianer mx-auto px-4 py-8">
        <h2 class="text-4xl font-bold text-gray-700 text-center">
          Continue With Session
        </h2>

        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm ">
          <img
            class="rounded-t-lg"
            src="https://png.pngtree.com/thumb_back/fh260/background/20250512/pngtree-a-woman-sits-cross-legged-on-cushion-in-serene-forest-surrounded-image_17277214.jpg"
            alt=""
          />

          <div class="p-5">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-700 ">
              Noteworthy technology acquisitions 2021
            </h5>

            <p class="mb-3 font-normal text-gray-500 ">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
            {/* <a
              href="#"
              class="inline-flex items-center px-3 py-2 text-md font-medium text-center text-white bg-[#349e7a] hover:bg-[#349e7a] rounded-lg   "
            >
              View
            </a> */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {isOpen && (
          <div className="fixed top-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
              {/* Modal Content */}
              <div className="relative bg-white rounded-lg shadow">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b rounded-t border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Add Session Here
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
                  <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="p-4"
                  >
                    <div class="mb-6">
                      <label
                        for="title"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Session title
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>

                    <div class="mb-6">
                      <label
                        for="tags"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Tags
                      </label>
                      <input
                        type="text"
                        id="tag"
                        name="tag"
                        value={formData.tag}
                        onChange={handleChange}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>
                    <div class="mb-6">
                      <label
                        for="status"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Status
                      </label>
                      <input
                        type="text"
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       
                      />
                    </div>

                    {/* <div class="mb-6">
                      <label
                        for="jsonFile"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Upload JSON
                      </label>
                      <input
                        type="file"
                        id="sessionFile"
                        name="sessionFile"
                        onChange={handleChange}
                        accept=".json"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div> */}

                    <button
                      type="submit"
                      class="text-white bg-[#349e7a] hover:bg-[#349e7a] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Add
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
