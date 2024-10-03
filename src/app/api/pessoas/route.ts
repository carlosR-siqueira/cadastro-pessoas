import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import Pessoas from '@/models/Pessoa';

// Função para listar pessoas
export async function GET() {
  try {
    await connectMongo(); // Conectar ao MongoDB
    const pessoas = await Pessoas.find(); // Buscar todas as pessoas
    return NextResponse.json({ data: pessoas }, { status: 200 }); // Retornar as pessoas em formato JSON
  } catch (error) {
    console.error('Erro ao listar pessoas:', error); // Log do erro
    return NextResponse.json({ message: 'Erro ao listar pessoas.' }, { status: 500 });
  }
}

// Função para criar uma nova pessoa
export async function POST(request: Request) {
  console.log('Recebendo solicitação POST'); // Log para confirmar que a solicitação foi recebida

  try {
    const { nome, telefone, email, profissao } = await request.json();
    console.log('Dados recebidos:', { nome, telefone, email, profissao }); // Log dos dados recebidos

    await connectMongo(); // Conectar ao MongoDB

    const novaPessoa = new Pessoas({
      nome,
      telefone,
      email,
      profissao,
    });

    await novaPessoa.save(); // Salvar a nova pessoa no banco de dados
    console.log('Pessoa salva com sucesso'); // Log de sucesso

    return NextResponse.json({ message: 'Pessoa criada com sucesso!' }, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar pessoa:', error); // Log do erro
    return NextResponse.json({ message: 'Erro ao criar pessoa.' }, { status: 500 });
  }
}
