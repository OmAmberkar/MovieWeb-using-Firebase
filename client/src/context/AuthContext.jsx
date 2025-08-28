/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../config/firebase";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Reference to user's Firestore profile
        const userRef = doc(db, "users", user.uid);

        // Listen in real-time to profile updates
        const unsubscribeProfile = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            setCurrentUser({
              ...user, // Firebase auth data
              ...docSnap.data(), // Firestore profile data (username, contact, etc.)
            });
          } else {
            // No profile doc yet → just set Firebase user
            setCurrentUser(user);
          }
          setLoading(false);
        });

        return unsubscribeProfile; // cleanup Firestore listener
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth(); // cleanup auth listener
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
