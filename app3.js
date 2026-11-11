/* CrownEarn extras: screenshot proofs, task pictures, Help chat, fresh deposit number */
let unread=0,helpRef='General';
if(!tabs.some(t=>t[0]==='help'))tabs.push(['help','💬','Help']);
document.head.appendChild(Object.assign(document.createElement('script'),{src:'chat.js?v=1',onload:()=>{if(tab==='help')draw()}}));
const shrink=async(f,mx=1280,q=.72)=>{const b=await createImageBitmap(f),s=Math.min(1,mx/Math.max(b.width,b.height)),c=document.createElement('canvas');c.width=Math.round(b.width*s);c.height=Math.round(b.height*s);c.getContext('2d').drawImage(b,0,0,c.width,c.height);return new Promise(r=>c.toBlob(r,'image/jpeg',q))};
const logoUrl=p=>sb.storage.from('logos').getPublicUrl(p).data.publicUrl;
function proofHtml(p){p=String(p||'');if(!p.startsWith('file:'))return esc(p);const[f,...n]=p.slice(5).split('|');return `<button class="o" style="padding:4px 12px" onclick="viewP('${esc(f)}')">View screenshot</button> ${esc(n.join(' '))}`}
async function viewP(f){const{data,error}=await sb.storage.from('proofs').createSignedUrl(f,300);if(error){toast(error.message);return}const d=document.createElement('div');d.className='ov mid';d.onclick=()=>d.remove();d.innerHTML=`<img src="${data.signedUrl}" alt="Proof screenshot" style="max-width:100%;max-height:90vh;border-radius:14px">`;document.body.appendChild(d)}
function taskCard(t,k){const s=D.subs.find(x=>x.task_id===t.id&&x.user_id===U.id);
 const b=!s?`<button onclick="openS2(${t.id})">Submit proof</button>`:s.status==='pending'?'<span class="tag">Under review</span>':s.status==='approved'?'<span class="tag">Done ✔</span>':'<span class="tag" style="background:#ffe0e6;color:#c0392b">Rejected</span>';
 const ic=t.logo?`<img class="ic" alt="" src="${esc(logoUrl(t.logo))}" style="object-fit:cover;padding:0">`:`<span class="ic c${k%4}">${ICON[t.kind]||'⭐'}</span>`;
 return `<div class="card"><div class="gr">${ic}<div>${esc(t.title)}</div></div><div class="row" style="margin-top:10px"><span class="rw">+${t.reward_points} pts · PKR ${rs(t.reward_points)}</span><span class="gr" style="gap:8px">${t.link?`<a class="bt" href="${esc(t.link)}" target="_blank" rel="noopener noreferrer">Open</a>`:''}${b}</span></div></div>`}
const openS2=id=>sheet('Submit proof','Do the task first, then upload a screenshot that shows it is done.','<label>Screenshot</label><input id="pf" type="file" accept="image/*"><label>Note (optional)</label><input id="pn" maxlength="80" placeholder="Username or comment">','Send proof',`sendS2(${id})`);
async function sendS2(id){const f=$('pf').files[0];if(!f){toast('Choose a screenshot first');return}
 const btn=document.querySelector('.sh .g'),reset=()=>{btn.disabled=false;btn.textContent='Send proof'};btn.disabled=true;btn.textContent='Uploading…';
 try{const blob=await shrink(f),path=U.id+'/'+Date.now()+'.jpg',up=await sb.storage.from('proofs').upload(path,blob,{contentType:'image/jpeg'});if(up.error)throw up.error;
  const note=($('pn').value||'').trim().replace(/\|/g,' ');
  if(await rpc('submit_task',{p_task:id,p_proof:'file:'+path+(note?'|'+note:'')})){closeW();toast('Proof sent. Points arrive after review.')}else reset()}
 catch(e){toast(e.message||'Upload failed');reset()}}
async function mk(){const t=$('tt').value.trim(),l=$('lk').value.trim(),p=+$('pr').value,n=+$('nw').value,f=$('lg')&&$('lg').files[0];
 if(t.length<5){toast('Enter a task title');return}if(!/^https?:\/\/.{4,}/.test(l)){toast('Enter a valid link starting with https://');return}
 if(!(p>=2)||!(n>=5)){toast('Minimum is PKR 2 per task and 5 people');return}
 if(p*n>P.credit_pkr){toast('Not enough credit. Please deposit first.');openD2();return}
 let logo=null;if(f){const path=U.id+'/'+Date.now()+'.jpg',up=await sb.storage.from('logos').upload(path,await shrink(f,320,.8),{contentType:'image/jpeg'});if(up.error){toast(up.error.message);return}logo=path}
 if(await rpc('create_task',{p_title:t,p_kind:T,p_link:l,p_price:p,p_slots:n,p_logo:logo}))win('Task submitted 📣','It goes live after the admin reviews it')}
async function openD2(){M='JazzCash';let n='';try{const{data}=await sb.from('settings').select('text_value').eq('key','pay_number').single();n=(data&&data.text_value)||''}catch(e){}
 sheet('Make a deposit','Send the money, enter the transaction ID, and your credit is added after review.',MS+`<div class="sum">Send money to this number:<br><b dir="ltr">${esc(n||'03XX-XXXXXXX')}</b></div><label>Amount (PKR)</label><input id="da" inputmode="numeric" placeholder="500"><label>Transaction ID</label><input id="dt" placeholder="1234567890">`,'Send request','reqD()')}
function helpView(){return `<div class="hd" style="margin:4px 2px">Help and support 💬</div><div class="card"><b>Support hours</b><div class="mute">${esc(D.cfg.support_hours||'Daily 6 PM to 10 PM (Pakistan time)')}</div><div class="mute">You can write at any time. We reply during support hours.</div></div><div class="tp">${['General','Withdrawal','Deposit','Task'].map(x=>`<button class="${helpRef===x?'on':''}" onclick="pick(this,()=>{helpRef='${x}';Chat.ref(helpRef)})">${x}</button>`).join('')}</div><div id="chat"></div>`}
const navDraw=()=>{$('nav').innerHTML='<div>'+tabs.map(t=>`<button class="${tab===t[0]?'on':''}" onclick="go('${t[0]}')"><span>${t[1]}${t[0]==='help'&&unread?`<i class="bdg">${unread}</i>`:''}</span>${t[2]}</button>`).join('')+'</div>'};
function patch(){document.querySelectorAll('[onclick="openD()"]').forEach(b=>b.setAttribute('onclick','openD2()'));
 document.querySelectorAll('#app .mute').forEach(e=>{const t=e.textContent;if(t.startsWith('Proof: file:'))e.innerHTML='Proof: '+proofHtml(t.slice(7))});
 const tt=$('tt');if(tab==='create'&&tt&&!$('lg')){const lb=tt.previousElementSibling;if(lb)lb.insertAdjacentHTML('beforebegin','<label>Task picture (app icon, game logo or video thumbnail)</label><input id="lg" type="file" accept="image/*">')}}
function draw(){if(!P)return;const V={home:homeView,tasks:tasksView,create:createView,wallet:walletView,help:helpView};$('app').innerHTML=V[tab]();const c=$('cnt');if(c)countTo(c,rs(P.points));patch();navDraw();
 if(window.Chat){if(tab==='help')Chat.open($('chat'),U.id,'user',helpRef);else Chat.close()}}
async function chkUnread(){if(!U)return;const{count}=await sb.from('messages').select('id',{count:'exact',head:true}).eq('user_id',U.id).eq('sender','admin').eq('seen',false);const n=count||0;if(n!==unread){unread=n;navDraw()}}
window.onChatSeen=()=>{unread=0;navDraw()};
setInterval(()=>{if(U&&!document.hidden)chkUnread()},12000);
