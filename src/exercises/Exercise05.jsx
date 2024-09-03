import React from 'react';
import { useForm } from 'react-hook-form';

const Exercise05 = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <h1>Exercise 05</h1>
      <h3>Formulário</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type='text'
            id='nome'
            {...register('nome', {required: 'Campo obrigatório.'})}
          />
        {errors.nome && <span style={{ color: 'red' }}>{errors.nome.message}</span>}
        </div>
        <div>
          <label htmlFor="telefone">Telefone:</label>
          <input
            type="text"
            id="telefone"
            {...register('telefone', {
              required: 'Campo obrigatório.',
              pattern: {
                value: /^\d+$/,
                message: 'Telefone deve conter apenas números'
              }
            })}
          />
          {errors.telefone && <span style={{ color: 'red' }}>{errors.telefone.message}</span>}
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Exercise05;