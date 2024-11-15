import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, res: NextResponse) {
  return NextResponse.json({ message: 'Scraper' });
  /*try {  
    const token = req.headers.get('Authorization');

    if (!token || token !== process.env.SCRAPER_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const response = await fetch(`${process.env.SCRAPER_URL}/get-articles`, {
      method: 'GET'
    });

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }*/
}

//Proxy api call to the scraper