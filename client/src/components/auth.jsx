import { auth, googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import '../assets/styles/auth.css'; // Importing styles for the auth component

export const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("User signed up successfully!");
        } catch (error) {
            console.error("Error signing up:", error);
            alert("Error signing up: " + error.message);
        }
    }

    const signInwithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            alert("User signed in with Google successfully!");
        } catch (error) {
            console.error("Error signing in with Google:", error);
            alert("Error signing in with Google: " + error.message);
        }
    }

    const logout = async () => {
        try {
            await signOut(auth);
            alert("User logged out successfully!");
        } catch (error) {
            console.error("Error logging out:", error);
            alert("Error logging out: " + error.message);
        }
    }

    return (
        <div className="auth-form-container"> {/* Container for Auth specific elements */}
            <button className="auth-google-button" onClick={signInwithGoogle}>Sign In With Google</button>
            <input
                className="auth-input" // Reusing input styles
                type="email"
                placeholder="Email..."
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="auth-input" // Reusing input styles
                type="password"
                placeholder="Password..."
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="auth-primary-button" onClick={handleSubmit}>Sign up</button>
            <button className="auth-logout-button" onClick={logout}>Log out</button>
        </div>
    )
}