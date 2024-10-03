import mongoose from 'mongoose';

const connectMongo = async (): Promise<void> => {
  if (mongoose.connections[0].readyState) {
    console.log('Já está conectado ao MongoDB');
    return; // Já está conectado
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!); // A string de conexão já faz o trabalho
    console.log('Conexão com MongoDB bem-sucedida'); // Log de sucesso
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error); // Log do erro
    throw error; // Lança o erro para ser capturado no endpoint
  }
};

export default connectMongo;
