import Image from "next/image";
type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  fit?: "contain" | "cover";
  objectPosition?: string;
};
export function FittingGallery({
  photos,
  label,
  portrait = false,
  landscape = false,
}: {
  photos: Photo[];
  label: string;
  portrait?: boolean;
  landscape?: boolean;
}) {
  return (
    <div
      className={`discipline-gallery ${portrait ? "discipline-gallery-portrait" : ""} ${landscape ? "discipline-gallery-landscape" : ""} ${photos.length === 3 ? "discipline-gallery-three" : ""}`}
    >
      {photos.map((photo) => (
        <figure key={photo.src}>
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="(max-width: 760px) 100vw, 50vw"
            style={
              photo.fit
                ? { objectFit: photo.fit, objectPosition: photo.objectPosition }
                : undefined
            }
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
