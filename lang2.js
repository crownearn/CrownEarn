/* CrownEarn Urdu part 2: Add Task form, login, terms, sheets, messages and errors */
(function w(){if(!window.LangAdd)return setTimeout(w,60);
const ST={'Under review':'جانچ جاری','Live ✅':'لائیو ✅','Completed':'مکمل','Rejected':'رد'};
LangAdd({
'Add your task':'اپنا ٹاسک دیں','Paste your link, set the price, and people will complete it for you':'اپنا لنک ڈالیں، قیمت طے کریں، لوگ آپ کا ٹاسک مکمل کریں گے','Task credit:':'ٹاسک کریڈٹ:','Task type':'ٹاسک کی قسم',
'App installs, sign-ups and surveys work best. Follow, subscribe or view tasks on YouTube or TikTok can break their policies.':'ایپ انسٹال، سائن اپ اور سروے بہتر چلتے ہیں۔ یوٹیوب یا ٹک ٹاک پر فالو، سبسکرائب یا ویوز کے ٹاسک ان کی پالیسی کے خلاف ہو سکتے ہیں۔',
'Task title':'ٹاسک کا عنوان','Link':'لنک','Price per task (PKR)':'قیمت فی ٹاسک (روپے)','Number of people':'لوگوں کی تعداد','Total cost:':'کل خرچ:','Create task':'ٹاسک بنائیں','Proofs to review':'جانچ کے لیے ثبوت','Approve':'منظور','Reject':'رد کریں','My tasks':'میرے ٹاسکس','Proof:':'ثبوت:','View screenshot':'اسکرین شاٹ دیکھیں',
'Task picture (app icon, game logo or video thumbnail)':'ٹاسک کی تصویر (ایپ آئیکن، گیم لوگو یا ویڈیو تھمب نیل)','e.g. Install my app and open it':'مثلاً: میرا ایپ انسٹال کریں اور کھولیں',
'Terms of use':'استعمال کی شرائط','Privacy':'پرائیویسی','Back':'واپس',
'• CrownEarn is a task platform. Points are earned only for tasks that are reviewed and approved.':'• کراؤن ارن ایک ٹاسک پلیٹ فارم ہے۔ پوائنٹس صرف ان ٹاسکس پر ملتے ہیں جن کی جانچ ہو کر منظوری ہو۔',
'• One person, one account. Fake accounts and repeated or false proofs lead to a permanent ban and loss of points.':'• ایک شخص، ایک اکاؤنٹ۔ جعلی اکاؤنٹ اور بار بار یا جھوٹے ثبوت پر مستقل پابندی لگے گی اور پوائنٹس ضبط ہوں گے۔',
'• Withdrawals are reviewed and paid manually to JazzCash or Easypaisa. The minimum withdrawal and the rate are shown in the app and may change.':'• ودڈرا کی جانچ ہوتی ہے اور ادائیگی ہاتھ سے JazzCash یا Easypaisa پر کی جاتی ہے۔ کم از کم ودڈرا اور ریٹ ایپ میں دکھائے جاتے ہیں اور بدل سکتے ہیں۔',
'• Deposits are used only to pay for tasks you create. Rejected tasks are refunded to your task credit.':'• ڈپازٹ صرف آپ کے بنائے ہوئے ٹاسکس کی ادائیگی کے لیے استعمال ہوتا ہے۔ رد شدہ ٹاسک کی رقم آپ کے ٹاسک کریڈٹ میں واپس آ جاتی ہے۔',
'• Do not post tasks that break the rules of other platforms, or that are illegal, adult or misleading.':'• ایسے ٹاسک نہ بنائیں جو دوسرے پلیٹ فارمز کے اصولوں کے خلاف ہوں، یا غیر قانونی، غیر اخلاقی یا گمراہ کن ہوں۔',
'• We may reject proofs, tasks or withdrawals that look fraudulent.':'• ہم مشکوک ثبوت، ٹاسک یا ودڈرا رد کر سکتے ہیں۔',
'• We store your name, email, task activity, balances and messages so the app can work.':'• ایپ چلانے کے لیے ہم آپ کا نام، ای میل، ٹاسک کی سرگرمی، بیلنس اور پیغامات محفوظ رکھتے ہیں۔',
'• Proof screenshots and voice notes are private. Only you, the task owner (for proofs) and the admin can see them.':'• ثبوت کے اسکرین شاٹ اور وائس پیغام نجی ہیں۔ صرف آپ، ٹاسک کا مالک (ثبوت کے لیے) اور ایڈمن انہیں دیکھ سکتے ہیں۔',
'• We do not sell your data. We never ask for your password or card details.':'• ہم آپ کا ڈیٹا نہیں بیچتے۔ ہم آپ کا پاس ورڈ یا کارڈ کی تفصیل کبھی نہیں مانگتے۔',
'• Paid withdrawals may appear in the Recent payouts list with a masked name (like A***) and the amount.':'• ادا شدہ ودڈرا "حالیہ ادائیگیاں" میں چھپے ہوئے نام (جیسے A***) اور رقم کے ساتھ نظر آ سکتے ہیں۔',
'• To delete your account or data, message us in Help.':'• اکاؤنٹ یا ڈیٹا مٹانے کے لیے Customer Service میں پیغام کریں۔',
'Complete tasks. Earn rewards. Withdraw to PKR.':'ٹاسک کریں۔ انعام کمائیں۔ روپوں میں نکالیں۔','Email':'ای میل','Password':'پاس ورڈ','Log in':'لاگ اِن','New here?':'نئے ہیں؟','Create account':'اکاؤنٹ بنائیں','Your name':'آپ کا نام','Referral code (optional)':'ریفرل کوڈ (اختیاری)','Already have an account?':'پہلے سے اکاؤنٹ ہے؟',
'6+ characters':'6 یا زیادہ حروف','Name':'نام','Optional':'اختیاری','Link or username':'لنک یا یوزرنیم','Username or comment':'یوزرنیم یا تبصرہ',
'You will receive:':'آپ کو ملیں گے:','Account number':'اکاؤنٹ نمبر','Double-check your number before sending.':'بھیجنے سے پہلے اپنا نمبر دوبارہ دیکھ لیں۔','Send request':'درخواست بھیجیں',
'Do the task first, then upload a screenshot that shows it is done.':'پہلے ٹاسک کریں، پھر اسکرین شاٹ اپلوڈ کریں جو ثبوت ہو کہ کام ہو گیا۔','Screenshot':'اسکرین شاٹ','Note (optional)':'نوٹ (اختیاری)','Send proof':'ثبوت بھیجیں','Awesome!':'شاباش!','Uploading…':'اپلوڈ ہو رہا ہے…',
'Make a deposit':'ڈپازٹ کریں','Send the money, enter the transaction ID, and your credit is added after review.':'رقم بھیجیں، ٹرانزیکشن آئی ڈی لکھیں، جانچ کے بعد آپ کا کریڈٹ شامل ہو جائے گا۔','Send money to this number:':'اس نمبر پر رقم بھیجیں:','Amount (PKR)':'رقم (روپے)','Transaction ID':'ٹرانزیکشن آئی ڈی',
'Recording… tap send when done':'ریکارڈنگ… ختم ہو تو بھیجیں دبائیں','🚫 This message was deleted':'🚫 یہ پیغام مٹا دیا گیا','✏️ Edit (within 15 minutes)':'✏️ ایڈٹ (15 منٹ کے اندر)','🗑 Delete':'🗑 ڈیلیٹ','Cancel':'منسوخ','Editing message…':'پیغام ایڈٹ ہو رہا ہے…',
'Request sent':'درخواست بھیج دی گئی','Task submitted':'ٹاسک جمع ہو گیا','Daily bonus claimed':'روزانہ بونس مل گیا','Link copied':'لنک کاپی ہو گیا','It goes live after the admin reviews it':'ایڈمن کی جانچ کے بعد یہ لائیو ہو جائے گا',
'Proof sent. Points arrive after review.':'ثبوت بھیج دیا گیا۔ جانچ کے بعد پوائنٹس ملیں گے۔','Request sent. Waiting for approval.':'درخواست بھیج دی گئی۔ منظوری کا انتظار ہے۔','Choose a screenshot first':'پہلے اسکرین شاٹ چنیں','Enter your proof':'اپنا ثبوت لکھیں',
'Enter a task title':'ٹاسک کا عنوان لکھیں','Enter a valid link starting with https://':'درست لنک لکھیں جو https:// سے شروع ہو','Minimum is PKR 2 per task and 5 people':'کم از کم 2 روپے فی ٹاسک اور 5 لوگ','Not enough credit. Please deposit first.':'کریڈٹ کم ہے۔ پہلے ڈپازٹ کریں۔',
'Enter a valid number, like 03001234567':'درست نمبر لکھیں، جیسے 03001234567','Enter the transaction ID':'ٹرانزیکشن آئی ڈی لکھیں','Enter your email and a password of 6+ characters':'اپنی ای میل اور 6 یا زیادہ حروف کا پاس ورڈ لکھیں','Check your email to confirm, then log in':'تصدیق کے لیے اپنی ای میل دیکھیں، پھر لاگ اِن کریں',
'Please allow the microphone to send voice messages':'وائس پیغام بھیجنے کے لیے مائیک کی اجازت دیں','Hold on a little longer':'تھوڑا اور ریکارڈ کریں','Could not play this message':'یہ پیغام چل نہیں سکا',
'Login required':'پہلے لاگ اِن کریں','Not enough credit':'کریڈٹ کم ہے','Not enough points':'پوائنٹس کم ہیں','Invalid account number':'اکاؤنٹ نمبر درست نہیں','Task not available':'ٹاسک دستیاب نہیں','You cannot do your own task':'آپ اپنا ٹاسک خود نہیں کر سکتے','Task is full':'ٹاسک بھر چکا ہے',
'This account is blocked. Please contact support in Help.':'یہ اکاؤنٹ بلاک ہے۔ براہ کرم Customer Service سے رابطہ کریں۔','This screenshot was already used. Please upload your own new screenshot.':'یہ اسکرین شاٹ پہلے استعمال ہو چکا ہے۔ اپنا نیا اسکرین شاٹ اپلوڈ کریں۔',
'Too many messages. Please wait a while.':'بہت زیادہ پیغام۔ تھوڑی دیر انتظار کریں۔','You can edit within 15 minutes':'آپ 15 منٹ کے اندر ایڈٹ کر سکتے ہیں','Invalid login credentials':'ای میل یا پاس ورڈ غلط ہے','User already registered':'یہ ای میل پہلے سے رجسٹرڈ ہے','Email not confirmed':'ای میل کی تصدیق نہیں ہوئی',
'Invalid title or link':'عنوان یا لنک درست نہیں','Message must be 1 to 500 characters':'پیغام 1 سے 500 حروف کا ہونا چاہیے'
},[
[/^PKR (\d+) per task · (\d+) people · (.+)$/,(a,b,s)=>`${a} روپے فی ٹاسک · ${b} لوگ · ${ST[s]||s}`],[/^(\d+) \/ (\d+) done$/,(a,b)=>`${a} / ${b} مکمل`],[/^edited · (.+)$/,x=>`ایڈٹ شدہ · ${x}`],
[/^After review, PKR (\d+) will reach your (.+)$/,(n,m)=>`جانچ کے بعد ${n} روپے آپ کے ${m} میں آئیں گے`],[/^\+(\d+) points · keep your streak going!$/,n=>`+${n} پوائنٹس · سلسلہ جاری رکھیں!`],
[/^Minimum deposit is PKR (\d+)$/,n=>`کم از کم ڈپازٹ ${n} روپے ہے`],[/^Minimum withdrawal is (\d+) points$/,n=>`کم از کم ودڈرا ${n} پوائنٹس ہے`]]);
if(window.Lang)Lang.set((function(){try{return localStorage.getItem('lang')||'en'}catch(e){return'en'}})());
})();
