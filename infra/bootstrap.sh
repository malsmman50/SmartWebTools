#!/usr/bin/env bash
#
# تهيئة سيرفر جديد من الصفر — SmartCalcTools
#
# الغرض: أن يكون الانتقال إلى أي سيرفر آخر (Alibaba, Hetzner, DigitalOcean…)
# خطوةً واحدة، لا محاولةَ تذكُّرِ ما فُعل على السيرفر القديم.
#
#   scp -r server/ root@NEW_IP:/root/  &&  ssh root@NEW_IP 'bash /root/server/bootstrap.sh'
#
# آمن للتكرار: تشغيله مرتين لا يضر.
#
# ⚠ يفترض أن مفتاح SSH العام مُثبَّت ومُختبَر قبل التشغيل، لأنه يعطّل الدخول
#   بكلمة المرور. شغّله وأنت متصل بجلسة ثانية مفتوحة تحسّباً.

set -euo pipefail

log() { printf '\n\033[1;33m▸ %s\033[0m\n' "$1"; }
ok()  { printf '  \033[0;32m✓\033[0m %s\n' "$1"; }

[ "$(id -u)" -eq 0 ] || { echo "شغّله بصلاحيات root"; exit 1; }

# ── ١. التحقق قبل قفل الباب ────────────────────────────────────────────────
log "التحقق من مفتاح SSH قبل تعطيل كلمة المرور"
if [ ! -s /root/.ssh/authorized_keys ]; then
  echo "  ✗ لا يوجد مفتاح مصرّح به. تعطيل كلمة المرور الآن يقفل السيرفر عليك."
  echo "    ثبّت مفتاحك أولاً:  ssh-copy-id root@<IP>"
  exit 1
fi
ok "عدد المفاتيح المصرّح بها: $(grep -c . /root/.ssh/authorized_keys)"

# ── ٢. الأساسيات ───────────────────────────────────────────────────────────
log "تثبيت الحزم الأساسية"
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq ufw fail2ban iptables-persistent unattended-upgrades curl git >/dev/null
ok "ufw · fail2ban · iptables-persistent · unattended-upgrades"

# ── ٣. جدار الحماية ────────────────────────────────────────────────────────
# الترتيب حرج: السماح بـ 22 يسبق التفعيل، وإلا انقطع اتصالك فوراً.
log "جدار الحماية"
ufw allow 22/tcp  >/dev/null
ufw allow 80/tcp  >/dev/null
ufw allow 443/tcp >/dev/null
ufw --force enable >/dev/null
ok "مفعّل — مسموح: 22 · 80 · 443 فقط"

# ── ٤. منافذ Docker ────────────────────────────────────────────────────────
# ufw لا يحكم منافذ Docker: Docker يكتب قواعده في سلسلة DOCKER قبل قواعد ufw،
# فحاوية تنشر 3306 تصبح مرئية للإنترنت رغم أن ufw يبدو مفعّلاً. سلسلة
# DOCKER-USER هي الوحيدة التي تُقيَّم قبل قواعد Docker، فهي موضع الحجب.
log "تقييد منافذ Docker (DOCKER-USER)"
if iptables -L DOCKER-USER -n >/dev/null 2>&1; then
  for port in 3306 33066 5173 8080 33060; do
    iptables -C DOCKER-USER -p tcp --dport "$port" ! -s 127.0.0.1 -j DROP 2>/dev/null \
      || iptables -I DOCKER-USER -p tcp --dport "$port" ! -s 127.0.0.1 -j DROP
  done
  netfilter-persistent save >/dev/null 2>&1 || true
  ok "قواعد الدرء أُضيفت وحُفظت للإقلاع"
else
  ok "لا Docker على هذا السيرفر — تُخطّى"
fi

# ── ٥. تقسية SSH ───────────────────────────────────────────────────────────
# على السيرفر القديم سُجّلت 29,734 محاولة تخمين. المفتاح وحده يُنهيها.
log "تقسية SSH"
cp /etc/ssh/sshd_config "/etc/ssh/sshd_config.bak.$(date +%F-%H%M)"
sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication no/'     /etc/ssh/sshd_config
sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin prohibit-password/'    /etc/ssh/sshd_config
sed -i 's/^#\?PermitEmptyPasswords.*/PermitEmptyPasswords no/'         /etc/ssh/sshd_config
sshd -t || { echo "  ✗ إعداد SSH غير صالح — استُرجعت النسخة"; cp /etc/ssh/sshd_config.bak.* /etc/ssh/sshd_config; exit 1; }
systemctl reload sshd
ok "الدخول بالمفتاح فقط"

# ── ٦. fail2ban ────────────────────────────────────────────────────────────
log "fail2ban"
cat > /etc/fail2ban/jail.local <<'EOF'
[sshd]
enabled  = true
port     = 22
maxretry = 3
findtime = 600
bantime  = 86400
EOF
systemctl enable --now fail2ban >/dev/null 2>&1
ok "حظر 24 ساعة بعد 3 محاولات"

# ── ٧. التحديثات الأمنية التلقائية ─────────────────────────────────────────
log "التحديثات الأمنية التلقائية"
echo 'APT::Periodic::Unattended-Upgrade "1";' > /etc/apt/apt.conf.d/20auto-upgrades
echo 'APT::Periodic::Update-Package-Lists "1";' >> /etc/apt/apt.conf.d/20auto-upgrades
ok "مفعّلة"

# ── ٨. صلاحيات الأسرار ─────────────────────────────────────────────────────
# ملف .env بصلاحية 644 يقرؤه أي مستخدم على النظام. 600 يقصره على المالك.
log "صلاحيات الأسرار"
for f in /root/marketing-bots/.env /root/halal-shorts-engine/.env /root/marketing-bots/gcp-credentials.json; do
  [ -f "$f" ] && chmod 600 "$f" && ok "$(basename "$f") → 600"
done

# ── ٩. مجلدات المشاريع و .gitignore ────────────────────────────────────────
log "مجلدات المشاريع"
for d in /root/marketing-bots /root/halal-shorts-engine; do
  mkdir -p "$d"
  [ -f "$d/.gitignore" ] || printf '.env\n*.json\n__pycache__/\n*.log\nvenv/\n' > "$d/.gitignore"
done
ok "جاهزة مع .gitignore يمنع رفع الأسرار"

# ── ١٠. التقرير ────────────────────────────────────────────────────────────
log "الحالة النهائية"
echo "  جدار الحماية : $(ufw status | head -1 | cut -d' ' -f2)"
echo "  كلمة مرور SSH: $(grep -c '^PasswordAuthentication no' /etc/ssh/sshd_config >/dev/null && echo 'معطّلة') "
echo "  fail2ban     : $(systemctl is-active fail2ban)"
echo "  المنافذ      :"
ss -tlnp 2>/dev/null | grep -c LISTEN | xargs printf '    مستمع: %s\n'

printf '\n\033[1;32m✓ التهيئة اكتملت\033[0m\n'
echo "  متبقٍ يدوياً: انسخ ملفات .env (ليست في المستودع عمداً)"
echo "  ثم: bash /root/server/deploy-bots.sh"
