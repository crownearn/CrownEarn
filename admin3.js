/* Admin v3: Lucky Draw tab, user search + add/remove points, safer data loading. Load after admin2.js in admin.html */
let DR=[],DC={},EN={},OPEN=null,UR=[],UQ='',UO=null,UD={},NM={};
const UCOLS='id,name,email,points,credit_pkr,is_admin,is_blocked,created_at,streak';
async function fetchUsers(){const s=UQ.replace(/[^\p{L}\p{N}@.\-_ ]/gu,'').trim();
 let r=sb.from('profiles').select(UCOLS).order('created_at',{ascending:false}).limit(s.length>=2?30:20);
 if(s.length>=2)r=r.or('name.ilike.%'+s+'%,email.ilike.%'+s+'%');
 const{data,error}=await r;if(error){toast(error.message);return}
 UR=data||[];UR.forEach(u=>{EM[u.id]=u.email||'';NM[u.id]=u.name})}
async function fetchDetail(id){try{
 const[l,d,w,r]=await Promise.all([sb.from('ledger').select('*').eq('user_id',id).order('id',{ascending:false}).limit(8),
  sb.from('deposits').select('amount_pkr,status').eq('user_id',id).limit(500),
  sb.from('withdrawals').select('amount_pkr,status').eq('user_id',id).limit(500),
  sb.from('profiles').select('id',{count:'exact',head:true}).eq('referred_by',id)]);
 const sum=(a,st)=>(a.data||[]).filter(x=>x.status===st).reduce((t,x)=>t+Number(x.amount_pkr),0);
 UD[id]={led:l.data||[],dep:sum(d,'approved'),wd:sum(w,'paid'),wdp:sum(w,'pending'),refs:r.count||0}}catch(e){}}
loadX=async function(){try{
 const[m,sr,bl,dw]=await Promise.all([sb.from('messages').select('*').order('id',{ascending:false}).limit(1500),sb.rpc('admin_stats'),
  sb.from('profiles').select('id').eq('is_blocked',true).limit(1000),sb.from('draws').select('*').order('id',{ascending:false}).limit(50)]);
 MG=(m.data||[]).reverse();ST=sr.data||{};BL=Object.fromEntries((bl.data||[]).map(x=>[x.id,true]));DR=dw.data||[];
 try{const c=await sb.from('draw_entries').select('draw_id').limit(5000);DC={};(c.data||[]).forEach(x=>DC[x.draw_id]=(DC[x.draw_id]||0)+1)}catch(e){}
 await fetchUsers();
 D.users.forEach(u=>{NM[u.id]=u.name});
 const need=new Set();[...D.users,...UR].forEach(u=>need.add(u.id));MG.forEach(x=>need.add(x.user_id));
 [...D.dep,...D.wd,...D.subs].forEach(x=>need.add(x.user_id));D.tasks.forEach(x=>x.owner&&need.add(x.owner));DR.forEach(d=>d.winner_id&&need.add(d.winner_id));
 const miss=[...need].filter(id=>!(id in NM)||!(id in EM));
 for(let i=0;i<miss.length;i+=100){const r=await sb.from('profiles').select('id,name,email').in('id',miss.slice(i,i+100));(r.data||[]).forEach(p=>{NM[p.id]=p.name;EM[p.id]=p.email||''})}
 need.forEach(id=>{if(!(id in D.name)&&(id in NM))D.name[id]=NM[id]});
 if(UO)await fetchDetail(UO)}catch(e){console.error(e)}};
async function userSearch(q){UQ=q===undefined?$('uq').value.trim():q;UO=null;await fetchUsers();draw()}
async function openU(id){if(UO===id){UO=null;draw();return}UO=id;await fetchDetail(id);draw()}
async function applyAdj(id){const p=Math.trunc(+($('ap').value||0)),c=+($('ac').value||0),n=$('an').value.trim(),u=UR.find(x=>x.id===id);
 if(!isFinite(p)||!isFinite(c)||(p===0&&c===0)){toast('Enter points or credit');return}if(n.length<3){toast('Enter a reason');return}
 if(!confirm('Change '+(u?u.name:'this user')+': '+p+' points, PKR '+c+'?\nReason: '+n))return;
 await rpc('admin_adjust',{p_user:id,p_points:p,p_pkr:c,p_note:n},'Done')}
function detailV(u,d){return `<div style="margin-top:10px"><div class="mute">Deposited PKR ${d.dep} · Paid out PKR ${d.wd} · Pending PKR ${d.wdp} · Friends invited ${d.refs} · Streak ${u.streak||0}</div>
<div class="card" style="margin-top:8px"><b>Add or remove</b><label>Points (use minus to remove)</label><input id="ap" inputmode="numeric" placeholder="500 or -500"><label>Credit PKR (use minus to remove)</label><input id="ac" inputmode="decimal" placeholder="100 or -100"><label>Reason (the user will see it)</label><input id="an" maxlength="100" placeholder="e.g. Contest prize"><div style="margin-top:8px">${B('ok','Apply',`applyAdj('${u.id}')`)}</div></div>
<div class="mute" style="margin:8px 0 4px">Recent activity</div>${d.led.map(l=>`<div class="row mute"><span>${esc(l.kind)}${l.note?' · '+esc(l.note):''}</span><span>${l.points?(l.points>0?'+':'')+l.points+' pts':''} ${Number(l.pkr)?'PKR '+l.pkr:''}</span></div>`).join('')||'<div class="mute">No activity</div>'}</div>`}
function userCard(u){const d=UD[u.id],open=UO===u.id;
 return `<div class="card"><div class="row"><div><b>${esc(u.name)}</b> ${u.is_admin?'<span class="tag">admin</span>':''}${u.is_blocked?'<span class="tag" style="background:var(--bad);color:#fff">blocked</span>':''}<div class="mute">${esc(u.email||'')} · Joined ${new Date(u.created_at).toLocaleDateString()}</div></div><div class="mute" style="text-align:right">${u.points} pts<br>Credit PKR ${u.credit_pkr}</div></div>
<div style="margin-top:8px">${B('o',open?'Hide':'Details',`openU('${u.id}')`)} ${B('o','Message',`openT('${u.id}')`)} ${u.is_admin?'':u.is_blocked?B('ok','Unblock',`blk('${u.id}',false)`):B('no','Block',`blk('${u.id}',true)`)}</div>${open&&d?detailV(u,d):''}</div>`}
usersV=function(){return `<h1>Users${ST.users?' ('+ST.users+')':''}</h1><div class="card"><input id="uq" value="${esc(UQ)}" placeholder="Search by name or email" onkeydown="if(event.key==='Enter')userSearch()"><div style="margin-top:8px">${B('ok','Search','userSearch()')} ${UQ?B('o','Clear',"userSearch('')"):''}</div></div><div class="mute" style="margin:6px 0">${UQ?'Results':'Newest users'}</div>`+(UR.map(userCard).join('')||'<div class="mute">No users found</div>')};
function entriesV(d){const l=EN[d.id]||[],done=d.status==='drawn';
 return `<div style="margin-top:8px">${l.map(e=>`<div class="card row"><div><b>${esc(e.uname)}</b><div class="mute">${esc(e.uemail||'')}</div></div>${!done?B('ok','Winner',`pickW(${d.id},'${e.uid}')`):d.winner_id===e.uid?'<span class="tag">🏆 Winner</span>':''}</div>`).join('')||'<div class="mute">No entries yet</div>'}</div>`}
function drawsV(){
 return `<h1>Lucky Draw</h1><div class="card"><label style="margin-top:0">Title</label><input id="dt" placeholder="Weekend lucky draw"><label>Prize (points)</label><input id="dp" inputmode="numeric" placeholder="5000"><label>Entry cost (points, 0 = free)</label><input id="dc" inputmode="numeric" value="0"><label>Entries close at (optional)</label><input id="de" type="datetime-local"><div style="margin-top:10px">${B('ok','Create draw','createDraw()')}</div></div>`
 +(DR.map(d=>{const st=d.status==='drawn'?'Winner: '+nm(d.winner_id):d.status==='closed'?'Entries closed':'Open';
  return `<div class="card"><div class="row"><b>${esc(d.title)}</b><span class="tag">${st}</span></div><div class="mute">Prize ${d.prize_points} pts · Entry ${d.entry_cost} pts · ${DC[d.id]||0} joined${d.ends_at?' · closes '+new Date(d.ends_at).toLocaleString():''}</div><div class="row" style="margin-top:8px">${B('o',OPEN===d.id?'Hide entries':'Entries','showEntries('+d.id+')')}${d.status==='open'?B('o','Close entries','closeDraw('+d.id+')'):''}${d.status!=='drawn'?B('no','Cancel','cancelDraw('+d.id+')'):''}</div>${OPEN===d.id?entriesV(d):''}</div>`}).join('')||'<div class="mute" style="margin-top:10px">No draws yet</div>')}
async function createDraw(){const t=$('dt').value.trim(),p=+$('dp').value,c=+($('dc').value||0),e=$('de').value;
 if(t.length<3){toast('Enter a title');return}if(!(p>0)){toast('Enter the prize points');return}
 await rpc('admin_create_draw',{p_title:t,p_prize:p,p_cost:c,p_ends:e?new Date(e).toISOString():null},'Draw created')}
async function showEntries(id){if(OPEN===id){OPEN=null;draw();return}
 const{data,error}=await sb.rpc('admin_draw_entries',{p_draw:id});if(error){toast(error.message);return}EN[id]=data||[];OPEN=id;draw()}
async function closeDraw(id){await rpc('admin_close_draw',{p_id:id},'Entries closed')}
async function cancelDraw(id){if(!confirm('Cancel this draw? Entry points will be refunded to everyone.'))return;await rpc('admin_cancel_draw',{p_id:id},'Draw cancelled')}
async function pickW(id,uid){const d=DR.find(x=>x.id===id),e=(EN[id]||[]).find(x=>x.uid===uid);if(!d)return;
 if(!confirm('Give '+d.prize_points+' points to '+(e?e.uname:'this user')+'?'))return;
 await rpc('admin_pick_winner',{p_draw:id,p_user:uid},'Winner selected, points sent')}
const _d3=draw;
draw=function(){const mine=tab==='draws';if(mine)tab='inbox';_d3();if(mine){tab='draws';$('app').innerHTML=drawsV()}
 const n=$('nav');if(n){if(mine)n.querySelectorAll('button.on').forEach(b=>b.classList.remove('on'));n.insertAdjacentHTML('beforeend',`<button class="${mine?'on':''}" onclick="tab='draws';draw();scrollTo(0,0)">Draw</button>`)}};
