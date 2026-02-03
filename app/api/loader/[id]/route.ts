import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request, context: any) {
  const { id } = await context.params;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const js = `
  (function(){
    try{
      // compute base from this script's src so the loader works when embedded across sites
      var __current = document.currentScript || (function(){
        var scripts = document.getElementsByTagName('script');
        return scripts[scripts.length-1];
      })();
      var base = (function(){
        try{
          if(!__current || !__current.src) return ("" || "") || location.origin;
          return __current.src.split('/api/loader/')[0];
        }catch(e){return location.origin;}
      })();

      var s=document.createElement("script");
      // preserve any query string on the loader script (e.g., ?color=%23fff)
      var q = '';
      try{ q = new URL(__current.src).search || ''; }catch(e){ q = ''; }
      s.src=base+"/api/runtime/${id}"+q;
      s.async=true;
      document.head.appendChild(s);
    }catch(e){}
  })();
  `;
  return new NextResponse(js,{
    headers: { "Content-Type": "application/javascript" },
  });
}
