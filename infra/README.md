# نقل السيرفر — SmartCalcTools

> الغرض من هذا المجلد: أن يكون الانتقال إلى سيرفر آخر **ثلاثة أوامر**، لا محاولةَ تذكُّرِ ما فُعل على السيرفر القديم.

---

## ما الذي يعيش أين

قبل النقل، اعرف ما الذي ستنقله فعلاً — أكثره ليس على السيرفر أصلاً:

| المكوّن | مكانه | يُنقل؟ |
|---|---|---|
| **الموقع** | Vercel (من GitHub) | ❌ لا علاقة له بالسيرفر |
| قاعدة البيانات | Neon / Vercel Postgres | ❌ سحابية |
| Redis | Upstash | ❌ سحابية |
| البوتات | `/root/marketing-bots/` | ✅ |
| محرك الفيديو | `/root/halal-shorts-engine/` | ✅ |
| الأسرار | ملفات `.env` | ✅ يدوياً |
| Krayin CRM | حاويات Docker | ✅ (مشروع منفصل) |

**نتيجة مهمة:** لو توقف السيرفر بالكامل الآن، **الموقع يبقى يعمل**. السيرفر لا يخدم `smartcalctools.xyz` إطلاقاً — هو للبوتات ومحرك الفيديو فقط. هذا يجعل النقل منخفض المخاطر: لا وقت تعطّل للزوّار.

---

## النقل إلى سيرفر جديد

### ١. ثبّت مفتاحك واختبره — قبل أي شيء

```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub root@NEW_IP
ssh root@NEW_IP 'echo يعمل'      # لا تكمل قبل نجاح هذا
```

`bootstrap.sh` يعطّل الدخول بكلمة المرور. تشغيله بلا مفتاح مُختبَر يقفل السيرفر عليك نهائياً.

### ٢. هيّئ السيرفر

```bash
scp -r server/ root@NEW_IP:/root/
ssh root@NEW_IP 'bash /root/server/bootstrap.sh'
```

يتولّى: الجدار · تقسية SSH · fail2ban · تقييد منافذ Docker · التحديثات التلقائية · صلاحيات الأسرار.

### ٣. انقل البيانات والأسرار

```bash
# من السيرفر القديم
ssh root@OLD_IP 'tar czf - /root/marketing-bots /root/halal-shorts-engine' > server-data.tar.gz

# إلى الجديد
scp server-data.tar.gz root@NEW_IP:/root/
ssh root@NEW_IP 'tar xzf /root/server-data.tar.gz -C / && chmod 600 /root/*/.env'
```

**ملفات `.env` ليست في المستودع عمداً.** انقلها بهذه الطريقة فقط — لا عبر git ولا مراسلة.

### ٤. شغّل ما تحتاجه

```bash
ssh root@NEW_IP 'bash /root/server/deploy-bots.sh'
```

> ⚠️ **البوتات لا تُشغَّل تلقائياً.** القرار لمحمد وحده. راجع `.claude/RULES.md` بند ٧-٢.

### ٥. لا تنسَ طبقة السحابة

جدار السيرفر ليس الطبقة الوحيدة. **مجموعة أمان Alibaba** كانت هي التي تحجب منافذ Docker فعلياً على السيرفر القديم — لا `ufw`.

على السيرفر الجديد، افتح في لوحة المزوّد: **22 · 80 · 443 فقط**.

---

## الحالة الأمنية للسيرفر الحالي

`8.221.112.119` — فُحص وأُصلح في **4 أغسطس 2026**.

### ما أُصلح ✅

| البند | قبل | بعد |
|---|---|---|
| مصادقة كلمة مرور SSH | مفعّلة (**29,734** محاولة تخمين) | **معطّلة** |
| صلاحيات `.env` و`gcp-credentials.json` | `644` (يقرؤها الجميع) | `600` |
| جدار الحماية | معطّل | مفعّل: 22/80/443 |

### ما بقي ⚠️

**١. `PermitRootLogin yes`** — لم أغيّره إلى `prohibit-password`. مصادقة كلمة المرور معطّلة فعلاً فالخطر العملي منخفض، لكن `bootstrap.sh` يضبطه على سيرفر جديد.

**٢. سلسلة `DOCKER-USER` فارغة.** حاويات Krayin تنشر:

```
krayin-mysql-1     0.0.0.0:33066 -> 3306
krayin-laravel     0.0.0.0:8080 -> 80,  0.0.0.0:5173
```

**التوضيح المهم:** هذه المنافذ **محجوبة فعلياً** من الإنترنت — تحقّقت بالاختبار، حتى من داخل السيرفر عبر عنوانه العام. الحاجب هو **مجموعة أمان Alibaba**، لا `ufw`.

لكن الحماية بطبقة واحدة هشّة: تعديل خاطئ في لوحة Alibaba يكشف قاعدة بيانات MySQL للإنترنت فوراً. الأمر أدناه يضيف الطبقة الثانية:

```bash
for p in 3306 33066 5173 8080; do
  iptables -I DOCKER-USER -p tcp --dport $p ! -s 127.0.0.1 -j DROP
done
apt-get install -y iptables-persistent && netfilter-persistent save
```

> لم أنفّذه لأن حاويات Krayin تخص مشروعك الآخر، وتقييد منفذ قد يعطّل عملك. القرار قرارك.

**٣. `gcp-credentials.json` ما زال موجوداً** (صلاحياته `600` الآن). كان مكشوفاً سابقاً — **يجب إبطاله من Google Cloud Console**؛ تغيير الصلاحيات لا يبطل مفتاحاً تسرّب.

**٤. Make.com webhook** — الرابط القديم مكشوف ويقبل `POST` من أي أحد. أعد إنشاءه.

---

## فحص دوري سريع

```bash
ssh root@IP '
  echo "الجدار:    $(ufw status | head -1)"
  echo "fail2ban:  $(systemctl is-active fail2ban)"
  echo "SSH:       $(grep ^PasswordAuthentication /etc/ssh/sshd_config)"
  echo "محظورون:   $(fail2ban-client status sshd 2>/dev/null | grep Banned | head -1)"
  echo "القرص:     $(df -h / | tail -1 | awk "{print \$5}")"
  pm2 list
'
```

**المتوقّع:** `active` · `active` · `no` · `social-listener` متوقف وحده.

أي بوت آخر يعمل في PM2 دون قرار صريح منك = تحقّق منه فوراً.
