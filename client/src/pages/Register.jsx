import React from "react";
import { db } from "../config/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { errorSwal, infoSwal, successSwal, warningSwal } from "../utils/customSwal";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Phone, User, Lock } from "lucide-react";
import { RegisterAnimation } from '../components/Animation2'

function Register() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (username && password && confirmPassword && email) {
      if (password === confirmPassword) {
        setIsLoading(true); // <-- Start loading

        try {
          const userCredentials = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userCredentials.user;

          await setDoc(doc(db, "users", user.uid), {
            username: username,
            contact: contact,
            email: email,
            uid: user.uid,
            createdAt: new Date(),
          });

          successSwal.fire({
  icon: "success",
  title: `Registered Successfully`,
  text: `Welcome, ${username}!`,
});

          navigate("/home");
        } catch (error) {
          if (error.code === "auth/email-already-in-use") {
            warningSwal.fire({
              icon: "warning",
              title: "Email Already Registered",
              text: "Try signing in instead.",
            }).then(() => {
              navigate("/"); // Navigate after user closes the alert
            });
          } else {
            errorSwal.fire({
              icon: "error",
              title: "Registration Failed",
              text: error.message,
            });
          }
        } finally {
          setIsLoading(false); // <-- Stop loading no matter what
        }
      } else {
        warningSwal.fire({
          icon: "warning",
          title: "Password Mismatch",
          text: "Passwords do not match!",
        });
      }
    } else {
      infoSwal.fire({
        icon: "info",
        title: "Missing Fields",
        text: "Please fill in all required fields.",
      });
    }
  };

  const signInwithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // Create empty shell for profile if user is new
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          createdAt: new Date(),
        });
        navigate("/profile");
      } else {
        const data = userSnap.data();
        if (!data.username || !data.contact) {
          navigate("/profile");
        } else {
          navigate("/home");
        }
      }

      successSwal.fire({
        icon: "success",
        title: "Signed in with Google!",
      });
    } catch (error) {
      console.error("Google sign-in error:", error);
      errorSwal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gradient-to-l from-[#010e22] via-black to-[#010e22] px-4 py-10">
      
      {/* Left Column - Animated Illustration */}
      <div className="hidden md:flex items-center justify-center ">
        <RegisterAnimation />
      </div>

      {/* Right Column - Registration Form */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md backdrop-blur-2xl h-165 p-8 rounded-2xl shadow-[0px_0px_20px_2px_green] ring-1 ring-green-600 animate-fade-in-down transition-all duration-700">
          
          {/* Title & Tagline */}
          <h1 className="text-4xl font-extrabold text-center text-white mb-1 tracking-tight">
            Create Account
          </h1>
          

          {/* Google Sign-In Button */}
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
            Sign up with Google
          </button>

          {/* Input Fields */}
          <div className="space-y-6 text-white">
            
            {/* Username */}
            <div className="relative">
              {/* <label className="text-sm font-semibold">Username</label> */}
              <input
                type="text"
                placeholder="Enter UserName ..."
                className="w-full mt-1 p-3 pl-10 rounded-lg bg-transparent border-2 border-blue-600 text-white focus:outline-none focus:border-2 focus:border-green-600 focus:shadow-[0px_0px_10px_3px_green]"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <User className="absolute left-3 top-5 text-yellow-200" size={20} />
            </div>

            {/* Contact Number */}
            <div className="relative">
              {/* <label className="text-sm font-semibold">Contact Number</label> */}
              <input
                type="number"
                maxLength="10"
                placeholder="Enter Contact Number ... "
                className="w-full mt-1 p-3 pl-10 rounded-lg bg-transparent border-2 border-blue-600 text-white focus:outline-none focus:border-2 focus:border-green-600 focus:shadow-[0px_0px_10px_3px_green]"
                onChange={(e) => setContact(e.target.value)}
              />
              <Phone className="absolute left-3 top-5 text-yellow-200" size={20} />
            </div>

            {/* Email */}
            <div className="relative">
              {/* <label className="text-sm font-semibold">Email</label> */}
              <input
                type="email"
                placeholder="Enter Email-Id ..."
                className="w-full mt-1 p-3 pl-10 rounded-lg bg-transparent border-2 border-blue-600 text-white focus:outline-none focus:border-2 focus:border-green-600 focus:shadow-[0px_0px_10px_3px_green]"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Mail className="absolute left-3 top-5 text-yellow-200" size={20} />
            </div>

            {/* Password */}
            <div className="relative">
              {/* <label className="text-sm font-semibold">Password</label> */}
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password ..."
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full mt-1 p-3 pl-10 pr-10 rounded-lg bg-transparent text-white border-2 border-blue-600 focus:outline-none focus:border-2 focus:border-green-600 focus:shadow-[0px_0px_10px_3px_green]"
              />
              <Lock
                className="absolute left-3 top-5 text-yellow-200"
                size={20}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-5 text-yellow-200 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              {/* <label className="text-sm font-semibold">Confirm Password</label> */}
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Enter Password for Confirmation ..."
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full mt-1 p-3 pl-10 pr-10 rounded-lg bg-transparent text-white border-2 border-blue-600 focus:outline-none focus:border-2 focus:border-green-600 focus:shadow-[0px_0px_10px_3px_green]"
              />
              <Lock
                className="absolute left-3 top-5 text-yellow-200"
                size={20}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-5 text-yellow-200 hover:text-white"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`mt-6 w-full text-white py-3 rounded-lg font-semibold text-lg transform transition ${
              isLoading
                ? "bg-transparent cursor-not-allowed"
                : "bg-transparent border-2 border-green-500 hover:shadow-[0px_0px_10px_3px_green] hover:scale-105"
            }`}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>

          {/* Already have account */}
          <p className="text-sm text-center text-gray-300 mt-4">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 hover:text-white font-semibold transition duration-200"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div> 
    )
}

export default Register;
