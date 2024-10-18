import { NextRequest, NextResponse } from "next/server";
import prisma from '@/utils/db/prisma'

export async function GET(req: NextRequest, res: NextResponse) {
  try {  
    const posts = await prisma.post.findMany({
      orderBy: {
        pubDate: 'desc'
      }
    })
    return NextResponse.json(posts)  
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
