/* Admin: Lucky Draw tab. Load after admin2.js in admin.html */
let DR=[],DC={},EN={},OPEN=null;
const _lx=loadX;
loadX=async function(){await _lx();try{const[a,b]=await Promise.all([sb.from('draws').select('*').order('id',{ascending:false}).limit(50),sb.from('draw_entries').select('draw_id').limit(5000)]);DR=a.data||[];DC={};(b.data||[]).forEach(x=>DC[x.draw_id]=(DC[x.draw_id]||0)+1)}catch(e){}};
function entriesV(d){const l=EN[d.id]||[],done=d.status==='drawn';
 return `<div style="margin-top:8px">${l.length&&!done?B('ok','Pick random winner','randPick('+d.id+')'):''}${l.map(e=>`<div class="card row"><div><b>${esc(e.uname)}</b><div class="mute">${esc(e.uemail||'')}</div></div>${!done?B('ok','Winner',`pickW(${d.id},'${e.uid}')`):d.winner_id===e.uid?'<span class="tag">🏆 Winner</span>':''}</div>`).join('')||'<div class="mute">No entries yet</div>'}</div>`}
function drawsV(){
 return `<h1>Lucky Draw</h1><div class="card"><label style="margin-top:0">Title</label><input id="dt" placeholder="Weekend lucky draw"><label>Prize (points)</label><input id="dp" inputmode="numeric" placeholder="5000"><label>Entry cost (points, 0 = free)</label><input id="dc" inputmode="numeric" value="0"><label>Entries close at (optional)</label><input id="de" type="datetime-local"><div style="margin-top:10px">${B('ok','Create draw','createDraw()')}</div></div>`
 +(DR.map(d=>{const st=d.status==='drawn'?'Winner: '+esc((D.name&&D.name[d.winner_id])||'User'):d.status==='closed'?'Entries closed':'Open';
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
function randPick(id){const l=EN[id]||[];if(!l.length){toast('No entries yet');return}
 pickW(id,l[Math.floor(crypto.getRandomValues(new Uint32Array(1))[0]/4294967296*l.length)].uid)}
const _d3=draw;
draw=function(){const mine=tab==='draws';if(mine)tab='inbox';_d3();if(mine){tab='draws';$('app').innerHTML=drawsV()}
 const n=$('nav');if(n){if(mine)n.querySelectorAll('button.on').forEach(b=>b.classList.remove('on'));n.insertAdjacentHTML('beforeend',`<button class="${mine?'on':''}" onclick="tab='draws';draw();scrollTo(0,0)">Draw</button>`)}};
