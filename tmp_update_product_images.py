import json
from pathlib import Path

p = Path('src/data/products.json')
data = json.loads(p.read_text(encoding='utf-8'))

mapping = {
    'p1': 'apples-red-delicious.webp',
    'p2': 'bananas-fresh-farm.webp',
    'p3': 'mangoes-sindhri.webp',
    'p4': 'tomatoes-fresh-red.webp',
    'p5': 'potatoes-premium.webp',
    'p6': 'onions-pink.webp',
    'p7': 'ginger-fresh.webp',
    'p8': 'garlic-fresh.webp',
    'p9': 'milkpak-creamy-milk.webp',
    'p10': 'olpers-milk-1l.webp',
    'p11': 'olpers-cream-200ml.webp',
    'p12': 'eggs-grade-a.webp',
    'p13': 'cheese-cheddar.webp',
    'p14': 'bread-bran.webp',
    'p15': 'burger-buns-sesame.webp',
    'p16': 'rusk-sooji.webp',
    'p17': 'sooper-biscuits.webp',
    'p18': 'chocolicious-double-chocolate.webp',
    'p19': 'lays-classic.webp',
    'p20': 'kurkure-toofani.webp',
    'p21': 'tapal-danedar.webp',
    'p22': 'lipton-yellow-label.webp',
    'p23': 'pepsi-cola.webp',
    'p24': 'fruita-vitals-orange-juice.webp',
    'p25': 'kn-chicken-nuggets.webp',
    'p26': 'kn-fiery-fingers.webp',
    'p27': 'surf-excel-detergent.webp',
    'p28': 'ariel-original.webp',
    'p29': 'vim-lemon.webp',
    'p30': 'safeguard-charcoal-soap.webp',
    'p31': 'sunsilk-shampoo.webp',
    'p32': 'sensodyne-herbal.webp',
    'p33': 'pampers-baby-dry.webp',
    'p34': 'johnsons-baby-soap.webp',
    'p35': 'cerelac-wheat.webp',
}

for item in data:
    item['image'] = mapping[item['id']]

p.write_text(json.dumps(data, indent=2), encoding='utf-8')
print(f'updated {len(data)} products')
