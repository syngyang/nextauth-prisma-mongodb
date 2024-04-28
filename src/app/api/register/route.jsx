import bcrypt from 'bcrypt'
import prisma from '../../libs/prismadb'
import { NextResponse } from 'next/server'
import { toast } from 'react-hot-toast';
//  wait 빼먹지 않기
export async function POST(request){
  const body = await request.json();
  const { name, email, password } = body;

  if(!name || !email || !password) {
    return new NextResponse('Missing Fields', { status: 400 })
  }
  const exist = await prisma.user.findUnique({
    where: {
      email
    }
  });
// console.log(exist)에 입력값으로 찾은 것을 object{}로 보여줌

  if(exist) {
    console.log(" 같은 메일 있음")
    toast.error("등록된 메일입니다.")
    throw new Error("실패")
    
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword
    }
  });

  // return NextResponse(JSON.stringify(user))
  return NextResponse.json(user)
}