// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile, // 👈 Ajouté pour mettre à jour le nom
} from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      // Firebase renvoie un objet complexe. On peut le simplifier pour nos besoins.
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName, // 👈 On récupère le nom ici
          avatar: firebaseUser.photoURL,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Connexion
  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  // Inscription (mise à jour pour accepter le nom complet)
  const register = async (email, password, displayName) => {
    try {
      // 1. Création du compte
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // 2. Mise à jour du profil Firebase avec le nom
      await updateProfile(userCredential.user, {
        displayName: displayName,
      });

      // 3. Forcer la mise à jour de l'état local pour refléter le nom immédiatement
      setUser({
        ...userCredential.user,
        name: displayName
      });

      return userCredential;
    } catch (error) {
      throw error;
    }
  };

  // Déconnexion
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
