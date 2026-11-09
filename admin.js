const SB_URL='https://moumogjmoawzxgdpilyl.supabase.co',SB_KEY='sb_publishable_qkWWMMgwtQV9SqvY3FcBKw_MsaNjdTt';
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function toast(m){const d=document.createElement('div');d.className='toast';d.textContent=m;document.body.appendChild(d);setTimeout(()=>d.remove(),3000)}
let sb,tab='inbox',D={dep:[],wd:[],tasks:[],subs:[],users:[],st:[],name:{},task:{}};
const NUM={pkr_per_point:'PKR per point (0.01 means PKR 10 per 1000 pts)',fee_percent:'Platform fee % on user tasks',min_withdraw_points:'Minimum withdrawal (points)',min_deposit:'Minimum deposit (PKR)',daily_bonus:'Daily bonus (points)',referral_percent:'Referral commission %',referral_first_bonus:'Referral first-task bonus (points)'};
const nm=id=>esc(D.name[id]||'User');
const B=(c,t,fn)=>`<button class="${c}" onclick="${fn}">${t}</button>`;
const empty='<div class="mute">Nothing pending</div>';
async function rpc(n,a,msg){const{error}=await sb.rpc(n,a);if(error){toast(error.message);return}toast(msg||'Done');await load()}
async function load(){
 const[pr,dp,wd,tk,sm,st]=await Promise.all([
  sb.from('profiles').select('id,name,points,credit_pkr,is_admin,created_at').order('created_at',{ascending:false}).limit(300),
  sb.from('deposits').select('*').eq('status','pending').order('id'),
  sb.from('withdrawals').select('*').eq('status','pending').order('id'),
  sb.from('tasks').select('*').order('id',{ascending:false}).limit(200),
  sb.from('submissions').select('*').eq('status','pending').order('id').limit(200),
  sb.from('settings').select('*')]);
 D={users:pr.data||[],dep:dp.data||[],wd:wd.data||[],tasks:tk.data||[],subs:sm.data||[],st:st.data||[]};
 D.name=Object.fromEntries(D.users.map(u=>[u.id,u.name]));D.task=Object.fromEntries(D.tasks.map(t=>[t.id,t]));draw()}
function inbox(){
 const rev=D.tasks.filter(t=>t.status==='review'),ps=D.subs.filter(s=>(D.task[s.task_id]||{}).owner===null);
 return `<div class="row"><h1>Inbox</h1>${B('o','Refresh','load()')}</div>
<h2>Deposits (${D.dep.length})</h2>${D.dep.map(d=>`<div class="card"><div class="row"><b>PKR ${d.amount_pkr}</b><span class="tag">${esc(d.method)}</span></div><div class="mute">${nm(d.user_id)} · Txn ID: <b>${esc(d.txn_id)}</b></div><div class="row" style="margin-top:8px">${B('ok','Approve',`rpc('review_deposit',{p_id:${d.id},p_ok:true},'Credit added')`)}${B('no','Reject',`rpc('review_deposit',{p_id:${d.id},p_ok:false},'Rejected')`)}</div></div>`).join('')||empty}
<h2>Withdrawals (${D.wd.length})</h2>${D.wd.map(w=>`<div class="card"><div class="row"><b>PKR ${w.amount_pkr}</b><span class="tag">${esc(w.method)}</span></div><div class="mute">${nm(w.user_id)} · Send to: <b>${esc(w.account_no)}</b></div><div class="mute">Send the money first, then press Mark paid.</div><div class="row" style="margin-top:8px">${B('ok','Mark paid',`rpc('review_withdraw',{p_id:${w.id},p_ok:true},'Marked paid')`)}${B('no','Reject and refund',`rpc('review_withdraw',{p_id:${w.id},p_ok:false},'Refunded to user')`)}</div></div>`).join('')||empty}
<h2>Tasks to review (${rev.length})</h2>${rev.map(t=>`<div class="card"><b>${esc(t.title)}</b><div class="mute">${nm(t.owner)} · ${esc(t.kind)} · PKR ${t.price_pkr} x ${t.slots} = PKR ${t.price_pkr*t.slots}</div><div class="mute"><a href="${esc(t.link)}" target="_blank" rel="noopener noreferrer" style="color:var(--pri)">${esc(t.link)}</a></div><div class="row" style="margin-top:8px">${B('ok','Approve',`rpc('review_task',{p_id:${t.id},p_ok:true},'Task is live')`)}${B('no','Reject',`rpc('review_task',{p_id:${t.id},p_ok:false},'Rejected and credit refunded')`)}</div></div>`).join('')||empty}
<h2>Proofs for your tasks (${ps.length})</h2>${ps.map(s=>`<div class="card"><b>${esc((D.task[s.task_id]||{}).title)}</b><div class="mute">${nm(s.user_id)} · Proof: ${esc(s.proof)}</div><div class="row" style="margin-top:8px">${B('ok','Approve',`rpc('review_submission',{p_id:${s.id},p_ok:true},'Points sent')`)}${B('no','Reject',`rpc('review_submission',{p_id:${s.id},p_ok:false},'Rejected')`)}</div></div>`).join('')||empty}`}
async function pub(){const t=$('tt').value.trim(),l=$('lk').value.trim(),p=+$('rp').value,n=+$('sl').value;
 if(t.length<5){toast('Enter a title');return}if(!/^https?:\/\/.{4,}/.test(l)){toast('Enter a link starting with https://');return}
 if(!(p>0)||!(n>0)){toast('Enter reward points and number of people');return}
 await rpc('admin_add_task',{p_title:t,p_kind:$('kd').value,p_link:l,p_points:p,p_slots:n},'Task published')}
function tasksV(){return `<h1>Add a task</h1><div class="card"><label>Type</label><select id="kd"><option>App install</option><option>Sign up</option><option>Survey</option><option>Other</option></select><label>Title</label><input id="tt" maxlength="80" placeholder="e.g. Install the app and open it"><label>Link</label><input id="lk" placeholder="https://"><label>Reward for the worker (points)</label><input id="rp" inputmode="numeric" value="500"><label>How many people can do it</label><input id="sl" inputmode="numeric" value="1000"><div style="margin-top:12px">${B('ok','Publish task','pub()')}</div></div>
<h2>All tasks</h2>${D.tasks.map(t=>`<div class="card"><div class="row"><b>${esc(t.title)}</b><span class="tag">${esc(t.status)}</span></div><div class="mute">${t.owner?nm(t.owner):'Platform'} · ${t.reward_points} pts · ${t.done_count} / ${t.slots} done</div>${!t.owner&&t.status==='live'?`<div style="margin-top:8px">${B('o','Close task',`rpc('admin_close_task',{p_id:${t.id}},'Closed')`)}</div>`:''}</div>`).join('')}`}
function usersV(){return `<h1>Users (${D.users.length})</h1>${D.users.map(u=>`<div class="card row"><div><b>${esc(u.name)}</b> ${u.is_admin?'<span class="tag">admin</span>':''}<div class="mute">Joined ${new Date(u.created_at).toLocaleDateString()}</div></div><div class="mute" style="text-align:right">${u.points} pts<br>Credit PKR ${u.credit_pkr}</div></div>`).join('')}`}
const sv=k=>D.st.find(x=>x.key===k)||{};
async function saveS(k){await rpc('set_setting',{p_key:k,p_value:+$('s_'+k).value},'Saved')}
async function savePay(){await rpc('set_text_setting',{p_key:'pay_number',p_text:$('s_pay').value.trim()},'Saved')}
function settingsV(){return `<h1>Settings</h1><div class="card"><label style="margin-top:0">Deposit number shown to users</label><input id="s_pay" value="${esc(sv('pay_number').text_value||'')}" placeholder="03001234567 (Account name)"><div style="margin-top:8px">${B('ok','Save','savePay()')}</div></div>`+Object.keys(NUM).map(k=>`<div class="card"><label style="margin-top:0">${NUM[k]}</label><div class="row" style="flex-wrap:nowrap"><input id="s_${k}" inputmode="decimal" value="${esc(sv(k).value)}">${B('ok','Save',`saveS('${k}')`)}</div></div>`).join('')+`
<div class="card"><button class="o" onclick="sb.auth.signOut().then(()=>location.href='index.html')">Log out</button> <a class="b o" href="index.html" style="background:var(--line);color:var(--ink)">Back to app</a></div>`}
function draw(){$('app').innerHTML={inbox,tasks:tasksV,users:usersV,settings:settingsV}[tab]();
 const n=D.dep.length+D.wd.length+D.tasks.filter(t=>t.status==='review').length+D.subs.filter(s=>(D.task[s.task_id]||{}).owner===null).length;
 $('nav').innerHTML=[['inbox','Inbox'+(n?' ('+n+')':'')],['tasks','Tasks'],['users','Users'],['settings','Settings']].map(t=>`<button class="${tab===t[0]?'on':''}" onclick="tab='${t[0]}';draw();scrollTo(0,0)">${t[1]}</button>`).join('')}
(async()=>{try{
 if(typeof supabase==='undefined'){$('app').innerHTML='<div class="card"><b>Could not load the library.</b><div class="mute">Try Wi-Fi or mobile data, then refresh.</div></div>';return}
 sb=supabase.createClient(SB_URL,SB_KEY);
 const{data:{session}}=await sb.auth.getSession();
 if(!session){$('app').innerHTML='<div class="card"><b>Please log in first.</b><p class="mute">Open the main app, log in with your admin account, then come back here.</p><a class="b" href="index.html">Open the app</a></div>';return}
 const{data:me}=await sb.from('profiles').select('is_admin').eq('id',session.user.id).single();
 if(!me||!me.is_admin){$('app').innerHTML='<div class="card"><b>Admins only.</b><p class="mute">This account is not an admin yet.</p></div>';return}
 await load()}catch(e){$('app').innerHTML=`<div class="card">${esc(e.message)}</div>`}})();
