'use client';
import { useEffect, useState } from 'react';
import styles from "./page.module.css";
import Link from "next/link";


interface Pessoa {
  _id: string;
  nome: string;
  telefone: string;
  email: string;
  profissao: string;
}

const Lista = () => {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<Pessoa | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/pessoas');
      const { data } = await res.json();
      setPessoas(data);
    };
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    await fetch(`/api/pessoas/${id}`, { method: 'DELETE' });
    setPessoas(pessoas.filter(pessoa => pessoa._id !== id));
  };

  const handleEdit = (pessoa: Pessoa) => {
    setEditData(pessoa);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditData(null);
  };

  const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (editData) {
      await fetch(`/api/pessoas/${editData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      });
      
      // Atualiza a lista de pessoas
      setPessoas(pessoas.map(pessoa => (pessoa._id === editData._id ? editData : pessoa)));
      handleModalClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editData) {
      setEditData({ ...editData, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
      <h1>Lista de Pessoas</h1>
      <Link className={styles.btn} href='/cadastro'>Adicionar</Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Profissão</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pessoas.map((pessoa) => (
            <tr key={pessoa._id}>
              <td>{pessoa.nome}</td>
              <td>{pessoa.telefone}</td>
              <td>{pessoa.email}</td>
              <td>{pessoa.profissao}</td>
              <td className={styles.containerBtn}>
                <button onClick={() => handleEdit(pessoa)}>Editar</button>
                <button onClick={() => handleDelete(pessoa._id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && editData && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={handleModalClose}>&times;</span>
            <h2>Editar Pessoa</h2>
            <form onSubmit={handleEditSubmit}>
              <label>
                Nome:
                <input
                  type="text"
                  name="nome"
                  value={editData.nome}
                  onChange={handleChange}
                />
              </label>
              <label>
                Telefone:
                <input
                  type="text"
                  name="telefone"
                  value={editData.telefone}
                  onChange={handleChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleChange}
                />
              </label>
              <label>
                Profissão:
                <input
                  type="text"
                  name="profissao"
                  value={editData.profissao}
                  onChange={handleChange}
                />
              </label>
              <button type="submit">Salvar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lista;
