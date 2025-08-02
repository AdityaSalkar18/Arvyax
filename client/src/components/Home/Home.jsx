import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

const Home = () => {

  

  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/session/sessions"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch sessions");
        }
        const data = await response.json();
        setSessions(data);
      } catch (error) {
        console.error("Error fetching sessions:", error.message);
      }
    };

    fetchSessions();
  }, []);

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
         
        </div>
      </div>

      <div className="coantianer mx-auto px-4 py-8">
        <h2 class="text-4xl font-bold text-gray-700 text-center my-4">
          Continue With Session
        </h2>

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
                <p className="mb-3 font-normal text-gray-500">
                  {session.tag || "No tag provided."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      
    </>
  );
};

export default Home;
