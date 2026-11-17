"""Gera as imagens da seção "Capas de livros" (Serviços) em public/capas/.

Frentes planas: recortadas da PDF de gráfica de cada livro (trimbox menos a orelha de 80 mm
e a frente de 148 mm).

Rodar: python _build/capas-livros.py
"""
from pathlib import Path

import pymupdf
from PIL import Image

BASE = Path(r"C:\Users\Rafael\OneDrive\TRAMPOS\Vitor_Magnani\DIGITALIZE\rede lideres\NEW ID VISUAL 2025\2026\INDIVIDUAIS\PAGO")
SAIDA = Path(__file__).resolve().parent.parent / "public" / "capas"
Image.MAX_IMAGE_PIXELS = None
SAIDA.mkdir(parents=True, exist_ok=True)

ORELHA = 226.8  # 80 mm em pt
FRENTE = 419.5  # 148 mm em pt
LARGURA = 720   # px das capas planas

PDFS = {
    "willian-takamura": "Willian Takamura/De complianace a CEO-2210.pdf",
    "thais-venerando": "Thaís Venerando/Thaís Venerando.ai",
    "barbara-andrade": "Barbara Andrade/Barbara Andrade2910.pdf",
    "rodolpho-freire": "Rodolpho Freire/Rodolpho Freire 2210.pdf",
    "ronaldo-toshio": "Ronaldo Toshio/Ronaldo Toshio 2310.pdf",
    "olsen-rodrigo": "Olsen Rodrigo Mott Silva/Olsen Rodrigo Mott Silva 2210.pdf",
    "gustavo-mistrinelli": "Gustavo Mistrinelli/Gustavo Mistrinelli.pdf",
}



def salvar(nome: str, im: Image.Image, largura: int) -> None:
    im = im.convert("RGB")
    # Tira meio por cento de cada borda: some qualquer fio de lombada ou sangria.
    w, h = im.size
    m = round(min(w, h) * 0.005)
    im = im.crop((m, m, w - m, h - m))
    im = im.resize((largura, round(im.height * largura / im.width)), Image.LANCZOS)
    im.save(SAIDA / f"{nome}.webp", quality=84, method=6)
    print(nome, im.size)


for nome, rel in PDFS.items():
    pg = pymupdf.open(BASE / rel)[0]
    t = pg.trimbox
    # Thaís e Gustavo usam outro modelo de arquivo, com a frente uns 13 pt mais à direita.
    desloca = 13 if nome in ("thais-venerando", "gustavo-mistrinelli") else 0
    x0 = t.x1 - ORELHA - FRENTE + desloca
    clip = pymupdf.Rect(x0, t.y0, x0 + FRENTE, t.y1)
    pix = pg.get_pixmap(dpi=200, clip=clip)
    salvar(nome, Image.frombytes("RGB", (pix.width, pix.height), pix.samples), LARGURA)
