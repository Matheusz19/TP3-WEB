import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Exercise06 = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formData, setFormData] = useState(null);

  const onSubmit = (data) => {
    setFormData(JSON.stringify(data, null, 2));
  };

  return (
    <div>
      <h1>Exercise 06</h1>
      <h3>Formulário</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            {...register('nome', { required: 'Campo obrigatório' })}
          />
          {errors.nome && <span style={{ color: 'red' }}>{errors.nome.message}</span>}
        </div>
        <div>
          <label htmlFor="telefone">Telefone:</label>
          <input
            type="text"
            id="telefone"
            {...register('telefone', {
              required: 'Campo obrigatório',
              pattern: {
                value: /^[0-9]+$/,
                message: 'Telefone deve conter apenas números'
              }
            })}
          />
          {errors.telefone && <span style={{ color: 'red' }}>{errors.telefone.message}</span>}
        </div>
        <button type="submit">Enviar</button>
      </form>
      {formData && (
        <div>
          <h3>Dados do Formulário:</h3>
          <pre>{formData}</pre>
        </div>
      )}
    </div>
  );
};

export default Exercise06;