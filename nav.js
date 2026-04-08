(function() {
  // Ne pas injecter le nav si la page est dans un iframe (ex: Wix)
  if (window.self !== window.top) return;

  const BASE = 'https://thierrybismuth.github.io/pagesweb-thierry-/';

  const NAV_HTML = `
<style>
#site-nav * { box-sizing: border-box; margin: 0; padding: 0; }
#site-nav {
  position: relative;
  z-index: 1000;
  font-family: 'DM Sans', sans-serif;
}
.sn-bar {
  background: #0f1a2e;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  height: 64px;
  border-bottom: 1px solid rgba(255,255,255,.06);
}
.sn-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}
.sn-logo-text {
  font-family: 'DM Serif Display', Georgia, serif;
  font-size: 1.05rem;
  color: #fff;
  letter-spacing: .02em;
  line-height: 1.1;
}
.sn-logo-sub {
  font-size: .65rem;
  font-weight: 500;
  letter-spacing: .15em;
  text-transform: uppercase;
  color: rgba(255,255,255,.4);
  display: block;
  margin-top: 1px;
}
.sn-menu {
  display: flex;
  align-items: center;
  gap: 0;
  list-style: none;
}
.sn-item {
  position: relative;
}
.sn-link {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0 18px;
  height: 64px;
  font-size: .78rem;
  font-weight: 500;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: rgba(255,255,255,.65);
  text-decoration: none;
  white-space: nowrap;
  transition: color .2s;
  cursor: pointer;
  border: none;
  background: none;
}
.sn-link:hover, .sn-item:hover > .sn-link {
  color: #fff;
}
.sn-link.active {
  color: #c8913a;
}
.sn-arrow {
  font-size: .6rem;
  opacity: .5;
  transition: transform .2s;
}
.sn-item:hover .sn-arrow {
  transform: rotate(180deg);
  opacity: .9;
}
.sn-dropdown {
  display: none;
  position: absolute;
  top: 64px;
  left: 0;
  min-width: 260px;
  background: #0f1a2e;
  border: 1px solid rgba(255,255,255,.08);
  border-top: 2px solid #c8913a;
  list-style: none;
  padding: 8px 0;
  box-shadow: 0 8px 32px rgba(0,0,0,.4);
}
.sn-item:hover .sn-dropdown {
  display: block;
}
.sn-dropdown li a {
  display: block;
  padding: 10px 20px;
  font-size: .78rem;
  font-weight: 500;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: rgba(255,255,255,.6);
  text-decoration: none;
  transition: all .15s;
  border-left: 2px solid transparent;
}
.sn-dropdown li a:hover {
  color: #fff;
  border-left-color: #c8913a;
  padding-left: 24px;
  background: rgba(255,255,255,.04);
}

/* HAMBURGER MOBILE */
.sn-burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
.sn-burger span {
  display: block;
  width: 24px;
  height: 2px;
  background: rgba(255,255,255,.7);
  transition: all .25s;
}
.sn-burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.sn-burger.open span:nth-child(2) { opacity: 0; }
.sn-burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* MENU MOBILE */
.sn-mobile {
  display: none;
  background: #0f1a2e;
  border-top: 1px solid rgba(255,255,255,.06);
  padding: 12px 0 20px;
}
.sn-mobile.open { display: block; }
.sn-mobile-item { border-bottom: 1px solid rgba(255,255,255,.04); }
.sn-mobile-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 24px;
  font-size: .78rem;
  font-weight: 500;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: rgba(255,255,255,.7);
  text-decoration: none;
  cursor: pointer;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
}
.sn-mobile-link:hover { color: #fff; }
.sn-mobile-sub {
  display: none;
  padding: 0 0 8px 0;
  background: rgba(0,0,0,.2);
}
.sn-mobile-sub.open { display: block; }
.sn-mobile-sub a {
  display: block;
  padding: 10px 24px 10px 36px;
  font-size: .72rem;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: rgba(255,255,255,.5);
  text-decoration: none;
  border-left: 2px solid transparent;
  margin-left: 24px;
}
.sn-mobile-sub a:hover {
  color: #fff;
  border-left-color: #c8913a;
}

@media (max-width: 900px) {
  .sn-menu { display: none; }
  .sn-burger { display: flex; }
  .sn-bar { padding: 0 24px; }
}
</style>

<div class="sn-bar">
  <a href="${BASE}accueil.html" class="sn-logo" target="_top">
    <div class="sn-logo-text">
      Thierry Bismuth
      <span class="sn-logo-sub">ODYSKILLS</span>
    </div>
  </a>

  <ul class="sn-menu">
    <li class="sn-item">
      <a href="${BASE}accueil.html" class="sn-link" target="_top">Bienvenue</a>
    </li>
    <li class="sn-item">
      <span class="sn-link">Je suis franchiseur <span class="sn-arrow">▼</span></span>
      <ul class="sn-dropdown">
        <li><a href="${BASE}franchiseur.html" target="_top">Présentation</a></li>
        <li><a href="${BASE}chasse.html" target="_top">Chasse de franchisés</a></li>
        <li><a href="${BASE}reseau-multipotentiel-franchiseurs.html" target="_top">Réseau commercial Multi-Potentiel</a></li>
      </ul>
    </li>
    <li class="sn-item">
      <span class="sn-link">Entrepreneurs & commerçants <span class="sn-arrow">▼</span></span>
      <ul class="sn-dropdown">
        <li><a href="${BASE}entrepreneur.html" target="_top">Présentation</a></li>
        <li><a href="${BASE}commercant.html" target="_top">Commerçant en reconversion</a></li>
        <li><a href="${BASE}ouvrir-franchise.html" target="_top">Ouvrir en franchise</a></li>
        <li><a href="${BASE}expert-comptable.html" target="_top">Expert-comptable</a></li>
        <li><a href="${BASE}multipotentiel.html" target="_top">Rejoindre Multi-Potentiel</a></li>
      </ul>
    </li>
    <li class="sn-item">
      <a href="${BASE}touschomeurs.html" class="sn-link" target="_top">Tous Chômeurs</a>
    </li>
  </ul>

  <button class="sn-burger" id="sn-burger-btn" aria-label="Menu">
    <span></span><span></span><span></span>
  </button>
</div>

<!-- MENU MOBILE -->
<div class="sn-mobile" id="sn-mobile-menu">
  <div class="sn-mobile-item">
    <a href="${BASE}accueil.html" class="sn-mobile-link" target="_top">Bienvenue</a>
  </div>
  <div class="sn-mobile-item">
    <button class="sn-mobile-link" onclick="this.nextElementSibling.classList.toggle('open');this.querySelector('.sn-arrow')&&(this.querySelector('.sn-arrow').textContent=this.nextElementSibling.classList.contains('open')?'▲':'▼')">
      Je suis franchiseur <span class="sn-arrow">▼</span>
    </button>
    <div class="sn-mobile-sub">
      <a href="${BASE}franchiseur.html" target="_top">Présentation</a>
      <a href="${BASE}chasse.html" target="_top">Chasse de franchisés</a>
      <a href="${BASE}reseau-multipotentiel-franchiseurs.html" target="_top">Réseau Multi-Potentiel</a>
    </div>
  </div>
  <div class="sn-mobile-item">
    <button class="sn-mobile-link" onclick="this.nextElementSibling.classList.toggle('open');this.querySelector('.sn-arrow')&&(this.querySelector('.sn-arrow').textContent=this.nextElementSibling.classList.contains('open')?'▲':'▼')">
      Entrepreneurs & commerçants <span class="sn-arrow">▼</span>
    </button>
    <div class="sn-mobile-sub">
      <a href="${BASE}entrepreneur.html" target="_top">Présentation</a>
      <a href="${BASE}commercant.html" target="_top">Commerçant en reconversion</a>
      <a href="${BASE}ouvrir-franchise.html" target="_top">Ouvrir en franchise</a>
      <a href="${BASE}expert-comptable.html" target="_top">Expert-comptable</a>
      <a href="${BASE}multipotentiel.html" target="_top">Rejoindre Multi-Potentiel</a>
    </div>
  </div>
  <div class="sn-mobile-item">
    <a href="${BASE}touschomeurs.html" class="sn-mobile-link" target="_top">Tous Chômeurs</a>
  </div>
</div>
`;

  // Injection
  const container = document.getElementById('site-nav');
  if (container) {
    container.innerHTML = NAV_HTML;
  } else {
    const div = document.createElement('div');
    div.id = 'site-nav';
    div.innerHTML = NAV_HTML;
    document.body.insertBefore(div, document.body.firstChild);
  }

  // Burger toggle
  document.addEventListener('click', function(e) {
    const btn = document.getElementById('sn-burger-btn');
    const menu = document.getElementById('sn-mobile-menu');
    if (btn && menu && (btn === e.target || btn.contains(e.target))) {
      btn.classList.toggle('open');
      menu.classList.toggle('open');
    }
  });

  // Highlight page active
  const current = window.location.pathname.split('/').pop();
  document.querySelectorAll('#site-nav a').forEach(function(a) {
    if (a.getAttribute('href') && a.getAttribute('href').endsWith(current)) {
      a.classList.add('active');
    }
  });

})();
