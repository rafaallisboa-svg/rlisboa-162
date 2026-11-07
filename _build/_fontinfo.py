from fontTools.ttLib import TTFont
import glob, os
d = r"C:\Users\Rafael\OneDrive\TRAMPOS\R Lisboa Estudio 162 LTDA\id visual\fonts"
for p in sorted(glob.glob(d + "/jetbrains-mono-latin-*.woff2")):
    t = TTFont(p)
    cm = t.getBestCmap()
    print(os.path.basename(p), len(t.getGlyphOrder()), 0x30 in cm, 0x2F in cm, 'fvar' in t,
          [(a.axisTag, a.minValue, a.defaultValue, a.maxValue) for a in t['fvar'].axes] if 'fvar' in t else '')
