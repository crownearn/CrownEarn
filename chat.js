/* CrownEarn chat: emoji, voice notes, edit, delete, ticks, live updates (shared by app and admin) */
window.Chat=(()=>{
const E=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const $c=id=>document.getElementById(id);
const EMO='😀 😁 😂 🤣 😊 😍 😘 😎 🤔 😢 😭 😡 👍 👎 🙏 👏 💪 🔥 ✨ 🎉 ❤️ 💚 💜 💰 💸 ✅ ❌ ⭐ 🙌 🤝 👌 😅 😇 🥳 😴 🤗 👋 🙂 😉 😮'.split(' ');
let me='user',tid=null,ref='',list=[],rec=null,chunks=[],t0=0,tm=null,ch=null,busy=false,ED=null,stream=null;
const st=document.createElement('style');st.textContent=`.chw{border:1px solid var(--line);border-radius:16px;overflow:hidden;background:var(--card)}#chl{height:46vh;overflow:auto;padding:8px 10px;background:var(--soft,var(--bg))}.chb{max-width:80%;margin:3px 0;padding:6px 10px 4px;border-radius:14px;font-size:15px;line-height:1.4;word-break:break-word;width:fit-content}.chb.me{margin-left:auto;background:var(--pri);color:#fff;border-bottom-right-radius:4px}.chb.th{margin-right:auto;background:var(--card);color:var(--ink);border:1px solid var(--line);border-bottom-left-radius:4px}.chm{font-size:11px;opacity:.75;text-align:right;margin-top:2px}.chd{text-align:center;margin:10px 0 4px}.chd span{font-size:12px;background:var(--card);color:var(--mute);padding:2px 10px;border-radius:99px}.chbar{display:flex;gap:6px;align-items:center;padding:8px;border-top:1px solid var(--line)}.chbar input{flex:1;border-radius:99px!important;margin:0!important}.chbar button{width:42px;height:42px;padding:0;border-radius:50%;font-size:18px;border-bottom-width:0;flex:none}.cho{display:grid;grid-template-columns:repeat(8,1fr);gap:2px;padding:6px;border-top:1px solid var(--line);max-height:120px;overflow:auto}.cho button{background:none;font-size:22px;padding:2px;border-bottom:0;border-radius:8px}.chr{color:#e0475b;font-weight:700}.bdg{background:#25d366;color:#fff;border-radius:99px;font-size:11px;font-style:normal;padding:0 6px;margin-left:3px;font-weight:700}`;document.head.appendChild(st);
const fmt=s=>Math.floor(s/60)+':'+String(s%60).padStart(2,'0');
const clock=d=>new Date(d).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
const day=d=>{const a=new Date(d).toDateString();return a===new Date().toDateString()?'Today':a===new Date(Date.now()-864e5).toDateString()?'Yesterday':new Date(d).toLocaleDateString([],{day:'numeric',month:'short'})};
function bubble(m){const mine=m.sender===me;
 const body=m.deleted?'<i style="opacity:.7">🚫 This message was deleted</i>':m.kind==='voice'?`<button class="o" style="width:auto;height:auto;border-radius:99px;padding:4px 14px;font-size:14px;border-bottom:0" onclick="Chat.play(${m.id},this)">▶ ${fmt(m.dur||0)}</button>`:E(m.body);
 const tick=mine&&!m.deleted?(m.seen?' <span style="color:#7ee6ff">✓✓</span>':' ✓'):'';
 return `<div class="chb ${mine?'me':'th'}" ${mine&&!m.deleted?`onclick="Chat.menu(${m.id})"`:''}>${m.ref?`<div style="font-size:11px;opacity:.75">${E(m.ref)}</div>`:''}${body}<div class="chm">${m.edited&&!m.deleted?'edited · ':''}${clock(m.created_at)}${tick}</div></div>`}
function draw(stick){const l=$c('chl');if(!l)return;const near=stick||l.scrollHeight-l.scrollTop-l.clientHeight<80;let h='',d='';list.forEach(m=>{const k=day(m.created_at);if(k!==d){d=k;h+=`<div class="chd"><span>${k}</span></div>`}h+=bubble(m)});l.innerHTML=h||'<div class="chd"><span>No messages yet. Say hello 👋</span></div>';if(near)l.scrollTop=l.scrollHeight}
async function load(stick){if(!tid)return;const{data}=await sb.from('messages').select('*').eq('user_id',tid).order('id');list=data||[];draw(stick);
 if(list.some(m=>m.sender!==me&&!m.seen)&&!document.hidden){await sb.rpc('mark_read',{p_user:tid});if(window.onChatSeen)onChatSeen()}}
function bar(){const b=$c('chb');if(!b)return;b.innerHTML=`<button class="o" onclick="Chat.emo()">😊</button><input id="chi" maxlength="500" placeholder="Message" oninput="Chat.typing()" onkeydown="if(event.key==='Enter')Chat.send()"><button id="cha" onclick="Chat.act()">🎤</button>`}
function typing(){const i=$c('chi'),a=$c('cha');if(i&&a&&!rec)a.textContent=i.value.trim()?'➤':'🎤'}
function close(){if(ch){sb.removeChannel(ch);ch=null}if(rec)stop(false);tid=null}
function open(el,t,who,r){close();me=who;tid=t;ref=r||'';ED=null;
 el.innerHTML=`<div class="chw"><div id="chl"></div><div class="cho" id="cho" hidden>${EMO.map(e=>`<button onclick="Chat.add('${e}')">${e}</button>`).join('')}</div><div class="chbar" id="chb"></div></div>`;bar();load(true);
 ch=sb.channel('chat'+t+Date.now()).on('postgres_changes',{event:'*',schema:'public',table:'messages',filter:'user_id=eq.'+t},()=>load()).subscribe()}
const emo=()=>{const o=$c('cho');if(o)o.hidden=!o.hidden};
function add(e){const i=$c('chi');if(!i)return;i.value+=e;i.focus();typing()}
async function send(){const i=$c('chi'),b=i&&i.value.trim();if(!b||busy)return;busy=true;let r;
 if(ED){r=await sb.rpc('edit_message',{p_id:ED,p_body:b});ED=null;i.placeholder='Message'}
 else r=me==='admin'?await sb.rpc('admin_reply',{p_user:tid,p_body:b,p_ref:ref||null}):await sb.rpc('send_message',{p_body:b,p_ref:ref||null});
 busy=false;if(r.error){toast(r.error.message);return}i.value='';typing();await load(true)}
function act(){const i=$c('chi');if(i&&i.value.trim())send();else start()}
async function start(){try{stream=await navigator.mediaDevices.getUserMedia({audio:true})}catch(e){toast('Please allow the microphone to send voice messages');return}
 const mt=['audio/webm;codecs=opus','audio/webm','audio/mp4','audio/ogg'].find(t=>window.MediaRecorder&&MediaRecorder.isTypeSupported(t))||'';
 rec=new MediaRecorder(stream,mt?{mimeType:mt}:{});chunks=[];rec.ondataavailable=e=>{if(e.data.size)chunks.push(e.data)};rec.start();t0=Date.now();
 $c('chb').innerHTML='<button class="o" onclick="Chat.stop(false)">🗑</button><span class="chr" id="cht">● 0:00</span><span style="flex:1"></span><button onclick="Chat.stop(true)">➤</button>';
 tm=setInterval(()=>{const s=Math.round((Date.now()-t0)/1000),t=$c('cht');if(t)t.textContent='● '+fmt(s);if(s>=120)stop(true)},500)}
function stop(sendIt){if(!rec)return;clearInterval(tm);const r=rec,dur=Math.round((Date.now()-t0)/1000),type=(r.mimeType||'audio/webm').split(';')[0];rec=null;
 r.onstop=async()=>{stream.getTracks().forEach(t=>t.stop());bar();if(!sendIt)return;if(dur<1){toast('Hold on a little longer');return}
  const path=tid+'/'+Date.now()+'.'+(type.includes('mp4')?'m4a':type.includes('ogg')?'ogg':'webm'),up=await sb.storage.from('voice').upload(path,new Blob(chunks,{type}),{contentType:type});
  if(up.error){toast(up.error.message);return}
  const x=me==='admin'?await sb.rpc('admin_voice',{p_user:tid,p_path:path,p_dur:dur,p_ref:ref||null}):await sb.rpc('send_voice',{p_path:path,p_dur:dur,p_ref:ref||null});
  if(x.error)toast(x.error.message);else load(true)};r.stop()}
async function play(id,b){const m=list.find(x=>x.id===id);if(!m)return;const{data,error}=await sb.storage.from('voice').createSignedUrl(m.audio_path,600);if(error){toast(error.message);return}b.outerHTML=`<audio controls autoplay src="${data.signedUrl}" style="height:36px;max-width:100%"></audio>`}
function menu(id){const m=list.find(x=>x.id===id);if(!m)return;const o=document.createElement('div');o.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:60;display:flex;align-items:flex-end;justify-content:center';o.onclick=e=>{if(e.target===o)o.remove()};
 const can=m.kind==='text'&&Date.now()-new Date(m.created_at)<9e5;
 o.innerHTML=`<div style="background:var(--card);color:var(--ink);width:100%;max-width:520px;border-radius:22px 22px 0 0;padding:16px;display:grid;gap:8px">${can?'<button class="o" id="mE">✏️ Edit (within 15 minutes)</button>':''}<button class="o" id="mD" style="color:#e0475b">🗑 Delete</button><button class="o" id="mC">Cancel</button></div>`;document.body.appendChild(o);
 const e2=$c('mE');if(e2)e2.onclick=()=>{ED=id;o.remove();const i=$c('chi');i.value=m.body;i.placeholder='Editing message…';i.focus();typing()};
 $c('mD').onclick=async()=>{o.remove();const r=await sb.rpc('delete_message',{p_id:id});if(r.error)toast(r.error.message);else load()};
 $c('mC').onclick=()=>o.remove()}
return{open,close,emo,add,typing,act,send,stop,menu,play,ref:v=>{ref=v}}})();
