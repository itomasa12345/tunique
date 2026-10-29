import { PageHero, Label, ContactBand, FAQ, Steps } from "@/components/ui";
import { lifeFaq, metadata } from "@/lib/site";
export const generateMetadata = () =>
  metadata(
    "ライフプラン相談",
    "将来のお金のことを、今の暮らしから考える。家計、住宅ローン、教育資金、老後資金などを整理し、自分に合った判断基準をつくるライフプラン相談。",
  );
const themes = [
  [
    "01",
    "家計の収支整理",
    "今の収入と支出を整理して、暮らしの全体像をつかむ。",
  ],
  [
    "02",
    "住宅購入・住宅ローン",
    "住まいへの希望と、無理のない資金計画を考える。",
  ],
  ["03", "教育資金", "家族の希望や時期に合わせて、必要な準備を整理する。"],
  ["04", "老後資金", "これからの暮らし方を出発点に、長い目で考える。"],
  [
    "05",
    "NISA・iDeCoなどの資産形成",
    "制度の基本や選択肢を知り、目的に合う考え方を整理する。",
  ],
  [
    "06",
    "万が一への備え",
    "現在の保障や金融資産を整理し、必要な備えを考える。",
  ],
  [
    "07",
    "目標に向けた資金計画",
    "やりたいことを、いつ、どう実現するか一緒に考える。",
  ],
];
export default function Life() {
  return (
    <>
      <PageHero
        english="LIFE PLANNING"
        number="02"
        title={
          <>
            将来のお金のことを、
            <br />
            <span className="muted">今の暮らしから考える。</span>
          </>
        }
        text="決めつけず、急がず。あなたの暮らしと、これからの希望を聞くところから。"
      />
      <section className="life-statement">
        <div className="wrap">
          <Label>YOUR LIFE. YOUR PACE.</Label>
          <h2>
            未来は、
            <br />
            ひとつに決めなくていい。
          </h2>
          <p>
            大切にしたいことが変われば、計画も変えていく。
            <br />
            そのときのあなたに合った選択を、一緒に考えます。
          </p>
          <div className="life-orbit orbit-one" aria-hidden="true" />
          <div className="life-orbit orbit-two" aria-hidden="true" />
        </div>
      </section>
      <section className="wrap section split">
        <div>
          <Label>WHERE TO START</Label>
          <h2>
            漠然とした不安を、
            <br />
            考えられる形に。
          </h2>
        </div>
        <div className="concerns">
          <p>
            住宅を買いたいけれど、
            <br />
            この先の家計は大丈夫だろうか。
          </p>
          <p>
            教育費と老後の準備。
            <br />
            何から始めればいいのだろう。
          </p>
          <p>
            資産形成について知りたいけれど、
            <br />
            自分に合う考え方がわからない。
          </p>
          <span className="small">
            相談内容がまとまっていなくても、大丈夫です。
          </span>
        </div>
      </section>
      <section className="soft-section">
        <div className="wrap section">
          <Label>OUR APPROACH</Label>
          <h2>
            答えを急ぐより、
            <br />
            判断できる土台を。
          </h2>
          <div className="three-columns">
            <article>
              <span className="eyebrow">01 / LISTEN</span>
              <h3>今の暮らしから聞く。</h3>
              <p>
                将来の生活を最初から細かく決めず、現在の家計や、これからやりたいことを整理します。
              </p>
            </article>
            <article>
              <span className="eyebrow">02 / UNDERSTAND</span>
              <h3>知識と選択肢を共有する。</h3>
              <p>
                状況を理解し、必要な知識や選択肢をわかりやすくお伝えすることを中心に考えます。
              </p>
            </article>
            <article>
              <span className="eyebrow">03 / REVISIT</span>
              <h3>変化に合わせて見直す。</h3>
              <p>
                家族構成、収入、働き方、金利、価値観。暮らしの変化に合わせて、計画も見直します。
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="wrap section">
        <Label>CONSULTATION THEMES</Label>
        <h2>相談できること</h2>
        <div className="themes">
          {themes.map(([n, title, text]) => (
            <article key={n}>
              <span>{n}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <p className="small">
          制度や金融資産については一般的な情報提供を基本とし、個別の対応範囲は事前に確認します。運用成果を保証するものではありません。
        </p>
      </section>
      <section className="wrap section">
        <Label>HOW IT WORKS</Label>
        <h2>相談の流れ</h2>
        <Steps
          items={[
            {
              title: "気になることを伝える",
              text: "今の悩みや、考えてみたいテーマをお聞かせください。",
            },
            {
              title: "暮らしを整理する",
              text: "家計や将来の希望を整理し、必要な情報を確認します。",
            },
            {
              title: "選択肢を考える",
              text: "知識を共有し、あなたが判断するための基準をつくります。",
            },
            {
              title: "変化に合わせて見直す",
              text: "ライフイベントや価値観の変化に応じて、計画を考え直します。",
            },
          ]}
        />
      </section>
      <section className="wrap section split">
        <div>
          <Label>QUESTIONS & ANSWERS</Label>
          <h2>よくある質問</h2>
        </div>
        <FAQ items={lifeFaq} />
      </section>
      <ContactBand
        title={
          <>
            まずは、
            <br />
            今のことから話そう。
          </>
        }
        href="/contact?type=life"
        label="ライフプランを相談する"
      />
    </>
  );
}
