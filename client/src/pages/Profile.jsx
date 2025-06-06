import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2"; 

function Profile() {
  const [username, setUsername] = React.useState("");
  const [contact, setContact] = React.useState("");
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

  if (loading) return <div className="text-black text-center p-10">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 p-3 rounded bg-gray-700"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Contact Number"
          maxLength="10"
          className="w-full mb-4 p-3 rounded bg-gray-700"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />

        <button
          onClick={handleUpdate}
          className="w-full mb-4 bg-purple-600 hover:bg-purple-700 p-3 rounded text-white font-semibold"
        >
          Save Profile
        </button>

        <button
          className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition duration-300"
          onClick={logout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Profile;
