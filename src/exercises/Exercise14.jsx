import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { firestore } from '../components/firebaseConfig';
import { collection, addDoc, getDocs, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import DataTable from 'react-data-table-component';

const Exercise14 = () => {
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const onSubmit = async (data) => {
    try {
      if (selectedUserId) {
        const userRef = doc(firestore, 'users', selectedUserId);
        await setDoc(userRef, data);
        console.log('Dados atualizados com sucesso no Firestore');
      } else {
        await addDoc(collection(firestore, 'users'), {
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,
        });
        console.log('Dados inseridos com sucesso no Firestore');
      }
      fetchUsers();
      reset();
      setSelectedUserId(null);
    } catch (error) {
      console.error('Erro ao inserir ou atualizar dados no Firestore: ', error);
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

  const handleRowClick = async (row) => {
    setSelectedUserId(row.id);
    const userDoc = await getDoc(doc(firestore, 'users', row.id));
    const userData = userDoc.data();
    setValue('nome', userData.nome);
    setValue('email', userData.email);
    setValue('telefone', userData.telefone);
  };

  const handleDelete = async (row) => {
    try {
      await deleteDoc(doc(firestore, 'users', row.id));
      console.log('Registro excluído com sucesso');
      fetchUsers();
    } catch (error) {
      console.error('Erro ao excluir o registro do Firestore: ', error);
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
    },
    {
      name: 'Ações',
      cell: row => (
        <>
          <button onClick={() => handleRowClick(row)}>Editar</button>
          <button onClick={() => handleDelete(row)}>Excluir</button>
        </>
      ),
    }
  ];

  return (
    <div>
      <h1>Exercise14</h1>
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
        highlightOnHover
      />
    </div>
  );
};

export default Exercise14;