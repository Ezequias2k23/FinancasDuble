import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';

// Configurações do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAMeEWUP4Lbmq3z-90Y17LTE2sRysmXCfU",
    authDomain: "financas-d65a0.firebaseapp.com",
    projectId: "financas-d65a0",
    storageBucket: "financas-d65a0.appspot.com",
    messagingSenderId: "631504271011",
    appId: "1:631504271011:web:e417c102988833c8fa3116",
    measurementId: "G-GF5CYN1QSZ"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Lógica de Login
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login-google').addEventListener('click', () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log('Usuário logado:', result.user);
                window.location.href = 'MENU.html'; // Redirecionar após login
            })
            .catch((error) => {
                console.error('Erro ao fazer login:', error);
            });
    });
});