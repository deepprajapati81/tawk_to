import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Widget from "@/lib/models/widget";

export const dynamic = "force-dynamic";

export async function GET(req: Request, context: any) {
  try {
    const { id } = await context.params;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    // if the loader passed a color via query params (e.g. ?color=%23fff), use it
    const reqUrl = new URL(req.url);
    const colorFromQuery = reqUrl.searchParams.get('color');
    const titleFromQuery = reqUrl.searchParams.get('title');
    const fontFamilyFromQuery = reqUrl.searchParams.get('fontFamily');
    await connectDB();
    const widget = await Widget.findById(id);

    const color = colorFromQuery || widget?.color || "#000";
    const title =titleFromQuery || widget?.title || 'chatbot'
    const fontFamily = fontFamilyFromQuery || widget?.fontFamily || "inter";

    const js = `
    (function(){
      try{
        // compute base dynamically from this script's src so it works when embedded
        var __current = document.currentScript || (function(){
          var scripts = document.getElementsByTagName('script');
          return scripts[scripts.length-1];
        })();
        var base = (function(){
          try{
            if(__current && __current.src) return __current.src.split('/api/runtime/')[0];
            return ("${baseUrl}" || location.origin);
          }catch(e){return ("${baseUrl}" || location.origin);} 
        })();

        var btn=document.createElement("div");
        btn.innerText = "Chat";
        btn.setAttribute('role','button');
        btn.setAttribute('aria-label','Open support chat');
        btn.style.display = 'flex';
        btn.style.alignItems = 'center';
        btn.style.justifyContent = 'center';
        btn.style.fontWeight = '600';
        btn.style.boxShadow = '0 6px 18px rgba(0,0,0,0.18)';
        btn.style.background="${color}";
        btn.style.color= computeTextColor("${color}"); 
        btn.style.position="fixed";
        btn.style.bottom="20px";
        btn.style.right="20px";
        btn.style.width="60px";
        btn.style.height="60px";
        btn.style.borderRadius="50%";
        btn.style.cursor="pointer";
        btn.style.zIndex="999999";
        btn.style.fontFamily= "${fontFamily}"

        var iframe=document.createElement("iframe");
        var params = new URLSearchParams({
  color: "${color}",
  title: "${title}",
 fontFamily:"${fontFamily}"

});
        // pass color as query param for initial load; we will poll and postMessage updates
   iframe.src = base + "/widget-ui/${id}?" + params.toString();

        iframe.style.position="fixed";
        iframe.style.bottom="90px";
        iframe.style.right="20px";
        iframe.style.width="350px";
        iframe.style.height="500px";
        iframe.style.display="none";
        iframe.style.border="0";
        iframe.style.borderRadius = '10px';
        iframe.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
        iframe.style.zIndex = '999990';
        iframe.setAttribute('allow','clipboard-write');
        iframe.setAttribute('title','Support Chat Widget');
        iframe.setAttribute('aria-hidden','true');

        btn.onclick=function(){
          iframe.style.display =
            iframe.style.display==="none"?"block":"none";
        };

        function _append(){
          try{
            document.body.appendChild(btn);
            document.body.appendChild(iframe);
          }catch(e){
            // if body is not ready, wait and try again
            document.addEventListener('DOMContentLoaded', function(){
              document.body.appendChild(btn);
              document.body.appendChild(iframe);
            });
          }
        }

        _append();

        // fetch the latest color from the server and update if changed
        var currentColor = "${color}";
        var currentTitle = "${title}";
        var currentFontFamily = "${fontFamily}"
        

        function computeTextColor(hex){
          try{
            var c = hex.replace('#','');
            if(c.length === 3) c = c.split('').map(function(ch){return ch+ch}).join('');
            var bigint = parseInt(c,16);
            var r = (bigint >> 16) & 255;
            var g = (bigint >> 8) & 255;
            var b = bigint & 255;
            var luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
            return luminance > 0.6 ? '#000' : '#fff';
          }catch(e){return '#fff';}
        }

    function applyTheme(c, t, f){
  try{
    if(c){
      btn.style.background = c;
      btn.style.color = computeTextColor(c); 
    }

    iframe.contentWindow && iframe.contentWindow.postMessage({
      type: 'setTheme',
      color: c,
      title: t,
      fontFamily: f
    }, '*');

  }catch(e){}
}



      function fetchThemeOnce(){
  try{
    var url = base + '/api/widget/${id}';
    fetch(url)
      .then(function(r){ return r.json(); })
      .then(function(jsn){
        if(!jsn) return;

        var changed = false;

        if(jsn.color && jsn.color !== currentColor){
          currentColor = jsn.color;
          changed = true;
        }

        if(jsn.title && jsn.title !== currentTitle){
          currentTitle = jsn.title;
          changed = true;
        }

        if(jsn.fontFamily && jsn.fontFamily !== currentFontFamily){
          currentFontFamily = jsn.fontFamily;
          changed = true;
        }

        if(changed){
          applyTheme(currentColor, currentTitle,currentFontFamily);
        }
      })
      .catch(function(){});
  }catch(e){}
}

        // poll every 10s for color changes
        setInterval(fetchThemeOnce, 10000);
        // run once after a short delay (allow iframe load)
        setTimeout(fetchThemeOnce, 500);

        // also listen for messages from the iframe (optional)

        window.addEventListener('message', function(ev){
          try{
            if(!ev || !ev.data) return;
           if(ev.data && ev.data.type === 'requestTheme'){
  iframe.contentWindow && iframe.contentWindow.postMessage({
    type: 'setTheme',
    color: currentColor,
    title: currentTitle,
    fontFamily: currentFontFamily
  }, '*');
}

          }catch(e){}
        });

      }catch(e){}
    })();
    `;

    return new NextResponse(js, {
      headers: { "Content-Type": "application/javascript" },
    });
  } catch {
    return new NextResponse("console.warn('Widget failed');", {
      headers: { "Content-Type": "application/javascript" },
    });
  }
}
