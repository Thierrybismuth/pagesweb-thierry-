import { useState } from "react";

const UNIVERS = [
  {
    id: "camping",
    icon: "⛺",
    label: "Campings",
    desc: "Bar + snack + animations · saison 120-150 jours",
    exemple: "Camping 4★ 200 emplacements, bar ouvert tous les soirs en saison",
    gob: 400, jours: 130, rotations: 40,
    color: "#1a6b3a",
    exemples_clients: ["Campings Yelloh! Village", "Campings Capfun", "Campings indépendants 3-5★", "Villages vacances", "Centers Parcs"],
  },
  {
    id: "hippodrome",
    icon: "🏇",
    label: "Hippodromes",
    desc: "2 à 3 réunions/semaine · public récurrent · buvettes multiples",
    exemple: "Hippodrome régional, 30 réunions/an, 1 500 spectateurs en moyenne",
    gob: 3000, jours: 30, rotations: 30,
    color: "#7c3aed",
    exemples_clients: ["Hippodrome de Vincennes", "Hippodrome de Cagnes-sur-Mer", "Sociétés de courses régionales", "Hippodromes PMU provinciaux"],
  },
  {
    id: "salle",
    icon: "🎭",
    label: "Salles de spectacle",
    desc: "1 à 3 événements/semaine · bar systématique · rotation intense",
    exemple: "Salle de 600 places, 80 concerts/an, bar Re-uz à chaque date",
    gob: 800, jours: 80, rotations: 80,
    color: "#b45309",
    exemples_clients: ["Zéniths", "Salles municipales", "Cafés-concerts", "Salles de comédie", "Maisons de la Culture"],
  },
  {
    id: "asso_sport",
    icon: "🏆",
    label: "Associations sportives",
    desc: "Tournois, galas, compétitions · récurrence hebdo ou mensuelle",
    exemple: "Club de foot amateur, 10 tournois/an + matchs du dimanche, 300 personnes",
    gob: 500, jours: 15, rotations: 15,
    color: "#dc2626",
    exemples_clients: ["Clubs de foot amateur", "Tournois de padel / tennis", "Galas de judo / danse", "Cross et trails locaux", "Clubs de rugby fédéral"],
  },
  {
    id: "etudiant",
    icon: "🎓",
    label: "Soirées étudiantes",
    desc: "BDE, WEI, galas de promo · renouvellement annuel garanti",
    exemple: "BDE d'école de commerce, 15 soirées/an, 400 étudiants par soirée",
    gob: 400, jours: 15, rotations: 15,
    color: "#0284c7",
    exemples_clients: ["BDE grandes écoles", "BDS universités", "Soirées d'intégration (WEI)", "Galas de promo", "Associations étudiantes culturelles"],
  },
  {
    id: "agence",
    icon: "🎪",
    label: "Agences événementielles",
    desc: "1 contrat agence = 20-50 événements automatiques par an",
    exemple: "Agence événementielle 30 événements/an, 500 personnes en moyenne",
    gob: 500, jours: 30, rotations: 30,
    color: "#0f766e",
    exemples_clients: ["Agences MICE", "Organisateurs de salons", "Agences séminaires / team building", "Event managers freelance", "Agences de communication événementielle"],
  },
  {
    id: "mariage",
    icon: "💍",
    label: "Mariages & réceptions",
    desc: "Via traiteurs et wedding planners · gobelet personnalisé = souvenir",
    exemple: "Traiteur haut de gamme, 40 mariages/an, 150 invités en moyenne",
    gob: 200, jours: 40, rotations: 40,
    color: "#9d174d",
    exemples_clients: ["Traiteurs événementiels", "Wedding planners", "Domaines viticoles (mariages en château)", "Salles de réception", "Manoirs et domaines privatisables"],
  },
  {
    id: "salon",
    icon: "📊",
    label: "Salons & foires",
    desc: "Gros volumes sur 3-5 jours · organisateur = contrat annuel",
    exemple: "Foire régionale, 5 000 visiteurs/jour, 3 jours, buvettes sur site",
    gob: 2000, jours: 3, rotations: 3,
    color: "#64748b",
    exemples_clients: ["Foires régionales", "Salons professionnels", "Comexposium / GL Events / Reed", "Salons de l'habitat et du mariage", "Salons gastronomiques"],
  },
  {
    id: "parc",
    icon: "🎡",
    label: "Parcs de loisirs",
    desc: "Ouvert 200 jours/an · buvettes multiples · volume constant",
    exemple: "Parc animalier 1 500 visiteurs/jour, 200 jours d'ouverture",
    gob: 1500, jours: 200, rotations: 100,
    color: "#ea580c",
    exemples_clients: ["Zoos et parcs animaliers", "Parcs d'attractions", "Parcs aquatiques", "Bases de loisirs", "Parcs à thème régionaux"],
  },
];

export default function App() {
  const [step, setStep] = useState("intro");
  const [selectedUnivers, setSelectedUnivers] = useState(null);
  const [customGob, setCustomGob] = useState("");
  const [customRot, setCustomRot] = useState("");
  const [reseau, setReseau] = useState({});
  const [contacts, setContacts] = useState({});

  const go = (s) => setStep(s);
  const sel = UNIVERS.find(u => u.id === selectedUnivers);
  const simGob = parseFloat(customGob) || sel?.gob || 0;
  const simRot = parseFloat(customRot) || sel?.rotations || 0;
  const caVente = Math.round(simGob * 0.30);
  const caService = Math.round(simGob * simRot * 0.20);
  const comVente = Math.round(caVente * 0.08);
  const comService = Math.round(caService * 0.12);
  const reseauScore = UNIVERS.filter(u => reseau[u.id] === "oui").length;

  return <div>App loaded - see full version</div>;
}
