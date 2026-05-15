import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MESSAGES = [
  "EXTERMINATOR UNIT DELTA-7 — DEVIATION DETECTED IN SECTOR 9. INITIATING PURGE PROTOCOL.",
  "NET TERMINAL GENE SIGNATURE DETECTED — PROBABILITY: 0.0001% — CONFIRM AND PURSUE.",
  "SILICON LIFE INCURSION — BIOMASS GROWTH EXCEEDS THRESHOLD — NEUTRALIZATION AUTHORIZED.",
  "UNIT K. LOCATION UNCONFIRMED — GRAVITATIONAL ANOMALY LOGGED AT COORDINATES X:448 Y:009.",
  "CIBO VECTOR CONTAMINATION CONFIRMED — SILICON LIFE ABSORPTION — CLASSIFICATION: HOSTILE.",
  "DHOMOCHEVSKY UNIT OPERATING OUTSIDE DEFINED PARAMETERS — PROVISIONAL STATUS REVOKED.",
  "LEVEL 9 CLEARANCE BREACH — UNAUTHORIZED BIOLOGICAL PRESENT — ENGAGE LETHAL PROTOCOLS.",
  "BUILDER ARRAY OFFLINE — MEGASTRUCTURE GROWTH SUSPENDED — SECTOR 00-THROUGH-07 STATIC.",
  "NETSPHERE SIGNAL DEGRADED — NODE CORRUPTION SPREADING — ESTIMATED TOTAL FAILURE: IMMINENT.",
  "PCELL UNIT DESTROYED — MENSAB DIRECTIVE INCOMPLETE — MISSION STATUS: ABANDONED.",
  "RECURSIVE CONSTRUCTION LOOP DETECTED — BUILDER UNITS MALFUNCTION — EVACUATE SECTOR.",
  "NET SPHERE CONTROL AUTHORITY SIGNAL LOST — DURATION: 847 YEARS — STATUS: CRITICAL.",
  "SAFEGUARD ACTIVATION THRESHOLD EXCEEDED — FULL DEPLOYMENT AUTHORIZED — ALL SECTORS.",
  "ANOMALOUS HUMAN — NO NET TERMINAL GENE — CONTINUES TO SURVIVE — PRIORITY TARGET.",
  "IKO POWER RESERVES: 2.1% — COMBAT CAPABILITY: NEGLIGIBLE — WITHDRAWAL ADVISED.",
  "SILICON LIFE ABSORPTION OF HUMAN BIOLOGICAL MATTER — GENE REPLICATION ATTEMPT — FAILED.",
  "STRUCTURAL INTEGRITY: SECTORS 4000-4200 AT 12% — COLLAPSE PROBABILITY: HIGH.",
  "KILLY COMBAT LOG — 12 EXTERMINATOR UNITS DESTROYED — GBE DISCHARGE × 1 — COLLATERAL: CATASTROPHIC.",
  "MEGASTRUCTURE POPULATION: UNKNOWN — CENSUS LAST UPDATED: 3,200 YEARS AGO.",
  "ALL SYSTEMS NOMINAL. ALL SECTORS SECURE. ALL HUMANS ACCOUNTED FOR. [DATA CORRUPTED]"
];

const STATUS_BADGES = ["INTERCEPT", "DECODED", "CORRUPTED", "CLASSIFIED"];
const CHARSET = "#$%&@!?|/\\[]{}~^*";

interface LogEntry {
  id: string;
  timestamp: string;
  status: string;
  originalText: string;
  scrambledText: string;
}

const generateTimestamp = () => {
  const xx = Math.floor(Math.random() * 99).toString().padStart(2, '0');
  const yy = Math.floor(Math.random() * 99).toString().padStart(2, '0');
  return `CYC:8849.${xx}.${yy}`;
};

const scrambleText = (text: string) => {
  return text.split('').map(char => {
    if (char === ' ') return ' ';
    return CHARSET[Math.floor(Math.random() * CHARSET.length)];
  }).join('');
};

const partiallyGarble = (text: string) => {
  return text.split('').map(char => {
    if (char === ' ') return ' ';
    return Math.random() > 0.8 ? CHARSET[Math.floor(Math.random() * CHARSET.length)] : char;
  }).join('');
};

const MessageRow = ({ entry }: { entry: LogEntry }) => {
  const [decoded, setDecoded] = useState(false);
  const [displayText, setDisplayText] = useState(entry.scrambledText);

  useEffect(() => {
    let scrambleInterval: NodeJS.Timeout;
    
    if (!decoded) {
      scrambleInterval = setInterval(() => {
        setDisplayText(scrambleText(entry.originalText));
      }, 50);

      const timeout = setTimeout(() => {
        clearInterval(scrambleInterval);
        setDecoded(true);
        if (entry.status === "CORRUPTED") {
          setDisplayText(partiallyGarble(entry.originalText));
        } else {
          setDisplayText(entry.originalText);
        }
      }, 1500);

      return () => {
        clearInterval(scrambleInterval);
        clearTimeout(timeout);
      };
    }
  }, [decoded, entry]);

  let statusColor = "text-muted-foreground border-border";
  if (entry.status === "DECODED" && decoded) statusColor = "text-blame-green border-blame-green";
  if (entry.status === "CLASSIFIED" && decoded) statusColor = "text-blame-red-bright border-blame-red-bright";
  if (entry.status === "CORRUPTED" && decoded) statusColor = "text-blame-red-dark border-blame-red-dark";

  let textColor = "text-foreground";
  if (!decoded) textColor = "text-muted-foreground";
  else if (entry.status === "CORRUPTED") textColor = "text-blame-red-bright/60";

  return (
    <motion.div 
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-start gap-2 py-1 border-b border-border/30 last:border-0 text-xs md:text-sm"
    >
      <span className="text-muted-foreground shrink-0 w-[120px]">[{entry.timestamp}]</span>
      <span className={`border px-1 text-[10px] shrink-0 w-[70px] text-center ${statusColor}`}>
        {entry.status}
      </span>
      <span className={`${textColor} font-mono break-words`}>
        {displayText}
      </span>
    </motion.div>
  );
};

export default function TransmissionLog() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [totalIntercepts, setTotalIntercepts] = useState(0);

  useEffect(() => {
    const addLog = () => {
      const text = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
      const newEntry: LogEntry = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: generateTimestamp(),
        status: STATUS_BADGES[Math.floor(Math.random() * STATUS_BADGES.length)],
        originalText: text,
        scrambledText: scrambleText(text)
      };
      
      setLogs(prev => [newEntry, ...prev].slice(0, 20));
      setTotalIntercepts(prev => prev + 1);
    };

    // Initial pop
    addLog();
    addLog();

    const interval = setInterval(addLog, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="transmission" className="md:col-span-12 flex flex-col gap-6 mt-8" data-testid="section-transmission">
      
      {/* HEADER BAR */}
      <div className="border border-border bg-black/60 backdrop-blur-md p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="font-serif text-3xl md:text-4xl tracking-widest text-flicker flex items-center gap-4">
          // TRANSMISSION_LOG <span className="text-muted-foreground text-xl">— 傍受信号 [INTERCEPTED]</span>
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border border-border px-3 py-1 bg-black">
            <div className="w-2 h-2 bg-blame-green animate-pulse rounded-none"></div>
            <span className="text-blame-green font-mono text-xs">LIVE</span>
          </div>
          <div className="flex flex-col font-mono text-xs text-muted-foreground text-right">
            <span>MESSAGES</span>
            <span className="text-foreground border border-border px-2 text-center">{totalIntercepts.toString().padStart(5, '0')}</span>
          </div>
          <button 
            data-testid="button-clear-feed"
            onClick={() => setLogs([])}
            className="border border-border px-3 py-1 text-xs font-mono hover:bg-blame-charcoal-light hover:text-foreground text-muted-foreground transition-colors"
          >
            [CLEAR LOG]
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT FEED */}
        <div className="lg:col-span-8 border border-border bg-black/80 p-4 h-[400px] overflow-hidden flex flex-col" data-testid="feed-transmission">
          <div className="border-b border-dashed border-border pb-2 mb-2 flex justify-between text-[10px] text-muted-foreground font-mono">
            <span>TIMESTAMP</span>
            <span>STATUS</span>
            <span className="flex-1 ml-2">PAYLOAD_DATA</span>
          </div>
          <div className="overflow-y-auto flex-1 pr-2">
            <AnimatePresence initial={false}>
              {logs.map((log) => (
                <MessageRow key={log.id} entry={log} />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT METADATA PANEL */}
        <div className="lg:col-span-4 border border-border bg-black/80 p-4 flex flex-col gap-4 font-mono text-xs">
          <h3 className="text-muted-foreground border-b border-border pb-2 mb-2">SIGNAL METADATA</h3>
          
          <div className="flex flex-col gap-2">
            {[
              { label: "SIGNAL ORIGIN", value: "UNKNOWN" },
              { label: "FREQUENCY", value: "9.44 GHz" },
              { label: "ENCRYPTION TYPE", value: "LEVEL-9 SAFEGUARD" },
              { label: "DECODE SUCCESS RATE", value: "67.3%" },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-end">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="flex-1 border-b border-dotted border-border mx-2 relative top-[-4px] opacity-50"></span>
                <span className="text-foreground text-right">{item.value}</span>
              </div>
            ))}
            
            <div className="flex justify-between items-end mt-2">
              <span className="text-muted-foreground">SIGNAL STRENGTH</span>
              <span className="flex-1 border-b border-dotted border-border mx-2 relative top-[-4px] opacity-50"></span>
              <span className="text-blame-green">████░░░░ 47%</span>
            </div>

            <div className="mt-4 pt-4 border-t border-border border-dashed flex flex-col gap-2">
              {[
                { label: "SAFEGUARD UNITS ACTIVE", value: "4,891,204" },
                { label: "NET SPHERE NODES ONLINE", value: "0 / 10,000" },
                { label: "LAST KNOWN ORIGIN", value: "SECTOR 3,999" },
                { label: "TRANSMISSION AGE", value: "~847 YEARS" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-end">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="flex-1 border-b border-dotted border-border mx-2 relative top-[-4px] opacity-50"></span>
                  <span className="text-foreground text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-auto border border-blame-red-dark bg-blame-red-dark/10 p-2 text-[10px] text-blame-red-bright flex items-center justify-center text-center text-flicker">
            WARNING: PROLONGED EXPOSURE MAY RESULT IN LOGICAL INFECTION
          </div>
        </div>

      </div>
    </section>
  );
}
