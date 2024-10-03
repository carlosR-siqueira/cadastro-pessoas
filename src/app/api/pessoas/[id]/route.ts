import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import Pessoa from '@/models/Pessoa';
import { NextRequest } from 'next/server';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json();
  await connectMongo();
  try {
    const pessoa = await Pessoa.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ success: true, data: pessoa });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  await connectMongo();
  try {
    await Pessoa.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
