"use client"
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm();

  const hello = async (x) => {
    try {
      const data = await axios.post('http://localhost:8080/api/auth/signup', {
        email: x.Username,
        password: x.Password
      });

      if (data.status === 200 || data.status === 201) {
        toast('User successfully registered, Redirecting to Login Page!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          onClose: () => { router.push('/Login'); }
        });
      } else {
        alert("User couldn't be registered");
      }
    } catch (error) {
      alert(error.response?.data || error.message);
    }
  }

  return (
    <div className="bg-gradient-to-br from-green-800 via-green-600 to-green-400 w-screen h-screen flex justify-center items-center">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="w-[400px] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8">
        <h1 className="text-center font-bold text-4xl text-white mb-8">KisaanConnect</h1>
        <h2 className="text-center text-lg text-green-100 mb-8">Create your account</h2>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit(hello)}>
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white 
                       focus:outline-none focus:ring-2 focus:ring-lime-300 
                       placeholder:text-gray-200 border border-white/20"
            {...register("Username", { required: true })}
          />
          {errors.Username && (
            <p className="text-red-300 text-sm mt-1">Username is required</p>
          )}

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white 
                       focus:outline-none focus:ring-2 focus:ring-lime-300 
                       placeholder:text-gray-200 border border-white/20"
            {...register("Password", { required: true })}
          />
          {errors.Password && (
            <p className="text-red-300 text-sm mt-1">Password is required</p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-lime-400 hover:bg-lime-500 
                       transition text-gray-900 font-semibold shadow-lg"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
