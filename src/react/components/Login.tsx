// React
import { useState, useContext } from 'react';

// Context
import { AuthContext } from '../context/AuthContext.tsx';

export default function Login() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error('Login must be used within an AuthProvider');
  }
  const { login } = auth;

  const handleLogin = () => {
    if (name.trim() === '' || email.trim() === '') {
      alert('Veuillez remplir tous les champs');
      return;
    } else {
      login({ id: Date.now().toString(), name: name, email: email });
    }
  };

  return (
    <>
      <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        type="text"
        placeholder="Nom"
      ></input>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        placeholder="Email"
      ></input>
      <button onClick={handleLogin}>Connexion</button>
    </>
  );
}
