/* eslint-disable no-unused-vars */
import { auth, googleProvider, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { Eye, EyeOff, Mail, Lock, Contact } from "lucide-react";
import { CoolAnimatedIllustration } from "../components/Animation";
import { motion } from "framer-motion";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      const userRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userRef);
      const userData = userDocSnap.data();
      const userName =
        userData?.username ?? user?.email?.split("@")[0] ?? "User";

      Swal.fire({
        icon: "success",
        title: "Signed in",
        text: `Welcome back, ${userName}!`,
      }).then(() => {
        navigate("/profile");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signInwithGoogle = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (!user) return new Error("No user found registered with this email");

      const useRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(useRef);

      if (docSnap.exists()) {
        Swal.fire({
          icon: "success",
          title: "Signed in",
          text: `Welcome back, ${user.displayName || user.email}!`,
        }).then(() => {
          navigate("/home");
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "Complete Your Registration",
          text: "We need a few more details to complete your profile.",
        }).then(() => {
          navigate("/register");
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };
  //     if (isLoading) return;
  //     setIsLoading(true);

  //     try {
  //       const result = await signInWithPopup(auth, googleProvider);
  //       const user = result.user;
  //       const useRef = doc(db , "user", user.id)
  //       const docScan = await getDoc(useRef);
  //       console.log("Google user object:", user);
  //       if (docScan.exists){
  //         Swal.fire({
  //         icon: "success",
  //         title: "Signed in",
  //         text: "Google sign-in successful!",
  //       }).then(() => {
  //         navigate('/home')
  //       })
  //       }else{
  //         await setDoc(useRef, {
  //         email: user.email || "",
  //         username: "",
  //         contact: "",
  //         createdAt: new Date(),
  //       });
  // console.log(user.email)
  // console.log("User object from Google SignIn:", result.user);
  //       Swal.fire({
  //         icon: "info",
  //         title: "Complete Your Profile",
  //         text: "Please finish your registration.",
  //       }).then(() => {
  //         navigate("/profile");
  //       });
  //       }

  //     } catch (error) {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error",
  //         text: error.message,
  //       });
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  return (
    // <div className="min-h-screen flex items-center justify-center bg-gradient-to-l from-[#010e22] via-black to-[#010e22] px-4 py-10">
    //   <div className="w-full max-w-md backdrop-blur-2xl p-8 rounded-2xl shadow-[0px_0px_20px_2px_green]  ring-1 ring-green-600 animate-fade-in-down transition-all duration-700">
    //     <h1 className="text-4xl font-extrabold text-center text-white mb-2 tracking-tight">
    //       Welcome
    //     </h1>
    //     <p className="text-sm text-green-400 text-center mb-6">
    //       Sign in to continue your cinematic journey 🎬
    //     </p>

    //     {/* Google Button */}
    //     <button
    //       onClick={signInwithGoogle}
    //       className="w-full flex items-center justify-center gap-2 text-blue-600 bg-transparent hover:border-2 border-green-600 hover:shadow-[0px_0px_10px_3px_green] font-medium py-2 px-4 rounded-lg mb-6 transition-transform duration-300 hover:scale-105"
    //     >
    //       <svg className="w-5 h-5" viewBox="0 0 48 48">
    //         <path
    //           fill="#EA4335"
    //           d="M24 9.5c3.54 0 6.36 1.47 8.27 3.41l6.12-6.11C34.82 3.18 29.84 1 24 1 14.88 1 7.36 6.85 4.33 14.44l7.45 5.79C13.32 14.16 18.26 9.5 24 9.5z"
    //         />
    //         <path
    //           fill="#34A853"
    //           d="M24 46c6.42 0 11.8-2.12 15.73-5.74l-7.4-6.05c-2.08 1.41-4.75 2.24-8.33 2.24-6.28 0-11.63-4.24-13.55-9.96l-7.53 5.85C7.45 40.91 15.07 46 24 46z"
    //         />
    //         <path
    //           fill="#4A90E2"
    //           d="M43.6 20.5H24v9h11.32c-1.15 2.94-3.04 5.1-5.6 6.6l7.4 6.05c4.34-3.98 6.88-9.86 6.88-16.15 0-1.23-.11-2.42-.3-3.5z"
    //         />
    //         <path
    //           fill="#FBBC05"
    //           d="M10.45 28.44c-.5-1.5-.77-3.1-.77-4.74s.27-3.24.76-4.74l-7.45-5.79C1.03 16.54 0 20.17 0 23.7c0 3.54 1.03 7.16 2.99 10.53l7.46-5.79z"
    //         />
    //       </svg>
    //       Sign in with Google
    //     </button>

    //     {/* Email */}
    //     <div className="relative mb-4 text-white">
    //       <label className="text-sm font-semibold">Email</label>
    //       <input
    //         type="email"
    //         placeholder="you@example.com"
    //         autoComplete="on"
    //         className="w-full mt-1 p-3 pl-10 rounded-lg bg-transparent border-2 border-blue-600 text-white focus:scale[1.25px] focus:outline-none focus:border-2 focus:border-green-600 focus:shadow-[0px_0px_10px_3px_green]"
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //       <Mail className="absolute left-3 top-11 text-yellow-200" size={20} />
    //     </div>

    //     {/* Password */}
    //     <label className="text-sm font-semibold text-white">Password</label>
    //     <div className="relative">
    //       <input
    //         type={showPassword ? "text" : "password"}
    //         placeholder="Password"
    //         onChange={(e) => setPassword(e.target.value)}
    //         required
    //         className="w-full mt-1 p-3 pl-10 pr-10 rounded-lg bg-transparent text-white border-2 border-blue-600 focus:scale[1.25px] focus:outline-none focus:border-2 focus:border-green-600 focus:shadow-[0px_0px_10px_3px_green]"
    //       />
    //       <Lock
    //         className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-200"
    //         size={20}
    //       />
    //       <button
    //         type="button"
    //         onClick={() => setShowPassword(!showPassword)}
    //         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-200 hover:text-white"
    //       >
    //         {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    //       </button>
    //     </div>

    //     {/* Submit */}
    //     <button
    //       onClick={handleSubmit}
    //       disabled={isLoading}
    //       className={`mt-15 w-full text-white py-3 rounded-lg font-semibold text-lg transform transition ${
    //         isLoading
    //           ? "bg-transparent  cursor-not-allowed"
    //           : "bg-transparent border-2 border-green-500 hover:shadow-[0px_0px_10px_3px_green] hover:scale-105"
    //       }`}
    //     >
    //       {isLoading ? "Signing In..." : "SignIn"}
    //     </button>

    //     {/* No Exisitng Account */}
    //     <p className="text-sm text-center text-gray-300 mt-4">
    //       Not having an account?{" "}
    //       <Link
    //         to="/register"
    //         className="text-blue-600 hover:text-white font-semibold transition duration-200"
    //       >
    //         Register
    //       </Link>
    //     </p>
    //   </div>
    // </div>

    <motion.div
      className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gradient-to-l from-[#010e22] via-black to-[#010e22] px-4 py-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      
        {/* 👈 Left Column - Login Form */}
        <div className="flex items-center justify-center">
          <CoolAnimatedIllustration />
        </div>

        {/* 👉 Right Column - Logo or Image */}
        <div className="hidden md:flex items-center justify-center">
          {/* <img
        src="/your-logo-or-illustration.png"
        alt="Brand Logo"
        className="max-w-md w-full object-contain p-4 animate-fade-in-up"
      /> */}
          
          <div className="w-full max-w-md h-130 backdrop-blur-2xl p-8 rounded-2xl shadow-[0px_0px_20px_2px_green]  ring-1 ring-green-600 animate-fade-in-down transition-all duration-700">
            <h1 className="text-4xl font-extrabold text-center text-white mb-2 tracking-tight">
              Welcome
            </h1>
            <p className="text-sm text-green-400 text-center mb-6">
              Sign in to continue your cinematic journey 🎬
            </p>

            {/* Google Button */}
            <button
              onClick={signInwithGoogle}
              className="w-full flex items-center justify-center gap-2 text-blue-600 bg-transparent hover:border-2 border-green-600 hover:shadow-[0px_0px_10px_3px_green] font-medium py-2 px-4 rounded-lg mb-6 transition-transform duration-300 hover:scale-105"
            >
              <svg className="w-5 h-5" viewBox="0 0 48 48">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.36 1.47 8.27 3.41l6.12-6.11C34.82 3.18 29.84 1 24 1 14.88 1 7.36 6.85 4.33 14.44l7.45 5.79C13.32 14.16 18.26 9.5 24 9.5z"
                />
                <path
                  fill="#34A853"
                  d="M24 46c6.42 0 11.8-2.12 15.73-5.74l-7.4-6.05c-2.08 1.41-4.75 2.24-8.33 2.24-6.28 0-11.63-4.24-13.55-9.96l-7.53 5.85C7.45 40.91 15.07 46 24 46z"
                />
                <path
                  fill="#4A90E2"
                  d="M43.6 20.5H24v9h11.32c-1.15 2.94-3.04 5.1-5.6 6.6l7.4 6.05c4.34-3.98 6.88-9.86 6.88-16.15 0-1.23-.11-2.42-.3-3.5z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.45 28.44c-.5-1.5-.77-3.1-.77-4.74s.27-3.24.76-4.74l-7.45-5.79C1.03 16.54 0 20.17 0 23.7c0 3.54 1.03 7.16 2.99 10.53l7.46-5.79z"
                />
              </svg>
              Sign in with Google
            </button>

            {/* Email */}
            <div className="relative mb-4 text-white">
              <label className="text-sm font-semibold">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                autoComplete="on"
                className="w-full mt-1 p-3 pl-10 rounded-lg bg-transparent border-2 border-blue-600 text-white focus:scale[1.25px] focus:outline-none focus:border-2 focus:border-green-600 focus:shadow-[0px_0px_10px_3px_green]"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Mail
                className="absolute left-3 top-11 text-yellow-200"
                size={20}
              />
            </div>

            {/* Password */}
            <label className="text-sm font-semibold text-white">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full mt-1 p-3 pl-10 pr-10 rounded-lg bg-transparent text-white border-2 border-blue-600 focus:scale[1.25px] focus:outline-none focus:border-2 focus:border-green-600 focus:shadow-[0px_0px_10px_3px_green]"
              />
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-200"
                size={20}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-200 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`mt-15 w-full text-white py-3 rounded-lg font-semibold text-lg transform transition ${
                isLoading
                  ? "bg-transparent  cursor-not-allowed"
                  : "bg-transparent border-2 border-green-500 hover:shadow-[0px_0px_10px_3px_green] hover:scale-105"
              }`}
            >
              {isLoading ? "Signing In..." : "SignIn"}
            </button>

            {/* No Exisitng Account */}
            <p className="text-sm text-center text-gray-300 mt-4">
              Not having an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:text-white font-semibold transition duration-200"
              >
                Register
              </Link>
            </p>
          </div>
        </div>

    </motion.div>
  );
};

export default Login;
