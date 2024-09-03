import React from 'react';
import { useForm } from 'react-hook-form';
import { auth, signInWithEmailAndPassword } from '../components/firebaseConfig';

const Exercise15 = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      console.log('Usuário autenticado com sucesso');
    } catch (error) {
      console.error('Erro ao autenticar o usuário: ', error.message);
    }
  };

  return (
    <div>
      <h1>Exercise15</h1>
      <h3>Login</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...register('email', { required: 'Campo obrigatório' })}
          />
          {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
        </div>

        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            {...register('password', { required: 'Campo obrigatório' })}
          />
          {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Exercise15;