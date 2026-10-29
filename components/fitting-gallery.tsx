import Image from "next/image";
type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
};
export function FittingGallery({
  photos,
  label,
  portrait = false,
}: {
  photos: Photo[];
  label: string;
  portrait?: boolean;
}) {
  return (
    <div
      className={`discipline-gallery ${portrait ? "discipline-gallery-portrait" : ""}`}
    >
      {photos.map((photo) => (
        <figure key={photo.src}>
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="(max-width: 760px) 100vw, 50vw"
          />
          <figcaption>
            <span>{label}</span>
            {photo.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
