import { NextRequest, NextResponse } from "next/server"
import prisma from '@/utils/db/prisma'

export async function GET(req: NextRequest, res: NextResponse) {
  try {  
    const searchParams = req.nextUrl.searchParams;
    const cursor = searchParams.get('cursor') || undefined;
    const limit = 30;

    const posts = await prisma.post.findMany({
      orderBy: {
        pubDate: 'desc'
      },
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      include: {
        tags: true,
        source: true
      }
    });

    let nextCursor = posts.length > 0 ? posts[posts.length - 1].id : undefined;

    return NextResponse.json({ 
      posts, 
      nextCursor
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
