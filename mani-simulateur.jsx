import { useState } from "react";

const STEPS = [
  "intro",
  "tshirts", "pantalons", "jupes", "robes",
  "chemisiers", "vestes", "chaussures", "accessoires",
  "tiers", "results"
];

const ITEMS = [
  { key: "tshirts",    label: "T-shirts",    emoji: "👕", coeff: 0.7  },
  { key: "pantalons",  label: "Pantalons",   emoji: "👖", coeff: 1.5  },
  { key: "jupes",      label: "Jupes",       emoji: "👗", coeff: 1.0  },
  { key: "robes",      label: "Robes",       emoji: "👗", coeff: 1.5  },
  { key: "chemisiers", label: "Chemisiers",  emoji: "👔", coeff: 1.0  },
  { key: "vestes",     label: "Vestes",      emoji: "🧥", coeff: 1.5  },
  { key: "chaussures", label: "Chaussures",  emoji: "👠", coeff: 1.5  },
  { key: "accessoires",label: "Accessoires", emoji: "👜", coeff: 0.7  },
];

const palette = {
  bg: "#fdf8f3",
  card: "#fff9f4",
  purple: "#7c5fa0",
  purpleLight: "#e8dff5",
  orange: "#e07d3c",
  orangeLight: "#fdecd8",
  text: "#2d1f3d",
  muted: "#8a7a9a",
  border: "#e8d8f0",
};

const styles = {
  app: {
    minHeight: "100vh",
    background: `linear-gradient(135deg, ${palette.bg} 0%, #f5eaf8 100%)`,
    fontFamily: "'Georgia', serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "24px 16px",
  },
  card: {
    background: palette.card,
    borderRadius: 20,
    boxShadow: "0 4px 32px rgba(124,95,160,0.12)",
    padding: "36px 32px",
    maxWidth: 480,
    width: "100%",
    border: `1px solid ${palette.border}`,
  },
  logo: {
    textAlign: "center",
    marginBottom: 8,
    fontSize: 13,
    letterSpacing: 3,
    color: palette.muted,
    textTransform: "uppercase",
    fontFamily: "'Arial', sans-serif",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: palette.text,
    textAlign: "center",
    marginBottom: 8,
    lineHeight: 1.3,
  },
  subtitle: {
    fontSize: 14,
    color: palette.muted,
    textAlign: "center",
    marginBottom: 28,
    fontFamily: "'Arial', sans-serif",
    lineHeight: 1.5,
  },
  hint: {
    fontSize: 12,
    color: palette.orange,
    textAlign: "center",
    marginBottom: 24,
    fontStyle: "italic",
    fontFamily: "'Arial', sans-serif",
  },
  label: {
    fontSize: 22,
    color: palette.text,
    textAlign: "center",
    marginBottom: 20,
  },
  inputRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    marginBottom: 28,
  },
  btn: (color = palette.purple, bg = palette.purpleLight) => ({
    width: 44,
    height: 44,
    borderRadius: "50%",
    border: `2px solid ${color}`,
    background: bg,
    color: color,
    fontSize: 22,
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.15s",
  }),
  numDisplay: {
    fontSize: 42,
    fontWeight: "bold",
    color: palette.text,
    minWidth: 64,
    textAlign: "center",
  },
  navRow: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
    marginTop: 8,
  },
  primaryBtn: {
    background: palette.purple,
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "14px 32px",
    fontSize: 15,
    fontWeight: "bold",
    cursor: "pointer",
    fontFamily: "'Arial', sans-serif",
    letterSpacing: 0.5,
    transition: "background 0.15s",
  },
  secondaryBtn: {
    background: "transparent",
    color: palette.muted,
    border: `1px solid ${palette.border}`,
    borderRadius: 12,
    padding: "14px 24px",
    fontSize: 14,
    cursor: "pointer",
    fontFamily: "'Arial', sans-serif",
  },
  progress: {
    display: "flex",
    gap: 6,
    justifyContent: "center",
    marginBottom: 28,
  },
  dot: (active, done) => ({
    width: active ? 20 : 8,
    height: 8,
    borderRadius: 4,
    background: done ? palette.purple : active ? palette.orange : palette.border,
    transition: "all 0.3s",
  }),
  tierRow: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
    marginBottom: 24,
  },
  tierItem: (color) => ({
    background: color,
    borderRadius: 12,
    padding: "14px 18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  tierLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: palette.text,
    fontFamily: "'Arial', sans-serif",
  },
  tierSub: {
    fontSize: 12,
    color: palette.muted,
    fontFamily: "'Arial', sans-serif",
  },
  tierInput: {
    width: 60,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: palette.text,
    border: `2px solid ${palette.border}`,
    borderRadius: 8,
    padding: "6px 4px",
    fontFamily: "'Georgia', serif",
    background: "#fff",
    outline: "none",
  },
  tierTotal: (valid) => ({
    textAlign: "center",
    fontSize: 13,
    color: valid ? palette.purple : palette.orange,
    fontFamily: "'Arial', sans-serif",
    marginTop: -8,
    marginBottom: 4,
    fontWeight: "bold",
  }),
  resultSection: {
    background: palette.purpleLight,
    borderRadius: 14,
    padding: "20px 22px",
    marginBottom: 16,
  },
  resultRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 0",
    borderBottom: `1px solid ${palette.border}`,
  },
  resultLabel: {
    fontSize: 13,
    color: palette.muted,
    fontFamily: "'Arial', sans-serif",
  },
  resultVal: (bold) => ({
    fontSize: bold ? 22 : 14,
    fontWeight: bold ? "bold" : "normal",
    color: bold ? palette.purple : palette.text,
    fontFamily: "'Georgia', serif",
  }),
  bigResult: {
    background: palette.orange,
    borderRadius: 14,
    padding: "22px",
    textAlign: "center",
    marginBottom: 16,
  },
  bigLabel: {
    fontSize: 13,
    color: "#fff",
    fontFamily: "'Arial', sans-serif",
    opacity: 0.85,
    marginBottom: 4,
  },
  bigAmount: {
    fontSize: 44,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "'Georgia', serif",
  },
  serviceBox: {
    background: "#f5eaf8",
    borderRadius: 14,
    padding: "16px 18px",
    marginBottom: 16,
    fontSize: 13,
    color: palette.text,
    fontFamily: "'Arial', sans-serif",
    lineHeight: 1.7,
  },
  serviceTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: palette.purple,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  ctaBox: {
    background: palette.card,
    border: `2px solid ${palette.purple}`,
    borderRadius: 16,
    padding: "22px",
    marginTop: 16,
  },
  ctaTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: palette.text,
    textAlign: "center",
    marginBottom: 16,
    fontFamily: "'Georgia', serif",
  },
  input: {
    width: "100%",
    border: `1.5px solid ${palette.border}`,
    borderRadius: 10,
    padding: "12px 14px",
    fontSize: 14,
    fontFamily: "'Arial', sans-serif",
    color: palette.text,
    background: palette.bg,
    outline: "none",
    boxSizing: "border-box",
    marginBottom: 10,
  },
  successBox: {
    background: "#e8f5e9",
    borderRadius: 12,
    padding: "16px",
    textAlign: "center",
    color: "#2e7d32",
    fontFamily: "'Arial', sans-serif",
    fontSize: 14,
    lineHeight: 1.6,
  },
};

function ProgressBar({ currentStep }) {
  const itemSteps = ITEMS.map(i => i.key);
  const total = itemSteps.length;
  const current = itemSteps.indexOf(currentStep);
  if (current === -1) return null;
  return (
    <div style={styles.progress}>
      {itemSteps.map((s, i) => (
        <div key={s} style={styles.dot(i === current, i < current)} />
      ))}
    </div>
  );
}

export default function ManiSimulateur() {
  const [step, setStep] = useState("intro");
  const [quantities, setQuantities] = useState({
    tshirts: 0, pantalons: 0, jupes: 0, robes: 0,
    chemisiers: 0, vestes: 0, chaussures: 0, accessoires: 0,
  });
  const [tiers, setTiers] = useState({ ff: 40, mid: 40, prem: 20 });
  const [contact, setContact] = useState({ prenom: "", tel: "", date: "" });
  const [submitted, setSubmitted] = useState(false);

  const currentItemIndex = ITEMS.findIndex(i => i.key === step);
  const currentItem = ITEMS[currentItemIndex];
  const tierTotal = tiers.ff + tiers.mid + tiers.prem;
  const tierValid = tierTotal === 100;

  const goNext = () => {
    if (step === "intro") { setStep(ITEMS[0].key); return; }
    if (currentItemIndex !== -1) {
      if (currentItemIndex < ITEMS.length - 1) setStep(ITEMS[currentItemIndex + 1].key);
      else setStep("tiers");
      return;
    }
    if (step === "tiers") setStep("results");
  };

  const goBack = () => {
    if (step === "tiers") { setStep(ITEMS[ITEMS.length - 1].key); return; }
    if (currentItemIndex > 0) { setStep(ITEMS[currentItemIndex - 1].key); return; }
    if (currentItemIndex === 0) { setStep("intro"); return; }
    if (step === "results") { setStep("tiers"); return; }
  };

  // Calculations
  const avgPrice = (5 * tiers.ff + 10 * tiers.mid + 15 * tiers.prem) / 100;
  let totalBrut = 0;
  let totalPieces = 0;
  ITEMS.forEach(item => {
    const qty = quantities[item.key] || 0;
    totalPieces += qty;
    totalBrut += avgPrice * item.coeff * qty;
  });
  const totalVendu = totalBrut * 0.7;
  const apresWhatnot = totalVendu * 0.8;
  const netClient = apresWhatnot * 0.5;
  const piecesRestantes = Math.round(totalPieces * 0.3);

  const fmt = (n) => `${Math.round(n)} €`;

  // ---- RENDER ----

  if (step === "intro") {
    return (
      <div style={styles.app}>
        <div style={styles.card}>
          <div style={styles.logo}>mani univers</div>
          <h1 style={styles.title}>Combien vaut ta garde-robe ? ✨</h1>
          <p style={styles.subtitle}>
            En quelques questions, découvre combien tu pourrais gagner en vendant tes vêtements sur Whatnot — avec Mani pour tout organiser.
          </p>
          <div style={{ background: palette.orangeLight, borderRadius: 12, padding: "14px 16px", marginBottom: 24, fontSize: 13, color: palette.text, fontFamily: "'Arial', sans-serif", lineHeight: 1.7 }}>
            <strong>🎯 Pas besoin de tout compter.</strong><br />
            C'est un estimatif pour te donner une idée de ton potentiel — une fourchette, pas une promesse.
          </div>
          <div style={styles.navRow}>
            <button style={styles.primaryBtn} onClick={goNext}>
              Commencer l'estimation →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentItem) {
    return (
      <div style={styles.app}>
        <div style={styles.card}>
          <div style={styles.logo}>mani univers</div>
          <ProgressBar currentStep={step} />
          <p style={styles.hint}>Ordre de grandeur — pas besoin de compter précisément 😊</p>
          <div style={styles.label}>
            {currentItem.emoji} Combien de <strong>{currentItem.label}</strong> ?
          </div>
          <div style={styles.inputRow}>
            <button
              style={styles.btn(palette.purple, palette.purpleLight)}
              onClick={() => setQuantities(q => ({ ...q, [currentItem.key]: Math.max(0, q[currentItem.key] - 1) }))}
            >−</button>
            <div style={styles.numDisplay}>{quantities[currentItem.key]}</div>
            <button
              style={styles.btn(palette.orange, palette.orangeLight)}
              onClick={() => setQuantities(q => ({ ...q, [currentItem.key]: q[currentItem.key] + 1 }))}
            >+</button>
          </div>
          <div style={styles.navRow}>
            <button style={styles.secondaryBtn} onClick={goBack}>← Retour</button>
            <button style={styles.primaryBtn} onClick={goNext}>Suivant →</button>
          </div>
        </div>
      </div>
    );
  }

  if (step === "tiers") {
    return (
      <div style={styles.app}>
        <div style={styles.card}>
          <div style={styles.logo}>mani univers</div>
          <h2 style={{ ...styles.title, fontSize: 20, marginBottom: 6 }}>Ta garde-robe, globalement ?</h2>
          <p style={styles.subtitle}>Répartis en % — le total doit faire 100.</p>
          <div style={styles.tierRow}>
            {[
              { key: "ff", label: "Fast Fashion", sub: "Zara, H&M, Shein…", color: palette.orangeLight, price: "5 €/pièce" },
              { key: "mid", label: "Intermédiaire", sub: "Marques milieu de gamme", color: "#f0f4ff", price: "10 €/pièce" },
              { key: "prem", label: "Premium", sub: "Créateurs, luxe accessible", color: palette.purpleLight, price: "15 €/pièce" },
            ].map(t => (
              <div key={t.key} style={styles.tierItem(t.color)}>
                <div>
                  <div style={styles.tierLabel}>{t.label}</div>
                  <div style={styles.tierSub}>{t.sub} · <em>{t.price}</em></div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    style={styles.tierInput}
                    value={tiers[t.key]}
                    onChange={e => {
                      const v = Math.max(0, Math.min(100, parseInt(e.target.value) || 0));
                      setTiers(prev => ({ ...prev, [t.key]: v }));
                    }}
                  />
                  <span style={{ fontSize: 16, color: palette.muted }}>%</span>
                </div>
              </div>
            ))}
          </div>
          <div style={styles.tierTotal(tierValid)}>
            Total : {tierTotal}% {tierValid ? "✓ parfait !" : `— il manque ${100 - tierTotal}%`}
          </div>
          <div style={styles.navRow}>
            <button style={styles.secondaryBtn} onClick={goBack}>← Retour</button>
            <button
              style={{ ...styles.primaryBtn, opacity: tierValid ? 1 : 0.4, cursor: tierValid ? "pointer" : "not-allowed" }}
              onClick={() => tierValid && goNext()}
            >
              Voir mon estimation →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === "results") {
    return (
      <div style={styles.app}>
        <div style={styles.card}>
          <div style={styles.logo}>mani univers</div>
          <h2 style={{ ...styles.title, fontSize: 20, marginBottom: 20 }}>Ton estimation 🎉</h2>

          {/* Récap pièces */}
          <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            {ITEMS.filter(i => quantities[i.key] > 0).map(i => (
              <div key={i.key} style={{ background: palette.purpleLight, borderRadius: 8, padding: "6px 12px", fontSize: 12, color: palette.text, fontFamily: "'Arial', sans-serif" }}>
                {i.emoji} {quantities[i.key]} {i.label}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 13, color: palette.muted, fontFamily: "'Arial', sans-serif", marginBottom: 20 }}>
            <strong>{totalPieces} pièces</strong> au total · {tiers.ff}% fast / {tiers.mid}% mid / {tiers.prem}% premium
          </div>

          {/* Décomposition */}
          <div style={styles.resultSection}>
            {[
              { label: "Valeur brute estimée", val: fmt(totalBrut) },
              { label: "Après 70% de vente réaliste", val: fmt(totalVendu) },
              { label: "Après commission Whatnot (−20%)", val: fmt(apresWhatnot) },
              { label: "Ta part (50%)", val: fmt(netClient) },
            ].map((r, i) => (
              <div key={i} style={{ ...styles.resultRow, borderBottom: i < 3 ? `1px solid ${palette.border}` : "none" }}>
                <span style={styles.resultLabel}>{r.label}</span>
                <span style={styles.resultVal(i === 3)}>{r.val}</span>
              </div>
            ))}
          </div>

          {/* Net en poche */}
          <div style={styles.bigResult}>
            <div style={styles.bigLabel}>Dans ta poche</div>
            <div style={styles.bigAmount}>{fmt(netClient)}</div>
            <div style={{ fontSize: 12, color: "#fff", opacity: 0.85, fontFamily: "'Arial', sans-serif", marginTop: 6 }}>
              + tu gardes ~{piecesRestantes} pièces non vendues (30% du stock)
            </div>
          </div>

          {/* Ce que Mani fait */}
          <div style={styles.serviceBox}>
            <div style={styles.serviceTitle}>Ce que Mani prend en charge pour toi</div>
            🚗 Déplacement, transport et hébergement<br />
            📣 Communication en amont sur ses réseaux & abonnés Whatnot<br />
            🎪 Organisation de la vente, mise en place des stands<br />
            🤝 Journée entière ensemble — vente depuis son compte<br />
            📦 Mise en boîte, expédition & logistique relais colis
          </div>

          {/* CTA */}
          <div style={styles.ctaBox}>
            <div style={styles.ctaTitle}>
              Tu veux qu'on se rappelle ? 📞
            </div>
            {!submitted ? (
              <>
                <input
                  style={styles.input}
                  placeholder="Ton prénom"
                  value={contact.prenom}
                  onChange={e => setContact(c => ({ ...c, prenom: e.target.value }))}
                />
                <input
                  style={styles.input}
                  placeholder="Ton numéro de téléphone"
                  value={contact.tel}
                  onChange={e => setContact(c => ({ ...c, tel: e.target.value }))}
                />
                <input
                  style={styles.input}
                  placeholder="Date souhaitée pour la vente (ex: mai 2025)"
                  value={contact.date}
                  onChange={e => setContact(c => ({ ...c, date: e.target.value }))}
                />
                <button
                  style={{ ...styles.primaryBtn, width: "100%", marginTop: 4, background: contact.prenom && contact.tel ? palette.orange : "#ccc", cursor: contact.prenom && contact.tel ? "pointer" : "not-allowed" }}
                  onClick={() => {
                    if (contact.prenom && contact.tel) setSubmitted(true);
                  }}
                >
                  Confirmer ma demande ✨
                </button>
              </>
            ) : (
              <div style={styles.successBox}>
                🎉 <strong>Merci {contact.prenom} !</strong><br />
                Margaux te rappelle très vite pour organiser ta vente.<br />
                <span style={{ opacity: 0.7 }}>Potentiel estimé : <strong>{fmt(netClient)}</strong></span>
              </div>
            )}
          </div>

          <div style={{ textAlign: "center", marginTop: 16 }}>
            <button style={{ ...styles.secondaryBtn, fontSize: 12 }} onClick={() => { setStep("intro"); setQuantities({ tshirts:0,pantalons:0,jupes:0,robes:0,chemisiers:0,vestes:0,chaussures:0,accessoires:0 }); setTiers({ ff:40,mid:40,prem:20 }); setContact({ prenom:"",tel:"",date:"" }); setSubmitted(false); }}>
              Recommencer ↺
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
