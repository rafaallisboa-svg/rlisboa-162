/**
 * O "0" do 404: o anel da IDV em amarelo, com o ponto laranja da marca
 * orbitando em volta, como quem perdeu o endereço. Sem JS; a órbita para
 * para quem prefere menos movimento.
 */
export function Anel404({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={className}>
      <path
        fill="var(--color-idv-amarelo)"
        fillRule="evenodd"
        d="M100 18a82 82 0 1 0 0.001 0ZM100 60a40 40 0 1 1 -0.001 0Z"
      />
      <g
        className="animate-[spin_7s_linear_infinite] motion-reduce:animate-none"
        style={{ transformOrigin: "100px 100px" }}
      >
        <circle cx="100" cy="6" r="9" fill="var(--color-idv-laranja)" />
      </g>
    </svg>
  );
}
