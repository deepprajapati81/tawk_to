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
        btn.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
        btn.setAttribute('role','button');
        btn.setAttribute('aria-label','Open support chat');
        btn.style.display = 'flex';
        btn.style.alignItems = 'center';
        btn.style.justifyContent = 'center';
        btn.style.fontWeight = '700';
        btn.style.fontSize = '14px';
        btn.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
        btn.style.background="${color}";
        btn.style.color= computeTextColor("${color}"); 
        btn.style.position="fixed";
        btn.style.bottom="24px";
        btn.style.right="24px";
        btn.style.width="64px";
        btn.style.height="64px";
        btn.style.borderRadius="50%";
        btn.style.cursor="pointer";
        btn.style.zIndex="999999";
        btn.style.fontFamily= "${fontFamily}";
        btn.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        btn.style.border = 'none';
        
        // Add hover effect
        btn.onmouseenter = function() {
          this.style.transform = 'scale(1.1) rotate(5deg)';
          this.style.boxShadow = '0 12px 32px rgba(0,0,0,0.25)';
        };
        btn.onmouseleave = function() {
          this.style.transform = 'scale(1) rotate(0deg)';
          this.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
        };

        // Add pulse animation
        var pulseKeyframes = '@keyframes pulse-chat { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }';
        var styleSheet = document.createElement('style');
        styleSheet.textContent = pulseKeyframes;
        document.head.appendChild(styleSheet);
        
        // Apply pulse animation periodically
        setInterval(function() {
          if(iframe.style.display === 'none') {
            btn.style.animation = 'pulse-chat 2s ease-in-out';
            setTimeout(function() {
              btn.style.animation = '';
            }, 2000);
          }
        }, 5000);



var iframe=document.createElement("iframe");
var params = new URLSearchParams({
  color: "${color}",
  title: "${title}",
  fontFamily: "${fontFamily}"
});

iframe.src = base + "/widget-ui/${id}?" + params.toString();

iframe.style.position = "fixed";
iframe.style.border = "0";
iframe.style.display = "none";
iframe.style.boxShadow = "0 12px 40px rgba(0,0,0,0.25)";
iframe.style.zIndex = "999990";
iframe.style.transition = "all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
iframe.style.opacity = "0";
iframe.style.transform = "scale(0.95)";
iframe.setAttribute("allow", "clipboard-write");
iframe.setAttribute("title", "Support Chat Widget");
iframe.setAttribute("aria-hidden", "true");

function applyResponsiveIframe() {
  try {
    var w = window.innerWidth;
    var h = window.innerHeight;

    // 📱 Mobile - Full screen on small devices
    if (w <= 480) {
      iframe.style.width = "calc(100vw - 16px)";
      iframe.style.height = "calc(100vh - 100px)";
      iframe.style.right = "8px";
      iframe.style.bottom = "92px";
      iframe.style.left = "8px";
      iframe.style.borderRadius = "16px";
      iframe.style.maxWidth = "none";
    }
    // 📱 Mobile landscape / Small tablet
    else if (w <= 768) {
      iframe.style.width = "calc(100vw - 32px)";
      iframe.style.height = "70vh";
      iframe.style.maxHeight = "500px";
      iframe.style.right = "16px";
      iframe.style.bottom = "96px";
      iframe.style.left = "auto";
      iframe.style.borderRadius = "16px";
      iframe.style.maxWidth = "400px";
    }
    // 📱 Tablet
    else if (w <= 1024) {
      iframe.style.width = "360px";
      iframe.style.height = "500px";
      iframe.style.maxHeight = "80vh";
      iframe.style.right = "20px";
      iframe.style.bottom = "96px";
      iframe.style.left = "auto";
      iframe.style.borderRadius = "16px";
      iframe.style.maxWidth = "none";
    }
    // 🖥 Desktop
    else {
      iframe.style.width = "400px";
      iframe.style.height = "600px";
      iframe.style.maxHeight = "85vh";
      iframe.style.right = "24px";
      iframe.style.bottom = "100px";
      iframe.style.left = "auto";
      iframe.style.borderRadius = "16px";
      iframe.style.maxWidth = "none";
    }

    // Adjust button position for mobile
    if (w <= 480) {
      btn.style.bottom = "20px";
      btn.style.right = "20px";
      btn.style.width = "56px";
      btn.style.height = "56px";
    } else {
      btn.style.bottom = "24px";
      btn.style.right = "24px";
      btn.style.width = "64px";
      btn.style.height = "64px";
    }
  } catch(e){}
}

applyResponsiveIframe();
window.addEventListener("resize", applyResponsiveIframe);

        var isOpen = false;
        btn.onclick=function(){
          isOpen = !isOpen;
          
          if(isOpen) {
            // Open animation
            iframe.style.display = "block";
            setTimeout(function() {
              iframe.style.opacity = "1";
              iframe.style.transform = "scale(1)";
            }, 10);
            
            // Change button icon to X
            btn.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
            btn.style.transform = 'rotate(90deg)';
          } else {
            // Close animation
            iframe.style.opacity = "0";
            iframe.style.transform = "scale(0.95)";
            setTimeout(function() {
              iframe.style.display = "none";
            }, 300);
            
            // Change button icon back to chat
            btn.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
            btn.style.transform = 'rotate(0deg)';
          }
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
