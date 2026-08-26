import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  LayoutDashboard, Search, Sparkles, GitCompare, Leaf, Database as DatabaseIcon,
  FileText, Settings, Menu, X, ChevronRight, ChevronLeft, MessageCircle, Send,
  TrendingUp, CheckCircle2, AlertTriangle, Award, Filter, ArrowUpDown, Download,
  Printer, Info, Star, DollarSign, Recycle, Layers, Box, Building2, Package,
  TreePine, Wind, Home as HomeIcon, Grid3x3, Square, Thermometer, Factory,
  ChevronDown, Plus, Check, RotateCcw, BarChart3, Gauge, Building, Users, Flame,
  Ruler, ArrowRight, Sun,
} from "lucide-react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip,
  ResponsiveContainer, Legend, LineChart, Line, Cell,
} from "recharts";

/* ============================== DESIGN TOKENS ============================== */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=Inter:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

    .gba{
      --ink:#16211C; --ink-soft:#3E4A42;
      --canopy:#163832; --canopy-700:#1F4A40; --canopy-100:#E4ECE7;
      --moss:#4C7A5E; --leaf:#7DAE5A; --leaf-soft:#DCEBCB;
      --ochre:#C98A3D; --ochre-soft:#F3E3C9;
      --clay:#B5573F; --clay-soft:#F3DDD6;
      --paper:#F6F4EC; --card:#FFFFFF; --stone:#E6E1D3; --stone-600:#8C8676;
      --font-display:'Fraunces', serif; --font-body:'Inter', sans-serif; --font-mono:'Space Mono', monospace;
      background:var(--paper); color:var(--ink); font-family:var(--font-body);
      min-height:100vh; -webkit-font-smoothing:antialiased;
    }
    .gba *{ box-sizing:border-box; }
    .gba .f-display{ font-family:var(--font-display); }
    .gba .f-mono{ font-family:var(--font-mono); }
    .gba .txt-ink{ color:var(--ink); } .gba .txt-soft{ color:var(--ink-soft); }
    .gba .txt-muted{ color:var(--stone-600); }
    .gba .txt-canopy{ color:var(--canopy); } .gba .txt-moss{ color:var(--moss); }
    .gba .txt-leaf{ color:var(--leaf); } .gba .txt-ochre{ color:var(--ochre); } .gba .txt-clay{ color:var(--clay); }
    .gba .bg-canopy{ background:var(--canopy); } .gba .bg-canopy-700{ background:var(--canopy-700); }
    .gba .bg-canopy-100{ background:var(--canopy-100); } .gba .bg-card{ background:var(--card); }
    .gba .bg-paper{ background:var(--paper); } .gba .bg-leaf-soft{ background:var(--leaf-soft); }
    .gba .bg-ochre-soft{ background:var(--ochre-soft); } .gba .bg-clay-soft{ background:var(--clay-soft); }
    .gba .bg-leaf{ background:var(--leaf); } .gba .bg-ochre{ background:var(--ochre); } .gba .bg-clay{ background:var(--clay); }
    .gba .border-stone{ border-color:var(--stone); } .gba .border-canopy{ border-color:var(--canopy); }
    .gba .card{ background:var(--card); border:1px solid var(--stone); border-radius:20px; }
    .gba .card-hover{ transition:box-shadow .25s ease, transform .25s ease, border-color .25s ease; }
    .gba .card-hover:hover{ box-shadow:0 12px 30px -14px rgba(22,56,50,0.25); transform:translateY(-2px); border-color:#CFE0D3; }
    .gba .btn-primary{ background:var(--canopy); color:#fff; border-radius:999px; font-weight:600; transition:background .2s ease, transform .15s ease; }
    .gba .btn-primary:hover{ background:var(--canopy-700); transform:translateY(-1px); }
    .gba .btn-secondary{ background:transparent; color:var(--canopy); border:1.5px solid var(--canopy); border-radius:999px; font-weight:600; transition:all .2s ease; }
    .gba .btn-secondary:hover{ background:var(--canopy-100); }
    .gba .btn-ghost{ background:transparent; color:var(--ink-soft); border-radius:999px; transition:all .2s ease; }
    .gba .btn-ghost:hover{ background:var(--stone); color:var(--ink); }
    .gba .divider{ border-top:1px solid var(--stone); }
    .gba .navlink{ transition:background .2s ease, color .2s ease; color:#CFE0D3; }
    .gba .navlink:hover{ background:rgba(255,255,255,0.08); color:#fff; }
    .gba .navlink.active{ background:var(--leaf); color:var(--canopy); font-weight:700; }
    .gba .fade-in{ animation:gbaFade .5s ease both; }
    .gba .rise-in{ animation:gbaRise .5s cubic-bezier(.2,.8,.2,1) both; }
    @keyframes gbaFade{ from{opacity:0;} to{opacity:1;} }
    @keyframes gbaRise{ from{opacity:0; transform:translateY(14px);} to{opacity:1; transform:translateY(0);} }
    .gba .pulse-ring{ animation:gbaPulse 1.8s ease-in-out infinite; }
    @keyframes gbaPulse{ 0%,100%{opacity:.5;} 50%{opacity:1;} }
    .gba .slider{ -webkit-appearance:none; appearance:none; height:6px; border-radius:999px; background:var(--stone); outline:none; }
    .gba .slider::-webkit-slider-thumb{ -webkit-appearance:none; appearance:none; width:20px; height:20px; border-radius:50%; background:var(--canopy); border:3px solid #fff; box-shadow:0 1px 4px rgba(0,0,0,.3); cursor:pointer; }
    .gba .slider::-moz-range-thumb{ width:20px; height:20px; border-radius:50%; background:var(--canopy); border:3px solid #fff; box-shadow:0 1px 4px rgba(0,0,0,.3); cursor:pointer; border:none; }
    .gba .scrollbar-thin::-webkit-scrollbar{ width:6px; height:6px; }
    .gba .scrollbar-thin::-webkit-scrollbar-thumb{ background:var(--stone); border-radius:999px; }
    .gba table{ border-collapse:separate; border-spacing:0; }
  `}</style>
);

/* ============================== DEMO DATA ============================== */
const CATEGORY_ICON = {
  Bricks: Layers, Blocks: Box, Concrete: Building2, Cement: Package,
  Steel: Factory, Timber: TreePine, Insulation: Wind, Roofing: HomeIcon,
  Flooring: Grid3x3, Glass: Square,
};

const MATERIALS = [
  { id: "aac-blocks", name: "AAC Blocks", category: "Blocks", price: "$70\u2013$90 / m\u00b3",
    cost: 82, durability: 78, thermal: 95, environmental: 88, carbon: 85, sustainability: 90, lifespan: 75,
    compressiveStrength: "3\u20134.5 N/mm\u00b2", thermalConductivity: "0.16\u20130.24 W/mK", fireResistance: "4 hrs (up to 200mm)",
    recyclability: "Moderate \u2014 crushed for aggregate reuse", energyConsumption: "Low-medium (autoclaved curing)", resourceUsage: "Fly ash + lime + aluminium powder",
    description: "Autoclaved Aerated Concrete blocks are lightweight, precast masonry units prized for their thermal insulation and fast, low-waste construction.",
    advantages: ["Excellent thermal insulation reduces HVAC loads", "Lightweight, cutting structural and transport costs", "Precise dimensions mean minimal mortar waste", "Good fire resistance"],
    limitations: ["Lower compressive strength than dense concrete", "Needs specialised fixings for heavy loads", "More brittle during handling on site"],
    applications: ["Load-bearing walls in low-rise residential", "Partition walls in commercial buildings", "Infill panels in framed structures"] },
  { id: "fly-ash-bricks", name: "Fly Ash Bricks", category: "Bricks", price: "$0.06\u2013$0.09 / unit",
    cost: 90, durability: 75, thermal: 70, environmental: 85, carbon: 82, sustainability: 84, lifespan: 60,
    compressiveStrength: "7\u201310 N/mm\u00b2", thermalConductivity: "0.5\u20130.6 W/mK", fireResistance: "2 hrs",
    recyclability: "High \u2014 diverts industrial waste from landfill", energyConsumption: "Low (no kiln firing required)", resourceUsage: "Fly ash (power-plant byproduct), lime, gypsum",
    description: "Fly ash bricks repurpose coal-combustion byproduct into dense, uniform masonry units, avoiding the energy-intensive firing used for clay brick.",
    advantages: ["Very cost-effective at scale", "Diverts industrial waste from landfill", "Uniform shape reduces plaster consumption", "No kiln firing means lower embodied energy"],
    limitations: ["Quality varies with fly ash source", "Slightly lower water resistance than clay brick", "Regional availability of fly ash can vary"],
    applications: ["General residential masonry", "Boundary and compound walls", "Low-rise commercial construction"] },
  { id: "clay-bricks", name: "Clay Bricks", category: "Bricks", price: "$0.08\u2013$0.12 / unit",
    cost: 70, durability: 85, thermal: 55, environmental: 55, carbon: 50, sustainability: 58, lifespan: 100,
    compressiveStrength: "10\u201315 N/mm\u00b2", thermalConductivity: "0.6\u20131.0 W/mK", fireResistance: "4+ hrs",
    recyclability: "Low \u2014 typically down-cycled as rubble", energyConsumption: "High (kiln-fired at 900\u20131200\u00b0C)", resourceUsage: "Quarried clay/shale, significant fuel for firing",
    description: "The traditional fired-clay brick remains a familiar, long-lasting masonry unit, though its kiln-firing process carries a heavier carbon cost.",
    advantages: ["Long track record of durability", "Good compressive strength", "Widely available skilled labour for laying", "Ages well aesthetically"],
    limitations: ["Kiln firing is energy- and carbon-intensive", "Heavier than modern alternatives", "Clay extraction impacts topsoil"],
    applications: ["Load-bearing and facade masonry", "Heritage-style residential builds", "Garden and landscape walling"] },
  { id: "recycled-concrete", name: "Recycled Concrete", category: "Concrete", price: "$55\u2013$75 / m\u00b3",
    cost: 75, durability: 80, thermal: 45, environmental: 78, carbon: 72, sustainability: 76, lifespan: 60,
    compressiveStrength: "20\u201335 N/mm\u00b2", thermalConductivity: "1.4 W/mK", fireResistance: "4+ hrs",
    recyclability: "High \u2014 made from crushed demolition aggregate", energyConsumption: "Medium (less virgin aggregate quarrying)", resourceUsage: "Recycled coarse aggregate, cement, water",
    description: "Recycled concrete substitutes crushed demolition debris for virgin aggregate, cutting quarrying impact while retaining structural performance.",
    advantages: ["Diverts demolition waste from landfill", "Reduces virgin aggregate quarrying", "Comparable strength to conventional mixes", "Often locally sourced"],
    limitations: ["Aggregate quality depends on source consistency", "May need slightly higher cement content", "Supply can be regionally limited"],
    applications: ["Foundations and sub-base layers", "Non-structural slabs and pavements", "General structural concrete with QA testing"] },
  { id: "conventional-concrete", name: "Conventional Concrete", category: "Concrete", price: "$60\u2013$80 / m\u00b3",
    cost: 68, durability: 92, thermal: 40, environmental: 35, carbon: 30, sustainability: 38, lifespan: 80,
    compressiveStrength: "25\u201340 N/mm\u00b2", thermalConductivity: "1.7 W/mK", fireResistance: "4+ hrs",
    recyclability: "Low-moderate \u2014 can be crushed at end of life", energyConsumption: "High (cement production is energy-intensive)", resourceUsage: "Virgin aggregate, Portland cement, water",
    description: "Standard Portland-cement concrete offers proven strength and versatility, but cement production remains one of construction's largest carbon sources.",
    advantages: ["Very high compressive strength", "Predictable, well-understood performance", "Universally available materials and expertise", "Excellent for large structural spans"],
    limitations: ["Cement manufacture is highly carbon-intensive", "Poor thermal insulation on its own", "Quarrying virgin aggregate impacts landscapes"],
    applications: ["High-rise structural frames", "Foundations and heavy infrastructure", "Industrial flooring"] },
  { id: "bamboo", name: "Bamboo", category: "Timber", price: "$3\u2013$6 / linear m",
    cost: 85, durability: 60, thermal: 65, environmental: 95, carbon: 93, sustainability: 91, lifespan: 25,
    compressiveStrength: "40\u201360 N/mm\u00b2 (along fibre)", thermalConductivity: "0.2\u20130.3 W/mK", fireResistance: "Moderate \u2014 needs treatment",
    recyclability: "High \u2014 biodegradable and reusable", energyConsumption: "Very low (fast-growing, minimal processing)", resourceUsage: "Rapidly renewable grass (3\u20135 yr maturity)",
    description: "Bamboo is a rapidly renewable grass with a strength-to-weight ratio rivalling timber, making it a standout choice for low-carbon structural elements.",
    advantages: ["Matures in 3\u20135 years \u2014 highly renewable", "High strength-to-weight ratio", "Sequesters carbon rapidly while growing", "Low processing energy"],
    limitations: ["Susceptible to pests/moisture without treatment", "Shorter service life than hardwood or steel", "Requires specialised joinery knowledge"],
    applications: ["Lightweight framing and trusses", "Scaffolding and temporary structures", "Flooring, cladding and interior fit-out"] },
  { id: "engineered-timber", name: "Engineered Timber", category: "Timber", price: "$450\u2013$650 / m\u00b3",
    cost: 65, durability: 70, thermal: 75, environmental: 80, carbon: 78, sustainability: 79, lifespan: 50,
    compressiveStrength: "24\u201330 N/mm\u00b2", thermalConductivity: "0.12 W/mK", fireResistance: "Good \u2014 chars predictably",
    recyclability: "Moderate-high \u2014 can be reused or biodegraded", energyConsumption: "Low-medium (milling and lamination)", resourceUsage: "Sustainably managed softwood, adhesives",
    description: "Cross-laminated and glulam timber products offer prefabricated structural performance with a fraction of steel or concrete's embodied carbon.",
    advantages: ["Stores carbon captured during tree growth", "Prefabrication speeds up construction", "Good strength-to-weight for mid-rise builds", "Warm, natural finish"],
    limitations: ["Cost sensitive to certified-timber supply", "Needs moisture detailing to prevent decay", "Fire codes vary by jurisdiction"],
    applications: ["Mid-rise structural framing", "Roof and floor cassettes", "Exposed structural feature elements"] },
  { id: "recycled-steel", name: "Recycled Steel", category: "Steel", price: "$650\u2013$800 / tonne",
    cost: 55, durability: 96, thermal: 30, environmental: 70, carbon: 65, sustainability: 71, lifespan: 100,
    compressiveStrength: "250\u2013400 N/mm\u00b2 (yield)", thermalConductivity: "45\u201350 W/mK", fireResistance: "Low without cladding \u2014 needs protection",
    recyclability: "Very high \u2014 infinitely recyclable", energyConsumption: "Medium (electric arc furnace vs virgin ore smelting)", resourceUsage: "Scrap steel, minimal virgin ore",
    description: "Steel made predominantly from scrap via electric-arc furnaces retains full structural performance while cutting embodied carbon versus virgin steel.",
    advantages: ["Near-infinite recyclability with no quality loss", "Very high strength for slender structural members", "Faster erection than cast-in-place alternatives", "Long service life"],
    limitations: ["Needs fireproofing/cladding for fire rating", "Susceptible to corrosion without coating", "Thermal bridging unless detailed carefully"],
    applications: ["High-rise structural frames", "Long-span roofs and bridges", "Modular and prefabricated construction"] },
  { id: "conventional-steel", name: "Conventional Steel", category: "Steel", price: "$700\u2013$900 / tonne",
    cost: 50, durability: 97, thermal: 28, environmental: 25, carbon: 20, sustainability: 30, lifespan: 100,
    compressiveStrength: "250\u2013400 N/mm\u00b2 (yield)", thermalConductivity: "45\u201350 W/mK", fireResistance: "Low without cladding \u2014 needs protection",
    recyclability: "High at end-of-life, but virgin-ore intensive to produce", energyConsumption: "Very high (blast furnace, virgin ore)", resourceUsage: "Iron ore, coking coal",
    description: "Virgin structural steel delivers unmatched strength and predictability, but blast-furnace production is among the most carbon-intensive processes in construction.",
    advantages: ["Exceptional strength and predictability", "Fast, precise fabrication and erection", "Long design life", "Extensive design codes and expertise"],
    limitations: ["Very high embodied carbon from virgin ore", "Requires corrosion and fire protection", "Price sensitive to global commodity markets"],
    applications: ["High-rise and long-span structures", "Industrial and infrastructure projects", "Where maximum strength-to-weight is essential"] },
  { id: "hempcrete", name: "Hempcrete", category: "Insulation", price: "$110\u2013$150 / m\u00b3",
    cost: 60, durability: 55, thermal: 90, environmental: 97, carbon: 98, sustainability: 93, lifespan: 50,
    compressiveStrength: "0.5\u20131 N/mm\u00b2 (non load-bearing)", thermalConductivity: "0.06\u20130.09 W/mK", fireResistance: "Very good \u2014 self-extinguishing",
    recyclability: "High \u2014 biodegradable, can be composted", energyConsumption: "Very low", resourceUsage: "Hemp hurds (shiv) + lime binder",
    description: "A bio-composite of hemp shiv and lime binder, hempcrete is carbon-negative over its lifecycle and delivers outstanding insulation and breathability.",
    advantages: ["Carbon-negative \u2014 sequesters more CO2 than it emits", "Excellent thermal and acoustic insulation", "Regulates indoor humidity naturally", "Fully biodegradable"],
    limitations: ["Non load-bearing \u2014 needs a structural frame", "Longer cure times than conventional infill", "Limited specialist installer availability"],
    applications: ["Insulating infill in timber-framed walls", "Retrofit insulation for older buildings", "Acoustic and thermal partition walls"] },
  { id: "compressed-earth-blocks", name: "Compressed Earth Blocks", category: "Blocks", price: "$0.15\u2013$0.25 / unit",
    cost: 92, durability: 65, thermal: 80, environmental: 90, carbon: 88, sustainability: 87, lifespan: 60,
    compressiveStrength: "2\u20136 N/mm\u00b2", thermalConductivity: "0.4\u20130.5 W/mK", fireResistance: "Very good \u2014 inherently non-combustible",
    recyclability: "Very high \u2014 can return to soil", energyConsumption: "Very low (compressed, unfired)", resourceUsage: "Local subsoil, small amount of stabiliser",
    description: "CEBs are formed by mechanically compressing local subsoil, often with a small stabiliser, producing an unfired masonry unit with a very low carbon footprint.",
    advantages: ["Uses on-site or local soil \u2014 minimal transport", "No firing energy required", "Good thermal mass moderates indoor temperatures", "Naturally fire resistant"],
    limitations: ["Lower compressive strength than fired brick", "Needs weather protection in wet climates", "Soil composition affects consistency"],
    applications: ["Low-rise residential walls", "Rural and owner-build projects", "Boundary walls and garden structures"] },
  { id: "recycled-glass", name: "Recycled Glass (Cullet/Panels)", category: "Glass", price: "$40\u2013$70 / m\u00b2",
    cost: 62, durability: 75, thermal: 50, environmental: 82, carbon: 79, sustainability: 78, lifespan: 80,
    compressiveStrength: "High in compression, brittle in tension", thermalConductivity: "0.8\u20131.0 W/mK", fireResistance: "Good \u2014 non-combustible",
    recyclability: "Very high \u2014 infinitely recyclable without quality loss", energyConsumption: "Medium (lower melting energy than virgin glass)", resourceUsage: "Post-consumer glass cullet",
    description: "Recycled glass products divert cullet from landfill into cladding, terrazzo aggregate and glazing, cutting the energy needed versus virgin glass melting.",
    advantages: ["Diverts waste glass from landfill", "Lower melting energy than virgin glass", "Infinitely recyclable", "Attractive, light-reflective finishes"],
    limitations: ["Brittle \u2014 needs careful detailing", "Colour consistency depends on feedstock sorting", "Not structural on its own"],
    applications: ["Decorative cladding and terrazzo flooring", "Countertops and feature walls", "Glazing units with recycled content"] },
  { id: "natural-stone", name: "Natural Stone", category: "Flooring", price: "$35\u2013$120 / m\u00b2",
    cost: 45, durability: 95, thermal: 35, environmental: 60, carbon: 55, sustainability: 60, lifespan: 150,
    compressiveStrength: "70\u2013200 N/mm\u00b2", thermalConductivity: "2.0\u20133.0 W/mK", fireResistance: "Excellent \u2014 non-combustible",
    recyclability: "High \u2014 can be re-dressed and reused", energyConsumption: "Medium (quarrying and cutting)", resourceUsage: "Quarried granite, limestone or sandstone",
    description: "Quarried natural stone offers exceptional longevity and a low-processing footprint, at the cost of quarrying impact and significant transport weight.",
    advantages: ["Extremely long service life", "Minimal processing beyond cutting", "High thermal mass and durability", "Can be re-dressed and reused"],
    limitations: ["Heavy \u2014 higher transport emissions", "Quarrying disturbs local landscapes", "Higher cost for premium finishes"],
    applications: ["Flooring and cladding", "Feature walls and countertops", "Heritage and high-end residential builds"] },
  { id: "eco-cement", name: "Eco Cement (Blended)", category: "Cement", price: "$85\u2013$110 / tonne",
    cost: 58, durability: 85, thermal: 40, environmental: 75, carbon: 70, sustainability: 74, lifespan: 80,
    compressiveStrength: "30\u201345 N/mm\u00b2", thermalConductivity: "1.6 W/mK", fireResistance: "4+ hrs",
    recyclability: "Moderate \u2014 uses fly ash/slag replacement", energyConsumption: "Medium (lower clinker content)", resourceUsage: "Fly ash / GGBS blended with reduced clinker",
    description: "Blended cements replace a portion of energy-intensive clinker with industrial byproducts like fly ash or slag, cutting embodied carbon without sacrificing strength.",
    advantages: ["Meaningfully lower embodied carbon than OPC", "Comparable long-term strength", "Uses industrial byproducts productively", "Drop-in compatibility with standard mixes"],
    limitations: ["Slightly slower early strength gain", "Byproduct supply varies regionally", "Marginally higher unit cost"],
    applications: ["General structural concrete", "Mass pours where early strength is less critical", "Sustainable infrastructure projects"] },
  { id: "insulated-concrete-blocks", name: "Insulated Concrete Blocks", category: "Blocks", price: "$95\u2013$130 / m\u00b3",
    cost: 70, durability: 88, thermal: 92, environmental: 72, carbon: 68, sustainability: 76, lifespan: 90,
    compressiveStrength: "15\u201325 N/mm\u00b2", thermalConductivity: "0.2\u20130.3 W/mK", fireResistance: "4+ hrs",
    recyclability: "Moderate \u2014 composite construction complicates reuse", energyConsumption: "Medium-high", resourceUsage: "Concrete facings with rigid foam or mineral core",
    description: "ICBs sandwich an insulating core between concrete facings, combining structural strength with strong thermal performance in a single unit.",
    advantages: ["Strong thermal performance built into the structure", "High compressive strength", "Reduces separate insulation installation steps", "Good acoustic performance"],
    limitations: ["Composite make-up complicates recycling", "Heavier than lightweight-block alternatives", "Higher unit cost than plain block"],
    applications: ["Energy-efficient residential envelopes", "Commercial building envelopes", "Cold-storage and controlled-climate structures"] },
  { id: "clay-roof-tiles", name: "Clay Roof Tiles", category: "Roofing", price: "$1.20\u2013$2.50 / unit",
    cost: 68, durability: 80, thermal: 60, environmental: 65, carbon: 60, sustainability: 63, lifespan: 50,
    compressiveStrength: "N/A \u2014 rated by breaking load (\u2265900N)", thermalConductivity: "0.85 W/mK", fireResistance: "Excellent \u2014 non-combustible",
    recyclability: "Moderate \u2014 can be crushed or re-laid", energyConsumption: "Medium-high (kiln fired)", resourceUsage: "Quarried clay, kiln fuel",
    description: "Fired clay roof tiles combine a long service life and classic aesthetic with a moderate embodied-carbon footprint from the firing process.",
    advantages: ["Long service life with minimal maintenance", "Excellent fire resistance", "Ages gracefully, strong resale appeal", "Good rain and UV resistance"],
    limitations: ["Kiln firing adds embodied carbon", "Heavier roof structure required", "Brittle \u2014 breakage during handling"],
    applications: ["Pitched residential roofing", "Heritage-style developments", "Warm and temperate climates"] },
];

const CATEGORIES = ["All", ...Array.from(new Set(MATERIALS.map(m => m.category)))];

const WEIGHT_KEYS = [
  { key: "cost", label: "Cost", icon: DollarSign, help: "How much affordability matters" },
  { key: "durability", label: "Durability", icon: Award, help: "Structural longevity & strength" },
  { key: "thermal", label: "Thermal Performance", icon: Thermometer, help: "Insulation & energy efficiency" },
  { key: "environmental", label: "Environmental Impact", icon: Leaf, help: "Resource use & ecological footprint" },
  { key: "carbon", label: "Carbon Footprint", icon: Wind, help: "Embodied carbon & emissions" },
  { key: "sustainability", label: "Sustainability", icon: Recycle, help: "Overall lifecycle sustainability" },
];

const DEFAULT_WEIGHTS = { cost: 50, durability: 50, thermal: 50, environmental: 50, carbon: 50, sustainability: 50 };

/* ============================== HELPERS ============================== */
function normalizeWeights(weights) {
  const total = Object.values(weights).reduce((a, b) => a + b, 0) || 1;
  const norm = {};
  Object.keys(weights).forEach(k => { norm[k] = (weights[k] / total) * 100; });
  return norm;
}
function scoreMaterial(material, weights) {
  const norm = normalizeWeights(weights);
  let score = 0;
  WEIGHT_KEYS.forEach(({ key }) => { score += (material[key] * norm[key]) / 100; });
  return Math.round(score * 10) / 10;
}
function rankMaterials(weights, pool = MATERIALS) {
  return pool
    .map(m => ({ ...m, matchScore: scoreMaterial(m, weights) }))
    .sort((a, b) => b.matchScore - a.matchScore);
}
function topFactors(weights, n = 2) {
  const norm = normalizeWeights(weights);
  return Object.entries(norm).sort((a, b) => b[1] - a[1]).slice(0, n).map(([k]) => WEIGHT_KEYS.find(w => w.key === k).label);
}
function whyRecommended(material, weights) {
  const factors = topFactors(weights, 2);
  const factorText = factors.map(f => f.toLowerCase()).join(" and ");
  return `Strong ${factorText} scores, combined with a ${material.sustainability}/100 overall sustainability rating, make ${material.name} a strong match for what you prioritised.`;
}
function scoreColor(v) {
  if (v >= 85) return "var(--leaf)";
  if (v >= 65) return "var(--ochre)";
  return "var(--clay)";
}
function scoreBg(v) {
  if (v >= 85) return "var(--leaf-soft)";
  if (v >= 65) return "var(--ochre-soft)";
  return "var(--clay-soft)";
}

/* ============================== SMALL UI PRIMITIVES ============================== */
const Badge = ({ children, tone = "leaf", icon: Icon }) => {
  const map = {
    leaf: { bg: "var(--leaf-soft)", fg: "var(--canopy)" },
    ochre: { bg: "var(--ochre-soft)", fg: "#8A5A21" },
    clay: { bg: "var(--clay-soft)", fg: "#8A3D2A" },
    canopy: { bg: "var(--canopy-100)", fg: "var(--canopy)" },
  };
  const c = map[tone];
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: c.bg, color: c.fg }}>
      {Icon && <Icon size={12} strokeWidth={2.5} />}{children}
    </span>
  );
};

const ScoreRing = ({ value, size = 96, stroke = 10, label }) => {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (value / 100) * c;
  const color = scoreColor(value);
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--stone)" strokeWidth={stroke} fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r - stroke - 3} stroke="var(--stone)" strokeWidth={1} fill="none" opacity={0.6} />
        <circle cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none"
          strokeDasharray={`${dash} ${c}`} strokeLinecap="round" style={{ transition: "stroke-dasharray 1s cubic-bezier(.2,.8,.2,1)" }} />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="f-mono font-bold" style={{ fontSize: size * 0.24, color: "var(--ink)" }}>{Math.round(value)}</span>
        {label && <span className="text-[10px] txt-muted uppercase tracking-wide">{label}</span>}
      </div>
    </div>
  );
};

const MetricBar = ({ label, value, icon: Icon }) => (
  <div>
    <div className="flex items-center justify-between mb-1">
      <span className="text-xs txt-soft flex items-center gap-1.5">{Icon && <Icon size={13} />}{label}</span>
      <span className="f-mono text-xs font-bold" style={{ color: scoreColor(value) }}>{value}/100</span>
    </div>
    <div className="w-full h-2 rounded-full" style={{ background: "var(--stone)" }}>
      <div className="h-2 rounded-full" style={{ width: `${value}%`, background: scoreColor(value), transition: "width .8s cubic-bezier(.2,.8,.2,1)" }} />
    </div>
  </div>
);

const StatCard = ({ icon: Icon, label, value, sub, tone = "leaf" }) => (
  <div className="card card-hover p-5 rise-in">
    <div className="flex items-start justify-between">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: tone === "leaf" ? "var(--leaf-soft)" : tone === "ochre" ? "var(--ochre-soft)" : "var(--canopy-100)" }}>
        <Icon size={18} style={{ color: tone === "leaf" ? "var(--moss)" : tone === "ochre" ? "var(--ochre)" : "var(--canopy)" }} />
      </div>
    </div>
    <p className="f-display text-2xl mt-4" style={{ color: "var(--ink)" }}>{value}</p>
    <p className="text-sm txt-muted mt-0.5">{label}</p>
    {sub && <p className="text-xs txt-moss mt-2 flex items-center gap-1"><TrendingUp size={12} />{sub}</p>}
  </div>
);

/* ============================== SIDEBAR ============================== */
const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "finder", label: "Material Finder", icon: Search },
  { id: "recommendations", label: "AI Recommendations", icon: Sparkles },
  { id: "compare", label: "Compare Materials", icon: GitCompare },
  { id: "sustainability", label: "Sustainability", icon: Leaf },
  { id: "database", label: "Material Database", icon: DatabaseIcon },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

function Sidebar({ view, setView, mobileOpen, setMobileOpen }) {
  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" style={{ background: "rgba(10,20,15,0.5)" }} onClick={() => setMobileOpen(false)} />
      )}
      <aside
        className={`fixed lg:sticky top-0 h-screen z-50 lg:z-0 flex flex-col justify-between transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        style={{ width: 264, background: "var(--canopy)" }}
      >
        <div>
          <div className="flex items-center justify-between px-5 pt-6 pb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--leaf)" }}>
                <Leaf size={18} style={{ color: "var(--canopy)" }} strokeWidth={2.5} />
              </div>
              <div>
                <p className="f-display text-white text-lg leading-none">GreenBuild</p>
                <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--leaf)" }}>AI</p>
              </div>
            </div>
            <button className="lg:hidden text-white" onClick={() => setMobileOpen(false)}><X size={20} /></button>
          </div>
          <nav className="px-3 flex flex-col gap-1">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => { setView(item.id); setMobileOpen(false); }}
                className={`navlink flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm ${view === item.id ? "active" : ""}`}
              >
                <item.icon size={17} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-4 m-3 rounded-2xl" style={{ background: "rgba(255,255,255,0.06)" }}>
          <p className="text-white text-xs font-semibold mb-1">Demo dataset active</p>
          <p className="text-[11px]" style={{ color: "#B9CFC0" }}>16 sample materials loaded. Connect a live database anytime from Settings.</p>
        </div>
      </aside>
    </>
  );
}

function TopBar({ setMobileOpen, title, subtitle }) {
  return (
    <div className="flex items-center gap-3 px-5 lg:px-8 pt-6">
      <button className="lg:hidden btn-ghost p-2 rounded-lg" onClick={() => setMobileOpen(true)}><Menu size={20} /></button>
      <div>
        {title && <h1 className="f-display text-2xl lg:text-3xl txt-ink">{title}</h1>}
        {subtitle && <p className="text-sm txt-muted mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}

/* ============================== DASHBOARD ============================== */
function Dashboard({ setView }) {
  const trend = [
    { m: "Mar", score: 71 }, { m: "Apr", score: 74 }, { m: "May", score: 78 },
    { m: "Jun", score: 81 }, { m: "Jul", score: 85 }, { m: "Aug", score: 87 },
  ];
  return (
    <div className="px-5 lg:px-8 pb-16 fade-in">
      <div className="mt-2 rounded-3xl p-7 lg:p-10 relative overflow-hidden" style={{ background: "linear-gradient(135deg, var(--canopy) 0%, #1F4A40 60%, #2C5B4A 100%)" }}>
        <div className="absolute -right-10 -top-10 w-56 h-56 rounded-full" style={{ background: "rgba(125,174,90,0.18)" }} />
        <div className="absolute right-24 bottom-0 w-40 h-40 rounded-full" style={{ background: "rgba(125,174,90,0.12)" }} />
        <p className="text-sm relative" style={{ color: "#B9CFC0" }}>Good morning \ud83d\udc4b</p>
        <h1 className="f-display text-3xl lg:text-[2.6rem] text-white mt-2 leading-tight relative">Build smarter.<br />Build greener.</h1>
        <p className="text-sm lg:text-base mt-3 max-w-md relative" style={{ color: "#CFE0D3" }}>AI-powered sustainable material selection for better construction decisions.</p>
        <button onClick={() => setView("finder")} className="btn-primary mt-6 px-6 py-3 text-sm flex items-center gap-2 relative" style={{ background: "var(--leaf)", color: "var(--canopy)" }}>
          Start Material Analysis <ArrowRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <StatCard icon={DatabaseIcon} label="Materials in Database" value="248" sub="+12 this month" />
        <StatCard icon={Gauge} label="Average Sustainability" value="87/100" sub="+4 pts vs last quarter" tone="ochre" />
        <StatCard icon={Wind} label="CO\u2082 Potentially Saved" value="1,284 t" sub="Across active projects" />
        <StatCard icon={Users} label="Projects Analysed" value="326" sub="+38 this month" tone="canopy" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6">
        <div className="lg:col-span-2 card p-6 rise-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="f-display text-lg txt-ink">Average sustainability score</p>
              <p className="text-xs txt-muted">Across all analysed projects, last 6 months</p>
            </div>
            <Badge tone="leaf" icon={TrendingUp}>+16 pts</Badge>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--stone)" vertical={false} />
              <XAxis dataKey="m" tick={{ fontSize: 12, fill: "var(--stone-600)" }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 95]} tick={{ fontSize: 12, fill: "var(--stone-600)" }} axisLine={false} tickLine={false} />
              <RTooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--stone)" }} />
              <Line type="monotone" dataKey="score" stroke="var(--moss)" strokeWidth={3} dot={{ r: 4, fill: "var(--leaf)" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-6 rise-in flex flex-col">
          <p className="f-display text-lg txt-ink mb-1">Quick actions</p>
          <p className="text-xs txt-muted mb-4">Jump back into your workflow</p>
          <div className="flex flex-col gap-2 mt-auto">
            {[
              { id: "finder", label: "New material analysis", icon: Search },
              { id: "compare", label: "Compare materials", icon: GitCompare },
              { id: "database", label: "Browse database", icon: DatabaseIcon },
              { id: "reports", label: "Generate a report", icon: FileText },
            ].map(a => (
              <button key={a.id} onClick={() => setView(a.id)} className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium border border-stone card-hover" style={{ color: "var(--ink)" }}>
                <span className="flex items-center gap-2"><a.icon size={15} style={{ color: "var(--moss)" }} />{a.label}</span>
                <ChevronRight size={15} className="txt-muted" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card p-6 mt-5 rise-in">
        <p className="f-display text-lg txt-ink mb-4">Recently viewed materials</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {MATERIALS.slice(0, 4).map(m => {
            const Icon = CATEGORY_ICON[m.category] || Box;
            return (
              <div key={m.id} className="border border-stone rounded-2xl p-4 card-hover">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-canopy-100"><Icon size={16} className="txt-canopy" /></div>
                  <span className="f-mono text-xs font-bold" style={{ color: scoreColor(m.sustainability) }}>{m.sustainability}</span>
                </div>
                <p className="text-sm font-semibold txt-ink">{m.name}</p>
                <p className="text-xs txt-muted">{m.category}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ============================== MATERIAL FINDER ============================== */
function MaterialFinder({ onComplete }) {
  const [step, setStep] = useState(1);
  const [project, setProject] = useState({ name: "", buildingType: "Residential", location: "", size: "", budget: "" });
  const [weights, setWeights] = useState(DEFAULT_WEIGHTS);
  const [extra, setExtra] = useState({ lifespan: "50", climate: "Temperate", category: "Any" });
  const [loadingStage, setLoadingStage] = useState(0);

  const stages = ["Analyzing project requirements...", "Comparing material properties...", "Calculating sustainability scores...", "Generating recommendations..."];

  useEffect(() => {
    if (step !== 3) return;
    setLoadingStage(0);
    const iv = setInterval(() => {
      setLoadingStage(s => {
        if (s >= stages.length - 1) {
          clearInterval(iv);
          setTimeout(() => onComplete({ project, weights, extra }), 700);
          return s;
        }
        return s + 1;
      });
    }, 750);
    return () => clearInterval(iv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const canNext1 = project.name.trim() && project.location.trim();

  return (
    <div className="px-5 lg:px-8 pb-16 fade-in max-w-3xl">
      <div className="flex items-center gap-3 mt-6 mb-8">
        {[1, 2, 3].map(n => (
          <React.Fragment key={n}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold f-mono"
                style={{ background: step >= n ? "var(--canopy)" : "var(--stone)", color: step >= n ? "#fff" : "var(--stone-600)" }}>
                {step > n ? <Check size={14} /> : n}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${step >= n ? "txt-ink" : "txt-muted"}`}>
                {n === 1 ? "Project Info" : n === 2 ? "Requirements" : "AI Analysis"}
              </span>
            </div>
            {n < 3 && <div className="flex-1 h-px" style={{ background: step > n ? "var(--canopy)" : "var(--stone)" }} />}
          </React.Fragment>
        ))}
      </div>

      {step === 1 && (
        <div className="card p-6 lg:p-8 rise-in">
          <p className="f-display text-xl txt-ink mb-1">Tell us about your project</p>
          <p className="text-sm txt-muted mb-6">We'll use this to tailor material recommendations.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Project Name" required>
              <input value={project.name} onChange={e => setProject({ ...project, name: e.target.value })} placeholder="e.g. Maple Grove Residence" className="input" />
            </Field>
            <Field label="Building Type">
              <select value={project.buildingType} onChange={e => setProject({ ...project, buildingType: e.target.value })} className="input">
                {["Residential", "Commercial", "Industrial", "Institutional"].map(t => <option key={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Location" required>
              <input value={project.location} onChange={e => setProject({ ...project, location: e.target.value })} placeholder="City, Country" className="input" />
            </Field>
            <Field label="Project Size">
              <input value={project.size} onChange={e => setProject({ ...project, size: e.target.value })} placeholder="e.g. 2,400 sq ft" className="input" />
            </Field>
            <Field label="Estimated Budget">
              <input value={project.budget} onChange={e => setProject({ ...project, budget: e.target.value })} placeholder="e.g. $180,000" className="input" />
            </Field>
          </div>
          <div className="flex justify-end mt-7">
            <button disabled={!canNext1} onClick={() => setStep(2)} className="btn-primary px-6 py-2.5 text-sm disabled:opacity-40">Continue</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="card p-6 lg:p-8 rise-in">
          <p className="f-display text-xl txt-ink mb-1">What matters most to you?</p>
          <p className="text-sm txt-muted mb-6">Adjust the sliders to reflect your project's priorities.</p>
          <div className="flex flex-col gap-5">
            {WEIGHT_KEYS.map(w => (
              <div key={w.key}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium txt-ink flex items-center gap-2"><w.icon size={14} className="txt-moss" />{w.label}</span>
                  <span className="f-mono text-xs font-bold txt-canopy">{weights[w.key]}</span>
                </div>
                <input type="range" min="0" max="100" value={weights[w.key]} className="slider w-full"
                  onChange={e => setWeights({ ...weights, [w.key]: Number(e.target.value) })} />
                <p className="text-[11px] txt-muted mt-1">{w.help}</p>
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mt-7">
            <Field label="Required Lifespan (yrs)">
              <input value={extra.lifespan} onChange={e => setExtra({ ...extra, lifespan: e.target.value })} className="input" />
            </Field>
            <Field label="Climate Type">
              <select value={extra.climate} onChange={e => setExtra({ ...extra, climate: e.target.value })} className="input">
                {["Tropical", "Arid", "Temperate", "Continental", "Cold"].map(c => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Preferred Category">
              <select value={extra.category} onChange={e => setExtra({ ...extra, category: e.target.value })} className="input">
                {CATEGORIES.map(c => <option key={c} value={c === "All" ? "Any" : c}>{c === "All" ? "Any" : c}</option>)}
              </select>
            </Field>
          </div>
          <div className="flex justify-between mt-7">
            <button onClick={() => setStep(1)} className="btn-secondary px-6 py-2.5 text-sm flex items-center gap-1"><ChevronLeft size={15} />Back</button>
            <button onClick={() => setStep(3)} className="btn-primary px-6 py-2.5 text-sm flex items-center gap-1">Run AI Analysis <Sparkles size={15} /></button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="card p-10 rise-in flex flex-col items-center text-center">
          <div className="relative w-20 h-20 mb-6">
            <div className="absolute inset-0 rounded-full pulse-ring" style={{ background: "var(--leaf-soft)" }} />
            <div className="absolute inset-0 flex items-center justify-center"><Sparkles size={30} className="txt-canopy" /></div>
          </div>
          <p className="f-display text-xl txt-ink mb-6">Running AI analysis</p>
          <div className="flex flex-col gap-3 w-full max-w-sm text-left">
            {stages.map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                {i < loadingStage ? <CheckCircle2 size={16} className="txt-leaf" /> : i === loadingStage ? <div className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "var(--moss)", borderTopColor: "transparent" }} /> : <div className="w-4 h-4 rounded-full border-2" style={{ borderColor: "var(--stone)" }} />}
                <span className={`text-sm ${i <= loadingStage ? "txt-ink" : "txt-muted"}`}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const Field = ({ label, required, children }) => (
  <label className="block">
    <span className="text-xs font-semibold txt-soft mb-1.5 block">{label}{required && <span className="txt-clay"> *</span>}</span>
    {children}
  </label>
);

/* input styling via style tag helper class .input applied globally below in GlobalStyle extension */

/* ============================== AI RECOMMENDATIONS ============================== */
function Recommendations({ result, setView, toggleCompare, compareList, openDetail }) {
  if (!result) {
    return (
      <EmptyState
        icon={Sparkles}
        title="No analysis yet"
        text="Run the Material Finder to generate AI-powered recommendations tailored to your project."
        cta="Start Material Analysis"
        onClick={() => setView("finder")}
      />
    );
  }
  const ranked = useMemo(() => rankMaterials(result.weights, result.extra.category && result.extra.category !== "Any" ? MATERIALS.filter(m => m.category === result.extra.category) : MATERIALS), [result]);
  const top3 = ranked.slice(0, 3);
  const rest = ranked.slice(3, 8);
  const factors = topFactors(result.weights, 2);

  return (
    <div className="px-5 lg:px-8 pb-16 fade-in">
      <div className="mt-2">
        <h1 className="f-display text-2xl lg:text-3xl txt-ink">AI Material Recommendations</h1>
        <p className="text-sm txt-muted mt-1 max-w-xl">Based on your project requirements, these materials provide the best overall performance for <span className="font-semibold txt-ink">{result.project.name || "your project"}</span>.</p>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <Badge tone="canopy" icon={Building}>{result.project.buildingType}</Badge>
        <Badge tone="canopy" icon={HomeIcon}>{result.extra.climate} climate</Badge>
        <Badge tone="leaf" icon={Star}>Prioritising {factors.join(" & ")}</Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mt-6">
        {top3.map((m, i) => {
          const Icon = CATEGORY_ICON[m.category] || Box;
          return (
            <div key={m.id} className="card card-hover p-6 rise-in relative overflow-hidden" style={{ animationDelay: `${i * 100}ms` }}>
              {i === 0 && <div className="absolute top-0 right-0"><div className="px-3 py-1 text-[10px] font-bold text-white" style={{ background: "var(--leaf)", color: "var(--canopy)", borderBottomLeftRadius: 12 }}>TOP MATCH</div></div>}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-canopy-100"><Icon size={16} className="txt-canopy" /></div>
                <span className="f-mono text-xs txt-muted">#{i + 1}</span>
              </div>
              <p className="f-display text-lg txt-ink leading-tight">{m.name}</p>
              <p className="text-xs txt-muted mb-4">{m.category} \u2022 {m.price}</p>
              <div className="flex items-center gap-4 mb-4">
                <ScoreRing value={m.matchScore} size={80} stroke={8} label="Match" />
                <div className="flex-1 flex flex-col gap-2">
                  <MetricBar label="Cost" value={m.cost} />
                  <MetricBar label="Durability" value={m.durability} />
                </div>
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <MetricBar label="Thermal Performance" value={m.thermal} />
                <MetricBar label="Environmental Impact" value={m.environmental} />
                <MetricBar label="Carbon Footprint" value={m.carbon} />
              </div>
              <div className="rounded-xl p-3 mb-4" style={{ background: "var(--leaf-soft)" }}>
                <p className="text-[11px] font-bold txt-canopy uppercase tracking-wide mb-1">Why AI recommends this</p>
                <p className="text-xs txt-ink leading-relaxed">{whyRecommended(m, result.weights)}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openDetail(m.id)} className="btn-secondary flex-1 py-2 text-xs">View Details</button>
                <button onClick={() => toggleCompare(m.id)} className="btn-primary flex-1 py-2 text-xs">
                  {compareList.includes(m.id) ? "Added \u2713" : "Compare"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card p-6 mt-6 rise-in">
        <div className="flex items-center justify-between mb-4">
          <p className="f-display text-lg txt-ink">More matches</p>
          <button onClick={() => setView("database")} className="text-xs font-semibold txt-canopy flex items-center gap-1">Browse full database <ChevronRight size={13} /></button>
        </div>
        <div className="flex flex-col divide-y divide-stone">
          {rest.map((m, i) => {
            const Icon = CATEGORY_ICON[m.category] || Box;
            return (
              <div key={m.id} className="flex items-center justify-between py-3 gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="f-mono text-xs txt-muted w-5">{i + 4}</span>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-canopy-100 shrink-0"><Icon size={14} className="txt-canopy" /></div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold txt-ink truncate">{m.name}</p>
                    <p className="text-xs txt-muted">{m.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="f-mono text-sm font-bold" style={{ color: scoreColor(m.matchScore) }}>{m.matchScore}</span>
                  <button onClick={() => openDetail(m.id)} className="btn-ghost text-xs px-3 py-1.5 border border-stone">Details</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card p-6 mt-6 rise-in">
        <p className="f-display text-lg txt-ink mb-3 flex items-center gap-2"><Info size={16} className="txt-moss" />How this recommendation was calculated</p>
        <p className="text-sm txt-soft mb-4">Each material's match score is a weighted average of six factors, normalised to your selected priorities:</p>
        <div className="grid sm:grid-cols-3 gap-3">
          {WEIGHT_KEYS.map(w => (
            <div key={w.key} className="border border-stone rounded-xl p-3 flex items-center justify-between">
              <span className="text-xs txt-ink flex items-center gap-1.5"><w.icon size={13} className="txt-moss" />{w.label}</span>
              <span className="f-mono text-xs font-bold txt-canopy">{Math.round(normalizeWeights(result.weights)[w.key])}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================== COMPARE ============================== */
function Compare({ compareList, setCompareList, openDetail }) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const materials = compareList.map(id => MATERIALS.find(m => m.id === id)).filter(Boolean);
  const params = [
    { key: "cost", label: "Cost" }, { key: "durability", label: "Durability" },
    { key: "thermal", label: "Thermal Performance" }, { key: "carbon", label: "Carbon Footprint" },
    { key: "environmental", label: "Environmental Impact" }, { key: "sustainability", label: "Sustainability Score" },
  ];
  const bestFor = (key) => {
    if (materials.length === 0) return null;
    return materials.reduce((a, b) => (b[key] > a[key] ? b : a)).id;
  };

  const radarData = params.map(p => {
    const row = { metric: p.label.replace(" Performance", "").replace(" Footprint", "").replace(" Impact", "").replace(" Score", "") };
    materials.forEach(m => { row[m.name] = m[p.key]; });
    return row;
  });
  const colors = ["#163832", "#7DAE5A", "#C98A3D", "#B5573F"];

  const verdict = useMemo(() => {
    if (materials.length < 2) return null;
    const best = [...materials].sort((a, b) => (b.sustainability + b.thermal + b.cost) - (a.sustainability + a.thermal + a.cost))[0];
    return `${best.name} provides the best overall balance across the factors you're comparing \u2014 leading on sustainability (${best.sustainability}/100) while remaining competitive on cost and thermal performance.`;
  }, [materials]);

  return (
    <div className="px-5 lg:px-8 pb-16 fade-in">
      <div className="flex items-center justify-between mt-2 flex-wrap gap-3">
        <div>
          <h1 className="f-display text-2xl lg:text-3xl txt-ink">Compare Materials</h1>
          <p className="text-sm txt-muted mt-1">Select up to 4 materials to compare side by side.</p>
        </div>
        <button onClick={() => setPickerOpen(true)} className="btn-primary px-5 py-2.5 text-sm flex items-center gap-2"><Plus size={15} />Add Material</button>
      </div>

      {materials.length === 0 ? (
        <EmptyState icon={GitCompare} title="Nothing to compare yet" text="Add materials from the picker or from the Database / Recommendations pages." cta="Add Material" onClick={() => setPickerOpen(true)} />
      ) : (
        <>
          <div className="flex flex-wrap gap-2 mt-6">
            {materials.map(m => (
              <div key={m.id} className="flex items-center gap-2 pl-3 pr-1.5 py-1.5 rounded-full border border-stone bg-card">
                <span className="text-xs font-semibold txt-ink">{m.name}</span>
                <button onClick={() => setCompareList(compareList.filter(id => id !== m.id))} className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-stone"><X size={12} /></button>
              </div>
            ))}
          </div>

          <div className="card p-4 lg:p-6 mt-5 overflow-x-auto scrollbar-thin rise-in">
            <table className="w-full min-w-[560px]">
              <thead>
                <tr>
                  <th className="text-left text-xs font-semibold txt-muted pb-3 pr-4">Parameter</th>
                  {materials.map((m, i) => (
                    <th key={m.id} className="text-left text-xs font-bold pb-3 px-3" style={{ color: colors[i] }}>{m.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {params.map(p => {
                  const best = bestFor(p.key);
                  return (
                    <tr key={p.key} className="divider">
                      <td className="text-xs font-medium txt-soft py-3 pr-4">{p.label}</td>
                      {materials.map(m => (
                        <td key={m.id} className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 max-w-[90px]">
                              <div className="w-full h-1.5 rounded-full" style={{ background: "var(--stone)" }}>
                                <div className="h-1.5 rounded-full" style={{ width: `${m[p.key]}%`, background: scoreColor(m[p.key]) }} />
                              </div>
                            </div>
                            <span className={`f-mono text-xs ${m.id === best ? "font-bold" : ""}`} style={{ color: m.id === best ? "var(--moss)" : "var(--ink)" }}>{m[p.key]}{m.id === best && <Award size={11} className="inline ml-1 mb-0.5" />}</span>
                          </div>
                        </td>
                      ))}
                    </tr>
                  );
                })}
                <tr>
                  <td className="text-xs font-medium txt-soft py-3 pr-4">Lifespan</td>
                  {materials.map(m => <td key={m.id} className="py-3 px-3 f-mono text-xs txt-ink">{m.lifespan} yrs</td>)}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid lg:grid-cols-2 gap-5 mt-5">
            <div className="card p-6 rise-in">
              <p className="f-display text-base txt-ink mb-4">Performance radar</p>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="var(--stone)" />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: "var(--ink-soft)" }} />
                  <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
                  {materials.map((m, i) => <Radar key={m.id} name={m.name} dataKey={m.name} stroke={colors[i]} fill={colors[i]} fillOpacity={0.15} strokeWidth={2} />)}
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="card p-6 rise-in">
              <p className="f-display text-base txt-ink mb-4">Carbon footprint & cost comparison</p>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={materials.map(m => ({ name: m.name.length > 12 ? m.name.slice(0, 12) + "\u2026" : m.name, Carbon: m.carbon, Cost: m.cost }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--stone)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "var(--stone-600)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "var(--stone-600)" }} axisLine={false} tickLine={false} />
                  <RTooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--stone)" }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="Carbon" fill="var(--leaf)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="Cost" fill="var(--ochre)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {verdict && (
            <div className="card p-6 mt-5 rise-in" style={{ background: "var(--canopy-100)", borderColor: "#CFE0D3" }}>
              <p className="text-xs font-bold txt-canopy uppercase tracking-wide mb-2 flex items-center gap-1.5"><Sparkles size={13} />AI Verdict</p>
              <p className="text-sm txt-ink leading-relaxed">{verdict}</p>
            </div>
          )}
        </>
      )}

      {pickerOpen && <MaterialPicker onClose={() => setPickerOpen(false)} selected={compareList} onToggle={(id) => {
        if (compareList.includes(id)) setCompareList(compareList.filter(x => x !== id));
        else if (compareList.length < 4) setCompareList([...compareList, id]);
      }} openDetail={openDetail} />}
    </div>
  );
}

function MaterialPicker({ onClose, selected, onToggle }) {
  const [q, setQ] = useState("");
  const filtered = MATERIALS.filter(m => m.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6" style={{ background: "rgba(10,20,15,0.5)" }} onClick={onClose}>
      <div className="bg-card w-full sm:max-w-lg sm:rounded-3xl rounded-t-3xl p-6 max-h-[80vh] flex flex-col rise-in" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <p className="f-display text-lg txt-ink">Add materials to compare</p>
          <button onClick={onClose} className="btn-ghost p-1.5 rounded-lg"><X size={18} /></button>
        </div>
        <div className="relative mb-3">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 txt-muted" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search materials\u2026" className="input pl-9" />
        </div>
        <div className="overflow-y-auto scrollbar-thin flex flex-col gap-1.5">
          {filtered.map(m => {
            const on = selected.includes(m.id);
            const Icon = CATEGORY_ICON[m.category] || Box;
            return (
              <button key={m.id} onClick={() => onToggle(m.id)} disabled={!on && selected.length >= 4}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl border text-left disabled:opacity-40"
                style={{ borderColor: on ? "var(--canopy)" : "var(--stone)", background: on ? "var(--canopy-100)" : "transparent" }}>
                <span className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-canopy-100"><Icon size={13} className="txt-canopy" /></div>
                  <span className="text-sm font-medium txt-ink">{m.name}</span>
                </span>
                {on ? <Check size={16} className="txt-canopy" /> : <Plus size={16} className="txt-muted" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ============================== EMPTY STATE ============================== */
function EmptyState({ icon: Icon, title, text, cta, onClick }) {
  return (
    <div className="card p-12 mt-6 flex flex-col items-center text-center rise-in">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-canopy-100 mb-4"><Icon size={24} className="txt-canopy" /></div>
      <p className="f-display text-xl txt-ink mb-2">{title}</p>
      <p className="text-sm txt-muted max-w-sm mb-5">{text}</p>
      {cta && <button onClick={onClick} className="btn-primary px-6 py-2.5 text-sm">{cta}</button>}
    </div>
  );
}

/* ============================== DATABASE ============================== */
function MaterialDatabase({ openDetail, compareList, toggleCompare }) {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All");
  const [minSustain, setMinSustain] = useState(0);
  const [sortBy, setSortBy] = useState("sustainability");

  const filtered = useMemo(() => {
    let list = MATERIALS.filter(m =>
      m.name.toLowerCase().includes(q.toLowerCase()) &&
      (category === "All" || m.category === category) &&
      m.sustainability >= minSustain
    );
    list.sort((a, b) => sortBy === "cost" ? b.cost - a.cost : sortBy === "carbon" ? b.carbon - a.carbon : b.sustainability - a.sustainability);
    return list;
  }, [q, category, minSustain, sortBy]);

  return (
    <div className="px-5 lg:px-8 pb-16 fade-in">
      <div className="mt-2">
        <h1 className="f-display text-2xl lg:text-3xl txt-ink">Material Database</h1>
        <p className="text-sm txt-muted mt-1">{MATERIALS.length} sample materials \u2014 search, filter and compare.</p>
      </div>

      <div className="card p-4 mt-5 flex flex-col lg:flex-row gap-3 lg:items-center rise-in">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 txt-muted" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search materials\u2026" className="input pl-9" />
        </div>
        <select value={category} onChange={e => setCategory(e.target.value)} className="input lg:w-44"><Options list={CATEGORIES} /></select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="input lg:w-52">
          <option value="sustainability">Sort: Sustainability score</option>
          <option value="cost">Sort: Cost</option>
          <option value="carbon">Sort: Carbon footprint</option>
        </select>
        <div className="flex items-center gap-2 lg:w-56">
          <Filter size={14} className="txt-muted shrink-0" />
          <input type="range" min="0" max="100" value={minSustain} onChange={e => setMinSustain(Number(e.target.value))} className="slider w-full" />
          <span className="f-mono text-xs txt-muted w-8 shrink-0">{minSustain}+</span>
        </div>
      </div>

      <p className="text-xs txt-muted mt-4 mb-2">{filtered.length} results</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((m, i) => {
          const Icon = CATEGORY_ICON[m.category] || Box;
          const inCompare = compareList.includes(m.id);
          return (
            <div key={m.id} className="card card-hover p-5 rise-in flex flex-col" style={{ animationDelay: `${(i % 6) * 60}ms` }}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-canopy-100"><Icon size={18} className="txt-canopy" /></div>
                <ScoreRing value={m.sustainability} size={48} stroke={5} />
              </div>
              <p className="text-sm font-bold txt-ink">{m.name}</p>
              <p className="text-xs txt-muted mb-3">{m.category} \u2022 {m.price}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {m.sustainability >= 88 && <Badge tone="leaf" icon={Leaf}>Most Sustainable</Badge>}
                {m.cost >= 85 && <Badge tone="ochre" icon={DollarSign}>Best Value</Badge>}
                {m.thermal >= 90 && <Badge tone="canopy" icon={Thermometer}>Top Thermal</Badge>}
              </div>
              <div className="flex gap-2 mt-auto">
                <button onClick={() => openDetail(m.id)} className="btn-secondary flex-1 py-2 text-xs">View Details</button>
                <button onClick={() => toggleCompare(m.id)} className="btn-primary flex-1 py-2 text-xs">{inCompare ? "Added" : "Compare"}</button>
              </div>
            </div>
          );
        })}
      </div>
      {filtered.length === 0 && <EmptyState icon={Search} title="No materials found" text="Try adjusting your search or filters." />}
    </div>
  );
}
const Options = ({ list }) => list.map(c => <option key={c} value={c}>{c}</option>);

/* ============================== MATERIAL DETAIL MODAL ============================== */
function MaterialDetail({ id, onClose, toggleCompare, compareList }) {
  const m = MATERIALS.find(x => x.id === id);
  if (!m) return null;
  const Icon = CATEGORY_ICON[m.category] || Box;
  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center" style={{ background: "rgba(10,20,15,0.55)" }} onClick={onClose}>
      <div className="bg-paper w-full sm:max-w-2xl sm:rounded-3xl rounded-t-3xl max-h-[92vh] overflow-y-auto scrollbar-thin rise-in" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-paper z-10 flex items-center justify-between px-6 pt-5 pb-3 border-b border-stone">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-canopy-100"><Icon size={18} className="txt-canopy" /></div>
            <div>
              <p className="f-display text-lg txt-ink leading-tight">{m.name}</p>
              <p className="text-xs txt-muted">{m.category}</p>
            </div>
          </div>
          <button onClick={onClose} className="btn-ghost p-2 rounded-lg"><X size={18} /></button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-5 mb-6">
            <ScoreRing value={m.sustainability} size={92} stroke={9} label="Score" />
            <div className="flex-1">
              <p className="text-xs txt-muted mb-2">Sustainability Score: <span className="f-mono font-bold txt-ink">{m.sustainability}/100</span></p>
              <p className="text-sm txt-soft leading-relaxed">{m.description}</p>
            </div>
          </div>

          <Section title="Overview">
            <p className="text-sm txt-soft leading-relaxed">{m.description} Demo values shown throughout this profile are illustrative sample data.</p>
          </Section>

          <Section title="Performance">
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <MetricBar label="Durability" value={m.durability} icon={Award} />
              <MetricBar label="Thermal Performance" value={m.thermal} icon={Thermometer} />
            </div>
            <div className="grid sm:grid-cols-3 gap-3 text-xs">
              <InfoChip label="Compressive strength" value={m.compressiveStrength} />
              <InfoChip label="Thermal conductivity" value={m.thermalConductivity} />
              <InfoChip label="Fire resistance" value={m.fireResistance} />
            </div>
          </Section>

          <Section title="Environmental Impact">
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <MetricBar label="Environmental Impact" value={m.environmental} icon={Leaf} />
              <MetricBar label="Carbon Footprint" value={m.carbon} icon={Wind} />
            </div>
            <div className="grid sm:grid-cols-3 gap-3 text-xs">
              <InfoChip label="Recyclability" value={m.recyclability} />
              <InfoChip label="Energy consumption" value={m.energyConsumption} />
              <InfoChip label="Resource usage" value={m.resourceUsage} />
            </div>
          </Section>

          <Section title="Cost">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-ochre-soft"><DollarSign size={16} className="txt-ochre" /></div>
              <div>
                <p className="text-sm font-bold txt-ink">{m.price}</p>
                <p className="text-xs txt-muted">Estimated price range \u2014 sample data</p>
              </div>
            </div>
          </Section>

          <Section title="Advantages">
            <ul className="flex flex-col gap-2">{m.advantages.map((a, i) => <li key={i} className="text-sm txt-soft flex items-start gap-2"><CheckCircle2 size={15} className="txt-leaf mt-0.5 shrink-0" />{a}</li>)}</ul>
          </Section>

          <Section title="Limitations">
            <ul className="flex flex-col gap-2">{m.limitations.map((a, i) => <li key={i} className="text-sm txt-soft flex items-start gap-2"><AlertTriangle size={15} className="txt-clay mt-0.5 shrink-0" />{a}</li>)}</ul>
          </Section>

          <Section title="Best Applications" last>
            <div className="flex flex-wrap gap-2">{m.applications.map((a, i) => <Badge key={i} tone="canopy">{a}</Badge>)}</div>
          </Section>

          <div className="flex gap-2 mt-6">
            <button onClick={() => toggleCompare(m.id)} className="btn-primary flex-1 py-2.5 text-sm">{compareList.includes(m.id) ? "Added to compare \u2713" : "Add to Compare"}</button>
            <button onClick={onClose} className="btn-secondary flex-1 py-2.5 text-sm">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}
const Section = ({ title, children, last }) => (
  <div className={`${last ? "" : "mb-6 pb-6 border-b border-stone"}`}>
    <p className="text-xs font-bold txt-canopy uppercase tracking-wide mb-3">{title}</p>
    {children}
  </div>
);
const InfoChip = ({ label, value }) => (
  <div className="border border-stone rounded-xl p-2.5">
    <p className="txt-muted mb-0.5">{label}</p>
    <p className="txt-ink font-medium">{value}</p>
  </div>
);

/* ============================== SUSTAINABILITY DASHBOARD ============================== */
function Sustainability({ result, compareList }) {
  const chosen = compareList.length ? compareList.map(id => MATERIALS.find(m => m.id === id)).filter(Boolean) : MATERIALS.slice(0, 4);
  const avg = (key) => Math.round(chosen.reduce((s, m) => s + m[key], 0) / chosen.length);
  const overall = Math.round((avg("sustainability") + avg("carbon") + avg("environmental")) / 3);
  const conventional = { name: "Conventional mix", carbon: 32 };
  const carbonData = chosen.map(m => ({ name: m.name.length > 10 ? m.name.slice(0, 10) + "\u2026" : m.name, Selected: m.carbon, Conventional: conventional.carbon }));
  const radarData = [
    { metric: "Carbon", val: avg("carbon") }, { metric: "Environmental", val: avg("environmental") },
    { metric: "Sustainability", val: avg("sustainability") }, { metric: "Durability", val: avg("durability") },
    { metric: "Thermal", val: avg("thermal") },
  ];
  const co2Avoided = (chosen.reduce((s, m) => s + m.carbon, 0) / chosen.length / 100 * 25).toFixed(1);

  return (
    <div className="px-5 lg:px-8 pb-16 fade-in">
      <div className="mt-2">
        <h1 className="f-display text-2xl lg:text-3xl txt-ink">Sustainability Dashboard</h1>
        <p className="text-sm txt-muted mt-1">{compareList.length ? "Based on materials you're comparing." : "Showing sample materials \u2014 add materials to Compare to personalise this view."}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mt-6">
        <div className="card p-6 flex flex-col items-center justify-center rise-in">
          <p className="text-xs font-semibold txt-muted uppercase tracking-wide mb-3">Project Sustainability Score</p>
          <ScoreRing value={overall} size={140} stroke={13} label="/ 100" />
          <p className="text-xs txt-soft mt-4 text-center">Composite of carbon, environmental impact and overall sustainability across selected materials.</p>
        </div>
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          <MiniGauge label="Carbon Footprint" value={avg("carbon")} icon={Wind} />
          <MiniGauge label="Energy Efficiency" value={avg("thermal")} icon={Thermometer} />
          <MiniGauge label="Material Sustainability" value={avg("sustainability")} icon={Recycle} />
          <MiniGauge label="Resource Efficiency" value={avg("environmental")} icon={Leaf} />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mt-5">
        <div className="card p-6 rise-in">
          <p className="f-display text-base txt-ink mb-4">Carbon impact vs. conventional alternatives</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={carbonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--stone)" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: "var(--stone-600)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--stone-600)" }} axisLine={false} tickLine={false} />
              <RTooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--stone)" }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="Selected" fill="var(--leaf)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Conventional" fill="var(--stone-600)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card p-6 rise-in">
          <p className="f-display text-base txt-ink mb-4">Sustainability breakdown</p>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="var(--stone)" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: "var(--ink-soft)" }} />
              <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
              <Radar dataKey="val" stroke="var(--canopy)" fill="var(--leaf)" fillOpacity={0.35} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card p-6 mt-5 rise-in flex items-center gap-5" style={{ background: "var(--canopy-100)" }}>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-card shrink-0"><Wind size={24} className="txt-canopy" /></div>
        <div>
          <p className="f-display text-2xl txt-ink">{co2Avoided} tonnes CO\u2082</p>
          <p className="text-sm txt-soft">potentially avoided versus conventional material choices across this selection.</p>
        </div>
      </div>
    </div>
  );
}
const MiniGauge = ({ label, value, icon: Icon }) => (
  <div className="card p-5 flex items-center gap-4 rise-in">
    <ScoreRing value={value} size={64} stroke={6} />
    <div>
      <p className="text-xs txt-muted flex items-center gap-1.5 mb-0.5"><Icon size={12} />{label}</p>
      <p className="f-mono text-sm font-bold txt-ink">{value}/100</p>
    </div>
  </div>
);

/* ============================== REPORTS ============================== */
function Reports({ result, compareList }) {
  const materials = compareList.length ? compareList.map(id => MATERIALS.find(m => m.id === id)).filter(Boolean) : (result ? rankMaterials(result.weights).slice(0, 3) : []);
  const [generated, setGenerated] = useState(false);
  const avg = (key) => materials.length ? Math.round(materials.reduce((s, m) => s + m[key], 0) / materials.length) : 0;

  return (
    <div className="px-5 lg:px-8 pb-16 fade-in">
      <div className="flex items-center justify-between mt-2 flex-wrap gap-3">
        <div>
          <h1 className="f-display text-2xl lg:text-3xl txt-ink">Reports</h1>
          <p className="text-sm txt-muted mt-1">Generate a shareable project report from your analysis.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setGenerated(true)} className="btn-primary px-5 py-2.5 text-sm flex items-center gap-2"><FileText size={15} />Generate Report</button>
          <button disabled={!generated} className="btn-secondary px-4 py-2.5 text-sm flex items-center gap-2 disabled:opacity-40"><Download size={15} /></button>
          <button disabled={!generated} className="btn-secondary px-4 py-2.5 text-sm flex items-center gap-2 disabled:opacity-40"><Printer size={15} /></button>
        </div>
      </div>

      {materials.length === 0 ? (
        <EmptyState icon={FileText} title="Nothing to report yet" text="Run the Material Finder or add materials to Compare to build a report." />
      ) : !generated ? (
        <div className="card p-8 mt-6 flex flex-col items-center text-center rise-in">
          <FileText size={30} className="txt-muted mb-3" />
          <p className="text-sm txt-muted">Click "Generate Report" to build a preview using {materials.length} selected material{materials.length > 1 ? "s" : ""}.</p>
        </div>
      ) : (
        <div className="card p-7 lg:p-10 mt-6 rise-in" id="report-preview">
          <div className="flex items-center justify-between border-b border-stone pb-5 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-canopy"><Leaf size={15} color="#fff" /></div>
              <p className="f-display text-lg txt-ink">GreenBuild AI \u2014 Project Report</p>
            </div>
            <span className="text-xs txt-muted f-mono">{new Date().toLocaleDateString()}</span>
          </div>

          <Section title="Project Information">
            {result ? (
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <p><span className="txt-muted">Name:</span> <span className="txt-ink font-medium">{result.project.name || "Untitled Project"}</span></p>
                <p><span className="txt-muted">Type:</span> <span className="txt-ink font-medium">{result.project.buildingType}</span></p>
                <p><span className="txt-muted">Location:</span> <span className="txt-ink font-medium">{result.project.location || "\u2014"}</span></p>
                <p><span className="txt-muted">Budget:</span> <span className="txt-ink font-medium">{result.project.budget || "\u2014"}</span></p>
              </div>
            ) : <p className="text-sm txt-muted">No Material Finder session on record \u2014 showing selected comparison materials only.</p>}
          </Section>

          <Section title="Selected Materials">
            <div className="grid sm:grid-cols-3 gap-3">
              {materials.map(m => (
                <div key={m.id} className="border border-stone rounded-xl p-3 flex items-center gap-3">
                  <ScoreRing value={m.sustainability} size={44} stroke={5} />
                  <div><p className="text-sm font-semibold txt-ink">{m.name}</p><p className="text-xs txt-muted">{m.category}</p></div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="AI Recommendation">
            <p className="text-sm txt-soft leading-relaxed">{materials[0]?.name} emerges as the strongest overall performer in this set, with an average sustainability score of {avg("sustainability")}/100 across selected materials. Combined carbon-footprint performance averages {avg("carbon")}/100, meaningfully ahead of conventional baseline materials.</p>
          </Section>

          <Section title="Material Comparison">
            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full min-w-[480px] text-sm">
                <thead><tr className="text-xs txt-muted"><th className="text-left pb-2">Material</th><th className="text-left pb-2">Cost</th><th className="text-left pb-2">Durability</th><th className="text-left pb-2">Sustainability</th></tr></thead>
                <tbody>{materials.map(m => (
                  <tr key={m.id} className="divider"><td className="py-2 txt-ink font-medium">{m.name}</td><td className="py-2 f-mono">{m.cost}</td><td className="py-2 f-mono">{m.durability}</td><td className="py-2 f-mono">{m.sustainability}</td></tr>
                ))}</tbody>
              </table>
            </div>
          </Section>

          <Section title="Sustainability & Carbon Summary">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="border border-stone rounded-xl p-3"><p className="f-display text-xl txt-canopy">{avg("sustainability")}</p><p className="text-xs txt-muted">Avg Sustainability</p></div>
              <div className="border border-stone rounded-xl p-3"><p className="f-display text-xl txt-canopy">{avg("carbon")}</p><p className="text-xs txt-muted">Avg Carbon Score</p></div>
              <div className="border border-stone rounded-xl p-3"><p className="f-display text-xl txt-canopy">{avg("cost")}</p><p className="text-xs txt-muted">Avg Cost Score</p></div>
            </div>
          </Section>

          <Section title="Final Recommendation" last>
            <p className="text-sm txt-soft leading-relaxed">Based on the combined analysis, <span className="font-semibold txt-ink">{materials[0]?.name}</span> is recommended as the primary material choice, offering the best balance of cost, performance and environmental impact for this project profile. This report uses illustrative sample data for demonstration purposes.</p>
          </Section>
        </div>
      )}
    </div>
  );
}

/* ============================== SETTINGS ============================== */
function SettingsPage() {
  const rows = [
    { label: "Google Gemini API", status: "Not connected", desc: "Power live AI recommendations and the assistant chat." },
    { label: "Firebase", status: "Not connected", desc: "Persist projects, reports and user accounts." },
    { label: "Material Database", status: "Demo data active", desc: "Currently using 16 built-in sample materials." },
  ];
  return (
    <div className="px-5 lg:px-8 pb-16 fade-in max-w-2xl">
      <div className="mt-2 mb-6">
        <h1 className="f-display text-2xl lg:text-3xl txt-ink">Settings</h1>
        <p className="text-sm txt-muted mt-1">Manage integrations and preferences.</p>
      </div>
      <div className="flex flex-col gap-3">
        {rows.map(r => (
          <div key={r.label} className="card p-5 flex items-center justify-between rise-in">
            <div>
              <p className="text-sm font-semibold txt-ink">{r.label}</p>
              <p className="text-xs txt-muted mt-0.5">{r.desc}</p>
            </div>
            <Badge tone={r.status.includes("Not") ? "clay" : "leaf"}>{r.status}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================== AI ASSISTANT ============================== */
function mockAssistantReply(text) {
  const q = text.toLowerCase();
  if (q.includes("hot climate") || q.includes("thermal")) {
    const best = [...MATERIALS].sort((a, b) => b.thermal - a.thermal)[0];
    return `For hot climates, prioritise thermal performance. ${best.name} leads the database at ${best.thermal}/100 thermal performance, helping reduce cooling loads.`;
  }
  if (q.includes("lowest carbon") || q.includes("carbon footprint")) {
    const best = [...MATERIALS].sort((a, b) => b.carbon - a.carbon)[0];
    return `${best.name} has the strongest carbon performance in the database, scoring ${best.carbon}/100 \u2014 largely due to low processing energy and renewable sourcing.`;
  }
  if (q.includes("aac") && q.includes("clay")) {
    const a = MATERIALS.find(m => m.id === "aac-blocks"), b = MATERIALS.find(m => m.id === "clay-bricks");
    return `${a.name} outperforms ${b.name} on thermal performance (${a.thermal} vs ${b.thermal}) and sustainability (${a.sustainability} vs ${b.sustainability}), while ${b.name} offers higher raw durability (${b.durability} vs ${a.durability}) and a longer track record.`;
  }
  if (q.includes("low-budget") || q.includes("low budget") || q.includes("cheap")) {
    const best = [...MATERIALS].sort((a, b) => b.cost - a.cost)[0];
    return `For budget-conscious builds, ${best.name} scores highest on cost-effectiveness at ${best.cost}/100, while still maintaining a solid ${best.sustainability}/100 sustainability rating.`;
  }
  if (q.includes("improve") && q.includes("sustainab")) {
    return `To lift your project's sustainability score: favour materials scoring 85+ on environmental impact and carbon footprint (like Hempcrete or Bamboo), specify recycled-content options such as Recycled Steel or Recycled Concrete where structurally viable, and weight "Sustainability" and "Carbon Footprint" higher in the Material Finder.`;
  }
  return `Based on the material database, I'd recommend narrowing by climate, budget and required lifespan first \u2014 try the Material Finder for a full weighted analysis, or ask me things like "which material has the lowest carbon footprint?"`;
}

function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi, I'm the GreenBuild AI Assistant. Ask me about materials in the database \u2014 climate fit, carbon footprint, comparisons, or budget picks." },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);
  const suggestions = ["Which material is best for a hot climate?", "Which material has the lowest carbon footprint?", "Compare AAC blocks and clay bricks.", "Which material is best for a low-budget house?"];

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, open]);

  const send = (text) => {
    const t = (text ?? input).trim();
    if (!t) return;
    setMessages(m => [...m, { role: "user", text: t }]);
    setInput("");
    setTimeout(() => setMessages(m => [...m, { role: "ai", text: mockAssistantReply(t) }]), 600);
  };

  return (
    <>
      <button onClick={() => setOpen(o => !o)} className="fixed bottom-5 right-5 z-[80] w-14 h-14 rounded-full flex items-center justify-center shadow-lg" style={{ background: "var(--canopy)" }}>
        {open ? <X size={22} color="#fff" /> : <MessageCircle size={22} color="#fff" />}
      </button>
      {open && (
        <div className="fixed bottom-24 right-5 z-[80] w-[92vw] max-w-sm h-[65vh] max-h-[520px] card flex flex-col overflow-hidden rise-in" style={{ boxShadow: "0 20px 50px -20px rgba(10,20,15,0.4)" }}>
          <div className="px-4 py-3.5 flex items-center gap-2.5" style={{ background: "var(--canopy)" }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "var(--leaf)" }}><Sparkles size={15} style={{ color: "var(--canopy)" }} /></div>
            <div><p className="text-sm font-bold text-white leading-tight">GreenBuild AI Assistant</p><p className="text-[10px]" style={{ color: "#B9CFC0" }}>Answers from the material database</p></div>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-thin p-4 flex flex-col gap-3 bg-paper">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${m.role === "user" ? "self-end text-white" : "self-start bg-card border border-stone txt-ink"}`}
                style={m.role === "user" ? { background: "var(--canopy)", borderBottomRightRadius: 4 } : { borderBottomLeftRadius: 4 }}>
                {m.text}
              </div>
            ))}
            <div ref={endRef} />
          </div>
          {messages.length < 2 && (
            <div className="px-3 pb-2 flex flex-wrap gap-1.5">
              {suggestions.map(s => <button key={s} onClick={() => send(s)} className="text-[11px] px-2.5 py-1.5 rounded-full border border-stone txt-soft hover:bg-canopy-100">{s}</button>)}
            </div>
          )}
          <div className="p-3 border-t border-stone flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask about materials\u2026" className="input flex-1 text-sm" />
            <button onClick={() => send()} className="btn-primary w-10 h-10 rounded-full flex items-center justify-center shrink-0"><Send size={15} /></button>
          </div>
        </div>
      )}
    </>
  );
}

/* ============================== APP ROOT ============================== */
export default function GreenBuildAI() {
  const [view, setView] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [result, setResult] = useState(null);
  const [compareList, setCompareList] = useState([]);
  const [detailId, setDetailId] = useState(null);

  const toggleCompare = (id) => {
    setCompareList(list => list.includes(id) ? list.filter(x => x !== id) : (list.length < 4 ? [...list, id] : list));
  };
  const openDetail = (id) => setDetailId(id);

  const titles = {
    dashboard: [null, null],
    finder: ["Material Finder", "Tell us about your project and priorities."],
    recommendations: ["AI Recommendations", null],
    compare: [null, null],
    database: [null, null],
    sustainability: [null, null],
    reports: [null, null],
    settings: [null, null],
  };

  return (
    <div className="gba flex">
      <GlobalStyle />
      <style>{`.gba .input{ width:100%; padding:10px 14px; border-radius:12px; border:1px solid var(--stone); background:#fff; font-size:13.5px; color:var(--ink); font-family:var(--font-body); outline:none; transition:border-color .15s ease; } .gba .input:focus{ border-color:var(--canopy); }`}</style>
      <Sidebar view={view} setView={setView} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="flex-1 min-w-0">
        {view === "dashboard" && <><TopBar setMobileOpen={setMobileOpen} /><Dashboard setView={setView} /></>}
        {view === "finder" && <><TopBar setMobileOpen={setMobileOpen} title="Material Finder" subtitle="Tell us about your project and priorities." /><MaterialFinder onComplete={(r) => { setResult(r); setView("recommendations"); }} /></>}
        {view === "recommendations" && <><TopBar setMobileOpen={setMobileOpen} /><Recommendations result={result} setView={setView} toggleCompare={toggleCompare} compareList={compareList} openDetail={openDetail} /></>}
        {view === "compare" && <><TopBar setMobileOpen={setMobileOpen} /><Compare compareList={compareList} setCompareList={setCompareList} openDetail={openDetail} /></>}
        {view === "database" && <><TopBar setMobileOpen={setMobileOpen} /><MaterialDatabase openDetail={openDetail} compareList={compareList} toggleCompare={toggleCompare} /></>}
        {view === "sustainability" && <><TopBar setMobileOpen={setMobileOpen} /><Sustainability result={result} compareList={compareList} /></>}
        {view === "reports" && <><TopBar setMobileOpen={setMobileOpen} /><Reports result={result} compareList={compareList} /></>}
        {view === "settings" && <><TopBar setMobileOpen={setMobileOpen} /><SettingsPage /></>}
      </div>
      {detailId && <MaterialDetail id={detailId} onClose={() => setDetailId(null)} toggleCompare={toggleCompare} compareList={compareList} />}
      <AIAssistant />
    </div>
  );
}
