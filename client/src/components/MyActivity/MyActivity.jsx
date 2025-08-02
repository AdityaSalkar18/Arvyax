import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";

const MyActivity = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [formData, setFormData] = useState({
    title: "",
    tag: "",
    sessionFile: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = "http://localhost:8080/api/session/my-sessions/save-draft";
      const formDataToSend = new FormData();

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

      alert("Session Added Successfully");
    } catch (error) {
      console.error("Error Session adding ", error);
      alert("Fialed to add Session");
    }
  };

  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/session/my-sessions",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setSessions(data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, []);

  const [isOpenUpdate, setIsOpenUpdate] = useState(false);

  const openModalUpdate = () => setIsOpenUpdate(true);

  const closeModalUpdate = () => setIsOpenUpdate(false);

  const [currentSessionId, setCurrentSessionId] = useState(null);

  const [formDataUpdate, setFormDataUpdate] = useState({
    title: "",
    tag: "",

    sessionFile: "",
  });

  const handleChangesUpdate = (e) => {
    const { name, value, files } = e.target;
    setFormDataUpdate({ ...formDataUpdate, [name]: files ? files[0] : value });
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:8080/api/session/my-sessions/${currentSessionId}`;
      const formDataToSend = new FormData();
      Object.entries(formDataUpdate).forEach(([key, vlaue]) => {
        formDataToSend.append(key, vlaue);
      });

      const response = await fetch(url, {
        method: "PATCH",
         headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const sessionsList = sessions.map((session) =>
        sessions._id === currentSessionId
          ? {
              ...session,
              title: formDataUpdate.title,
              tag: formDataUpdate.tag,

              sessionFile: formDataUpdate.sessionFile,
            }
          : session
      );
      setSessions(sessionsList);
      alert("Session updated Successfully")
    } catch (error) {
      console.error("Error to Update Property ", error);
      alert("Error update session")
    }
  };
  return (
    <>
      <Navbar />
      <div className="coantianer mx-auto px-4 py-8 ">
        <h2 class="text-4xl font-bold text-gray-700 text-center">My Session</h2>
        <h4 className="text-xl font-semibold text-center my-4">
          <Link
            to="#"
            onClick={openModal}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-[#349e7a]"
          >
            <IoMdAdd className="text-2xl" />
            Add Session
          </Link>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sessions.map((session) => (
            <div
              key={session._id}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <img
                className="rounded-t-lg w-full h-48 object-cover"
                src="https://png.pngtree.com/thumb_back/fh260/background/20250512/pngtree-a-woman-sits-cross-legged-on-cushion-in-serene-forest-surrounded-image_17277214.jpg"
                alt={session.title || "Session"}
              />

              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-700">
                  {session.title || "Untitled Session"}
                </h5>
                <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-1.5 rounded-lg dark:bg-green-900 dark:text-green-300">
                  
                  {session.status || "No status provided."}

                </span>
                
                <p className="mb-3 font-normal text-gray-500">
                  {session.tag || "No tag provided."}
                </p>
                <h4 className="text-right mt-4">
                  <Link
                    to="#"
                    onClick={() => {
                      setCurrentSessionId(session._id);
                      setFormDataUpdate({
                        title: session.title,
                        tag: session.tag,

                        sessionFile: session.sessionFile,
                      });
                      openModalUpdate();
                    }}
                    className="inline-block text-gray-500 hover:text-[#349e7a]"
                  >
                    <MdOutlineEdit className="text-2xl" />
                  </Link>
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {isOpen && (
          <div className="fixed top-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
              <div className="relative bg-white rounded-lg shadow">
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
                    <div className="mb-6">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        id="sessionFile"
                      >
                        sessionFile
                      </label>
                      <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                        type="file"
                        name="sessionFile"
                        accept=".json,application/json"
                        onChange={handleChange}
                      />
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                        Session.json
                      </p>
                    </div>

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

      <div className="container mx-auto px-4 py-8">
        {isOpenUpdate && (
          <div className="fixed top-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
              <div className="relative bg-white rounded-lg shadow">
                <div className="flex items-center justify-between p-4 border-b rounded-t border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Add Session Here
                  </h3>
                  <button
                    onClick={closeModalUpdate}
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

                <div className="p-4 space-y-4">
                  <form
                    onSubmit={handleSubmitUpdate}
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
                        value={formDataUpdate.title}
                        onChange={handleChangesUpdate}
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
                        value={formDataUpdate.tag}
                        onChange={handleChangesUpdate}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        id="sessionFile"
                      >
                        sessionFile
                      </label>
                      <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                        type="file"
                        name="sessionFile"
                        accept=".json,application/json"
                        onChange={handleChangesUpdate}
                      />
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                        Session.json
                      </p>
                    </div>

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

export default MyActivity;
