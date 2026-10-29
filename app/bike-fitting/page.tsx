import Image from "next/image";
import {
  keirinPhotos,
  additionalKeirinPhotos,
  roadDetailPhoto,
  roadGalleryPhotos,
  roadDetailPhotos,
} from "@/lib/photos";
import { PageHero, Label, CTA, ContactBand, FAQ, Steps } from "@/components/ui";
import { bikeFaq, metadata } from "@/lib/site";
export const generateMetadata = () =>
  metadata(
    "バイクフィッティング",
    "ロードバイク・競輪・一般サイクリストに対応。対面、オンライン、全国出張で、身体の動きと踏み心地を確認し、戻れる基準をつくるフィッティング。",
  );
const adjustments = [
  "サドルの高さ",
  "サドルの前後位置",
  "サン（クリート）の位置",
  "左右の脚の入り方",
  "身体の動きと踏み心地",
  "自転車の進み方",
];
export default function Bike() {
  return (
    <>
      <PageHero
        english="BIKE FITTING"
        number="01"
        title={
          <>
            感覚を研ぎ澄ます。
            <br />
            <span className="muted">自分の基準が見えてくる。</span>
          </>
        }
        text="自然に、軽く進む。その感覚を出発点に、あなたに合ったポジションを探します。"
      />
      <section className="bike-banner bike-photo-banner">
        <Image
          src={additionalKeirinPhotos.trackCurve.src}
          alt={additionalKeirinPhotos.trackCurve.alt}
          fill
          sizes="100vw"
        />
        <div className="wrap">
          <span>PRECISION MEETS FEELING.</span>
          <p>
            数字の先にある、
            <br />
            あなたの感覚へ。
          </p>
          <small>KEIRIN / ON THE TRACK</small>
        </div>
      </section>
      <section className="wrap section split">
        <Label>OUR APPROACH</Label>
        <div className="prose wide">
          <h2>
            小さな調整。
            <br />
            大切なのは、納得できること。
          </h2>
          <p>
            サドルやクリートを0.5mm単位で調整することもあります。でも、細かく調整すること自体が目的ではありません。
          </p>
          <p>
            変化を自分で感じ、納得できる位置を見つけること。身体の動きと、自転車の進み方を確かめながら、一緒に基準をつくります。
          </p>
        </div>
      </section>
      <section className="wrap section">
        <Label>THREE PRINCIPLES</Label>
        <div className="principles">
          <article>
            <span>01 / FEEL</span>
            <h3>軽さだけで、決めない。</h3>
            <p>
              軽く進む位置が、競走で最も使いやすい位置とは限りません。競輪では固定ギアでの高回転や最大出力時の踏み心地も考慮。練習や競走で確かめながら、適切なバランスを探します。
            </p>
          </article>
          <article>
            <span>02 / STANDARD</span>
            <h3>いつでも戻れる基準を。</h3>
            <p>
              一度調整して終わりではありません。うまくいかなかったときに戻れる基準をつくり、その後も自分自身で判断できることを大切にします。
            </p>
          </article>
          <article>
            <span>03 / BALANCE</span>
            <h3>左右の動きに、目を向ける。</h3>
            <p>
              左右の脚ができるだけ同じ位置から踏める状態を探します。身体の使いやすさや、違和感・張りの左右差も確認します。
            </p>
          </article>
        </div>
      </section>
      <section className="soft-section">
        <div className="wrap section split">
          <div>
            <Label>FITTING DETAILS</Label>
            <h2>
              身体と自転車の、
              <br />
              接点を整える。
            </h2>
          </div>
          <ol className="detail-list">
            {adjustments.map((a, i) => (
              <li key={a}>
                <span>0{i + 1}</span>
                {a}
                <span aria-hidden="true">＋</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="wrap section">
        <div className="section-heading">
          <Label>FOR EVERY RIDER</Label>
          <h2>
            競技も、楽しみ方も。
            <br />
            あなたに合わせて。
          </h2>
        </div>
        <div className="audience">
          <span>
            ROAD BIKE<small>ロードバイク</small>
          </span>
          <span>
            KEIRIN<small>競輪選手</small>
          </span>
          <span>
            CYCLING<small>一般サイクリスト</small>
          </span>
        </div>
        <div className="three-columns">
          <article>
            <h3>対面フィッティング</h3>
            <p>実際の動きと反応を確認し、対話を重ねながら調整します。</p>
          </article>
          <article>
            <h3>オンラインフィッティング</h3>
            <p>
              離れた場所からも相談できる方法です。撮影などの準備は個別にご案内します。
            </p>
          </article>
          <article>
            <h3>全国出張フィッティング</h3>
            <p>
              ご希望の地域での実施をご相談いただけます。会場や人数、日程をお知らせください。
            </p>
          </article>
        </div>
      </section>
      <section className="wrap section road-fitting-scene">
        <figure>
          <Image
            src={roadDetailPhoto.src}
            alt={roadDetailPhoto.alt}
            width={roadDetailPhoto.width}
            height={roadDetailPhoto.height}
            sizes="(max-width: 760px) 100vw, 60vw"
          />
          <figcaption>{roadDetailPhoto.caption}</figcaption>
        </figure>
        <div>
          <Label>ROAD BIKE / FITTING SCENE</Label>
          <h2>
            細部を整え、
            <br />
            感覚を確かめる。
          </h2>
          <p>
            ロードバイクでも、競輪自転車でも。
            <br />
            大切なのは、乗る人に合っていること。
          </p>
          <p>
            自転車との接点を見直しながら、
            <br />
            身体の動きと、使いやすさを確かめます。
          </p>
        </div>
      </section>
      <section className="wrap road-gallery-section">
        <div className="section-heading">
          <Label>ROAD BIKE / DETAILS & DIALOGUE</Label>
          <p>接点を確かめ、動きを見て、感覚を聞く。</p>
        </div>
        <div className="fitting-gallery road-gallery">
          {roadGalleryPhotos.map((photo, i) => (
            <figure key={photo.src}>
              <div className="fitting-photo-frame">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(max-width: 760px) 100vw, 33vw"
                />
              </div>
              <figcaption>
                <span>0{i + 1} / ROAD BIKE FITTING</span>
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="fitting-gallery road-detail-gallery">
          {roadDetailPhotos.map((photo) => (
            <figure key={photo.src}>
              <div className="fitting-photo-frame">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(max-width: 760px) 100vw, 50vw"
                />
              </div>
              <figcaption>
                <span>ROAD BIKE / A CLOSER LOOK</span>
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section className="soft-section">
        <div className="wrap section">
          <div className="section-heading">
            <Label>KEIRIN / FITTING SCENES</Label>
            <div>
              <h2>
                実際の動きから、
                <br />
                見えてくること。
              </h2>
              <p className="fitting-gallery-intro">
                競輪自転車での乗車姿勢を、横から確認。
                <br />
                身体の動きと踏み心地を、一緒に確かめていきます。
              </p>
            </div>
          </div>
          <div className="fitting-gallery">
            {[
              keirinPhotos.blueBike,
              keirinPhotos.redBike,
              additionalKeirinPhotos.whiteJersey,
              additionalKeirinPhotos.shortSleeve,
            ].map((photo, i) => (
              <figure key={photo.src}>
                <div className="fitting-photo-frame">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes="(max-width: 760px) 100vw, 50vw"
                  />
                </div>
                <figcaption>
                  <span>0{i + 1} / KEIRIN FITTING</span>
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <section className="wrap section">
        <Label>HOW IT WORKS</Label>
        <h2>フィッティングの流れ</h2>
        <Steps
          items={[
            {
              title: "相談する",
              text: "乗り方や悩み、ご希望の実施方法をお聞かせください。",
            },
            {
              title: "今の状態を知る",
              text: "現在のポジションと身体の動き、踏み心地を確認します。",
            },
            {
              title: "調整し、確かめる",
              text: "小さな調整を重ね、感覚の変化を一緒に確かめます。",
            },
            {
              title: "自分の基準にする",
              text: "戻れる位置を共有し、練習や実走での判断につなげます。",
            },
          ]}
        />
      </section>
      <section className="wrap section split">
        <div>
          <Label>QUESTIONS & ANSWERS</Label>
          <h2>よくある質問</h2>
        </div>
        <FAQ items={bikeFaq} />
      </section>
      <section className="wrap note-section">
        <p>
          ※フィッティングは医療行為ではなく、痛みや身体の不調の改善を保証するものではありません。
        </p>
        <CTA href="/contact?type=travel">全国出張を相談する</CTA>
      </section>
      <ContactBand
        title={
          <>
            あなたの走りを、
            <br />
            ここから整える。
          </>
        }
        href="/contact?type=bike"
        label="予約・相談する"
      />
    </>
  );
}
