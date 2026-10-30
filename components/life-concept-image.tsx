import Image from "next/image";

const descriptions = {
  documents:
    "暮らしと家計を整理するイメージ：資料やノート、ペンを並べた明るい机",
  plant:
    "これからの暮らしを考えるイメージ：柔らかな光が入る窓辺の鉢植えとノート",
};

// One generated diptych, displayed through either half without modifying pixels.
export function LifeConceptImage({
  scene,
  className = "",
}: {
  scene: keyof typeof descriptions;
  className?: string;
}) {
  return (
    <div className={`life-concept life-concept-${scene} ${className}`}>
      <Image
        src="/images/life-planning/planning-concepts.png"
        alt={descriptions[scene]}
        width={1774}
        height={887}
        sizes="(max-width: 760px) 200vw, 100vw"
      />
    </div>
  );
}
