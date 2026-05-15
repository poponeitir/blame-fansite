import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EntityDatabase from "../components/EntityDatabase";
import TransmissionLog from "../components/TransmissionLog";

const PixelIcon = ({ type }: { type: string }) => {
  const commonClass = "w-4 h-4 grid grid-cols-4 grid-rows-4 gap-0";
  
  if (type === "skull") {
    return (
      <div className={commonClass} aria-hidden="true">
        <div className="col-start-2 col-span-2 row-start-1 bg-foreground opacity-80"></div>
        <div className="col-start-1 col-span-4 row-start-2 bg-foreground opacity-80"></div>
        <div className="col-start-1 col-span-1 row-start-3 bg-foreground opacity-80"></div>
        <div className="col-start-4 col-span-1 row-start-3 bg-foreground opacity-80"></div>
        <div className="col-start-2 col-span-2 row-start-4 bg-foreground opacity-80"></div>
      </div>
    );
  }
  
  if (type === "eye") {
    return (
      <div className={commonClass} aria-hidden="true">
        <div className="col-start-2 col-span-2 row-start-2 bg-foreground opacity-80"></div>
        <div className="col-start-1 col-span-4 row-start-3 bg-foreground opacity-80"></div>
        <div className="col-start-2 col-span-2 row-start-4 bg-foreground opacity-80"></div>
      </div>
    );
  }
  
  if (type === "warning") {
    return (
      <div className={commonClass} aria-hidden="true">
        <div className="col-start-2 col-span-2 row-start-1 bg-blame-red-bright"></div>
        <div className="col-start-1 col-span-4 row-start-2 bg-blame-red-bright"></div>
        <div className="col-start-1 col-span-4 row-start-3 bg-blame-red-bright"></div>
      </div>
    );
  }
  
  if (type === "antenna") {
    return (
      <div className={commonClass} aria-hidden="true">
        <div className="col-start-2 col-span-2 row-start-1 bg-foreground opacity-80"></div>
        <div className="col-start-3 col-span-1 row-start-2 bg-foreground opacity-80"></div>
        <div className="col-start-3 col-span-1 row-start-3 bg-foreground opacity-80"></div>
        <div className="col-start-2 col-span-3 row-start-4 bg-foreground opacity-80"></div>
      </div>
    );
  }
  
  return (
    <div className={commonClass} aria-hidden="true">
      <div className="col-start-1 col-span-2 row-start-1 bg-foreground opacity-80"></div>
      <div className="col-start-1 col-span-4 row-start-2 bg-foreground opacity-80"></div>
      <div className="col-start-1 col-span-4 row-start-3 bg-foreground opacity-80"></div>
      <div className="col-start-1 col-span-4 row-start-4 bg-foreground opacity-80"></div>
    </div>
  );
};

export default function Home() {
  const [showWarning, setShowWarning] = useState(false);
  const [uptime, setUptime] = useState(0);
  const [geneLevel, setGeneLevel] = useState(9467079);

  useEffect(() => {
    const warningTimer = setTimeout(() => {
      setShowWarning(true);
    }, 2000);

    const uptimeTimer = setInterval(() => {
      setUptime(prev => prev + 1);
    }, 1000);
    
    const geneTimer = setInterval(() => {
      setGeneLevel(prev => prev + Math.floor(Math.random() * 10 - 5));
    }, 150);

    return () => {
      clearTimeout(warningTimer);
      clearInterval(uptimeTimer);
      clearInterval(geneTimer);
    };
  }, []);

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(4, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen text-foreground font-sans relative crt-flicker">
      <div className="bg-megastructure"></div>
      <div className="noise-overlay"></div>
      <div className="scanlines"></div>
      <div className="vignette"></div>

      <AnimatePresence>
        {showWarning && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <div className="border border-blame-red-bright bg-black p-6 max-w-md w-full shadow-[0_0_30px_rgba(255,17,17,0.3)]">
              <div className="flex items-center gap-4 mb-6 border-b border-blame-red-bright/30 pb-4">
                <PixelIcon type="warning" />
                <h2 className="text-blame-red-bright font-serif text-2xl tracking-widest text-flicker">SYSTEM ALERT</h2>
                <PixelIcon type="warning" />
              </div>
              <p className="text-blame-red-bright font-mono mb-2">ACCESS DENIED // UNAUTHORIZED ENTRY DETECTED</p>
              <p className="text-muted-foreground font-mono text-sm mb-8">SAFEGUARD PROTOCOL INITIATED. YOUR SECTOR HAS BEEN LOGGED.</p>
              <button 
                onClick={() => setShowWarning(false)}
                className="w-full border border-blame-red-bright text-blame-red-bright py-2 hover:bg-blame-red-bright hover:text-black transition-colors uppercase tracking-widest font-bold"
                data-testid="button-acknowledge-warning"
              >
                [ ACKNOWLEDGE ]
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
        
        {/* HEADER */}
        <header className="md:col-span-12 border border-border bg-black/60 backdrop-blur-md p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl font-serif tracking-tighter font-bold text-flicker flex items-center gap-4">
              BLAME! <span className="text-blame-charcoal-lighter">ブレム</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-1">SYSTEM ACCESS TERMINAL // 第00001電基木</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm border border-blame-charcoal p-2 bg-black">
            <div className="flex flex-col">
              <span className="text-muted-foreground text-[10px]">MEGASTRUCTURE SECTOR</span>
              <span className="text-flicker">UNKNOWN / UNCHARTED</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-[10px]">NET SPHERE STATUS</span>
              <span className="text-blame-red-bright">OFFLINE</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-[10px]">UPTIME [CYCLES]</span>
              <span className="text-blame-green">{formatUptime(uptime + 9999999)}</span>
            </div>
          </div>
        </header>

        {/* LEFT SIDEBAR */}
        <aside className="md:col-span-3 border border-border bg-black/60 backdrop-blur-md p-4 h-fit sticky top-8">
          <h2 className="font-serif text-lg border-b border-border pb-2 mb-4">/ COMMAND_ROOT</h2>
          <nav className="flex flex-col gap-2">
            {[
              { id: 'log', label: 'LOG_ENTRIES', icon: 'folder', active: true },
              { id: 'safeguard', label: 'SAFEGUARD_INTEL', icon: 'skull', active: false },
              { id: 'entity', label: 'ENTITY_DATABASE', icon: 'eye', active: false },
              { id: 'transmission', label: 'TRANSMISSION_LOG', icon: 'antenna', active: false },
              { id: 'alerts', label: 'SYSTEM_ALERTS', icon: 'warning', active: false }
            ].map(item => (
              <a 
                key={item.id} 
                href={`#${item.id}`}
                className={`flex items-center gap-3 p-2 border ${item.active ? 'border-foreground bg-blame-charcoal-light' : 'border-transparent hover:border-blame-charcoal-lighter'} transition-colors cursor-pointer group`}
                data-testid={`link-nav-${item.id}`}
              >
                <span className="opacity-50 group-hover:opacity-100 transition-opacity"><PixelIcon type={item.icon} /></span>
                <span className={item.active ? 'blinking-cursor' : ''}>/{item.label}</span>
              </a>
            ))}
          </nav>
          
          <div className="mt-8 pt-4 border-t border-border">
            <p className="text-[10px] text-muted-foreground mb-2">QUICK ACTIONS</p>
            <div className="grid grid-cols-2 gap-2">
              <button className="border border-border p-1 text-xs hover:bg-blame-charcoal-light text-left" data-testid="button-action-ping">PING_LOCAL</button>
              <button className="border border-border p-1 text-xs hover:bg-blame-charcoal-light text-left" data-testid="button-action-scan">SCAN_SECTOR</button>
            </div>
          </div>
        </aside>

        {/* MAIN FEED */}
        <main className="md:col-span-6 flex flex-col gap-6">
          
          {/* LOG ENTRY 1 */}
          <article className="border border-border bg-black/80 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blame-green opacity-50"></div>
            <div className="p-4 border-b border-border flex justify-between items-center bg-blame-charcoal/50">
              <span className="text-xs text-muted-foreground">T-STAMP: 8847.11.02</span>
              <span className="text-[10px] border border-blame-green text-blame-green px-1">ACTIVE</span>
            </div>
            <div className="p-6">
              <h3 className="font-serif text-2xl mb-4 uppercase tracking-wide">Descent into Sector 9</h3>
              <div className="w-full h-[2px] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjIiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiMzMzMiLz48L3N2Zz4=')] mb-4"></div>
              <p className="text-sm leading-relaxed mb-4">
                Gravity shifting. The elevator shaft extended far beyond optical range. Sensors indicate we dropped for approximately 400 hours before encountering the first structural anomaly. Concrete strata here is older, heavily corroded by silicon life interference.
              </p>
              <p className="text-sm leading-relaxed">
                Subject K. continues forward. No signs of Net Terminal Genes in the local populace. They barely remember what the sky was.
              </p>
            </div>
          </article>

          {/* LOG ENTRY 2 */}
          <article className="border border-border bg-black/80 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blame-red-bright opacity-80"></div>
            <div className="p-4 border-b border-border flex justify-between items-center bg-blame-charcoal/50">
              <span className="text-xs text-muted-foreground">T-STAMP: 8847.15.99</span>
              <span className="text-[10px] border border-blame-red-bright text-blame-red-bright px-1 text-flicker">CLASSIFIED</span>
            </div>
            <div className="p-6">
              <h3 className="font-serif text-2xl mb-4 uppercase tracking-wide text-blame-red-bright">Safeguard Encounter // Exterminator Class</h3>
              <div className="w-full h-[2px] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjIiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiNjYzAwMDAiLz48L3N2Zz4=')] mb-4"></div>
              <p className="text-sm leading-relaxed mb-4">
                Hostile contact. Five Exterminators materialized from the structural geometry. Unauthorized access triggered local defense protocols. 
              </p>
              <div className="bg-blame-charcoal-light p-3 border border-border my-4 font-mono text-xs">
                &gt; WEAPON DISCHARGE DETECTED<br/>
                &gt; GRAVITATIONAL BEAM EMITTER ACTIVATED<br/>
                &gt; STRUCTURAL DAMAGE: MASSIVE<br/>
                &gt; THREAT NULLIFIED
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                The recoil shattered three adjacent habitation blocks. Note to self: do not stand behind him when he fires.
              </p>
            </div>
          </article>

          {/* LOG ENTRY 3 */}
          <article className="border border-border bg-black/80 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-foreground opacity-30"></div>
            <div className="p-4 border-b border-border flex justify-between items-center bg-blame-charcoal/50">
              <span className="text-xs text-muted-foreground">T-STAMP: 8848.01.12</span>
              <span className="text-[10px] border border-foreground px-1">TERMINATED</span>
            </div>
            <div className="p-6">
              <h3 className="font-serif text-2xl mb-4 uppercase tracking-wide">Silicon Life Nest</h3>
              <div className="w-full h-[2px] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjIiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiMzMzMiLz48L3N2Zz4=')] mb-4"></div>
              <p className="text-sm leading-relaxed mb-4">
                Found remains of a Silicon Life cultivation center. The biomechanical structures were already decaying, likely purged by Safeguards decades ago. Recovered partial memory drives, highly corrupted.
              </p>
              <p className="text-sm leading-relaxed">
                They were trying to synthesize the gene. The failures are... grotesque. 
              </p>
            </div>
          </article>

          {/* LOG ENTRY 4 */}
          <article className="border border-border bg-black/80 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blame-green opacity-50"></div>
            <div className="p-4 border-b border-border flex justify-between items-center bg-blame-charcoal/50">
              <span className="text-xs text-muted-foreground">T-STAMP: 8849.33.07</span>
              <span className="text-[10px] border border-blame-green text-blame-green px-1">ACTIVE</span>
            </div>
            <div className="p-6">
              <h3 className="font-serif text-2xl mb-4 uppercase tracking-wide">Dhomochevsky & Iko</h3>
              <div className="w-full h-[2px] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjIiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiMzMzMiLz48L3N2Zz4=')] mb-4"></div>
              <p className="text-sm leading-relaxed mb-4">
                Temporary alliance established with provisional Safeguard units. Dhomochevsky maintains a perimeter against Silicon Life incursions. Iko's power reserves are critically low.
              </p>
              <p className="text-sm leading-relaxed">
                They are fighting a war they lost centuries ago. But they haven't stopped fighting.
              </p>
            </div>
          </article>

        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="md:col-span-3 flex flex-col gap-4">
          
          <div className="border border-border bg-black/60 backdrop-blur-md p-4">
            <h3 className="text-xs text-muted-foreground mb-2">GENE LEVEL READOUT</h3>
            <div className="text-xl font-mono mb-2 flex justify-between items-end">
              <span>LVL:</span>
              <span className="text-flicker">{geneLevel.toLocaleString()}</span>
            </div>
            <div className="w-full h-2 bg-blame-charcoal-light border border-border">
              <div className="h-full bg-foreground w-[2%]"></div>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 text-right">NET TERMINAL GENE PROBABILITY: &lt; 0.0001%</p>
          </div>

          <div className="border border-border bg-black/60 backdrop-blur-md p-4">
            <h3 className="text-xs text-muted-foreground mb-2">SAFEGUARD THREAT LEVEL</h3>
            <div className="flex gap-1 mt-2">
              <div className="h-4 flex-1 bg-blame-charcoal-lighter"></div>
              <div className="h-4 flex-1 bg-blame-charcoal-lighter"></div>
              <div className="h-4 flex-1 bg-blame-charcoal-lighter"></div>
              <div className="h-4 flex-1 bg-blame-red-dark text-flicker"></div>
              <div className="h-4 flex-1 border border-blame-red-bright/30"></div>
            </div>
            <p className="text-xs text-blame-red-bright mt-2 font-bold uppercase tracking-widest text-center text-flicker">Elevated</p>
          </div>

          <div className="border border-blame-red-dark bg-black/60 backdrop-blur-md p-4 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-8 h-8 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiM4YjAwMDAiLz48L3N2Zz4=')] opacity-20"></div>
             <h3 className="text-blame-red-bright font-serif text-lg mb-1 flex items-center gap-2">
               <PixelIcon type="warning" /> SYSTEM ALERT
             </h3>
             <p className="text-sm font-mono text-muted-foreground">CONNECTION SEVERED</p>
             <div className="mt-4 p-2 bg-blame-red-dark/20 border border-blame-red-dark text-blame-red-bright text-xs text-center text-flicker">
               ACCESS DENIED
             </div>
          </div>

          <div className="border border-border bg-black/60 backdrop-blur-md p-4">
            <h3 className="text-xs text-muted-foreground mb-4">SECTORS TRAVERSED</h3>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({length: 16}).map((_, i) => (
                <div key={i} className={`h-8 border border-border flex items-center justify-center text-[10px] ${i < 7 ? 'bg-blame-charcoal-light text-muted-foreground' : 'text-blame-charcoal-lighter'}`}>
                  {i < 7 ? i.toString(16).padStart(4, '0').toUpperCase() : '----'}
                </div>
              ))}
            </div>
          </div>
          
        </aside>

        {/* ENTITY DATABASE SECTION */}
        <EntityDatabase />

        {/* TRANSMISSION LOG SECTION */}
        <TransmissionLog />

        {/* FOOTER */}
        <footer className="md:col-span-12 border-t border-border mt-8 pt-4 pb-12 flex justify-between items-end text-xs text-muted-foreground bg-black/40 p-4">
          <div className="flex flex-col gap-1">
            <span>OS VER: 9.9.4.0-OMEGA</span>
            <span>BUILD: TOA_HEAVY_INDUSTRIES</span>
          </div>
          <div className="flex flex-col gap-1 text-right">
            <span>COORDS: X:448 Y:009 Z:-881</span>
            <span className="text-blame-red-bright text-flicker mt-2">CONNECTION TERMINATED</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
