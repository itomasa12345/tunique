import { LifeConceptImage } from "@/components/life-concept-image";
import Image from "next/image";
import { roadFittingPhoto, homeHeroPhoto, profilePhoto } from "@/lib/photos";
import Link from "next/link";
import { CTA, Label, ContactBand } from "@/components/ui";
import { metadata } from "@/lib/site";
export const generateMetadata = () =>
  metadata(
    "TUNE YOUR UNIQUE",
    "あなたらしさに、チューニングを。元プロロードレース選手・伊藤雅和によるバイクフィッティングとライフプラン相談。",
    "/",
  );
export default function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="hero-copy">
          <Label>FIND YOUR OWN STANDARD.</Label>
          <h1>
            TUNE YOUR
            <br />
            <span className="outline-text">UNIQUE.</span>
          </h1>
          <div className="hero-caption">
            <span className="short-line" />
            <p>
              あなたらしさに、
              <br />
              チューニングを。
            </p>
          </div>
          <div className="hero-links">
            <Link href="/bike-fitting">
              BIKE FITTING <span>↗</span>
            </Link>
            <Link href="/life-planning">
              LIFE PLANNING <span>↗</span>
            </Link>
          </div>
        </div>
        <div className="hero-visual has-photo">
          <Image
            className="hero-photo"
            src={homeHeroPhoto.src}
            alt={homeHeroPhoto.alt}
            fill
            sizes="(max-width: 760px) 100vw, 50vw"
            preload
          />
          <div className="visual-top">
            <span>01 / THE ART OF FITTING</span>
            <span>+ YOUR OWN STANDARD</span>
          </div>
          <div className="visual-bottom">
            <span>
              EVERY DETAIL.
              <br />
              YOUR DIFFERENCE.
            </span>
            <span className="visual-photo-message">
              YOUR
              <br />
              FIT.
            </span>
          </div>
          <span className="art-label">FITTING SCENE / ROAD BIKE</span>
        </div>
        <div className="home-hero-bottom">
          <span>BIKE FITTING & LIFE PLANNING</span>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>
      </section>
      <section className="concept wrap section">
        <Label number="01">OUR PHILOSOPHY</Label>
        <div className="concept-body">
          <h2>
            誰かの正解より、
            <br />
            <span className="muted">あなたの基準を。</span>
          </h2>
          <div className="prose">
            <p>
              身体の使い方も、お金の使い方も、
              <br />
              一人ひとり違うから。
            </p>
            <p>
              決まった答えを当てはめるのではなく、
              <br />
              今のあなたを知ることから始めたい。
            </p>
            <p>
              TUNIQUEは、対話と小さな調整を重ねて、
              <br />
              あなたが納得できる選択を支えます。
            </p>
          </div>
        </div>
      </section>
      <section className="services wrap section">
        <div className="section-heading">
          <Label number="02">WHAT WE DO</Label>
          <p>あなたの「これから」に、ふたつの専門性。</p>
        </div>
        <Link href="/bike-fitting" className="service-card bike-card">
          <div className="service-card-art real-photo road-photo">
            <Image
              src={roadFittingPhoto.src}
              alt={roadFittingPhoto.alt}
              fill
              sizes="(max-width: 760px) 100vw, 50vw"
            />
            <span className="image-caption">
              BIKE FITTING / ATTENTION TO DETAIL
            </span>
          </div>
          <div className="service-card-copy">
            <div className="service-card-top">
              <span>SERVICE 01</span>
              <span className="circle-arrow">↗</span>
            </div>
            <h2>
              BIKE
              <br />
              FITTING
            </h2>
            <h3>もっと自然に、もっと自分らしく。</h3>
            <p>
              ロードバイクと競輪。
              <br />
              それぞれの目的に合わせたフィッティング。
            </p>
            <span className="text-link">
              バイクフィッティングを知る <span>↗</span>
            </span>
          </div>
        </Link>
        <nav className="home-fitting-links" aria-label="フィッティングを選ぶ">
          <Link href="/bike-fitting#road">
            <span>ROAD BIKE</span>
            <p>
              自然な全身の動きと、
              <br />
              自転車全体のバランスを。
            </p>
            <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/bike-fitting#keirin">
            <span>KEIRIN</span>
            <p>
              進みの軽さと実戦での使いやすさを、
              <br />
              自分で判断するための基準に。
            </p>
            <span aria-hidden="true">↗</span>
          </Link>
        </nav>
        <Link href="/life-planning" className="service-card life-card">
          <div className="service-card-copy">
            <div className="service-card-top">
              <span>SERVICE 02</span>
              <span className="circle-arrow">↗</span>
            </div>
            <h2>
              LIFE
              <br />
              PLANNING
            </h2>
            <h3>将来のお金のことを、今の暮らしから。</h3>
            <p>
              暮らしも、目標も、あなたのペースで。
              <br />
              これからを考える判断基準を、一緒につくる。
            </p>
            <span className="text-link">
              ライフプラン相談を知る <span>↗</span>
            </span>
          </div>
          <LifeConceptImage scene="documents" className="life-service-photo" />
        </Link>
      </section>
      <section className="about-preview wrap section">
        <div>
          <Label number="03">THE PERSON BEHIND</Label>
          <div className="profile-photo profile-photo-preview">
            <Image
              src={profilePhoto.src}
              alt={profilePhoto.alt}
              fill
              sizes="(max-width: 760px) 100vw, 50vw"
            />
          </div>
        </div>
        <div className="about-preview-copy">
          <span className="eyebrow">FOUNDER / TUNIQUE</span>
          <h2>
            違いを知ることが、
            <br />
            始まりになる。
          </h2>
          <p className="name-jp">
            伊藤 雅和 <span>Masakazu Ito</span>
          </p>
          <p>
            約12年間、国内外のプロチームで活動した元ロードレース選手。競技生活で実感した、一人ひとりの感覚の違い。その経験を原点に、相手の状況を理解し、ともに考えることを大切にしています。
          </p>
          <CTA href="/about">プロフィールを見る</CTA>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
