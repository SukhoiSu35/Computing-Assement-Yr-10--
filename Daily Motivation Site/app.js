/* I print today’s date and the year in the footer so it stays fresh */
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#today').textContent = new Date().toLocaleDateString(undefined, {
  weekday:'long', year:'numeric', month:'long', day:'numeric'
});

/* This allows me to give quick “Copied!” style messages */
const toastBox = document.querySelector('#toast');
function toast(msg){
  toastBox.textContent = msg;
  toastBox.hidden = false;
  clearTimeout(toastBox._t);
  toastBox._t = setTimeout(()=> toastBox.hidden = true, 2000);
}

/* My quote data (a = author, t = text).
   I keep ~10 per tag so each section feels filled without being a burden to read */
const QUOTES = {
  Success: [
    {a:'Steve Jobs', t:'The only way to do great work is to love what you do.'},
    {a:'Winston Churchill', t:'Success is not final, failure is not fatal: it is the courage to continue that counts.'},
    {a:'Henry David Thoreau', t:'Success usually comes to those who are too busy to be looking for it.'},
    {a:'Thomas Jefferson (attrib.)', t:'I find that the harder I work, the more luck I seem to have.'},
    {a:'Sam Levenson', t:'Don’t watch the clock; do what it does. Keep going.'},
    {a:'Chris Grosser', t:'Opportunities don’t happen. You create them.'},
    {a:'Nelson Mandela', t:'It always seems impossible until it’s done.'},
    {a:'Albert Einstein', t:'Strive not to be a success, but rather to be of value.'},
    {a:'Mark Twain', t:'The secret of getting ahead is getting started.'},
    {a:'Norman Vaughan', t:'Dream big and dare to fail.'},
  ],
  Leadership: [
    {a:'Steve Jobs', t:'Innovation distinguishes between a leader and a follower.'},
    {a:'Ralph Nader', t:'The function of leadership is to produce more leaders, not more followers.'},
    {a:'John C. Maxwell', t:'A leader is one who knows the way, goes the way, and shows the way.'},
    {a:'Warren Bennis', t:'Leadership is the capacity to translate vision into reality.'},
    {a:'Ronald Reagan', t:'The greatest leader gets people to do the greatest things.'},
    {a:'Albert Schweitzer', t:'Example isn’t the main thing in influencing others; it’s the only thing.'},
    {a:'Peter Drucker', t:'Management is doing things right; leadership is doing the right things.'},
    {a:'Tim Fargo', t:'Leadership is service, not position.'},
    {a:'Bill Gates', t:'Leaders will be those who empower others.'},
    {a:'John C. Maxwell', t:'People buy into the leader before they buy into the vision.'},
  ],
  Life: [
    {a:'John Lennon', t:'Life is what happens to you while you’re busy making other plans.'},
    {a:'Dalai Lama', t:'The purpose of our lives is to be happy.'},
    {a:'Sarah L. Delany', t:'Life is short, and it’s up to you to make it sweet.'},
    {a:'Seneca', t:'Not how long, but how well you have lived is the main thing.'},
    {a:'Helen Keller', t:'Life is either a daring adventure or nothing at all.'},
    {a:'Oscar Wilde', t:'To live is the rarest thing in the world. Most people exist, that is all.'},
    {a:'Walt Whitman', t:'Keep your face toward the sunshine and shadows will fall behind you.'},
    {a:'George Bernard Shaw', t:'Life isn’t about finding yourself. Life is about creating yourself.'},
    {a:'Oprah Winfrey', t:'The biggest adventure you can take is to live the life of your dreams.'},
    {a:'Abraham Lincoln (attrib.)', t:'It’s not the years in your life, but the life in your years.'},
  ],
  Courage: [
    {a:'Wayne Gretzky', t:'You miss 100% of the shots you don’t take.'},
    {a:'Nelson Mandela', t:'Courage is not the absence of fear, but the triumph over it.'},
    {a:'Eleanor Roosevelt (attrib.)', t:'Do one thing every day that scares you.'},
    {a:'Virgil', t:'Fortune favors the bold.'},
    {a:'George Addair', t:'Everything you’ve ever wanted is on the other side of fear.'},
    {a:'Muhammad Ali', t:'He who is not courageous enough to take risks will accomplish nothing in life.'},
    {a:'F. D. Roosevelt', t:'The only limit to our realization of tomorrow will be our doubts of today.'},
    {a:'John A. Shedd', t:'A ship is safe in harbor, but that’s not what ships are for.'},
    {a:'Theodore Roosevelt', t:'Believe you can and you’re halfway there.'},
    {a:'Maya Angelou', t:'Courage is the most important of all the virtues.'},
  ],
  Action: [
    {a:'Tony Robbins', t:'The only impossible journey is the one you never begin.'},
    {a:'Benjamin Franklin', t:'Well done is better than well said.'},
    {a:'Pablo Picasso', t:'Action is the foundational key to all success.'},
    {a:'Maya Angelou', t:'Do the best you can until you know better. Then do better.'},
    {a:'Peter Marshall', t:'Small deeds done are better than great deeds planned.'},
    {a:'Arthur Ashe', t:'Start where you are. Use what you have. Do what you can.'},
    {a:'Steve Maraboli', t:'An inch of movement will bring you closer than a mile of intention.'},
    {a:'Benjamin Franklin', t:'Never confuse motion with action.'},
    {a:'William James', t:'Act as if what you do makes a difference. It does.'},
    {a:'Mahatma Gandhi', t:'The future depends on what you do today.'},
  ],
  Opportunity: [
    {a:'Albert Einstein', t:'In the middle of difficulty lies opportunity.'},
    {a:'Thomas Edison', t:'Opportunity is missed by most people because it looks like work.'},
    {a:'Alexander Graham Bell', t:'When one door closes, another opens.'},
    {a:'Napoleon Hill', t:'Your big opportunity may be right where you are now.'},
    {a:'Francis Bacon', t:'A wise man will make more opportunities than he finds.'},
    {a:'Seneca', t:'Luck is what happens when preparation meets opportunity.'},
    {a:'Oprah Winfrey', t:'Turn your wounds into wisdom.'},
    {a:'Milton Berle', t:'If opportunity doesn’t knock, build a door.'},
    {a:'Peter Drucker', t:'The best way to predict the future is to create it.'},
    {a:'Napoleon Bonaparte', t:'Ability is nothing without opportunity.'},
  ],
  Belief: [
    {a:'Theodore Roosevelt', t:'Believe you can and you’re halfway there.'},
    {a:'Henry Ford', t:'Whether you think you can or you can’t, you’re right.'},
    {a:'Buddha (attrib.)', t:'What we think, we become.'},
    {a:'Martin Luther King Jr.', t:'Faith is taking the first step even when you don’t see the whole staircase.'},
    {a:'Christian D. Larson', t:'Believe in yourself and all that you are.'},
    {a:'Oprah Winfrey', t:'You become what you believe.'},
    {a:'James Allen', t:'As a man thinketh, so is he.'},
    {a:'Suzy Kassem', t:'Doubt kills more dreams than failure ever will.'},
    {a:'Peter T. McIntyre', t:'Confidence comes from not fearing to be wrong.'},
    {a:'Norman Vincent Peale', t:'Change your thoughts and you change your world.'},
  ],
  Dreams: [
    {a:'Eleanor Roosevelt', t:'The future belongs to those who believe in the beauty of their dreams.'},
    {a:'Langston Hughes', t:'Hold fast to dreams, for if dreams die, life is a broken-winged bird that cannot fly.'},
    {a:'Walt Disney', t:'All our dreams can come true, if we have the courage to pursue them.'},
    {a:'Norman Vaughan', t:'Dream big and dare to fail.'},
    {a:'Napoleon Hill', t:'A goal is a dream with a deadline.'},
    {a:'John C. Maxwell', t:'Dreams don’t work unless you do.'},
    {a:'C. S. Lewis', t:'You are never too old to set another goal or to dream a new dream.'},
    {a:'Pope John Paul II', t:'The future starts today, not tomorrow.'},
    {a:'Unknown', t:'The distance between dreams and reality is called action.'},
    {a:'Walt Disney (attrib.)', t:'If you can dream it, you can do it.'},
  ],
  Perseverance: [
    {a:'Nelson Mandela', t:'It always seems impossible until it’s done.'},
    {a:'Japanese Proverb', t:'Fall seven times, stand up eight.'},
    {a:'Thomas Edison', t:'Genius is 1% inspiration and 99% perspiration.'},
    {a:'Thomas Edison', t:'I have not failed. I’ve just found 10,000 ways that won’t work.'},
    {a:'Walter Elliot', t:'Perseverance is many short races one after another.'},
    {a:'Confucius', t:'The man who moves a mountain begins by carrying away small stones.'},
    {a:'Earl Nightingale', t:'Never give up on a dream because of the time it will take. The time will pass anyway.'},
    {a:'James Clear', t:'Rome wasn’t built in a day, but they were laying bricks every hour.'},
    {a:'Robert Collier', t:'Success is the sum of small efforts repeated day in and day out.'},
    {a:'Confucius', t:'Our greatest glory is not in never falling, but in rising every time we fall.'},
  ]
};

/* I build all the cards from the data above */
const grid = document.querySelector('#grid');
let idN = 1;
Object.entries(QUOTES).forEach(([tag, list])=>{
  list.forEach(q=>{
    const id = `q_${idN++}`;
    const el = document.createElement('article');
    el.className = 'card open';
    el.dataset.id = id;
    el.dataset.tag = tag;
    el.dataset.author = q.a;
    el.dataset.text = q.t;
    el.innerHTML = `
      <div class="card-top"><span class="tag">${tag}</span></div>
      <p class="quote">“${q.t}”</p>
      <div class="card-bottom">
        <div class="byline">— ${q.a}</div>
        <div class="actions">
          <button class="icon fav" data-id="${id}">☆</button>
          <button class="icon copy">⧉</button>
        </div>
      </div>`;
    grid.appendChild(el);
  });
});

/* I keep favourites as a Set of ids, saved in localStorage */
const favKey = 'dm-favs';
const favs = new Set(JSON.parse(localStorage.getItem(favKey) || '[]'));
function saveFavs(){ localStorage.setItem(favKey, JSON.stringify([...favs])); }
function paintStars(){
  document.querySelectorAll('.fav').forEach(b=>{
    const id = b.dataset.id;
    b.textContent = favs.has(id) ? '★' : '☆';
    b.title = favs.has(id) ? 'Unfavourite' : 'Favourite';
  });
}
paintStars();

/* Modal: I open it from any card and close with X, ESC, or pressing background */
const overlay = document.querySelector('#overlay');
const mText   = document.querySelector('#mText');
const mTag    = document.querySelector('#mTag');
const mAuthor = document.querySelector('#mAuthor');
const mFav    = document.querySelector('#mFav');
const mCopy   = document.querySelector('#mCopy');
let lastOpen = null, currentId = null;

function openModal(card){
  lastOpen = card;
  currentId = card.dataset.id || null;
  mText.textContent   = card.dataset.text;
  mTag.textContent    = card.dataset.tag;
  mAuthor.textContent = card.dataset.author;
  mFav.textContent    = favs.has(currentId) ? '★ Favourited' : '☆ Favourite';
  overlay.hidden = false;
  document.querySelector('#modal').focus();
}
function closeModal(){
  overlay.hidden = true;
  if (lastOpen) lastOpen.focus();
}

/* I only open the modal when the card itself is clicked (not its buttons) */
document.addEventListener('click', e=>{
  const card = e.target.closest('.open');
  if (card && !e.target.closest('.actions')) openModal(card);
});
document.querySelector('#close').addEventListener('click', closeModal);
overlay.addEventListener('click', e=>{ if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e=>{ if (!overlay.hidden && e.key === 'Escape') closeModal(); });

/* Favouriting works from modal and from cards */
mFav.addEventListener('click', ()=>{
  if (!currentId) return;
  favs.has(currentId) ? favs.delete(currentId) : favs.add(currentId);
  saveFavs(); paintStars();
  mFav.textContent = favs.has(currentId) ? '★ Favourited' : '☆ Favourite';
});

/* Copying also works in both places */
mCopy.addEventListener('click', ()=>{
  const text = `"${mText.textContent}" — ${mAuthor.textContent}`;
  navigator.clipboard.writeText(text).then(()=> toast('Copied!'));
});
document.addEventListener('click', e=>{
  const copy = e.target.closest('.copy');
  if (copy){
    e.stopPropagation();
    const card = copy.closest('.card');
    const text = `"${card.dataset.text}" — ${card.dataset.author}`;
    navigator.clipboard.writeText(text).then(()=> toast('Copied!'));
  }
});

/* Filters: I combine search text, one active tag, and a favourites-only toggle */
const search = document.querySelector('#search');
const tagBar = document.querySelector('#tags');
const favToggle = document.querySelector('#favToggle');
let activeTag = null, onlyFavs = false;

search.addEventListener('input', applyFilters);
tagBar.addEventListener('click', e=>{
  const chip = e.target.closest('[data-tag]');
  if (!chip) return;
  if (activeTag === chip.dataset.tag){
    activeTag = null; chip.classList.remove('active');
  } else {
    activeTag = chip.dataset.tag;
    tagBar.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
    chip.classList.add('active');
  }
  applyFilters();
});
favToggle.addEventListener('click', ()=>{
  onlyFavs = !onlyFavs;
  favToggle.classList.toggle('active', onlyFavs);
  applyFilters();
});

function applyFilters(){
  const q = search.value.trim().toLowerCase();
  document.querySelectorAll('.open').forEach(card=>{
    const id     = card.dataset.id;
    const text   = (card.dataset.text||'').toLowerCase();
    const author = (card.dataset.author||'').toLowerCase();
    const tag    = (card.dataset.tag||'').toLowerCase();
    let show = true;
    if (q && !(text.includes(q)||author.includes(q)||tag.includes(q))) show = false;
    if (activeTag && tag !== activeTag.toLowerCase()) show = false;
    if (onlyFavs && !favs.has(id)) show = false;
    card.style.display = show ? '' : 'none';
  });
}

/* An affirmation button that gives affirmations when clicked on it */
const AFFIRM = [
  'I am capable and resilient.',
  'I move forward with small steps.',
  'I choose progress, not perfection.',
  'I can do hard things.',
  'My future self is proud of me.',
  'One focused hour can change my day.',
  'Every setback sets me up for a comeback.',
  'I breathe and keep going.',
  'I show up and shine.',
  'I’m closer than I think.'
];
document.querySelector('#affirmBtn').addEventListener('click', ()=>{
  const msg = AFFIRM[Math.floor(Math.random()*AFFIRM.length)];
  toast(msg);
});
