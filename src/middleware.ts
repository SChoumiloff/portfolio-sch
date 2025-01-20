import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (id) {
    try {
      const response = await fetch(`${request.nextUrl.origin}/api/views`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        console.error('Erreur lors de l\'enregistrement de la vue');
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
    }

    const newUrl = new URL(request.url);
    newUrl.searchParams.delete('id');
    return NextResponse.redirect(newUrl);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}