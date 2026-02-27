import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/layout/Footer';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Nom requis';
    }

    if (!formData.email) {
      newErrors.email = 'Email requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.password) {
      newErrors.password = 'Mot de passe requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Au moins 6 caracteres';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmation requise';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      localStorage.setItem(
        'user',
        JSON.stringify({
          name: formData.name,
          email: formData.email,
        }),
      );

      setLoading(false);
      navigate('/', { replace: true });
    }, 1000);
  };

  return (
    <>
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-full max-w-md mx-4">
          <div className="bg-black border border-gray-800 rounded-lg p-8 shadow-lg">
            <div className="text-center mb-6">
              <div className="text-3xl font-extrabold text-red-600">ASTÉRIX</div>
            </div>

            <h2 className="text-xl font-semibold mb-4">S'inscrire</h2>

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
                <input
                  name="name"
                  type="text"
                  placeholder="Nom"
                  aria-label="Nom"
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
                  aria-label="Email"
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
                  aria-label="Mot de passe"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 rounded bg-gray-800 text-white border ${errors.password ? 'border-red-500' : 'border-gray-700'} focus:outline-none`}
                />
                {errors.password && <div className="text-xs text-red-500 mt-1">{errors.password}</div>}
              </div>

              <div className="mb-4">
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirmez le mot de passe"
                  aria-label="Confirmez le mot de passe"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 rounded bg-gray-800 text-white border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-700'} focus:outline-none`}
                />
                {errors.confirmPassword && (
                  <div className="text-xs text-red-500 mt-1">{errors.confirmPassword}</div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded cursor-pointer"
              >
                {loading ? 'Chargement...' : "S'inscrire"}
              </button>
            </form>

            <div className="text-center text-sm text-gray-400 mt-4">
              Deja un compte ?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-red-500 underline cursor-pointer"
              >
                Se connecter
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
