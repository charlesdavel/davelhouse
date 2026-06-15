export default function FTCBadge({ compact }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-[10px] text-espresso-light/60 leading-tight tracking-wider uppercase font-sans">
        As an Amazon Associate we earn from qualifying purchases.
      </p>
    );
  }

  return (
    <div className="border border-rose bg-cream-50 px-5 py-3 text-center">
      <p className="text-xs text-espresso-light/70 leading-relaxed font-sans">
        <span className="font-medium text-espresso uppercase tracking-wider text-[10px]">Affiliate Disclosure:</span><br />
        As an Amazon Associate, The Essentialist earns from qualifying purchases. 
        We independently curate every product — you never pay more, and we may earn a small commission if you buy through our links.
      </p>
    </div>
  );
}