/* Admin: Auto cleanup settings (how many days to keep notifications and chat) + Clean now. Load after admin3.js in admin.html */
Object.assign(NUM,{notif_keep_days:'Delete notifications older than (days)',chat_keep_days:'Delete chat messages older than (days)'});
const _sv4=settingsV;
settingsV=function(){
 const g=grp('clean','🧹','c2','Auto cleanup','Keeps the app tidy: old notifications and chat messages are removed',numC('notif_keep_days')+numC('chat_keep_days')+`<div class="card"><div class="mute">Cleanup runs by itself. You can also run it now.</div><div style="margin-top:8px">${B('o','Clean now','cleanNow()')}</div></div>`);
 const m='<div class="card"><button class="o" onclick="sb.auth.signOut()',h=_sv4();return h.includes(m)?h.replace(m,g+m):h+g};
async function cleanNow(){const{data,error}=await sb.rpc('cleanup_old',{p_force:true});if(error){toast(error.message);return}toast('Cleaned: '+(data||0)+' old items removed')}
setTimeout(()=>{try{sb.rpc('cleanup_old')}catch(e){}},5000);
/* New-activity badges: red number on each tab, count in the browser tab title, and a toast when something new arrives */
(function(){
 const st=document.createElement('style');
 st.textContent='nav button{position:relative}.nbg{position:absolute;top:0;right:calc(50% - 24px);min-width:18px;height:18px;padding:0 5px;border-radius:9px;background:#e0475b;color:#fff;font:700 11px/18px sans-serif;font-style:normal;text-align:center;box-shadow:0 0 0 2px var(--card)}';
 document.head.appendChild(st);
 let prev=-1;const _d4=draw;
 draw=function(){_d4();const nav=document.getElementById('nav');if(!nav)return;let total=0;
  nav.querySelectorAll('button').forEach(b=>{const m=b.textContent.match(/\((\d+)\)/);
   if(m){total+=+m[1];b.innerHTML=b.innerHTML.replace(/\s*\(\d+\)/,'');b.insertAdjacentHTML('beforeend','<i class="nbg">'+m[1]+'</i>')}});
  document.title=(total?'('+total+') ':'')+'CrownEarn Admin';
  if(prev>=0&&total>prev&&typeof toast==='function')toast('🔔 New activity: '+(total-prev)+' new');
  prev=total};
})();
