import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link} from "react-router-dom";

const Login = () => {
   const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg || "Login failed");
        return;
      }

     
      localStorage.setItem("token", data.token);
    
      navigate("/home"); 
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login");
    }
  };

  return (
    <>
    <div className="container mx-auto min-h-screen flex items-center justify-center px-4 py-8">
       
  <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 ">
   
      <div>
        <img
              src="https://images.scalebranding.com/green-yoga-logo-ef0593e8-5c43-4eb3-a597-9c92970b30e9.jpg"
              class="h-8"
              alt="Flowbite Logo"
            />
              <span class="self-center text-2xl font-bold whitespace-nowrap text-gray-700">
              Arvyax
            </span>

      </div>
        
     <form className="space-y-6" onSubmit={handleSubmit}>
      <h5 className="text-xl font-medium text-gray-900">Login to our platform</h5>

      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
          Your email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="name@company.com"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div>

      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
          Your password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div>

      <div className="flex items-start">
        <a href="#" className="ms-auto text-sm text-[#349e7a] hover:underline">
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        className="w-full text-white bg-[#349e7a] hover:bg-[#349e7a] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Login
      </button>

      <div className="text-sm font-medium text-gray-500">
        Not registered?{" "}
        <a href="/register" className="text-[#349e7a] hover:underline">
          Create account
        </a>
      </div>
    </form>
  </div>
</div>

    </>
  )
}

export default Login