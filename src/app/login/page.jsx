'use client';
import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useUser();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.email === email && user?.password === password) {
      login(user);
      localStorage.setItem('loggedIn', 'true');
      if (user.role === 'admin') {
        router.push('/dashboard');
      } else {
        // Redirige vers la page d'accueil ou reste sur la page
        router.push('/');
        // Tu peux aussi afficher un toast/message ici si tu veux
        // alert('Connexion réussie, bienvenue !');
      }
    } else {
      alert("Identifiants invalides");
    }
  };




  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* ✅ Image d'arrière-plan */}
      <Image
        src="/a9.jpg" // Assure-toi que ce fichier est dans /public
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />

      {/* ✅ Superposition foncée pour lisibilité */}
      <div className="absolute inset-0  bg-opacity-50 z-10" />

      {/* ✅ Formulaire au-dessus de l’image */}
      <form
        onSubmit={handleLogin}
        className="relative z-20 bg-white bg-opacity-90 p-6 rounded-lg shadow w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Connexion</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-md"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-md"
          required
        />

        <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700">
          Se connecter
        </button>

        <p className="mt-4 text-sm text-center text-gray-700">
          Pas encore de compte ? <a href="/register" className="text-purple-600 underline">Créer un compte</a>
        </p>
      </form>
    </div>
  );
}
