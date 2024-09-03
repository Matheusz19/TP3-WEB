import React, { useState } from 'react';

const Exercise01 = () => {
  const [formData, setFormData] = useState({
    name: '',
    telefone:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData ({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div>
      <h1>Exercise 01</h1>
      <h3>Formúlario</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='nome'>Nome:</label>
          <input
            type='text'
            id='nome'
            name='nome'
            value={formData.nome || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="telefone">Telefone:</label>
          <input
            type="text"
            id="telefone"
            name="telefone"
            value={formData.telefone || ''}
            onChange={handleChange}
            required
          />
        </div>
        <button type='submit'>Enviar</button>
      </form>
    </div>
  );
};

export default Exercise01;
