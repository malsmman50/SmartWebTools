#!/usr/bin/env bash
#
# تجهيز البوتات على سيرفر مُهيَّأ — SmartCalcTools
#
# يُشغَّل بعد bootstrap.sh ونقل ملفات .env.
#
# ⚠ لا يشغّل أي بوت. يجهّز البيئة ويتوقف.
#   نشر البوتات للجمهور قرارٌ لمحمد وحده (.claude/RULES.md بند ٧-٢)، وسببه أن
#   المحتوى الآلي غير المراجَع هو ما جلب رفض AdSense أول مرة.

set -euo pipefail

log() { printf '\n\033[1;33m▸ %s\033[0m\n' "$1"; }
ok()  { printf '  \033[0;32m✓\033[0m %s\n' "$1"; }
warn(){ printf '  \033[0;31m⚠\033[0m %s\n' "$1"; }

BOTS=/root/marketing-bots
VIDEO=/root/halal-shorts-engine

# ── ١. المتطلبات ───────────────────────────────────────────────────────────
log "المتطلبات"
export DEBIAN_FRONTEND=noninteractive
apt-get install -y -qq python3 python3-pip python3-venv >/dev/null
command -v node >/dev/null || { curl -fsSL https://deb.nodesource.com/setup_20.x | bash - >/dev/null 2>&1; apt-get install -y -qq nodejs >/dev/null; }
command -v pm2  >/dev/null || npm install -g pm2 >/dev/null 2>&1
ok "python3 · node $(node -v 2>/dev/null) · pm2"

# ── ٢. التحقق من الأسرار ───────────────────────────────────────────────────
# fail-closed: بيئة ناقصة توقف التجهيز بدل أن تُنتج بوتاً يفشل صامتاً.
log "التحقق من الأسرار"
missing=0
for f in "$BOTS/.env" "$VIDEO/.env"; do
  if [ -f "$f" ]; then
    ok "$(dirname "$f" | xargs basename)/.env موجود"
    [ "$(stat -c %a "$f")" = "600" ] || { chmod 600 "$f"; ok "  صُحّحت صلاحيته إلى 600"; }
  else
    warn "$f مفقود — انقله يدوياً (ليس في المستودع عمداً)"
    missing=1
  fi
done
[ "$missing" -eq 0 ] || { echo; warn "التجهيز متوقف حتى تُنقل ملفات .env"; exit 1; }

# ── ٣. بيئات بايثون ────────────────────────────────────────────────────────
log "بيئات بايثون"
for d in "$BOTS" "$VIDEO"; do
  [ -d "$d" ] || continue
  [ -d "$d/venv" ] || python3 -m venv "$d/venv"
  [ -f "$d/requirements.txt" ] && "$d/venv/bin/pip" install -q -r "$d/requirements.txt" 2>/dev/null || true
  ok "$(basename "$d")"
done

# ── ٤. فحص تسرّب الأسرار ───────────────────────────────────────────────────
log "فحص تسرّب الأسرار في الكود"
found=0
for d in "$BOTS" "$VIDEO"; do
  [ -d "$d" ] || continue
  if grep -rn --include='*.py' -E '(re_[A-Za-z0-9]{12}|sk_live|AIzaSy|xox[bp]-)' "$d" 2>/dev/null | grep -v venv | head -3; then
    found=1
  fi
done
[ "$found" -eq 0 ] && ok "لا مفاتيح مكتوبة في الكود" || warn "راجع النتائج أعلاه قبل أي رفع إلى git"

# ── ٥. الحالة ──────────────────────────────────────────────────────────────
log "حالة PM2"
pm2 list 2>/dev/null || echo "  (لا عمليات)"

printf '\n\033[1;32m✓ البيئة جاهزة — لم يُشغَّل أي بوت\033[0m\n'
cat <<'EOF'

  للتشغيل (بقرار صريح من محمد فقط):
    pm2 start ecosystem.config.js --only social-listener
    pm2 save

  تذكير: مخرَج auto_blog يبقى draft:true حتى مراجعة بشرية
  تطبّق البنود السبعة في .claude/skills/smartcalctools/references/content.md
EOF
