import Image from "next/image";
import { profilePhoto } from "@/lib/photos";
import { PageHero, Label, ContactBand } from "@/components/ui";
import { metadata } from "@/lib/site";
export const generateMetadata = () =>
  metadata(
    "伊藤雅和について",
    "TUNIQUE代表・伊藤雅和のプロフィール。約12年間、国内外のプロロードレースチームで活動。一人ひとりの違いを理解し、その人に合う方法をともに考えます。",
  );
export default function About() {
  return (
    <>
      <PageHero
        english="ABOUT TUNIQUE"
        number="03"
        title={
          <>
            一人ひとりの違いに、
            <br />
            <span className="muted">向き合う。</span>
          </>
        }
        text="知ることから始めて、ともに考える。それがTUNIQUEの変わらない姿勢です。"
      />
      <section className="wrap section profile">
        <div className="profile-photo profile-photo-about">
          <Image
            src={profilePhoto.src}
            alt={profilePhoto.alt}
            fill
            sizes="(max-width: 760px) 100vw, 50vw"
          />
        </div>
        <div className="profile-copy">
          <Label>FOUNDER</Label>
          <h2>伊藤 雅和</h2>
          <p className="english-name">MASAKAZU ITO</p>
          <p>
            元プロロードレース選手。約12年間、国内外のプロチームで活動し、イタリアを拠点とした海外レースも経験しました。
          </p>
          <p>
            引退後は、バイクフィッティング、ライフプランに関する相談業務、ロードレースチームの指導などに携わっています。
          </p>
          <div className="career">
            <span className="eyebrow">主な所属歴</span>
            <ul>
              <li>愛三工業レーシングチーム</li>
              <li>NIPPO VINI FANTINI</li>
              <li>シエルブルー鹿屋</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="soft-section">
        <div className="wrap section split">
          <Label>MY PHILOSOPHY</Label>
          <div className="prose wide">
            <h2>
              同じ方法が、
              <br />
              同じ答えになるとは限らない。
            </h2>
            <p>
              競技生活の中では、同じ機材を使い、同じトレーニングをしても、人によって結果や感覚が違うことを経験してきました。
            </p>
            <p>
              だからこそ、まずは相手を知ること。一人ひとりの違いを理解し、その人に合った方法を考えることを大切にしています。
            </p>
            <p>
              バイクフィッティングとライフプラン相談は、それぞれ独立した専門サービスです。扱うテーマは違いますが、相手の状況を理解して一緒に考えるという姿勢は変わりません。
            </p>
          </div>
        </div>
      </section>
      <section className="wrap section brand-message">
        <Label>THE MEANING OF TUNIQUE</Label>
        <h2>
          TUNE YOUR
          <br />
          <span className="muted">UNIQUE.</span>
        </h2>
        <p>
          あなたの違いを、あなたの可能性に。
          <br />
          自分に合う基準を見つける、その一歩を支えます。
        </p>
      </section>
      <ContactBand />
    </>
  );
}
