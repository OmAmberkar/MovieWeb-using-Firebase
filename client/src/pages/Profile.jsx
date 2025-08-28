import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2"; 

function Profile() {
  const [username, setUsername] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  const fetchProfileData = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setUsername(data.username || "");
      setContact(data.contact || "");
      setBio(data.bio || "");
    }
    setLoading(false);
  };

  React.useEffect(() => {
    fetchProfileData();
  }, []);

  const handleUpdate = async () => {
    const user = auth.currentUser;
    if (!user) return;

    if (username && contact) {
      try {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          username,
          contact,
          bio,
        });

        Swal.fire({
          icon: "success",
          title: "Profile Updated!",
        });

        navigate("/home");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: error.message,
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Missing Info",
        text: "Please fill in all fields.",
      });
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      Swal.fire({
        icon: "info",
        title: "Logged out",
        text: "You have been logged out successfully.",
      });
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
      Swal.fire({
        icon: "error",
        title: "Logout Error",
        text: error.message,
      });
    }
  };

  if (loading) return <div className="text-white text-center p-10">Loading...</div>;

  // 🎨 Avatar (DiceBear)
  const avatarUrl = `https://api.dicebear.com/9.x/lorelei/svg?seed=${username || "guest"}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
        
        {/* LEFT CARD */}
        <div className="flex-1 bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 flex flex-col items-center">
          <img 
            src={avatarUrl} 
            alt="Avatar" 
            className="w-28 h-28 rounded-full border-4 border-purple-500 shadow-lg"
          />
          <h2 className="text-2xl font-bold mt-4">{username || "Guest User"}</h2>
          <p className="text-gray-400 text-sm">{contact || "No contact added"}</p>

          <button
            className="mt-6 w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition duration-300"
            onClick={logout}
          >
            Log Out
          </button>
        </div>

        {/* RIGHT CARD */}
        <div className="flex-1 bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
          <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
          
          <input
            type="text"
            placeholder="Username"
            className="w-full mb-4 p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="tel"
            placeholder="Contact Number"
            maxLength="10"
            className="w-full mb-4 p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />

          <textarea
            placeholder="Bio"
            className="w-full mb-4 p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            rows="3"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>

          <button
            onClick={handleUpdate}
            className="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded-lg text-white font-semibold transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
