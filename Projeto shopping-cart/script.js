const carrinho = document.querySelector('.cart__items');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const cartItemClickListener = (event) => {
  // coloque seu código aqui.
  event.target.remove();  
};

const createCartItemElement = ({ id: sku, title: name, price: salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const addItem = (event) => {
  const productId = event.target.parentNode.firstChild.innerText;
  fetchItem(productId).then((product) => {
    carrinho.appendChild(createCartItemElement(product));
    saveCartItems(carrinho.innerHTML);
  });
};

const createProductItemElement = ({ id: sku, title: name, thumbnail: image }) => {
  fetchProducts();
  const section = document.createElement('section');  
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'))
  .addEventListener('click', addItem);
return section;
};

const createtList = async () => {
  const sectionItems = document.querySelector('.items');
  const load = document.createElement('h1');
  load.className = 'loading';
  load.innerText = 'carregando...';
  sectionItems.appendChild(load);
  const products = await fetchProducts('computador').then((list) => list.results);
  sectionItems.firstChild.remove();
  await products.forEach((product) => {
    sectionItems.appendChild(createProductItemElement(product));
  });
};

const clearButton = document.querySelector('.empty-cart');
clearButton.addEventListener('click', () => {
  carrinho.innerHTML = '';
  saveCartItems(carrinho.innerHTML);
});

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const localStorageRestore = () => {
  carrinho.innerHTML = getSavedCartItems();
  carrinho.addEventListener('click', cartItemClickListener);
};

window.onload = () => {  
  createtList();
  localStorageRestore();
};
