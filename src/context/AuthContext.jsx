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
  };

  writeStorage(USER_STORAGE_KEY, sanitizedUser);
  return sanitizedUser;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadStoredUser);

  function createSession({ name, email }) {
    const normalizedEmail = email.trim().toLowerCase();
    const nextUser = {
      name: name?.trim() || normalizedEmail.split("@")[0],
      email: normalizedEmail,
    };

    setUser(nextUser);
    writeStorage(USER_STORAGE_KEY, nextUser);
  }

  function login({ email }) {
    createSession({ email });
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
