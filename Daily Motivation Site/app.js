// footer year
document.querySelector('#y').textContent = new Date().getFullYear();

// open modal from any .open card
document.querySelectorAll('.open').forEach(el => {
  el.addEventListener('click', () => {
    document.querySelector('#mText').textContent   = el.dataset.text || '';
    document.querySelector('#mTag').textContent    = el.dataset.tag || '';
    document.querySelector('#mAuthor').textContent = el.dataset.author || '';
    document.querySelector('#mLikes').textContent  = '♡ ' + (el.dataset.likes || '0');
    document.querySelector('#overlay').style.display = 'flex';
  });
});

// close modal (X)
document.querySelector('#close').addEventListener('click', () => {
  document.querySelector('#overlay').style.display = 'none';
});

// close by clicking the dim background
document.querySelector('#overlay').addEventListener('click', e => {
  if (e.target.id === 'overlay') e.target.style.display = 'none';
});

// copy quote text
document.querySelector('#copyBtn').addEventListener('click', () => {
  const txt = `"${document.querySelector('#mText').textContent}" — ${document.querySelector('#mAuthor').textContent}`;
  navigator.clipboard.writeText(txt).then(() => alert('Copied!'));
});

// “Random Quote” header button
document.querySelector('#randomLink').addEventListener('click', e => {
  e.preventDefault();
  const items = document.querySelectorAll('.open');
  if (!items.length) return;
  items[Math.floor(Math.random() * items.length)].click();
});
