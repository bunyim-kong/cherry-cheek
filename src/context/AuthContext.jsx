import { useState } from "react";
import {
  readStorage,
  removeStorage,
  writeStorage,
} from "../service/storage";
import { AuthContext } from "./auth";

const USER_STORAGE_KEY = "cc_user";

function loadStoredUser() {
  const savedUser = readStorage(USER_STORAGE_KEY, null);

  if (!savedUser?.email) {
    return null;
  }

  const sanitizedUser = {
    name: savedUser.name?.trim() || savedUser.email.split("@")[0],
    email: savedUser.email.trim().toLowerCase(),
    role: savedUser.role === "ADMIN" ? "ADMIN" : "CUSTOMER",
  };

  writeStorage(USER_STORAGE_KEY, sanitizedUser);
  return sanitizedUser;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadStoredUser);

  function createSession({ name, email, role = "CUSTOMER" }) {
    const normalizedEmail = email.trim().toLowerCase();
    const nextUser = {
      name: name?.trim() || normalizedEmail.split("@")[0],
      email: normalizedEmail,
      role,
    };

    setUser(nextUser);
    writeStorage(USER_STORAGE_KEY, nextUser);
    return nextUser;
  }

  async function login({ email }) {
    const normalizedEmail = email.trim().toLowerCase();
    const response = await fetch("/student-data/accounts.json");
    if (!response.ok) {
      throw new Error("Unable to load accounts. Please try again.");
    }

    const accounts = await response.json();
    const account = accounts.find(
      (entry) => entry.email.toLowerCase() === normalizedEmail,
    );

    if (account?.active === false) {
      throw new Error("This account is inactive.");
    }

    return createSession({
      name: account?.fullName,
      email: normalizedEmail,
      role: account?.role === "ADMIN" ? "ADMIN" : "CUSTOMER",
    });
  }

  function register({ name, email }) {
    createSession({ name, email });
  }

  function logout() {
    setUser(null);
    removeStorage(USER_STORAGE_KEY);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
