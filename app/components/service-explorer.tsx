'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

type StageLink = { id: string; name: string; hint: string };

export function ServiceExplorer({ stages, children }: { stages: StageLink[]; children: ReactNode[] }) {
  // Every panel is delivered and visible without JavaScript. Enhancement only changes visibility.
  const [active, setActive] = useState<number | null>(null);
  const links = useRef<(HTMLAnchorElement | null)[]>([]);
  useEffect(() => {
    let frame = 0;
    const sync = () => {
      let hash = location.hash.slice(1);
      try { hash = decodeURIComponent(hash); } catch { /* Ignore malformed fragments. */ }
      const index = stages.findIndex(stage => `phase-${stage.id}` === hash);
      setActive(index >= 0 ? index : 0);
      cancelAnimationFrame(frame);
      if (hash) frame = requestAnimationFrame(() => {
        const target = document.getElementById(hash);
        const scope = target?.closest('details');
        if (scope) scope.open = true;
        if (index >= 0 || scope) target?.scrollIntoView({ block: 'start' });
      });
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('hashchange', sync); };
  }, [stages]);

  const select = (index: number, focus = false) => {
    setActive(index);
    history.replaceState(null, '', `#phase-${stages[index].id}`);
    if (focus) links.current[index]?.focus({ preventScroll: true });
  };
  const enhanced = active !== null;
  return <>
    <nav className="phase-tabs" role={enhanced ? 'tablist' : undefined} aria-label="Service areas" style={{ '--stage-count': stages.length } as CSSProperties}>
      {stages.map((stage, index) => <a key={stage.id} id={`phase-tab-${stage.id}`} href={`#phase-${stage.id}`} ref={element => { links.current[index] = element; }} className="phase-tab"
        role={enhanced ? 'tab' : undefined} aria-controls={enhanced ? `phase-${stage.id}` : undefined} aria-selected={enhanced ? index === active : undefined} tabIndex={enhanced && index !== active ? -1 : 0}
        onClick={event => { if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return; event.preventDefault(); select(index); }}
        onKeyDown={event => {
          const target: Record<string, number> = { ArrowRight: (index + 1) % stages.length, ArrowLeft: (index + stages.length - 1) % stages.length, Home: 0, End: stages.length - 1 };
          if (target[event.key] !== undefined) { event.preventDefault(); select(target[event.key], true); }
        }}>
        <span className="phase-dot">{String(index + 1).padStart(2, '0')}</span><span className="phase-name">{stage.name}</span><span className="phase-hint">{stage.hint}</span>
      </a>)}
    </nav>
    {stages.map((stage, index) => <section key={stage.id} className="phase-panel" id={`phase-${stage.id}`} role={enhanced ? 'tabpanel' : undefined} aria-labelledby={enhanced ? `phase-tab-${stage.id}` : `phase-heading-${stage.id}`} tabIndex={enhanced ? 0 : undefined} hidden={enhanced && index !== active}>{children[index]}</section>)}
    <div className="phase-footer" hidden={!enhanced}><p aria-live="polite">{String((active ?? 0) + 1).padStart(2, '0')} / {String(stages.length).padStart(2, '0')} — {stages[active ?? 0].hint}</p><button type="button" onClick={() => select(((active ?? 0) + 1) % stages.length, true)}>{active === stages.length - 1 ? `Back to ${stages[0].name} ↺` : `Next: ${stages[(active ?? 0) + 1].name} →`}</button></div>
  </>;
}
