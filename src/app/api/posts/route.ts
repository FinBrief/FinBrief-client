import { NextRequest, NextResponse } from "next/server";
import prisma from '@/utils/db/prisma'

export async function GET(req: NextRequest, res: NextResponse) {
  try {  
    const posts = await prisma.post.findMany({
      orderBy: {
        pubDate: 'desc'
      },
      include: {
        tags: true,
        source: true
      }
    })
    //console.log(posts)
    return NextResponse.json(posts)  
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
