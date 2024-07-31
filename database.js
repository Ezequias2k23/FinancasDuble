import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBs0xzJStSGuUWM1biyyMGTWkaJEzvchLE",
    authDomain: "projetofinances.firebaseapp.com",
    projectId: "projetofinances",
    storageBucket: "projetofinances.appspot.com",
    messagingSenderId: "742928821641",
    appId: "1:742928821641:web:28ac5e3cf84a18d3ce8558",
    measurementId: "G-LQJM4WEYH9"
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