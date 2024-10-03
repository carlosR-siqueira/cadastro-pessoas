import mongoose, { Schema, Document } from 'mongoose';

interface IPessoas extends Document {
  nome: string;
  telefone: string;
  email: string;
  profissao: string;
}

const pessoaSchema: Schema<IPessoas> = new Schema({
  nome: { type: String, required: true },
  telefone: { type: String, required: true },
  email: { type: String, required: true },
  profissao: { type: String, required: true },
}, { timestamps: true }); // Adiciona timestamps para registros de data

// O modelo "Pessoa" se conecta à coleção "pessoas" automaticamente
const Pessoas = mongoose.models.Pessoas || mongoose.model<IPessoas>('Pessoas', pessoaSchema);
export default Pessoas;
