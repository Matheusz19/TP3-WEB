import React, { useState } from 'react';

const Exercise16 = () => {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState(null);
  const [error, setError] = useState('');

  const fetchAddress = async () => {
    try {
      if (!cep || cep.length !== 8 || isNaN(cep)) {
        setError('CEP inválido. O CEP deve conter 8 dígitos numéricos.');
        setAddress(null);
        return;
      }

      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setError('CEP não encontrado.');
        setAddress(null);
      } else {
        setAddress(data);
        setError('');
      }
    } catch (error) {
      setError('Erro ao buscar o endereço. Tente novamente.');
      setAddress(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchAddress();
  };

  return (
    <div>
      <h1>Exercise16</h1>
      <h3>Consulta de Endereço por CEP</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="cep">CEP:</label>
          <input
            type="text"
            id="cep"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            maxLength="8"
            placeholder="Digite o CEP"
          />
        </div>
        <button type="submit">Buscar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {address && !error && (
        <div>
          <h2>Endereço Encontrado:</h2>
          <p><strong>Logradouro:</strong> {address.logradouro}</p>
          <p><strong>Bairro:</strong> {address.bairro}</p>
          <p><strong>Cidade:</strong> {address.localidade}</p>
          <p><strong>Estado:</strong> {address.uf}</p>
        </div>
      )}
    </div>
  );
};

export default Exercise16;