import os, math, argparse
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# (Z, symbol, name, standard atomic weight, category)
E = [
(1,"H","Hydrogen",1.008,"h"),(2,"He","Helium",4.0026,"noble"),(3,"Li","Lithium",6.94,"alkali"),
(4,"Be","Beryllium",9.0122,"alkali"),(5,"B","Boron",10.81,"nonmetal"),(6,"C","Carbon",12.011,"nonmetal"),
(7,"N","Nitrogen",14.007,"nonmetal"),(8,"O","Oxygen",15.999,"nonmetal"),(9,"F","Fluorine",18.998,"halogen"),
(10,"Ne","Neon",20.180,"noble"),(11,"Na","Sodium",22.990,"alkali"),(12,"Mg","Magnesium",24.305,"alkali"),
(13,"Al","Aluminium",26.982,"post"),(14,"Si","Silicon",28.085,"nonmetal"),(15,"P","Phosphorus",30.974,"nonmetal"),
(16,"S","Sulfur",32.06,"nonmetal"),(17,"Cl","Chlorine",35.45,"halogen"),(18,"Ar","Argon",39.948,"noble"),
(19,"K","Potassium",39.098,"alkali"),(20,"Ca","Calcium",40.078,"alkali"),(21,"Sc","Scandium",44.956,"transition"),
(22,"Ti","Titanium",47.867,"transition"),(23,"V","Vanadium",50.942,"transition"),(24,"Cr","Chromium",51.996,"transition"),
(25,"Mn","Manganese",54.938,"transition"),(26,"Fe","Iron",55.845,"transition"),(27,"Co","Cobalt",58.933,"transition"),
(28,"Ni","Nickel",58.693,"transition"),(29,"Cu","Copper",63.546,"transition"),(30,"Zn","Zinc",65.38,"transition"),
(31,"Ga","Gallium",69.723,"post"),(32,"Ge","Germanium",72.630,"nonmetal"),(33,"As","Arsenic",74.922,"nonmetal"),
(34,"Se","Selenium",78.971,"nonmetal"),(35,"Br","Bromine",79.904,"halogen"),(36,"Kr","Krypton",83.798,"noble"),
(37,"Rb","Rubidium",85.468,"alkali"),(38,"Sr","Strontium",87.62,"alkali"),(40,"Zr","Zirconium",91.224,"transition"),
(42,"Mo","Molybdenum",95.95,"transition"),(47,"Ag","Silver",107.87,"transition"),(48,"Cd","Cadmium",112.41,"transition"),
(50,"Sn","Tin",118.71,"post"),(53,"I","Iodine",126.90,"halogen"),(56,"Ba","Barium",137.33,"alkali"),
(78,"Pt","Platinum",195.08,"transition"),(79,"Au","Gold",196.97,"transition"),(80,"Hg","Mercury",200.59,"transition"),
]
assert len(E)==48
COL = {"h":"#e9eaec","alkali":"#f0857a","noble":"#6cc96a","halogen":"#a86ad6",
       "nonmetal":"#f5a83e","transition":"#5aaee6","post":"#b4bcc4"}

# Metal / nonmetal / metalloid colours, matching the Element Detective game's key.
TYPE_COL = {"metal":"#9cc4f0","nonmetal":"#f2d27e","metalloid":"#c9b0f2"}
METALLOIDS = {"B","Si","Ge","As"}
NONMETALS = {"H","He","C","N","O","F","Ne","P","S","Cl","Ar","Se","Br","Kr","I"}
def element_type(sym):
    return "metalloid" if sym in METALLOIDS else "nonmetal" if sym in NONMETALS else "metal"

ap = argparse.ArgumentParser(description="Generate the element tiles.")
ap.add_argument("--scheme", choices=["family","type"], default="family",
                help="colour by element family (default) or by metal/nonmetal/metalloid")
ap.add_argument("--out", default=os.path.dirname(os.path.abspath(__file__)),
                help="output folder (default: this script's folder)")
ap.add_argument("--us", action="store_true", help="use US spelling (Aluminum)")
args = ap.parse_args()
if args.us: E = [e[:2]+("Aluminum" if e[2]=="Aluminium" else e[2],)+e[3:] for e in E]
if args.scheme == "type":
    COL = TYPE_COL; E = [e[:4]+(element_type(e[1]),) for e in E]

def hx(c): return tuple(int(c[i:i+2],16) for i in (1,3,5))
def mix(a,b,t): return tuple(round(a[i]+(b[i]-a[i])*t) for i in range(3))

FB="/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"
FR="/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"
S=4; W=400; P=W*S
OUT=args.out
os.makedirs(f"{OUT}/png",exist_ok=True); os.makedirs(f"{OUT}/svg",exist_ok=True)

def fit(text, path, size, maxw):
    f=ImageFont.truetype(path,size)
    while f.getlength(text)>maxw: size-=2; f=ImageFont.truetype(path,size)
    return f

def png(z,sym,name,mass,cat):
    base=hx(COL[cat]); img=Image.new("RGBA",(P,P),(0,0,0,0))
    m=14*S; r=46*S
    # shadow
    sh=Image.new("RGBA",(P,P),(0,0,0,0)); ImageDraw.Draw(sh).rounded_rectangle((m,m+8*S,P-m,P-m+6*S),r,fill=(0,0,0,90))
    img.alpha_composite(sh.filter(ImageFilter.GaussianBlur(8*S)))
    # body: darker rim + vertical gradient face
    ImageDraw.Draw(img).rounded_rectangle((m,m,P-m,P-m),r,fill=mix(base,(0,0,0),.22)+(255,))
    grad=Image.new("RGBA",(P,P)); gd=ImageDraw.Draw(grad)
    top,bot=mix(base,(255,255,255),.35),mix(base,(0,0,0),.06)
    for y in range(P): gd.line([(0,y),(P,y)],fill=mix(top,bot,y/P)+(255,))
    mask=Image.new("L",(P,P)); ImageDraw.Draw(mask).rounded_rectangle((m+6*S,m+5*S,P-m-6*S,P-m-9*S),r-6*S,fill=255)
    img.paste(grad,(0,0),mask)
    d=ImageDraw.Draw(img); ink=(20,22,26,255); left=m+30*S; right=P-m-30*S; cx=P/2
    # atomic number: top-left
    d.text((left,m+24*S),str(z),font=ImageFont.truetype(FB,58*S),fill=ink,anchor="la")
    # symbol: centred
    d.text((cx,P*0.44),sym,font=ImageFont.truetype(FB,138*S),fill=ink,anchor="mm")
    # name
    d.text((cx,P*0.735),name,font=fit(name,FR,40*S,right-left),fill=ink,anchor="mm")
    # rounded atomic mass: always bottom-centre, same baseline on every tile
    d.text((cx,P-m-34*S),str(round(mass)),font=ImageFont.truetype(FB,44*S),fill=ink,anchor="ms")
    return img.resize((W,W),Image.LANCZOS)

def svg(z,sym,name,mass,cat):
    base=hx(COL[cat]); f=lambda c:"#%02x%02x%02x"%c
    top,bot,rim=f(mix(base,(255,255,255),.35)),f(mix(base,(0,0,0),.06)),f(mix(base,(0,0,0),.22))
    ns=40 if len(name)<=10 else round(40*10/len(name)*1.05)
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{top}"/><stop offset="1" stop-color="{bot}"/></linearGradient>
<filter id="s" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="6" stdDeviation="7" flood-opacity=".35"/></filter></defs>
<rect x="14" y="14" width="372" height="372" rx="46" fill="{rim}" filter="url(#s)"/>
<rect x="20" y="19" width="360" height="358" rx="40" fill="url(#g)"/>
<g font-family="Arial, Helvetica, Liberation Sans, sans-serif" fill="#14161a">
<text x="44" y="38" dy="0.72em" font-size="58" font-weight="700">{z}</text>
<text x="200" y="176" dominant-baseline="central" text-anchor="middle" font-size="138" font-weight="700">{sym}</text>
<text x="200" y="294" dominant-baseline="central" text-anchor="middle" font-size="{ns}">{name}</text>
<text x="200" y="352" text-anchor="middle" font-size="44" font-weight="700">{round(mass)}</text>
</g></svg>
'''

tiles=[]
for e in E:
    fn=f"{e[0]:03d}-{e[1]}"
    t=png(*e); t.save(f"{OUT}/png/{fn}.png"); tiles.append(t)
    open(f"{OUT}/svg/{fn}.svg","w").write(svg(*e))
# contact sheet 8x6
cs=Image.new("RGB",(8*200+40,6*200+40),(240,241,243))
for i,t in enumerate(tiles):
    cs.paste(t.resize((200,200),Image.LANCZOS),(20+(i%8)*200,20+(i//8)*200),t.resize((200,200),Image.LANCZOS))
cs.save(f"{OUT}/all-48-preview.png")
