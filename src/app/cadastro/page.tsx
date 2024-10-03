'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
  nome: string;
  telefone: string;
  email: string;
  profissao: string;
}

const Cadastro = () => {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    telefone: '',
    email: '',
    profissao: '',
  });

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/pessoas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      router.push('/lista');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} required />
      <input name="telefone" placeholder="Telefone" value={formData.telefone} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input name="profissao" placeholder="Profissão" value={formData.profissao} onChange={handleChange} required />
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default Cadastro;
