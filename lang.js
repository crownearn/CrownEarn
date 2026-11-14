/* CrownEarn Urdu: language switch, right-to-left layout, translations (part 1: main screens) */
(()=>{
const T={'Home':'ہوم','Tasks':'ٹاسکس','Add Task':'ٹاسک دیں','Referral':'ریفرل','Wallet':'والٹ',
'How much will you earn today?':'آج کتنا کمائیں گے؟','Your earnings':'آپ کی کمائی','PKR':'روپے',
'Coiny says: Wow! You can withdraw now':'پیسو کہتا ہے: واہ! اب آپ ودڈرا کر سکتے ہیں','Daily bonus':'روزانہ بونس','Come back tomorrow':'کل پھر آئیں',
'Deposit':'ڈپازٹ','Add task':'ٹاسک دیں','Withdraw':'ودڈرا','Tasks for you':'آپ کے لیے ٹاسکس','Open':'کھولیں','Under review':'جانچ جاری','See all tasks':'سب ٹاسکس دیکھیں','Submit proof':'ثبوت دیں','Done ✔':'مکمل ✔','Rejected':'رد',
'No tasks right now. Check back soon!':'ابھی کوئی ٹاسک نہیں۔ جلد دوبارہ دیکھیں!','All':'سب','App install':'ایپ انسٹال','Sign up':'سائن اپ','Survey':'سروے','Other':'دیگر','No tasks in this category right now.':'اس قسم میں ابھی کوئی ٹاسک نہیں۔',
'My earnings (withdrawable)':'میری کمائی (ودڈرا کے قابل)','Task credit (deposit)':'ٹاسک کریڈٹ (ڈپازٹ)','Use it to give tasks to others':'دوسروں کو ٹاسک دینے کے لیے','My requests':'میری درخواستیں','Pending':'انتظار میں','Paid ✔':'ادا ✔','Approved ✔':'منظور ✔',
'My badges':'میرے بیجز','First task':'پہلا ٹاسک','3-day streak':'3 دن کا سلسلہ','First withdrawal':'پہلا ودڈرا','Gold member':'گولڈ ممبر','Transactions':'لین دین','Task reward':'ٹاسک کا انعام','Daily bonus ':'روزانہ بونس','Withdrawal':'ودڈرا','Withdrawal refund':'ودڈرا کی واپسی','Task created':'ٹاسک بنایا','Task refund':'ٹاسک کی واپسی','Friend commission':'دوست کا کمیشن','Friend bonus':'دوست کا بونس',
'Log out':'لاگ آؤٹ','Open Admin Panel':'ایڈمن پینل کھولیں','Payment receipts':'ادائیگی کی رسیدیں','Payment sent':'ادائیگی بھیج دی گئی','Terms and Privacy':'شرائط اور پرائیویسی','No transactions yet.':'ابھی کوئی لین دین نہیں۔',
'Invite friends. Earn commission whenever they earn.':'دوستوں کو بلائیں۔ جب وہ کمائیں تو آپ کو کمیشن ملے۔','Your commission':'آپ کا کمیشن','of every task your friends complete, for as long as they use the app':'آپ کے دوستوں کے ہر مکمل ٹاسک کا، جب تک وہ ایپ استعمال کریں',
'Friends':'دوست','Active':'فعال','Pts earned':'کمائے پوائنٹس','Your link':'آپ کا لنک','Copy link':'لنک کاپی کریں','WhatsApp':'واٹس ایپ','Your code:':'آپ کا کوڈ:','How it works':'کیسے کام کرتا ہے',
'1. Send your link to a friend, for example on WhatsApp.':'1. اپنا لنک دوست کو بھیجیں، مثلاً واٹس ایپ پر۔','2. They sign up and complete tasks.':'2. وہ سائن اپ کر کے ٹاسک مکمل کرتے ہیں۔','No friends yet. Share your link to get started.':'ابھی کوئی دوست نہیں۔ شروع کرنے کے لیے اپنا لنک بھیجیں۔',
'Customer':'کسٹمر','Service':'سروس','Customer Service':'کسٹمر سروس','Support hours':'سپورٹ کے اوقات','You can write at any time. We reply during support hours.':'آپ کسی بھی وقت لکھ سکتے ہیں۔ ہم سپورٹ کے اوقات میں جواب دیں گے۔',
'General':'عمومی','Task':'ٹاسک','Message':'پیغام','🔒 Messages are cleared after 24 hours':'🔒 پیغام 24 گھنٹے بعد صاف ہو جاتے ہیں','No messages yet. Say hello 👋':'ابھی کوئی پیغام نہیں۔ سلام کریں 👋','Today':'آج','Yesterday':'کل',
'Missions':'مشنز','Complete your first task':'اپنا پہلا ٹاسک مکمل کریں','Complete 5 tasks':'5 ٹاسک مکمل کریں','Keep a 3-day streak':'3 دن کا سلسلہ رکھیں','Invite a friend':'دوست کو بلائیں','Give your first task':'اپنا پہلا ٹاسک دیں','Make your first withdrawal':'اپنا پہلا ودڈرا کریں',
'Top earners this week':'ہفتے کے بہترین کمانے والے','Recent payouts':'حالیہ ادائیگیاں','No one yet. Complete a task to be first!':'ابھی کوئی نہیں۔ ٹاسک مکمل کر کے پہلے بنیں!','All missions complete. Well done!':'سب مشن مکمل۔ شاباش!','Announcement':'اعلان'};
const P=[[/^Hello, (.+) 👋$/,n=>`السلام علیکم ${n} 👋`],[/^Coiny says: Great job! Only (\d+) points left to withdraw 💪$/,n=>`پیسو کہتا ہے: شاباش! ودڈرا میں بس ${n} پوائنٹس باقی 💪`],
[/^(\d+)-day streak 🔥$/,n=>`${n} دن کا سلسلہ 🔥`],[/^Claim daily bonus \+(\d+)$/,n=>`روزانہ بونس لیں +${n}`],[/^([+-]?\d+) pts · PKR (\d+)$/,(a,b)=>`${a} پوائنٹس · ${b} روپے`],
[/^(\d+) available · every proof is reviewed$/,n=>`${n} دستیاب · ہر ثبوت کی جانچ ہوتی ہے`],[/^(.+) · Level (\d+)$/,(n,l)=>`${n} · لیول ${l}`],[/^(\d+) tasks done · (\d+) withdrawals$/,(a,b)=>`${a} ٹاسک مکمل · ${b} ودڈرا`],
[/^(\d+) pts · (\d+) pts = PKR 1$/,(a,b)=>`${a} پوائنٹس · ${b} پوائنٹ = 1 روپیہ`],[/^Earn (\d+) more points to withdraw$/,n=>`ودڈرا کے لیے ${n} پوائنٹس اور کمائیں`],
[/^PKR (\d+)$/,n=>`${n} روپے`],[/^\+PKR (\d+)$/,n=>`+${n} روپے`],[/^([+-]?\d+) pts$/,n=>`${n} پوائنٹس`],[/^✅ PKR (\d+) paid via (.+)$/,(n,m)=>`✅ ${n} روپے ادا (${m} کے ذریعے)`],[/^Transaction ID: (.+)$/,x=>`ٹرانزیکشن آئی ڈی: ${x}`],
[/^\+ (\d+) pts when a friend finishes their first task$/,n=>`+ ${n} پوائنٹس جب دوست اپنا پہلا ٹاسک مکمل کرے`],
[/^3\. You get (\d+)% extra on every approved task\. For example, a friend earns 500 pts and you get (\d+) pts\. It does not reduce their earnings\.$/,(a,b)=>`3. آپ کو ہر منظور شدہ ٹاسک پر ${a}% اضافی ملتا ہے۔ مثلاً دوست 500 پوائنٹس کمائے تو آپ کو ${b} ملتے ہیں۔ اس سے ان کی کمائی کم نہیں ہوتی۔`],
[/^Your friends \((\d+)\)$/,n=>`آپ کے دوست (${n})`],[/^· ID (.+)$/,x=>`· آئی ڈی ${x}`],[/^Joined (.+) · (\d+) tasks done · (active|not started yet)$/,(d,n,a)=>`شامل ہوئے ${d} · ${n} ٹاسک مکمل · ${a==='active'?'فعال':'ابھی شروع نہیں کیا'}`],
[/^My badges · Level (\d+)$/,n=>`میرے بیجز · لیول ${n}`],[/^(.+) \(you\)$/,n=>`${n} (آپ)`],[/^You: #(\d+) · (\d+) pts$/,(r,p)=>`آپ: #${r} · ${p} پوائنٹس`]];
window.LangAdd=(t,p)=>{Object.assign(T,t);if(p)P.push(...p)};
const tr=s=>{const k=s.trim();if(!k)return null;if(T[k]!=null)return T[k];for(const[r,f]of P){const m=k.match(r);if(m)return f(...m.slice(1))}
 let m=k.match(/^([^\sA-Za-z0-9+\-.:(#]+) (.+)$/);if(m&&T[m[2]]!=null)return m[1]+' '+T[m[2]];
 m=k.match(/^(.+?) ([^\sA-Za-z0-9+\-.:)]+)$/);if(m&&T[m[1]]!=null)return T[m[1]]+' '+m[2];return null};
let lang='en';try{lang=localStorage.getItem('lang')||'en'}catch(e){}
function one(n){const k=n.__en!=null?n.__en:n.nodeValue;let out=k;if(lang==='ur'){const t=tr(k);if(t!=null)out=k.match(/^\s*/)[0]+t+k.match(/\s*$/)[0]}if(out!==n.nodeValue){if(n.__en==null)n.__en=k;n.nodeValue=out}}
function attrs(root){root.querySelectorAll('[placeholder],[aria-label]').forEach(e=>{for(const a of['placeholder','aria-label']){if(!e.hasAttribute(a))continue;const k=e['__'+a]!=null?e['__'+a]:e.getAttribute(a),t=lang==='ur'?tr(k):null,v=t!=null?t:k;if(v!==e.getAttribute(a)){if(e['__'+a]==null)e['__'+a]=k;e.setAttribute(a,v)}}})}
function apply(){const root=document.body;if(!root)return;const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){const p=n.parentNode&&n.parentNode.nodeName;if(p==='SCRIPT'||p==='STYLE')continue;one(n)}attrs(root);btn()}
function btn(){const a=document.getElementById('app');if(!a||document.getElementById('lt'))return;a.insertAdjacentHTML('afterbegin',`<div id="lt" style="display:flex;justify-content:flex-end"><button class="o" style="padding:2px 12px;font-size:13px;border-bottom-width:2px" onclick="Lang.toggle()" aria-label="Language">🌐 ${lang==='ur'?'English':'اردو'}</button></div>`)}
function mode(){const h=document.documentElement;h.lang=lang;h.dir=lang==='ur'?'rtl':'ltr';if(lang==='ur'&&!document.getElementById('lgs')){document.head.insertAdjacentHTML('beforeend','<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;600;700&display=swap"><style id="lgs">html[lang=ur] body,html[lang=ur] button,html[lang=ur] input,html[lang=ur] .hd,html[lang=ur] .sec,html[lang=ur] .big{font-family:"Noto Naskh Arabic","Baloo 2",system-ui,sans-serif}html[lang=ur] input:not([inputmode]){text-align:start;unicode-bidi:plaintext}html[lang=ur] body{line-height:1.8}</style>')}}
function set(l){lang=l;try{localStorage.setItem('lang',l)}catch(e){}mode();const b=document.getElementById('lt');if(b)b.remove();apply()}
window.Lang={toggle:()=>set(lang==='ur'?'en':'ur'),set,tr};
let q=false;const go=()=>{if(q)return;q=true;requestAnimationFrame(()=>{q=false;apply()})};
mode();apply();if(window.MutationObserver)new MutationObserver(go).observe(document.body,{childList:true,subtree:true,characterData:true});
})();
