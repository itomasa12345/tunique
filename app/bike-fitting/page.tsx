import Image from "next/image";
import Link from "next/link";
import {
  keirinPhotos,
  additionalKeirinPhotos,
  roadDetailPhoto,
  roadDetailPhotos,
  roadRidingPhotos,
  requestedKeirinPhoto,
} from "@/lib/photos";
import {
  roadPrinciples,
  keirinPrinciples,
  roadAdjustments,
  roadSteps,
  keirinSteps,
} from "@/lib/fitting";
import { PageHero, Label, CTA, ContactBand, FAQ, Steps } from "@/components/ui";
import { FittingGallery } from "@/components/fitting-gallery";
import { bikeFaq, metadata, site } from "@/lib/site";
export const generateMetadata = () =>
  metadata(
    "ロードバイク・競輪のバイクフィッティング",
    "ロードバイクは力みの少ない全身の動きと自転車のバランス。競輪は進みの軽さと競走での使いやすさを考える基準。それぞれの目的に合わせたフィッティングを紹介します。",
  );
function Principles({
  items,
}: {
  items: { label: string; title: string; text: string }[];
}) {
  return (
    <div className="principles">
      {items.map((item) => (
        <article key={item.label}>
          <span>{item.label}</span>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  );
}
export default function Bike() {
  return (
    <>
      <PageHero
        english="BIKE FITTING"
        number="01"
        title={
          <>
            身体と自転車に、
            <br />
            <span className="muted">あなたの基準を。</span>
          </>
        }
        text="ロードバイクと競輪。それぞれの目的と走り方に合わせて、身体の動きとご本人の感覚を確かめます。"
      />
      <nav className="wrap fitting-choices" aria-label="フィッティングの種類">
        <Link href="#road">
          <span className="eyebrow">01 / ROAD BIKE</span>
          <h2>
            ロードバイク <span aria-hidden="true">↓</span>
          </h2>
          <p>
            力みの少ない自然な動きと、
            <br />
            身体・自転車全体のバランスを。
          </p>
        </Link>
        <Link href="#keirin">
          <span className="eyebrow">02 / KEIRIN</span>
          <h2>
            競輪 <span aria-hidden="true">↓</span>
          </h2>
          <p>
            自転車の進みと踏みの軽さから、
            <br />
            選手自身が調整を判断する基準を。
          </p>
        </Link>
      </nav>
      <section
        id="road"
        className="wrap section discipline-section"
        aria-labelledby="road-heading"
      >
        <Label number="01">ROAD BIKE FITTING</Label>
        <h2 id="road-heading" className="discipline-heading">
          身体が自然に動く、
          <br />
          あなたのポジションへ。
        </h2>
        <div className="road-fitting-scene discipline-intro">
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
          <div className="prose">
            <p>
              速く走りたい方も、快適に走りたい方も。
              <br />
              目指す走りは、一人ひとり違います。
            </p>
            <p>
              TUNIQUEのロードバイクフィッティングでは、力みの少ない、自然に身体を動かせる位置を探します。
            </p>
            <p>
              数値だけを合わせるのではなく、身体の全身運動と自転車全体のバランスを見ながら、その人に合ったポジションを整えます。
            </p>
          </div>
        </div>
        <Principles items={roadPrinciples} />
        <div className="discipline-details">
          <Label>FITTING DETAILS / ROAD BIKE</Label>
          <h3>ひとつずつ、全体との関係を見ながら。</h3>
          <ul className="adjustment-tags">
            {roadAdjustments.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <FittingGallery
          photos={roadDetailPhotos}
          label="ROAD BIKE / DETAILS & DIALOGUE"
        />
        <div className="road-riding-scenes">
          <Label>ROAD BIKE / YOUR OWN RIDE</Label>
          <h3>走る楽しみも、目指す走りも。</h3>
          <p>
            速さを求める日も、自分のペースで楽しむ日も。
            <br />
            一人ひとりの目的に合わせて、ポジションを考えます。
          </p>
          <FittingGallery
            photos={roadRidingPhotos}
            label="ROAD BIKE / ON THE ROAD"
            landscape
          />
        </div>
        <div className="discipline-process">
          <Label>HOW IT WORKS / ROAD BIKE</Label>
          <h3>ロードバイクフィッティングの流れ</h3>
          <Steps items={roadSteps} />
        </div>
        <div className="discipline-action">
          <p>
            今のポジションを選ぶ理由を知ることが、
            <br />
            これからの走りを考える新しい基準になります。
          </p>
          <CTA href="/contact?type=bike">ロードバイクの相談</CTA>
        </div>
      </section>
      <section
        id="keirin"
        className="soft-section discipline-section"
        aria-labelledby="keirin-heading"
      >
        <div className="wrap section">
          <Label number="02">KEIRIN BIKE FITTING</Label>
          <h2 id="keirin-heading" className="discipline-heading">
            競輪のポジションに、
            <br />
            自分で判断するための基準を。
          </h2>
          <p className="discipline-lead">
            自転車の進み、踏みの軽さ、選手自身の感覚を大切に。
            <br />
            実際のペダリングを確認しながら、その選手に合う基準位置を探します。
          </p>
          <Principles items={keirinPrinciples} />
        </div>
        <div className="bike-banner bike-photo-banner keirin-banner">
          <Image
            src={additionalKeirinPhotos.trackCurve.src}
            alt={additionalKeirinPhotos.trackCurve.alt}
            fill
            sizes="100vw"
          />
          <div className="wrap">
            <span>KEIRIN / FROM FITTING TO RACING</span>
            <p>
              進みの軽さと、
              <br />
              競走での使いやすさ。
            </p>
            <small>基準から、自分に合うバランスへ。</small>
          </div>
        </div>
        <div className="wrap section">
          <div className="split">
            <Label>FROM STANDARD TO YOUR POSITION</Label>
            <div className="prose wide">
              <h3>基準位置が、競走での唯一の正解とは限りません。</h3>
              <p>
                脚が自然に落ち、自転車が軽く進む位置。その位置をそのまま使う選手も、自分で調整する選手もいます。
              </p>
              <p>
                高回転や限界まで踏み込む場面では、サドルを少し下げ、踏み心地が重くなっても、その方が使いやすい選手もいます。
              </p>
              <p>
                見つけた位置を基準に、練習や競走で確かめながら調整する。自転車の進みの良さと実戦での使いやすさ、そのバランスを自分で判断できることを大切にしています。
              </p>
            </div>
          </div>
          <FittingGallery
            photos={[
              keirinPhotos.blueBike,
              keirinPhotos.redBike,
              requestedKeirinPhoto,
            ]}
            label="KEIRIN / PEDALING & FEELING"
            portrait
          />
          <div className="discipline-process">
            <Label>HOW IT WORKS / KEIRIN</Label>
            <h3>基準をつくり、実戦で確かめる。</h3>
            <Steps items={keirinSteps} />
          </div>
          <div className="discipline-action">
            <p>
              迷ったときに、戻れる位置がある。
              <br />
              選手自身が判断し、調整するための指標を。
            </p>
            <CTA href="/contact?type=bike">競輪フィッティングの相談</CTA>
          </div>
        </div>
      </section>
      <section className="wrap section">
        <div className="section-heading">
          <Label>WAYS TO FIT</Label>
          <h2>
            あなたに合う方法で、
            <br />
            ご相談ください。
          </h2>
        </div>
        <div className="three-columns">
          <article>
            <h3>対面フィッティング</h3>
            <p>実際の動きと反応を確認し、対話を重ねながら調整します。</p>
          </article>
          <article>
            <h3>オンラインフィッティング</h3>
            <p>
              離れた場所からもご相談いただけます。相談内容や確認したい動きに合わせ、撮影方法などを個別にご案内します。
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
      <section
        className="wrap note-section"
        aria-labelledby="online-lesson-heading"
      >
        <div>
          <Label>ONLINE LESSON</Label>
          <h2 id="online-lesson-heading">オンラインレッスン</h2>
          <p>
            オンラインレッスンの詳細・お申し込みは、こちらからご確認いただけます。
          </p>
        </div>
        <a
          className="button"
          href={site.onlineLessonUrl}
          aria-label="オンラインレッスンはこちら（外部サイト・新しいタブで開きます）"
          target="_blank"
          rel="noopener noreferrer"
        >
          オンラインレッスンはこちら <span aria-hidden="true">↗</span>
        </a>
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
