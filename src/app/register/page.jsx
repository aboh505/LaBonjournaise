'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    localStorage.setItem('user', JSON.stringify({ name, email, password, role }));
    localStorage.setItem('loggedIn', 'true');
    router.push('/login');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* ✅ Image d'arrière-plan */}
      <Image
        src="/a9.jpg"
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />

      {/* ✅ Overlay semi-transparent */}
      <div className="absolute inset-0 bg-opacity-50 z-10" />

      {/* ✅ Formulaire au-dessus de l'image */}
      <form
        onSubmit={handleRegister}
        className="relative z-20 bg-white bg-opacity-90 p-6 rounded-lg shadow w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Créer un compte</h2>

        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-md"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-md"
          required
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md pr-10"
            required
          />
          <div
            className="absolute top-2.5 right-3 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        </div>

        <div className="relative mb-4">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirmez le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md pr-10"
            required
          />
          <div
            className="absolute top-2.5 right-3 cursor-pointer text-gray-500"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        </div>

        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-md"
          required
        >
          <option value="user">Utilisateur</option>
          <option value="admin">Administrateur</option>
        </select>
        <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700">
          S'inscrire
        </button>

        <p className="mt-4 text-sm text-center text-gray-700">
          Vous avez déjà un compte ? <a href="/login" className="text-purple-600 underline">Se connecter</a>
        </p>
      </form>
    </div>
  );
}


