/* Admin extras: messages (chat), screenshot viewing, users with email, task pictures */
let TH=null,TR='',MG=[],EM={};
document.head.appendChild(Object.assign(document.createElement('script'),{src:'chat.js?v=1',onload:()=>{if(tab==='msgs'&&TH)draw()}}));
function unreadA(){return MG.filter(m=>m.sender==='user'&&!m.seen).length}
const unreadOf=id=>MG.filter(m=>m.user_id===id&&m.sender==='user'&&!m.seen).length;
async function loadX(){const[m,e]=await Promise.all([sb.from('messages').select('*').order('id').limit(1500),sb.from('profiles').select('id,email')]);MG=m.data||[];EM=Object.fromEntries((e.data||[]).map(x=>[x.id,x.email||'']))}
const shrink=async(f,mx=320,q=.8)=>{const b=await createImageBitmap(f),s=Math.min(1,mx/Math.max(b.width,b.height)),c=document.createElement('canvas');c.width=Math.round(b.width*s);c.height=Math.round(b.height*s);c.getContext('2d').drawImage(b,0,0,c.width,c.height);return new Promise(r=>c.toBlob(r,'image/jpeg',q))};
function proofHtml(p){p=String(p||'');if(!p.startsWith('file:'))return esc(p);const[f,...n]=p.slice(5).split('|');return `<button class="o" style="padding:4px 12px" onclick="viewP('${esc(f)}')">View screenshot</button> ${esc(n.join(' '))}`}
async function viewP(f){const{data,error}=await sb.storage.from('proofs').createSignedUrl(f,300);if(error){toast(error.message);return}const d=document.createElement('div');d.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:20;display:flex;align-items:center;justify-content:center;padding:10px';d.onclick=()=>d.remove();d.innerHTML=`<img src="${data.signedUrl}" alt="Proof screenshot" style="max-width:100%;max-height:100%;border-radius:10px">`;document.body.appendChild(d)}
async function openT(u,r){TH=u;TR=r||'';tab='msgs';draw();scrollTo(0,0)}
const prev=m=>m.deleted?'Message deleted':m.kind==='voice'?'🎤 Voice message':esc(m.body.slice(0,60));
function msgsV(){
 if(TH){const u=D.users.find(x=>x.id===TH)||{};return `<div class="row"><h1>${esc(u.name||'User')}</h1>${B('o','Back','TH=null;draw()')}</div><div class="mute">${esc(EM[TH]||'')} · ${u.points||0} pts · Credit PKR ${u.credit_pkr||0}</div>${TR?`<div class="mute">About: <b>${esc(TR)}</b></div>`:''}<div id="chat" style="margin-top:10px"></div>`}
 const by={};MG.forEach(m=>{(by[m.user_id]=by[m.user_id]||[]).push(m)});
 const ids=Object.keys(by).sort((a,b)=>by[b][by[b].length-1].id-by[a][by[a].length-1].id);
 return '<h1>Messages</h1>'+(ids.map(id=>{const l=by[id],last=l[l.length-1],un=unreadOf(id);return `<div class="card row" onclick="openT('${id}')" style="cursor:pointer"><div><b>${esc(D.name[id]||'User')}</b><div class="mute" style="${un?'font-weight:700;color:var(--ink)':''}">${last.sender==='admin'?'✓ ':''}${prev(last)}</div></div><div style="text-align:right"><div class="mute">${new Date(last.created_at).toLocaleDateString()}</div>${un?`<i class="bdg">${un}</i>`:''}</div></div>`}).join('')||'<div class="mute">No messages yet</div>')}
function usersV(){return `<h1>Users (${D.users.length})</h1>`+D.users.map(u=>`<div class="card"><div class="row"><div><b>${esc(u.name)}</b> ${u.is_admin?'<span class="tag">admin</span>':''}<div class="mute">${esc(EM[u.id]||'')} · Joined ${new Date(u.created_at).toLocaleDateString()}</div></div><div class="mute" style="text-align:right">${u.points} pts<br>Credit PKR ${u.credit_pkr}</div></div><div style="margin-top:8px">${B('o','Message',`openT('${u.id}')`)}</div></div>`).join('')}
async function saveSH(){await rpc('set_text_setting',{p_key:'support_hours',p_text:$('s_sh').value.trim()},'Saved')}
async function pub(){const t=$('tt').value.trim(),l=$('lk').value.trim(),p=+$('rp').value,n=+$('sl').value,f=$('lg')&&$('lg').files[0];
 if(t.length<5){toast('Enter a title');return}if(!/^https?:\/\/.{4,}/.test(l)){toast('Enter a link starting with https://');return}
 if(!(p>0)||!(n>0)){toast('Enter reward points and number of people');return}
 let logo=null;if(f){const{data:{session}}=await sb.auth.getSession(),path=session.user.id+'/'+Date.now()+'.jpg',up=await sb.storage.from('logos').upload(path,await shrink(f),{contentType:'image/jpeg'});if(up.error){toast(up.error.message);return}logo=path}
 await rpc('admin_add_task',{p_title:t,p_kind:$('kd').value,p_link:l,p_points:p,p_slots:n,p_logo:logo},'Task published')}
async function payW(id){const n=prompt('Enter the transaction ID of the payment you sent (the user will see it as a receipt):');if(n===null)return;if(n.trim().length<4){toast('Please enter a valid transaction ID');return}await rpc('review_withdraw',{p_id:id,p_ok:true,p_note:n.trim()},'Marked paid')}
const _draw=draw;
draw=function(){_draw();document.querySelectorAll('button[onclick*="review_withdraw"][onclick*="p_ok:true"]').forEach(b=>{const m=/p_id:(\d+)/.exec(b.getAttribute('onclick'));if(m)b.setAttribute('onclick','payW('+m[1]+')')});if(window.Chat){if(tab==='msgs'&&TH)Chat.open($('chat'),TH,'admin',TR);else Chat.close()}
 const tt=$('tt');if(tab==='tasks'&&tt&&!$('lg')){const lb=tt.previousElementSibling;if(lb)lb.insertAdjacentHTML('beforebegin','<label>Task picture (app icon, game logo or video thumbnail)</label><input id="lg" type="file" accept="image/*">')}};
window.onChatSeen=async()=>{await loadX();const nb=document.querySelectorAll('#nav button')[3];if(nb)nb.textContent='Messages'+(unreadA()?' ('+unreadA()+')':'')};
setInterval(async()=>{if(!sb||document.hidden||!D.users.length)return;await loadX();const nb=document.querySelectorAll('#nav button')[3];if(nb)nb.textContent='Messages'+(unreadA()?' ('+unreadA()+')':'');if(tab==='msgs'&&!TH)draw()},15000);
