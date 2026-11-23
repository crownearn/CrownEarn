/* Admin: Auto cleanup settings (how many days to keep notifications and chat) + Clean now. Load after admin3.js in admin.html */
Object.assign(NUM,{notif_keep_days:'Delete notifications older than (days)',chat_keep_days:'Delete chat messages older than (days)'});
const _sv4=settingsV;
settingsV=function(){
 const g=grp('clean','🧹','c2','Auto cleanup','Keeps the app tidy: old notifications and chat messages are removed',numC('notif_keep_days')+numC('chat_keep_days')+`<div class="card"><div class="mute">Cleanup runs by itself. You can also run it now.</div><div style="margin-top:8px">${B('o','Clean now','cleanNow()')}</div></div>`);
 const m='<div class="card"><button class="o" onclick="sb.auth.signOut()',h=_sv4();return h.includes(m)?h.replace(m,g+m):h+g};
async function cleanNow(){const{data,error}=await sb.rpc('cleanup_old',{p_force:true});if(error){toast(error.message);return}toast('Cleaned: '+(data||0)+' old items removed')}
setTimeout(()=>{try{sb.rpc('cleanup_old')}catch(e){}},5000);
