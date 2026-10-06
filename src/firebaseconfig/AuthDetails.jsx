import React, { useEffect, useState } from "react";
import auth from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function AuthDetails() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    try {
      if (auth && typeof onAuthStateChanged === "function") {
        const listen = onAuthStateChanged(auth, (user) => {
          if (user) {
            setAuthUser(user);
          } else {
            // Check fallback session
            const stored = localStorage.getItem("train_tracker_user");
            setAuthUser(stored ? JSON.parse(stored) : null);
          }
        });
        return () => listen();
      }
    } catch (e) {
      const stored = localStorage.getItem("train_tracker_user");
      setAuthUser(stored ? JSON.parse(stored) : null);
    }
  }, []);

  const userSignOut = () => {
    try {
      if (auth && typeof signOut === "function") {
        signOut(auth);
      }
    } catch (e) {
      // Ignore
    }
    localStorage.removeItem("train_tracker_user");
    setAuthUser(null);
  };

  return (
    <div className="auth-details-container">
      {authUser ? (
        <div className="auth-logged-in">
          <span>Signed In as: {authUser.email || authUser.displayName || "User"}</span>
          <button onClick={userSignOut} className="auth-signout-btn">
            Sign Out
          </button>
        </div>
      ) : (
        <span className="auth-logged-out">Signed Out</span>
      )}
    </div>
  );
}
