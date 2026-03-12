// Import Firebase core
import { initializeApp } from "firebase/app";

// Import Firebase Auth
import { getAuth } from "firebase/auth";

// Optional Analytics
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqTCTO0W76SRpj4jptFZaFq2RyALWlms4",
  authDomain: "kaagazseva-a2bb7.firebaseapp.com",
  projectId: "kaagazseva-a2bb7",
  storageBucket: "kaagazseva-a2bb7.firebasestorage.app",
  messagingSenderId: "516312337999",
  appId: "1:516312337999:web:98ba3876fe7390a36d643a",
  measurementId: "G-MF6KTG78G9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
export const auth = getAuth(app);

// Optional analytics
export const analytics = getAnalytics(app);