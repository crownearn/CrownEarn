import { createClient } from "npm:@supabase/supabase-js@2";
import webpush from "npm:web-push@3.6.7";

const db = createClient(Deno.env.get("SUPABASE_URL"), Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"));

const TPL = {
  deposit_ok: { en: d => ["Deposit approved ✅", `PKR ${d.amt} was added to your task credit.`], ur: d => ["ڈپازٹ منظور ✅", `${d.amt} روپے آپ کے ٹاسک کریڈٹ میں شامل ہو گئے۔`] },
  deposit_no: { en: () => ["Deposit rejected ❌", "We could not verify your deposit. Contact Customer Service."], ur: () => ["ڈپازٹ رد ❌", "ہم آپ کا ڈپازٹ تصدیق نہیں کر سکے۔ کسٹمر سروس سے رابطہ کریں۔"] },
  wd_paid: { en: d => ["Withdrawal paid 💸", `PKR ${d.amt} was sent to your ${d.method}.${d.txn ? " Transaction ID: " + d.txn : ""}`], ur: d => ["ودڈرا ادا ہو گیا 💸", `${d.amt} روپے آپ کے ${d.method} میں بھیج دیے گئے۔${d.txn ? " ٹرانزیکشن آئی ڈی: " + d.txn : ""}`] },
  wd_no: { en: d => ["Withdrawal rejected ❌", `Your ${d.pts} points were returned to your balance.`], ur: d => ["ودڈرا رد ❌", `آپ کے ${d.pts} پوائنٹس آپ کے بیلنس میں واپس آ گئے۔`] },
  proof_ok: { en: d => ["Task approved ✅", `+${d.pts} points for "${d.title}".`], ur: d => ["ٹاسک منظور ✅", `"${d.title}" کے +${d.pts} پوائنٹس مل گئے۔`] },
  proof_no: { en: d => ["Proof rejected ❌", `"${d.title}"${d.reason ? ": " + d.reason : "."}`], ur: d => ["ثبوت رد ❌", `"${d.title}"${d.reason ? ": " + d.reason : "۔"}`] },
  task_live: { en: d => ["Your task is live ⭐", `"${d.title}" is now visible to everyone.`], ur: d => ["آپ کا ٹاسک لائیو ہو گیا ⭐", `"${d.title}" اب سب کو نظر آ رہا ہے۔`] },
  task_no: { en: d => ["Task rejected ❌", `"${d.title}" was not approved. PKR ${d.amt} was returned to your task credit.`], ur: d => ["ٹاسک رد ❌", `"${d.title}" منظور نہیں ہوا۔ ${d.amt} روپے واپس آ گئے۔`] },
  blocked: { en: () => ["Account blocked 🚫", "Please contact Customer Service."], ur: () => ["اکاؤنٹ بلاک 🚫", "براہ کرم کسٹمر سروس سے رابطہ کریں۔"] },
  unblocked: { en: () => ["Account unblocked ✅", "You can use the app again."], ur: () => ["اکاؤنٹ بحال ✅", "اب آپ ایپ دوبارہ استعمال کر سکتے ہیں۔"] },
  announcement: { en: d => ["Announcement 📢", d.text], ur: d => ["اعلان 📢", d.text] },
};

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const { data: c0 } = await db.from("push_config").select("*").eq("id", 1).single();
  let cfg = c0;

  // One-time setup: open this function's address with ?init=1 in a browser.
  if (url.searchParams.has("init")) {
    if (cfg && !cfg.public) {
      const k = webpush.generateVAPIDKeys();
      await db.from("push_config").update({ public: k.publicKey, private: k.privateKey }).eq("id", 1);
      await db.from("settings").upsert({ key: "vapid_public", value: 0, text_value: k.publicKey });
      cfg = { ...cfg, public: k.publicKey, private: k.privateKey };
    }
    return new Response(cfg && cfg.public ? "Ready. The public key is saved." : "Run the SQL step first.");
  }

  if (!cfg || req.headers.get("x-push-secret") !== cfg.secret) return new Response("Unauthorized", { status: 401 });
  const { id } = await req.json();
  const { data: n } = await db.from("notifications").select("*").eq("id", id).single();
  if (!n || !TPL[n.kind]) return new Response("nothing to send");

  let q = db.from("push_subs").select("*");
  if (n.user_id) q = q.eq("user_id", n.user_id);
  const { data: subs } = await q;

  webpush.setVapidDetails("https://crownearn.github.io/CrownEarn/", cfg.public, cfg.private);
  let sent = 0;
  for (const s of subs ?? []) {
    const t = TPL[n.kind];
    const [title, body] = (t[s.lang] ?? t.en)(n.data ?? {});
    try {
      await webpush.sendNotification(
        { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth_key } },
        JSON.stringify({ title, body }),
        { TTL: 86400 },
      );
      sent++;
    } catch (e) {
      if (e.statusCode === 404 || e.statusCode === 410) await db.from("push_subs").delete().eq("id", s.id);
    }
  }
  return new Response("sent " + sent);
});
