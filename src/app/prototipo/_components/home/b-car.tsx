/**
 * FE-09 — Desenho de linha de um SUV compacto, de perfil (frente para a
 * direita), em viewBox 1000 × 400. Traço em `currentColor`.
 */
export function CarLineDrawing({
  className,
  strokeWidth = 3,
  glassFill = "transparent",
}: {
  className?: string;
  strokeWidth?: number;
  glassFill?: string;
}) {
  const wheel = (cx: number) => (
    <g key={cx}>
      <circle cx={cx} cy={302} r={56} />
      <circle cx={cx} cy={302} r={37} />
      <circle cx={cx} cy={302} r={9} />
      {[0, 72, 144, 216, 288].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <line
            key={deg}
            x1={cx + 12 * Math.cos(rad)}
            y1={302 + 12 * Math.sin(rad)}
            x2={cx + 34 * Math.cos(rad)}
            y2={302 + 34 * Math.sin(rad)}
          />
        );
      })}
    </g>
  );

  return (
    <svg
      viewBox="0 0 1000 400"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Chão */}
      <line x1="40" y1="362" x2="960" y2="362" strokeOpacity="0.5" />

      {/* Carroceria */}
      <path d="M112,306 L100,236 Q97,182 112,150 L140,108 Q150,96 172,93 L520,84 Q586,82 620,98 L716,168 Q736,176 760,177 L880,186 Q918,190 930,214 L938,262 Q940,300 920,306 L842,306 A82,82 0 0 0 678,306 L332,306 A82,82 0 0 0 168,306 Z" />

      {/* Rack do teto */}
      <path d="M214,86 L568,78" />

      {/* Vidros */}
      <path d="M198,124 L262,121 L262,176 L201,178 Q192,151 198,124 Z" fill={glassFill} />
      <path d="M278,120 L430,113 L430,175 L278,177 Z" fill={glassFill} />
      <path d="M446,112 L520,104 Q566,104 596,114 L682,171 L446,174 Z" fill={glassFill} />

      {/* Portas, vinco e maçanetas */}
      <path d="M272,182 L272,236 Q300,246 318,262" />
      <path d="M438,180 L440,300" />
      <path d="M682,178 Q694,232 686,262" />
      <path d="M134,214 Q500,200 908,216" strokeOpacity="0.7" />
      <path d="M362,198 L392,197" strokeWidth={strokeWidth + 2} />
      <path d="M560,195 L590,194" strokeWidth={strokeWidth + 2} />

      {/* Retrovisor, farol e lanterna */}
      <path d="M638,160 L668,152 L674,172 L646,174 Z" />
      <path d="M866,191 L912,197 L922,215 L872,211 Z" fill={glassFill} />
      <path d="M104,152 L134,152 L126,192 L101,194 Z" fill={glassFill} />
      <path d="M884,262 L930,264" strokeOpacity="0.7" />

      {/* Rodas */}
      {wheel(250)}
      {wheel(760)}
    </svg>
  );
}
