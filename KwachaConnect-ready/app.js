const kw = n => `MWK ${Number(n).toLocaleString()}`;

const PRODUCTS = [
  { name:'Smartphone (64GB)', price: 220000, district:'Lilongwe', cat:'electronics',
    img:'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop'},
  { name:'Laptop (Core i5)', price: 750000, district:'Blantyre', cat:'electronics',
    img:'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop'},
  { name:'LED TV 43\"', price: 480000, district:'Mzuzu', cat:'electronics',
    img:'https://images.unsplash.com/photo-1593359677879-7c2c98d86c77?q=80&w=1200&auto=format&fit=crop'},
  { name:'Men Sneakers', price: 55000, district:'Zomba', cat:'fashion',
    img:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop'},
  { name:'Ladies Handbag', price: 45000, district:'Dedza', cat:'fashion',
    img:'https://images.unsplash.com/photo-1520975682031-a4566703b1fb?q=80&w=1200&auto=format&fit=crop'},
  { name:'Wrist Watch', price: 120000, district:'Kasungu', cat:'fashion',
    img:'https://images.unsplash.com/photo-1511385348-a52b4a160dc2?q=80&w=1200&auto=format&fit=crop'},
  { name:'Maize (50kg)', price: 35000, district:'Ntcheu', cat:'grocery',
    img:'https://images.unsplash.com/photo-1604335399105-b988d8082af0?q=80&w=1200&auto=format&fit=crop'},
  { name:'Cooking Oil (5L)', price: 21000, district:'Mangochi', cat:'grocery',
    img:'https://images.unsplash.com/photo-1516595436463-c6a134f02d46?q=80&w=1200&auto=format&fit=crop'},
  { name:'Rice (10kg)', price: 18000, district:'Mzimba', cat:'grocery',
    img:'https://images.unsplash.com/photo-1509460913899-35ca4f1bf7d9?q=80&w=1200&auto=format&fit=crop'},
  { name:'Sofa (2-Seater)', price: 420000, district:'Lilongwe', cat:'home',
    img:'https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=1200&auto=format&fit=crop'},
  { name:'Gas Cooker', price: 260000, district:'Blantyre', cat:'home',
    img:'https://images.unsplash.com/photo-1562059390-a761a084768e?q=80&w=1200&auto=format&fit=crop'},
  { name:'Bed (Queen Size)', price: 380000, district:'Mzuzu', cat:'home',
    img:'https://images.unsplash.com/photo-1582582494700-2f6f2b41b9ca?q=80&w=1200&auto=format&fit=crop'},
];

const settings = {
  get defaultOption(){ return localStorage.getItem('defaultOption') || 'meet'; },
  set defaultOption(v){ localStorage.setItem('defaultOption', v); }
};

const grid = document.getElementById('grid');
const q = document.getElementById('q');
const searchBtn = document.getElementById('searchBtn');
const chips = document.getElementById('chips');

function render(list){
  grid.innerHTML='';
  list.forEach((p,i)=>{
    const card=document.createElement('div');
    card.className='card';
    card.innerHTML=`
      <div class="thumb"><img src="${p.img}" alt="${p.name}"/></div>
      <div class="pad">
        <div class="title">${p.name}</div>
        <div class="price">${kw(p.price)}</div>
        <div class="meta">${p.district} · ${p.cat}</div>
        <div class="pills">
          <button class="pill ${settings.defaultOption==='meet'?'active':''}" data-opt="meet">Meet in Person</button>
          <button class="pill ${settings.defaultOption==='delivery'?'active':''}" data-opt="delivery">Delivery</button>
        </div>
        <div class="buyrow">
          <button class="btn" data-action="contact" data-index="${i}">Contact Seller</button>
          <button class="btn-outline" data-action="details" data-index="${i}">Details</button>
        </div>
      </div>`;
    card.querySelectorAll('.pill').forEach(btn=>{
      btn.addEventListener('click',e=>{
        card.querySelectorAll('.pill').forEach(x=>x.classList.remove('active'));
        e.currentTarget.classList.add('active');
      });
    });
    card.querySelectorAll('button[data-action]').forEach(b=>{
      b.addEventListener('click',()=>{
        const idx=Number(b.dataset.index);
        const prod=list[idx];
        const opt=card.querySelector('.pill.active')?.dataset.opt||settings.defaultOption;
        alert(`${b.dataset.action==='contact'?'Contacting seller for':'Viewing'}:\\n${prod.name}\\nPrice: ${kw(prod.price)}\\nDistrict: ${prod.district}\\nOption: ${opt==='meet'?'Meet in Person':'Delivery'}`);
      });
    });
    grid.appendChild(card);
  });
}

function applyFilter(){
  const term=q.value.trim().toLowerCase();
  const activeCat=chips.querySelector('.chip.active')?.dataset.cat||'all';
  const list=PRODUCTS.filter(p=>{
    const matchTerm=!term||p.name.toLowerCase().includes(term)||p.district.toLowerCase().includes(term);
    const matchCat=activeCat==='all'||p.cat===activeCat;
    return matchTerm&&matchCat;
  });
  render(list);
}
searchBtn.addEventListener('click',applyFilter);
q.addEventListener('keydown',e=>{ if(e.key==='Enter') applyFilter(); });
chips.querySelectorAll('.chip').forEach(ch=>ch.addEventListener('click',()=>{
  chips.querySelectorAll('.chip').forEach(x=>x.classList.remove('active'));
  ch.classList.add('active');
  applyFilter();
}));

const settingsModal=document.getElementById('settingsModal');
const openSettings=document.getElementById('openSettings');
const defaultOption=document.getElementById('defaultOption');
const saveSettings=document.getElementById('saveSettings');
openSettings.addEventListener('click',e=>{
  e.preventDefault();
  defaultOption.value=settings.defaultOption;
  settingsModal.showModal();
});
saveSettings?.addEventListener('click',e=>{
  e.preventDefault();
  settings.defaultOption=defaultOption.value;
  settingsModal.close();
  applyFilter();
});

render(PRODUCTS);
