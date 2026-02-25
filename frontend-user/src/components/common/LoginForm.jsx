import React, { useState } from 'react';

function LoginForm() {

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('LoginForm submit:', credentials);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">Email</label>
        <input
          name="email"
          type="email"
          value={credentials.email}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">Mot de passe</label>
        <input
          name="password"
          type="password"
          value={credentials.password}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
        />
      </div>

      <div>
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
        >
          Valider
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
