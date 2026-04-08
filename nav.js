(function() {
  if (window.self !== window.top) return;

  const BASE = 'https://thierrybismuth.github.io/pagesweb-thierry-/';

  const NAV_HTML = `
<style>
#snav*{box-sizing:border-box;margin:0;padding:0;}
#snav{font-family:'Outfit','DM Sans',sans-serif;position:relative;z-index:9999;}
.snbar{
  background:#fff;
  border-bottom:2px solid #c8913a;
  display:flex;align-items:center;justify-content:space-between;
  padding:0 40px;height:60px;
  box-shadow:0 1px 4px rgba(0,0,0,.06);
}
.snlogo{text-decoration:none;display:flex;align-items:baseline;gap:10px;}
.snlogo-name{font-family:'Cormorant Garamond','Georgia',serif;font-size:1.05rem;color:#1e3d52;font-weight:600;letter-spacing:.01em;}
.snlogo-sub{font-size:.6rem;font-weight:500;letter-spacing:.15em;text-transform:uppercase;color:#aaa;}
.snmenu{display:flex;list-style:none;height:60px;}
.snitem{position:relative;}
.snlink{display:flex;align-items:center;gap:5px;padding:0 15px;height:60px;font-size:.72rem;font-weight:500;letter-spacing:.09em;text-transform:uppercase;color:#1e3d52;text-decoration:none;white-space:nowrap;cursor:pointer;background:none;border:none;font-family:inherit;transition:color .15s;}
.snlink:hover,.snitem:hover>.snlink{color:#c8913a;}
.snlink.snactive{color:#c8913a;font-weight:600;}
.snarrow{font-size:.55rem;opacity:.4;}
.sndrop{display:none;position:absolute;top:60px;left:0;min-width:240px;background:#fff;border:0.5px solid #e0d0bc;border-top:2px solid #c8913a;list-style:none;padding:6px 0;box-shadow:0 4px 16px rgba(0,0,0,.1);}
.snitem:hover .sndrop{display:block;}
.sndrop li a{display:block;padding:10px 18px;font-size:.71rem;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:#1e3d52;text-decoration:none;border-left:2px solid transparent;transition:all .15s;}
.sndrop li a:hover{color:#c8913a;border-left-color:#c8913a;padding-left:22px;background:#fdf8f2;}
.snburger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:4px;}
.snburger span{display:block;width:22px;height:2px;background:#1e3d52;transition:all .25s;}
.snburger.open span:nth-child(1){transform:translateY(7px) rotate(45deg);}
.snburger.open span:nth-child(2){opacity:0;}
.snburger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}
.snmob{display:none;background:#fff;border-top:1px solid #e8e0d4;}
.snmob.open{display:block;}
.snmob-item{border-bottom:1px solid #f0ece4;}
.snmob-link{display:flex;align-items:center;justify-content:space-between;padding:13px 24px;font-size:.72rem;font-weight:500;letter-spacing:.09em;text-transform:uppercase;color:#1e3d52;text-decoration:none;background:none;border:none;width:100%;font-family:inherit;cursor:pointer;}
.snmob-link:hover{color:#c8913a;}
.snmob-sub{display:none;background:#fdf8f2;}
.snmob-sub.open{display:block;}
.snmob-sub a{display:block;padding:9px 24px 9px 36px;font-size:.68rem;letter-spacing:.09em;text-transform:uppercase;color:#3a5f7a;text-decoration:none;}
.snmob-sub a:hover{color:#c8913a;}
@media(max-width:860px){.snmenu{display:none;}.snburger{display:flex;}.snbar{padding:0 20px;}}
</style>
<div id="snav">
<div class="snbar">
  <a href="${BASE}accueil.html" class="snlogo" target="_top">
    <span class="snlogo-name">Thierry Bismuth</span>
    <span class="snlogo-sub">ODYSKILLS</span>
  </a>
  <ul class="snmenu">
    <li class="snitem"><a href="${BASE}accueil.html" class="snlink" target="_top">Bienvenue</a></li>
    <li class="snitem">
      <span class="snlink">Je suis franchiseur <span class="snarrow">▾</span></span>
      <ul class="sndrop">
        <li><a href="${BASE}franchiseur.html" target="_top">Présentation</a></li>
        <li><a href="${BASE}chasse.html" target="_top">Chasse de franchisés</a></li>
        <li><a href="${BASE}reseau-multipotentiel-franchiseurs.html" target="_top">Réseau Multi-Potentiel</a></li>
      </ul>
    </li>
    <li class="snitem">
      <span class="snlink">Entrepreneurs &amp; commerçants <span class="snarrow">▾</span></span>
      <ul class="sndrop">
        <li><a href="${BASE}entrepreneur.html" target="_top">Présentation</a></li>
        <li><a href="${BASE}commercant.html" target="_top">Commerçant en reconversion</a></li>
        <li><a href="${BASE}ouvrir-franchise.html" target="_top">Ouvrir en franchise</a></li>
        <li><a href="${BASE}expert-comptable.html" target="_top">Expert-comptable</a></li>
        <li><a href="${BASE}multipotentiel.html" target="_top">Rejoindre Multi-Potentiel</a></li>
      </ul>
    </li>
    <li class="snitem"><a href="${BASE}touschomeurs.html" class="snlink" style="color:#c8913a;font-weight:600;" target="_top">Tous Chômeurs</a></li>
  </ul>
  <button class="snburger" id="snbtn" onclick="document.getElementById('snmob').classList.toggle('open');this.classList.toggle('open')">
    <span></span><span></span><span></span>
  </button>
</div>
<div class="snmob" id="snmob">
  <div class="snmob-item"><a href="${BASE}accueil.html" class="snmob-link" target="_top">Bienvenue</a></div>
  <div class="snmob-item">
    <button class="snmob-link" onclick="this.nextElementSibling.classList.toggle('open')">Je suis franchiseur <span>▾</span></button>
    <div class="snmob-sub">
      <a href="${BASE}franchiseur.html" target="_top">Présentation</a>
      <a href="${BASE}chasse.html" target="_top">Chasse de franchisés</a>
      <a href="${BASE}reseau-multipotentiel-franchiseurs.html" target="_top">Réseau Multi-Potentiel</a>
    </div>
  </div>
  <div class="snmob-item">
    <button class="snmob-link" onclick="this.nextElementSibling.classList.toggle('open')">Entrepreneurs &amp; commerçants <span>▾</span></button>
    <div class="snmob-sub">
      <a href="${BASE}entrepreneur.html" target="_top">Présentation</a>
      <a href="${BASE}commercant.html" target="_top">Commerçant en reconversion</a>
      <a href="${BASE}ouvrir-franchise.html" target="_top">Ouvrir en franchise</a>
      <a href="${BASE}expert-comptable.html" target="_top">Expert-comptable</a>
      <a href="${BASE}multipotentiel.html" target="_top">Rejoindre Multi-Potentiel</a>
    </div>
  </div>
  <div class="snmob-item"><a href="${BASE}touschomeurs.html" class="snmob-link" style="color:#c8913a;" target="_top">Tous Chômeurs</a></div>
</div>
</div>
`;

  document.addEventListener('DOMContentLoaded', function() {
    var wrapper = document.createElement('div');
    wrapper.innerHTML = NAV_HTML;
    document.body.insertBefore(wrapper, document.body.firstChild);

    var current = window.location.pathname.split('/').pop();
    document.querySelectorAll('#snav a.snlink').forEach(function(a) {
      if (a.getAttribute('href') && a.getAttribute('href').endsWith(current)) {
        a.classList.add('snactive');
      }
    });
  });

})();
