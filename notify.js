/* CrownEarn notifications: bell, list, live updates (English and Urdu) */
(()=>{
const lg=()=>{try{return localStorage.getItem('lang')==='ur'?'ur':'en'}catch(e){return'en'}};
const TPL={
deposit_ok:{en:d=>['Deposit approved ✅',`PKR ${d.amt} was added to your task credit.`],ur:d=>['ڈپازٹ منظور ✅',`${d.amt} روپے آپ کے ٹاسک کریڈٹ میں شامل ہو گئے۔`]},
deposit_no:{en:d=>['Deposit rejected ❌','We could not verify your deposit. Please check the transaction ID or contact Customer Service.'],ur:d=>['ڈپازٹ رد ❌','ہم آپ کا ڈپازٹ تصدیق نہیں کر سکے۔ ٹرانزیکشن آئی ڈی دیکھیں یا کسٹمر سروس سے رابطہ کریں۔']},
wd_paid:{en:d=>['Withdrawal paid 💸',`PKR ${d.amt} was sent to your ${d.method}.${d.txn?' Transaction ID: '+d.txn:''}`],ur:d=>['ودڈرا ادا ہو گیا 💸',`${d.amt} روپے آپ کے ${d.method} میں بھیج دیے گئے۔${d.txn?' ٹرانزیکشن آئی ڈی: '+d.txn:''}`]},
wd_no:{en:d=>['Withdrawal rejected ❌',`Your ${d.pts} points were returned to your balance. Contact Customer Service for details.`],ur:d=>['ودڈرا رد ❌',`آپ کے ${d.pts} پوائنٹس آپ کے بیلنس میں واپس آ گئے۔ تفصیل کے لیے کسٹمر سروس سے رابطہ کریں۔`]},
proof_ok:{en:d=>['Task approved ✅',`+${d.pts} points for "${d.title}".`],ur:d=>['ٹاسک منظور ✅',`"${d.title}" کے +${d.pts} پوائنٹس مل گئے۔`]},
proof_no:{en:d=>['Proof rejected ❌',`"${d.title}"${d.reason?': '+d.reason:'.'}`],ur:d=>['ثبوت رد ❌',`"${d.title}"${d.reason?': '+d.reason:'۔'}`]},
task_live:{en:d=>['Your task is live ⭐',`"${d.title}" was approved and is now visible to everyone.`],ur:d=>['آپ کا ٹاسک لائیو ہو گیا ⭐',`"${d.title}" منظور ہو گیا اور اب سب کو نظر آ رہا ہے۔`]},
task_no:{en:d=>['Task rejected ❌',`"${d.title}" was not approved. PKR ${d.amt} was returned to your task credit.`],ur:d=>['ٹاسک رد ❌',`"${d.title}" منظور نہیں ہوا۔ ${d.amt} روپے آپ کے ٹاسک کریڈٹ میں واپس آ گئے۔`]},
blocked:{en:()=>['Account blocked 🚫','Please contact Customer Service.'],ur:()=>['اکاؤنٹ بلاک 🚫','براہ کرم کسٹمر سروس سے رابطہ کریں۔']},
unblocked:{en:()=>['Account unblocked ✅','You can use the app again.'],ur:()=>['اکاؤنٹ بحال ✅','اب آپ ایپ دوبارہ استعمال کر سکتے ہیں۔']},
announcement:{en:d=>['Announcement 📢',d.text],ur:d=>['اعلان 📢',d.text]}};
const fmt=n=>{const t=TPL[n.kind];return t?t[lg()](n.data||{}):['Notification','']};
const ready=()=>typeof P!=='undefined'&&P&&typeof sb!=='undefined';
let N=[],raf=0;
const unread=()=>{const t=new Date(P.notif_read_at||0);return N.filter(n=>new Date(n.created_at)>t).length};
function badge(){const b=document.getElementById('bdgN');if(!b||!ready())return;const u=unread();b.style.display=u?'inline-block':'none';b.textContent=u}
async function load(){if(!ready())return;const{data,error}=await sb.from('notifications').select('*').order('id',{ascending:false}).limit(40);if(error)return;N=data||[];badge()}
function ensure(){if(!ready())return;const row=document.getElementById('lt'),b=document.getElementById('bell');
 if(b){if(row&&b.parentNode!==row){row.insertAdjacentElement('afterbegin',b);row.style.gap='6px';const nb=document.getElementById('nb');if(nb)nb.remove()}return}
 const html='<button id="bell" class="o" aria-label="Notifications" onclick="Notify.open()" style="padding:2px 10px;font-size:15px;border-bottom-width:2px">🔔<i class="bdg" id="bdgN" style="display:none;margin-left:2px"></i></button>';
 if(row){row.insertAdjacentHTML('afterbegin',html);row.style.gap='6px'}else{const a=document.getElementById('app');if(a)a.insertAdjacentHTML('afterbegin','<div id="nb" style="display:flex;justify-content:flex-end">'+html+'</div>')}badge()}
const when=d=>new Date(d).toLocaleString([],{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'});
async function open(){if(!ready())return;await load();const t0=new Date(P.notif_read_at||0),ur=lg()==='ur';
 const o=document.createElement('div');o.id='nl';o.className='ov';o.style.zIndex=40;o.onclick=e=>{if(e.target===o)o.remove()};
 o.innerHTML=`<div class="sh" style="padding:14px"><div class="row"><div class="hd" style="font-size:20px">🔔 ${ur?'نوٹیفکیشن':'Notifications'}</div><button class="o" style="padding:4px 12px" aria-label="Close" onclick="document.getElementById('nl').remove()">✕</button></div>${N.length?N.map(n=>{const[a,b]=fmt(n),nw=new Date(n.created_at)>t0;return `<div class="card" style="${nw?'border-color:var(--gold);border-width:2px':''}"><b>${esc(a)}</b><div>${esc(b)}</div><div class="mute" style="font-size:12px">${when(n.created_at)}</div></div>`}).join(''):`<div class="card mute">${ur?'ابھی کوئی نوٹیفکیشن نہیں۔':'No notifications yet.'}</div>`}</div>`;
 document.body.appendChild(o);
 if(unread()){await sb.rpc('mark_notifs_read');P.notif_read_at=new Date().toISOString();badge()}}
window.Notify={open,load};
const iv=setInterval(()=>{if(!ready())return;clearInterval(iv);load();
 try{sb.channel('notif'+Date.now()).on('postgres_changes',{event:'INSERT',schema:'public',table:'notifications'},p=>{load();const[a]=fmt(p.new);if(typeof toast==='function')toast(a)}).subscribe()}catch(e){}},500);
setInterval(()=>{if(ready()&&!document.hidden)load()},30000);
if(window.MutationObserver)new MutationObserver(()=>{if(raf)return;raf=1;requestAnimationFrame(()=>{raf=0;ensure()})}).observe(document.body,{childList:true,subtree:true});
})();
