/* CrownEarn: account name for deposits and withdrawals */
const acctMem=()=>{try{return JSON.parse(localStorage.getItem('acct')||'{}')}catch(e){return{}}};
const acctSave=o=>{try{localStorage.setItem('acct',JSON.stringify({...acctMem(),...o}))}catch(e){}};
async function openD2(){M='JazzCash';const L=acctMem();let n='';try{const{data}=await sb.from('settings').select('text_value').eq('key','pay_number').single();n=(data&&data.text_value)||''}catch(e){}
 sheet('Make a deposit','Send the money, enter the transaction ID, and your credit is added after review.',MS+`<div class="sum">Send money to this number:<br><b dir="ltr">${esc(n||'03XX-XXXXXXX')}</b></div><label>Amount (PKR)</label><input id="da" inputmode="numeric" placeholder="500"><label>Your account name (the name on the account you sent from)</label><input id="dn" maxlength="60" placeholder="Name" value="${esc(L.name||'')}"><label>Transaction ID</label><input id="dt" placeholder="1234567890">`,'Send request','reqD()')}
async function reqD(){const a=+$('da').value,t=$('dt').value.trim(),nm=$('dn').value.trim();
 if(!(a>=(D.cfg.min_deposit||100))){toast('Minimum deposit is PKR '+(D.cfg.min_deposit||100));return}
 if(nm.length<3){toast('Enter your account name');return}if(t.length<6){toast('Enter the transaction ID');return}
 if(await rpc('request_deposit',{p_method:M,p_amount:a,p_txn:t,p_name:nm})){acctSave({name:nm});closeW();tab='wallet';draw();toast('Request sent. Waiting for approval.')}}
const openW2=()=>{M='JazzCash';const L=acctMem();sheet('Withdraw',`You will receive: <b>PKR ${rs(P.points)}</b>`,MS+`<label>Account name (the name on your account)</label><input id="wn" maxlength="60" placeholder="Name" value="${esc(L.name||'')}"><label>Account number</label><input id="ph" inputmode="numeric" maxlength="11" placeholder="03XXXXXXXXX" value="${esc(L.num||'')}"><div class="mute" style="margin-top:6px">Double-check your name and number before sending.</div>`,'Send request','confirmW()')};
async function confirmW(){const n=$('ph').value.trim(),nm=$('wn').value.trim();
 if(P.points<MINW()){toast('Minimum withdrawal is '+MINW()+' points');return}
 if(nm.length<3){toast('Enter your account name');return}if(!/^03\d{9}$/.test(n)){toast('Enter a valid number, like 03001234567');return}
 const v=P.points;if(await rpc('request_withdraw',{p_method:M,p_account:n,p_points:v,p_name:nm})){acctSave({name:nm,num:n});closeW();win('Request sent ✅','After review, PKR '+rs(v)+' will reach your '+M)}}
new MutationObserver(()=>{document.querySelectorAll('[onclick="openW()"]').forEach(b=>b.setAttribute('onclick','openW2()'))}).observe(document.body,{childList:true,subtree:true});
(function w(){if(!window.LangAdd)return setTimeout(w,100);LangAdd({'Your account name (the name on the account you sent from)':'آپ کے اکاؤنٹ کا نام (جس اکاؤنٹ سے رقم بھیجی اس کا نام)','Account name (the name on your account)':'اکاؤنٹ کا نام (آپ کے اکاؤنٹ پر لکھا نام)','Double-check your name and number before sending.':'بھیجنے سے پہلے اپنا نام اور نمبر دوبارہ دیکھ لیں۔','Enter your account name':'اپنے اکاؤنٹ کا نام لکھیں'})})();
