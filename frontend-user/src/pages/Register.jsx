import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const e = {};
    if (!formData.name) e.name = 'Nom requis';
    if (!formData.email) e.email = 'Email requis';
    else if (!formData.email.includes('@')) e.email = "Email invalide";
    if (!formData.password) e.password = 'Mot de passe requis';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setApiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    const result = await register(formData.name, formData.email, formData.password);

    if (result.success) {
      navigate('/');
    } else {
      setApiError(result.error || "Erreur lors de l'inscription");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-md mx-4">
        <div className="bg-black border border-gray-800 rounded-lg p-8 shadow-lg">
          <div className="text-center mb-6">
            <div className="text-3xl font-extrabold text-red-600">ASTÉRIX</div>
          </div>

          <h2 className="text-xl font-semibold mb-4">S'inscrire</h2>

          {apiError && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-500 text-red-200 text-sm rounded">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <input
                name="name"
                type="text"
                placeholder="Nom complet"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded bg-gray-800 text-white border ${errors.name ? 'border-red-500' : 'border-gray-700'} focus:outline-none`}
              />
              {errors.name && <div className="text-xs text-red-500 mt-1">{errors.name}</div>}
            </div>

            <div className="mb-4">
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded bg-gray-800 text-white border ${errors.email ? 'border-red-500' : 'border-gray-700'} focus:outline-none`}
              />
              {errors.email && <div className="text-xs text-red-500 mt-1">{errors.email}</div>}
            </div>

            <div className="mb-4">
              <input
                name="password"
                type="password"
                placeholder="Mot de passe"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded bg-gray-800 text-white border ${errors.password ? 'border-red-500' : 'border-gray-700'} focus:outline-none`}
              />
              {errors.password && <div className="text-xs text-red-500 mt-1">{errors.password}</div>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Inscription…' : 'S\'inscrire'}
            </button>
          </form>

          <div className="text-center text-sm text-gray-400 mt-4">
            Déjà un compte ? <Link to="/login" className="text-red-500 underline cursor-pointer">Se connecter</Link>
          </div>
        </div>
      </div>
    </main>
  );
}