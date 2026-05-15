import { useState } from "react";

type Faction = "HUMAN" | "SAFEGUARD" | "SILICON_LIFE" | "BUILDER" | "UNKNOWN" | "SAFEGUARD (PROVISIONAL)" | "HUMAN (SCIENTIST)";

interface Entity {
  id: string;
  name: string;
  faction: Faction;
  status: string;
  classification?: string;
  designation?: string;
  netTerminalGene: string;
  threatLevel: number;
  stats: { label: string; value: string }[];
  portrait: string;
  threatLevelRed?: boolean;
}

const entities: Entity[] = [
  {
    id: "ENT-001",
    name: "KILLY",
    faction: "HUMAN",
    status: "ALIVE",
    classification: "SUBJECT_K",
    designation: "Unknown — Sector 001",
    netTerminalGene: "CONFIRMED",
    threatLevel: 5,
    threatLevelRed: true,
    stats: [
      { label: "BODY COUNT", value: "10,000+" },
      { label: "GBE CHARGE", value: "INFINITE" },
      { label: "SECTORS TRAVERSED", value: "9,000+" },
      { label: "OBJECTIVE", value: "GENE RECOVERY" }
    ],
    portrait: "killy"
  },
  {
    id: "ENT-002",
    name: "CIBO",
    faction: "HUMAN (SCIENTIST)",
    status: "DECEASED/TRANSFERRED",
    designation: "Bio-Engineering",
    netTerminalGene: "NEGATIVE",
    threatLevel: 2,
    stats: [
      { label: "BODY TRANSFERS", value: "4+" },
      { label: "EXPERTISE", value: "GENE SYNTHESIS" },
      { label: "LAST VECTOR", value: "SILICON LIFE" },
      { label: "STATUS", value: "ABSORBED" }
    ],
    portrait: "cibo"
  },
  {
    id: "ENT-003",
    name: "SANAKAN",
    faction: "SAFEGUARD",
    status: "ACTIVE",
    designation: "Level 9 Safeguard / Exterminators Commander",
    netTerminalGene: "N/A — SAFEGUARD UNIT",
    threatLevel: 5,
    threatLevelRed: true,
    stats: [
      { label: "CLASS", value: "LEVEL 9" },
      { label: "PURGE COUNT", value: "CLASSIFIED" },
      { label: "ANOMALY RATIO", value: "94.7%" },
      { label: "DIRECTIVE", value: "EXTERMINATE" }
    ],
    portrait: "sanakan"
  },
  {
    id: "ENT-004",
    name: "DHOMOCHEVSKY",
    faction: "SAFEGUARD (PROVISIONAL)",
    status: "ACTIVE",
    designation: "Provisional Safeguard — Autonomous Unit",
    netTerminalGene: "N/A",
    threatLevel: 4,
    stats: [
      { label: "ALLIANCE", value: "CONDITIONAL" },
      { label: "COMBAT RATING", value: "A+" },
      { label: "SILICON KILLS", value: "2,400+" },
      { label: "LOYALTY", value: "SELF-DEFINED" }
    ],
    portrait: "dhomochevsky"
  },
  {
    id: "ENT-005",
    name: "IKO",
    faction: "SAFEGUARD (PROVISIONAL)",
    status: "ACTIVE",
    designation: "Dhomochevsky's Partner Unit",
    netTerminalGene: "N/A",
    threatLevel: 3,
    stats: [
      { label: "POWER RESERVE", value: "CRITICAL" },
      { label: "COMBAT ROLE", value: "SUPPORT" },
      { label: "BOND", value: "DHOMOCHEVSKY" },
      { label: "STATUS", value: "DETERIORATING" }
    ],
    portrait: "iko"
  },
  {
    id: "ENT-006",
    name: "SILICON LIFE (GENERIC)",
    faction: "SILICON_LIFE",
    status: "UNKNOWN",
    designation: "Biomechanical Artificial Lifeform",
    netTerminalGene: "SYNTHETIC ATTEMPT — FAILED",
    threatLevel: 3,
    stats: [
      { label: "GENE REPLICA", value: "UNSTABLE" },
      { label: "ORIGIN", value: "ARTIFICIAL" },
      { label: "SAFEGUARD REL", value: "HOSTILE" },
      { label: "PURGE STATUS", value: "ONGOING" }
    ],
    portrait: "silicon_generic"
  },
  {
    id: "ENT-007",
    name: "MENSAB",
    faction: "SILICON_LIFE",
    status: "KIA",
    designation: "Silicon Life Leader — Biomechanic Sovereign",
    netTerminalGene: "SYNTHETIC — FAILED",
    threatLevel: 4,
    stats: [
      { label: "FACTION ROLE", value: "LEADER" },
      { label: "PCELL BOND", value: "PRIMARY" },
      { label: "COMBAT STYLE", value: "BIOMECHANICAL" },
      { label: "FATE", value: "TERMINATED" }
    ],
    portrait: "mensab"
  },
  {
    id: "ENT-008",
    name: "BUILDER",
    faction: "BUILDER",
    status: "UNKNOWN",
    designation: "Megastructure Construction Entity",
    netTerminalGene: "N/A — NON-COMBATANT",
    threatLevel: 1,
    stats: [
      { label: "FUNCTION", value: "CONSTRUCTION" },
      { label: "DIRECTIVE", value: "BUILD" },
      { label: "SENTIENCE", value: "LIMITED" },
      { label: "SCALE", value: "MEGASTRUCTURE" }
    ],
    portrait: "builder"
  },
  {
    id: "ENT-009",
    name: "PCELL",
    faction: "SILICON_LIFE",
    status: "KIA",
    designation: "Silicon Life — Combat Unit, Mensab's Guardian",
    netTerminalGene: "SYNTHETIC — FAILED",
    threatLevel: 3,
    stats: [
      { label: "ROLE", value: "GUARDIAN" },
      { label: "BOND", value: "MENSAB" },
      { label: "COMBAT RATING", value: "B+" },
      { label: "FATE", value: "TERMINATED" }
    ],
    portrait: "pcell"
  }
];

const PixelPortrait = ({ type }: { type: string }) => {
  const commonClass = "w-20 h-20 bg-blame-charcoal grid grid-cols-[repeat(12,1fr)] grid-rows-[repeat(16,1fr)] p-[2px]";
  
  if (type === "killy") {
    return (
      <div className={commonClass} aria-hidden="true">
        <div className="col-start-6 col-span-2 row-start-2 row-span-2 bg-foreground opacity-80"></div>
        <div className="col-start-5 col-span-4 row-start-4 row-span-6 bg-foreground opacity-70"></div>
        <div className="col-start-9 col-span-3 row-start-6 row-span-4 bg-foreground opacity-50"></div>
        <div className="col-start-6 col-span-2 row-start-10 row-span-6 bg-foreground opacity-60"></div>
        <div className="col-start-3 col-span-2 row-start-4 row-span-8 bg-blame-charcoal-lighter"></div>
      </div>
    );
  }
  
  if (type === "cibo") {
    return (
      <div className={commonClass} aria-hidden="true">
        <div className="col-start-6 col-span-2 row-start-2 row-span-2 bg-foreground opacity-90"></div>
        <div className="col-start-4 col-span-6 row-start-4 row-span-8 bg-foreground opacity-40"></div>
        <div className="col-start-5 col-span-4 row-start-5 row-span-6 bg-foreground opacity-70"></div>
        <div className="col-start-5 col-span-1 row-start-12 row-span-4 bg-foreground opacity-60"></div>
        <div className="col-start-8 col-span-1 row-start-12 row-span-4 bg-foreground opacity-60"></div>
      </div>
    );
  }

  if (type === "sanakan") {
    return (
      <div className={commonClass} aria-hidden="true">
        <div className="col-start-5 col-span-4 row-start-2 row-span-2 bg-foreground opacity-90"></div>
        <div className="col-start-3 col-span-8 row-start-4 row-span-4 bg-foreground opacity-80"></div>
        <div className="col-start-4 col-span-6 row-start-8 row-span-4 bg-foreground opacity-70"></div>
        <div className="col-start-4 col-span-2 row-start-12 row-span-4 bg-foreground opacity-60"></div>
        <div className="col-start-8 col-span-2 row-start-12 row-span-4 bg-foreground opacity-60"></div>
      </div>
    );
  }

  if (type === "builder") {
    return (
      <div className={commonClass} aria-hidden="true">
        <div className="col-start-3 col-span-8 row-start-6 row-span-6 bg-foreground opacity-70"></div>
        <div className="col-start-2 col-span-10 row-start-8 row-span-2 bg-foreground opacity-80"></div>
        <div className="col-start-5 col-span-4 row-start-4 row-span-2 bg-foreground opacity-50"></div>
        <div className="col-start-4 col-span-6 row-start-12 row-span-3 bg-foreground opacity-40"></div>
      </div>
    );
  }

  // Default fallback
  return (
    <div className={commonClass} aria-hidden="true">
      <div className="col-start-5 col-span-4 row-start-4 row-span-8 bg-foreground opacity-60"></div>
      <div className="col-start-4 col-span-6 row-start-6 row-span-4 bg-foreground opacity-40"></div>
    </div>
  );
};

export default function EntityDatabase() {
  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  const filterOptions = ["ALL", "HUMAN", "SAFEGUARD", "SILICON_LIFE", "BUILDER", "UNKNOWN"];

  const filtered = activeFilter === "ALL" 
    ? entities 
    : entities.filter(e => {
        if (activeFilter === "SAFEGUARD" && e.faction.includes("SAFEGUARD")) return true;
        if (activeFilter === "HUMAN" && e.faction.includes("HUMAN")) return true;
        return e.faction === activeFilter;
      });

  return (
    <section id="entity" className="md:col-span-12 flex flex-col gap-6 mt-8">
      
      {/* HEADER BAR */}
      <div className="border-b border-border pb-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <h2 className="font-serif text-3xl md:text-4xl tracking-widest text-flicker">
          // ENTITY_DATABASE <span className="text-muted-foreground text-xl">— 生命体カタログ</span>
        </h2>
        <div className="flex gap-4 font-mono text-xs text-muted-foreground items-end">
          <div className="flex flex-col">
            <span>T-STAMP</span>
            <span className="text-foreground">8849.44.12</span>
          </div>
          <div className="flex flex-col">
            <span>ENTRIES</span>
            <span className="text-foreground border border-border px-2">{filtered.length.toString().padStart(3, '0')}</span>
          </div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-wrap gap-2 mb-2">
        {filterOptions.map(filter => (
          <button
            key={filter}
            data-testid={`button-filter-${filter}`}
            onClick={() => setActiveFilter(filter)}
            className={`font-mono text-xs px-3 py-1 border transition-colors duration-150 ${
              activeFilter === filter 
                ? 'border-foreground bg-blame-charcoal-light text-foreground' 
                : 'border-border text-muted-foreground hover:border-blame-charcoal-lighter hover:text-foreground'
            }`}
          >
            [{filter}]
          </button>
        ))}
      </div>

      {/* ENTITY CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(entity => {
          
          let geneColor = "text-muted-foreground";
          let geneDotColor = "bg-muted-foreground";
          if (entity.netTerminalGene.includes("CONFIRMED")) {
            geneColor = "text-blame-green";
            geneDotColor = "bg-blame-green";
          } else if (entity.netTerminalGene.includes("NEGATIVE") || entity.netTerminalGene.includes("FAILED")) {
            geneColor = "text-blame-red-bright";
            geneDotColor = "bg-blame-red-bright";
          }

          return (
            <div 
              key={entity.id}
              data-testid={`card-entity-${entity.id}`}
              className="border border-border bg-black/80 p-4 transition-colors duration-150 hover:border-foreground group relative overflow-hidden flex flex-col"
            >
              {/* Subtle hover background shift */}
              <div className="absolute inset-0 bg-blame-charcoal-light opacity-0 group-hover:opacity-10 transition-opacity duration-150 pointer-events-none"></div>

              {/* TOP BAR */}
              <div className="flex justify-between items-start mb-4 border-b border-dashed border-border pb-2">
                <span className="font-mono text-xs text-muted-foreground">{entity.id}</span>
                <div className="flex gap-2 text-[10px] font-mono">
                  <span className={`border px-1 ${entity.status === 'ALIVE' || entity.status === 'ACTIVE' ? 'border-blame-green text-blame-green' : entity.status === 'KIA' || entity.status.includes('DECEASED') ? 'border-blame-red-bright text-blame-red-bright' : 'border-border text-muted-foreground'}`}>
                    {entity.status}
                  </span>
                  <span className="border border-border px-1 text-muted-foreground">
                    {entity.faction}
                  </span>
                </div>
              </div>

              {/* MAIN INFO */}
              <div className="flex gap-4 mb-4">
                <div className="shrink-0 border border-border">
                  <PixelPortrait type={entity.portrait} />
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  <h3 className="font-serif text-2xl uppercase tracking-wider truncate">{entity.name}</h3>
                  <p className="font-mono text-[10px] text-muted-foreground truncate" title={entity.designation || entity.classification}>
                    {entity.designation || entity.classification}
                  </p>
                </div>
              </div>

              {/* STATS TABLE */}
              <div className="flex-grow flex flex-col gap-1 font-mono text-[10px] mb-4">
                {entity.stats.map((stat, i) => (
                  <div key={i} className="flex justify-between border-b border-border/50 pb-1">
                    <span className="text-muted-foreground">[{stat.label}]</span>
                    <span className="text-right truncate ml-2 max-w-[60%]">{stat.value}</span>
                  </div>
                ))}
              </div>

              {/* STATUS FOOTER */}
              <div className="mt-auto border-t border-dashed border-border pt-4 flex flex-col gap-2">
                
                <div className="flex justify-between items-center font-mono text-[10px]">
                  <span className="text-muted-foreground">GENE_STATUS:</span>
                  <div className="flex items-center gap-1" data-testid={`status-gene-${entity.id}`}>
                    <div className={`w-2 h-2 ${geneDotColor}`}></div>
                    <span className={geneColor}>{entity.netTerminalGene}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center font-mono text-[10px]">
                  <span className="text-muted-foreground">THREAT_LEVEL:</span>
                  <div className="flex gap-1 w-24">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-2 flex-1 border border-border ${
                          i < entity.threatLevel 
                            ? (entity.threatLevelRed ? 'bg-blame-red-bright border-blame-red-bright' : 'bg-foreground border-foreground') 
                            : 'bg-transparent'
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}