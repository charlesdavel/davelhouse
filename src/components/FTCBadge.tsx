export default function FTCBadge({ compact }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-[10px] text-gray-400 leading-tight">
        As an Amazon Associate we earn from qualifying purchases.
      </p>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-center">
      <p className="text-xs text-gray-500">
        <span className="font-medium">Affiliate Disclosure:</span> As an Amazon Associate, The Essentialist earns from qualifying purchases. 
        We independently curate every product on this page — you never pay more, and we may earn a small commission if you buy through our links.
      </p>
    </div>
  );
}