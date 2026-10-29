import Link from "next/link";
export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "↗"}</span>;
}
export function CTA({
  href = "/contact",
  children = "相談する",
  light = false,
}: {
  href?: string;
  children?: React.ReactNode;
  light?: boolean;
}) {
  return (
    <Link className={`button ${light ? "button-light" : ""}`} href={href}>
      {children}
      <Arrow />
    </Link>
  );
}
export function Label({
  children,
  number,
}: {
  children: React.ReactNode;
  number?: string;
}) {
  return (
    <div className="eyebrow">
      {number && <span className="index">{number}</span>}
      {children}
    </div>
  );
}
export function PageHero({
  english,
  title,
  text,
  number,
}: {
  english: string;
  title: React.ReactNode;
  text: string;
  number: string;
}) {
  return (
    <section className="page-hero wrap">
      <Label number={number}>{english}</Label>
      <h1>{title}</h1>
      <p className="lead">{text}</p>
      <div className="hero-rule">
        <span>TUNIQUE / {english}</span>
        <span>SCROLL TO EXPLORE ↓</span>
      </div>
    </section>
  );
}
export function FAQ({ items }: { items: string[][] }) {
  return (
    <div className="faq-list">
      {items.map(([q, a], i) => (
        <details key={q}>
          <summary>
            <span className="faq-number">
              Q{String(i + 1).padStart(2, "0")}
            </span>
            {q}
            <span className="plus" aria-hidden="true" />
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
export function Steps({ items }: { items: { title: string; text: string }[] }) {
  return (
    <div className="steps">
      {items.map((item, i) => (
        <article key={item.title}>
          <span className="step-number">0{i + 1}</span>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  );
}
export function ContactBand({
  title = (
    <>
      あなたに合う答えを、
      <br />
      一緒に見つけよう。
    </>
  ),
  href = "/contact",
  label = "お問い合わせ",
}: {
  title?: React.ReactNode;
  href?: string;
  label?: string;
}) {
  return (
    <section className="contact-band">
      <div className="wrap">
        <Label>LET’S FIND YOUR OWN.</Label>
        <div className="contact-band-row">
          <h2>{title}</h2>
          <CTA href={href} light>
            {label}
          </CTA>
        </div>
        <p className="small">ご相談内容に合わせて、個別にご案内します。</p>
      </div>
    </section>
  );
}
export function WheelArt({ small = false }: { small?: boolean }) {
  return (
    <svg
      className={`wheel-art ${small ? "wheel-small" : ""}`}
      viewBox="0 0 1000 800"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="rim">
          <stop stopColor="#747474" />
          <stop offset=".7" stopColor="#282828" />
          <stop offset="1" stopColor="#8a8a8a" />
        </radialGradient>
        <linearGradient id="tube">
          <stop stopColor="#eee" />
          <stop offset=".4" stopColor="#555" />
          <stop offset=".7" stopColor="#aaa" />
          <stop offset="1" stopColor="#242424" />
        </linearGradient>
      </defs>
      <g transform="translate(135,-50) rotate(-18 500 400)">
        <circle cx="510" cy="450" r="322" stroke="#151515" strokeWidth="54" />
        <circle cx="510" cy="450" r="294" stroke="url(#rim)" strokeWidth="12" />
        <circle cx="510" cy="450" r="330" stroke="#343434" strokeWidth="2" />
        {Array.from({ length: 32 }, (_, i) => {
          const a = (i * Math.PI) / 16;
          return (
            <line
              key={i}
              x1={510 + Math.cos(a + 0.4) * 27}
              y1={450 + Math.sin(a + 0.4) * 27}
              x2={510 + Math.cos(a) * 285}
              y2={450 + Math.sin(a) * 285}
              stroke={i % 2 ? "#707070" : "#353535"}
              strokeWidth="1.3"
            />
          );
        })}
        <circle
          cx="510"
          cy="450"
          r="28"
          fill="#292929"
          stroke="#999"
          strokeWidth="3"
        />
        <circle cx="510" cy="450" r="8" fill="#b5b5b5" />
        <path d="M510 450 430 36 565 35 537 92 569 413Z" fill="url(#tube)" />
        <path d="M430 36 565 35" stroke="#d3d3d3" strokeWidth="3" />
        <path d="M523 117 559 393" stroke="#a8a8a8" strokeWidth="2" />
      </g>
      <path
        d="M42 626H975M796 82V738"
        stroke="#ffffff"
        strokeOpacity=".12"
        strokeDasharray="3 7"
      />
      <circle cx="796" cy="626" r="7" stroke="#aaa" />
      <path d="M782 626h28m-14-14v28" stroke="#aaa" />
    </svg>
  );
}
