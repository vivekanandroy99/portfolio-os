#!/usr/bin/env bash
# Builds the altcore v2 web app as a sample-only demo, served by the portfolio at /altcore-demo/.
# No server details are passed in, so the app runs on its made-up sample studio only:
# no sign-in to real accounts, nothing leaves the browser.
# Usage: scripts/build-altcore-demo.sh /path/to/altcore-v2   (deps installed with pnpm)
set -euo pipefail
SRC="${1:?path to altcore-v2}"
OUT="$(cd "$(dirname "$0")/.." && pwd)/public/altcore-demo"
BASE="/altcore-demo"
WEB="$SRC/apps/web"
cp "$WEB/src/App.tsx" /tmp/altcore-App.tsx.bak
trap 'cp /tmp/altcore-App.tsx.bak "$WEB/src/App.tsx"' EXIT
python3 -I - "$WEB/src/App.tsx" "$BASE" <<'PY'
import sys
p, base = sys.argv[1], sys.argv[2]
s = open(p).read()
i = s.index("createBrowserRouter([")
j = s.index("\n]);", i)
s = s[:j] + f'\n], {{ basename: "{base}" }});' + s[j + 4:]
open(p, "w").write(s)
PY
(cd "$WEB" && VITE_SUPABASE_URL= VITE_SUPABASE_PUBLISHABLE_KEY= VITE_API_URL= \
  npx vite build --base "$BASE/" --outDir /tmp/altcore-demo-dist --emptyOutDir --sourcemap false)
rm -rf "$OUT" && cp -r /tmp/altcore-demo-dist "$OUT"
rm -f "$OUT/sw.js" "$OUT/_redirects" "$OUT"/assets/*.map
# Public files referenced as plain strings in the code, and full-page jumps, need the base too.
python3 -I - "$OUT" "$BASE" <<'PY'
import sys, glob, re
out, base = sys.argv[1], sys.argv[2]
for f in glob.glob(f"{out}/assets/*.js"):
    s = open(f).read(); o = s
    s = re.sub(r'(["\'`])/(media|apps|docs)/', lambda m: f"{m.group(1)}{base}/{m.group(2)}/", s)
    s = re.sub(r'(["\'`])/(altcore-wordmark\.png|altcore-icon-|favicon\.png|apple-touch-icon\.png|manifest\.webmanifest)', lambda m: f"{m.group(1)}{base}/{m.group(2)}", s)
    s = re.sub(r'location\.assign\((["`])/', lambda m: f"location.assign({m.group(1)}{base}/", s)
    if s != o: open(f, "w").write(s); print("patched", f.rsplit("/",1)[1])
PY
du -sh "$OUT"
