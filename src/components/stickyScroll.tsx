'use client'

import Image from "next/image";
import { IBM_Plex_Serif } from "next/font/google";
import { Timeline } from "@/components/ui/timeline";

const ibmSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400']
});

export function StickyScroll() {
  const data = [
    {
      title: "Latest news",
      content: (
        <div>
          <p className={`text-neutral-800 dark:text-neutral-200 text-xs md:text-lg font-normal mb-8 ${ibmSerif.className}`}>
            Discover up-to-the-minute financial news from around the globe, tailored to keep you informed on the latest shifts and developments in markets, industries, and economies.
          </p>
          <div>
           <Image src='/images/latest-news.png' alt="Latest news" width={500} height={500} className="rounded-lg"/>
          </div>
        </div>
      ),
    },
    {
      title: "Quick Summaries",
      content: (
        <div>
          <p className={`text-neutral-800 dark:text-neutral-200 text-xs md:text-lg font-normal mb-8 ${ibmSerif.className}`}>
            FinBrief&apos;s AI-powered summarization technology pulls the essential points from lengthy articles, delivering them in a compact, easily digestible format.
          </p>
          
          <div>
            <Image src='/placeholder.png' alt="placeholder" width={500} height={500} /> 
          </div>
        </div>
      ),
    },
    {
      title: "Follow topics you care about",
      content: (
        <div>
          <p className={`text-neutral-800 dark:text-neutral-200 text-xs md:text-lg font-normal mb-8 ${ibmSerif.className}`}>
            Tailor your feed to match your interests. Whether you&apos;re into crypto, real estate, or global trade, FinBrief lets you follow the topics you&apos;re most passionate about, delivering a highly personalized experience.
          </p>
          <div>
            <Image src='/placeholder.png' alt="placeholder" width={500} height={500} />
          </div>
        </div>
      ),
    },
    {
      title: "Save posts",
      content: (
        <div>
          <p className={`text-neutral-800 dark:text-neutral-200 text-xs md:text-lg font-normal mb-8 ${ibmSerif.className}`}>
            Bookmark articles or summaries to revisit later. Save key insights or trending stories with a single click and keep them organized for easy access anytime.
          </p>
          <div>
            <Image src='/images/bookmark.png' alt="bookmark posts" width={500} height={500} className="rounded-lg"/>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className='w-full'>
      <Timeline data={data} />
    </div>
  );
}
