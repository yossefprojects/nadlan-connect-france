export function FranceFlag({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="France"
    >
      <rect width="12" height="24" fill="#0055A4" />
      <rect x="12" width="12" height="24" fill="#ffffff" />
      <rect x="24" width="12" height="24" fill="#EF4135" />
    </svg>
  );
}
