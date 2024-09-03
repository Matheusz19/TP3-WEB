import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { firestore } from '../components/firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import DataTable from 'react-data-table-component';

const Exercise11 = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [users, setUsers] = useState([]);

  const onSubmit = async (data) => {
    try {
      await addDoc(collection(firestore, 'users'), {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
      });
      console.log('Dados inseridos com sucesso no Firestore');
      fetchUsers();
    } catch (error) {
      console.error('Erro ao inserir dados no Firestore: ', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'users'));
      const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersList);
    } catch (error) {
      console.error('Erro ao buscar dados no Firestore: ', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      name: 'Nome',
      selector: row => row.nome,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Telefone',
      selector: row => row.telefone,
      sortable: true,
    }
  ];

  return (
    <div>
      <h1>Exercise11</h1>
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
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: 'Campo obrigatório',
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: 'Endereço de email inválido'
              }
            })}
          />
          {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
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

      <h3>Lista de Usuários</h3>
      <DataTable
        columns={columns}
        data={users}
        pagination
      />
    </div>
  );
};

export default Exercise11;