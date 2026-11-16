/* CrownEarn phone alerts (they also arrive when the app is closed) */
(()=>{
const lg=()=>{try{return localStorage.getItem('lang')==='ur'?'ur':'en'}catch(e){return'en'}};
const S={en:{on:'Turn on phone alerts',off:'Turn off',is:'✅ Phone alerts are on',no:'Alerts are blocked. Allow notifications for this app in your phone settings.',na:'Phone alerts are not supported here. On iPhone, install the app to the Home Screen first.',hint:'Get alerts for payments, approvals and announcements even when the app is closed.',err:'Could not turn on alerts. Try again.'},
ur:{on:'فون پر الرٹ آن کریں',off:'بند کریں',is:'✅ فون الرٹ آن ہیں',no:'الرٹ بلاک ہیں۔ اپنے فون کی سیٹنگز میں اس ایپ کے نوٹیفکیشن کی اجازت دیں۔',na:'یہاں فون الرٹ ممکن نہیں۔ آئی فون پر پہلے ایپ کو ہوم اسکرین پر لگائیں۔',hint:'ادائیگی، منظوری اور اعلان کے الرٹ ایپ بند ہونے پر بھی ملیں۔',err:'الرٹ آن نہیں ہو سکے۔ دوبارہ کوشش کریں۔'}};
const ok=()=>'serviceWorker' in navigator&&'PushManager' in window&&'Notification' in window;
const ready=()=>typeof P!=='undefined'&&P&&typeof sb!=='undefined';
const key=s=>{const b=atob((s+'='.repeat((4-s.length%4)%4)).replace(/-/g,'+').replace(/_/g,'/'));return Uint8Array.from([...b].map(c=>c.charCodeAt(0)))};
const cur=async()=>(await navigator.serviceWorker.ready).pushManager.getSubscription();
async function save(s){const j=s.toJSON();await sb.rpc('save_push_sub',{p_endpoint:j.endpoint,p_p256dh:j.keys.p256dh,p_auth:j.keys.auth,p_lang:lg()})}
async function on(){const t=S[lg()];try{if(await Notification.requestPermission()!=='granted'){render();return}
 let k=(typeof D!=='undefined'&&D.cfg&&D.cfg.vapid_public)||'';
 if(!k){const{data}=await sb.from('settings').select('text_value').eq('key','vapid_public').single();k=data&&data.text_value}
 if(!k){toast(t.err);return}
 const r=await navigator.serviceWorker.ready;let s=await r.pushManager.getSubscription();
 if(!s)s=await r.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:key(k)});
 await save(s);render()}catch(e){toast(t.err)}}
async function off(){try{const s=await cur();if(s){const ep=s.endpoint;await s.unsubscribe();await sb.rpc('drop_push_sub',{p_endpoint:ep})}}catch(e){}render()}
async function render(){const box=document.getElementById('pa');if(!box)return;const t=S[lg()];let h;
 if(!ok())h=`<div class="mute">${t.na}</div>`;
 else if(Notification.permission==='denied')h=`<div class="mute">${t.no}</div>`;
 else{const s=await cur().catch(()=>null);h=s&&Notification.permission==='granted'?`<div class="row"><b>${t.is}</b><button class="o" style="padding:4px 12px" onclick="Alerts.off()">${t.off}</button></div>`:`<div class="mute" style="margin-bottom:8px">${t.hint}</div><button class="g w" onclick="Alerts.on()">🔔 ${t.on}</button>`}
 box.innerHTML=h}
window.Alerts={on,off};
let raf=0;new MutationObserver(()=>{if(raf)return;raf=1;requestAnimationFrame(()=>{raf=0;const sh=document.querySelector('#nl .sh');if(sh&&!document.getElementById('pa')){sh.firstElementChild.insertAdjacentHTML('afterend','<div class="card" id="pa" style="margin-top:10px"></div>');render()}})}).observe(document.body,{childList:true,subtree:true});
const iv=setInterval(async()=>{if(!ready())return;clearInterval(iv);if(ok()&&Notification.permission==='granted'){const s=await cur().catch(()=>null);if(s)save(s)}},1500);
})();
