"use client";

import Image from "next/image";

const historyParagraphs = [
  "Located In East London, Divas By Claudia Stands As An Esteemed Hairdressing Establishment, Recognized For Its Award-Winning Prowess.",
  "Specializing In Flawless Weaving Techniques And Bespoke Wig Creations, Divas By Claudia Is Dedicated To Delivering Excellence, Catering To A Global Clientele.",
  "With Over 12 Years Of Expertise And A Team Of Fully Trained Professionals, We Believe In The Perpetual Journey Of Learning. At Divas By Claudia, Client Feedback Is Paramount, Serving As The Cornerstone Of Our Commitment To Delivering Unparalleled Service.",
  "Above All, Our Mission Is To Infuse Every Woman's Experience With A Touch Of Luxury At Divas By Claudia.",
];

const studioParagraphs = [
  "Our Studio Exudes An Atmosphere Of Luxury And Sophistication, Welcoming Clients Into A Space Where Their Beauty Aspirations Can Flourish.",
  "From The Moment You Step Through Our Doors, You'll Be Greeted By A Team Of Skilled Professionals Dedicated To Providing You With The Highest Level Of Service And Attention To Detail.",
  "Our State-Of-The-Art Facilities Are Equipped With The Latest Tools And Technology, Ensuring That Every Service Is Executed With Precision And Care.",
];

export default function HistoryStudioSection() {
  return (
    <section className="bg-white py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Our History */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-black mb-8">
            Our History
          </h2>
          <div className="space-y-5 text-black/90 text-base md:text-lg leading-relaxed">
            {historyParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

       
      </div>

      {/* Full-width image */}
      <div className="w-screen relative left-1/2 -translate-x-1/2 my-12">
        <div className="relative w-full aspect-[2597/901] max-h-[420px] overflow-hidden bg-neutral-100">
          <Image
            src="/history-studio.png"
            alt="Divas By Claudia studio — luxury hair and beauty"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority={false}
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
    

        {/* The Studio */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-black mb-8">
            The Studio
          </h2>
          <div className="space-y-5 text-black/90 text-base md:text-lg leading-relaxed">
            {studioParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
