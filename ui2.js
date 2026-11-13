
function mountFab(){
 if(!P||$('fab'))return;
 document.body.insertAdjacentHTML('beforeend',`
 <button id="fab" aria-label="Customer service"
 onclick="openHelp()"
 style="
 position:fixed;
 right:10px;
 bottom:calc(88px + env(safe-area-inset-bottom,0px));
 height:46px;
 border-radius:23px;
 border:2px solid var(--gold);
 background:#fff;
 color:#241b4b;
 box-shadow:0 4px 12px rgba(0,0,0,.22);
 z-index:25;
 display:flex;
 align-items:center;
 gap:3px;
 padding:0 10px 0 3px;
 font-weight:700;
 font-size:10px;
 line-height:1.1;
 ">
 ${AGENT(34)}
 <span style="text-align:left">Customer<br>Service</span>
 <i class="bdg" id="fbd"
 style="position:absolute;top:-4px;right:-4px;display:none"></i>
 </button>`);
 fabBadge();
}
