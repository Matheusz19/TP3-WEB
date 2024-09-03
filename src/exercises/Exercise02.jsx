import React, { useState } from 'react';

const Exercise02 = () => {
  const [formData, setFormData] = useState({
    name: '',
    telefone:''
  });

  const [errors, setErrors] = useState ({
    nome: '',
    telefone:''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData ({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    let valid = true;
    let errors= {};

    if (!formData.nome.trim()) {
      errors.nome = 'Campo obrigatório,';
      valid = false;
    }

    if (!formData.telefone.trim()) {
      errors.telefone = 'Campo obrigatório.';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log(formData);
      alert('Formulário enviado.');
      setFormData({ nome: '', telefone: ''});
    }
  };

  return (
    <div>
      <h1>Exercise 02</h1>
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
          {errors.nome && <span style={{ color: 'red' }}>{errors.nome}</span>}
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
          {errors.telefone && <span style={{ color: 'red' }}>{errors.telefone}</span>}
        </div>
        <button type='submit'>Enviar</button>
      </form>
    </div>
  );
};

export default Exercise02;