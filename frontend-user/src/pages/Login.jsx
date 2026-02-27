import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const e = {};
    if (!formData.email) e.email = 'Email requis';
    else if (!formData.email.includes('@')) e.email = "Email invalide";
    if (!formData.password) e.password = 'Mot de passe requis';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
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
      localStorage.setItem('user', JSON.stringify({ email: formData.email, name: formData.email.split('@')[0] }));
      setLoading(false);
      navigate(from, { replace: true });
    }, 900);
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-md mx-4">
        <div className="bg-black border border-gray-800 rounded-lg p-8 shadow-lg">
          <div className="text-center mb-6">
            <div className="text-3xl font-extrabold text-red-600">ASSURANCE-TOURIX</div>
          </div>

          <h2 className="text-xl font-semibold mb-4">Se connecter</h2>

          <form onSubmit={handleSubmit} noValidate>
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

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded cursor-pointer"
            >
              {loading ? 'Connexion…' : 'Se connecter'}
            </button>
          </form>

          <div className="text-center text-sm text-gray-400 mt-4">
            Pas encore de compte ? <button onClick={() => navigate('/register')} className="text-red-500 underline cursor-pointer">S'inscrire</button>
          </div>
        </div>
      </div>
    </main>
  );
}
