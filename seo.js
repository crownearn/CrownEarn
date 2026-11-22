/* CrownEarn SEO text: shows a short "About" section under the login card (what Google and new visitors read). Load after lucky.js in index.html */
(function(){
const HTML=`<section id="seoAbout" class="card" style="margin-top:14px;text-align:left">
<h1 class="hd" style="font-size:20px;margin:0 0 6px">Earn rewards by completing simple tasks</h1>
<p class="mute" style="margin:0">CrownEarn is a task-based rewards platform. Complete tasks such as app installs, sign-ups and surveys, earn points, and withdraw your earnings to JazzCash or Easypaisa in PKR.</p>
<h2 style="font-size:17px;margin:16px 0 4px">How it works</h2>
<p class="mute" style="margin:2px 0">1. Create a free account.</p>
<p class="mute" style="margin:2px 0">2. Pick a task, complete it, then upload a screenshot as proof.</p>
<p class="mute" style="margin:2px 0">3. After review, the points are added to your balance.</p>
<p class="mute" style="margin:2px 0">4. Withdraw to JazzCash or Easypaisa when you reach the minimum.</p>
<h2 style="font-size:17px;margin:16px 0 4px">Bonuses and friends</h2>
<p class="mute" style="margin:0">Claim a daily bonus, join Lucky Draws, check the weekly leaderboard, and invite friends to earn commission on their tasks.</p>
<h2 style="font-size:17px;margin:16px 0 4px">Questions</h2>
<h3 style="font-size:15px;margin:8px 0 2px">Is it free to join?</h3><p class="mute" style="margin:0">Yes. Creating an account is free.</p>
<h3 style="font-size:15px;margin:8px 0 2px">How do I get paid?</h3><p class="mute" style="margin:0">After your proof is approved, withdraw your points to JazzCash or Easypaisa.</p>
<h3 style="font-size:15px;margin:8px 0 2px">Can I add my own task?</h3><p class="mute" style="margin:0">Yes. Add credit, create your task, and other people complete it for you.</p></section>`;
(function w(){if(!window.LangAdd)return setTimeout(w,60);LangAdd({
'Earn rewards by completing simple tasks':'آسان ٹاسک مکمل کر کے انعامات کمائیں',
'CrownEarn is a task-based rewards platform. Complete tasks such as app installs, sign-ups and surveys, earn points, and withdraw your earnings to JazzCash or Easypaisa in PKR.':'کراؤن ارن ٹاسک پر مبنی انعامی پلیٹ فارم ہے۔ ایپ انسٹال، سائن اپ اور سروے جیسے ٹاسک مکمل کریں، پوائنٹس کمائیں اور اپنی کمائی روپوں میں جاز کیش یا ایزی پیسہ میں نکلوائیں۔',
'How it works':'یہ کیسے کام کرتا ہے',
'1. Create a free account.':'1. مفت اکاؤنٹ بنائیں۔',
'2. Pick a task, complete it, then upload a screenshot as proof.':'2. ٹاسک چنیں، مکمل کریں، پھر ثبوت کے طور پر اسکرین شاٹ اپلوڈ کریں۔',
'3. After review, the points are added to your balance.':'3. جانچ کے بعد پوائنٹس آپ کے بیلنس میں شامل ہو جاتے ہیں۔',
'4. Withdraw to JazzCash or Easypaisa when you reach the minimum.':'4. کم از کم حد پوری ہونے پر جاز کیش یا ایزی پیسہ میں نکلوائیں۔',
'Bonuses and friends':'بونس اور دوست',
'Claim a daily bonus, join Lucky Draws, check the weekly leaderboard, and invite friends to earn commission on their tasks.':'روزانہ بونس لیں، لکی ڈرا میں شامل ہوں، ہفتہ وار لیڈر بورڈ دیکھیں اور دوستوں کو بلا کر ان کے ٹاسک پر کمیشن کمائیں۔',
'Questions':'سوالات','Is it free to join?':'کیا شامل ہونا مفت ہے؟','Yes. Creating an account is free.':'جی ہاں۔ اکاؤنٹ بنانا مفت ہے۔',
'How do I get paid?':'ادائیگی کیسے ملے گی؟','After your proof is approved, withdraw your points to JazzCash or Easypaisa.':'ثبوت منظور ہونے کے بعد اپنے پوائنٹس جاز کیش یا ایزی پیسہ میں نکلوائیں۔',
'Can I add my own task?':'کیا میں اپنا ٹاسک دے سکتا ہوں؟','Yes. Add credit, create your task, and other people complete it for you.':'جی ہاں۔ کریڈٹ ڈالیں، ٹاسک بنائیں اور دوسرے لوگ اسے مکمل کریں گے۔'})})();
const app=document.getElementById('app');if(!app)return;
function put(){if(!app.querySelector('#em')||document.getElementById('seoAbout'))return;const c=app.querySelector('.card');if(c)c.insertAdjacentHTML('afterend',HTML)}
if(window.MutationObserver)new MutationObserver(()=>requestAnimationFrame(put)).observe(app,{childList:true});
put();
})();
