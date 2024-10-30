import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import marketpic from "@/assets/marketindexpic.jpg";
import summariseImage from "@/assets/summariseIMG.png.jpeg"
import personalizationIMG from "@/assets/personalizationIMG.jpg"
import savedPostsIMG from "@/assets/savedposts.jpg"

export function StickyScroll() {
  const data = [
    {
      title: "Latest news",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-lg font-normal mb-8">
            Find hot poping finance news from all over the world
          </p>
          <div className="grid grid-cols-2 gap-4">
           <Image src={marketpic} alt="placeholder" width={500} height={500} />
          </div>
        </div>
      ),
    },
    {
      title: "Quick Summaries",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-lg font-normal mb-8">
              Get the most crisp summaries of articles powered by cutting edge AI models
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <Image src={summariseImage} alt="placeholder" width={500} height={500} /> 
          </div>
        </div>
      ),
    },
    {
      title: "Follow topics you care about",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-lg font-normal mb-4">
            Follow only what you want to follow
          </p>
          <div className="mb-8">
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✅ Card grid component
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✅ Startup template Aceternity
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✅ Random file upload lol
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✅ Himesh Reshammiya Music CD
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✅ Salman Bhai Fan Club registrations open
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Image src={personalizationIMG} alt="placeholder" width={500} height={500} />
          </div>
        </div>
      ),
    },
    {
      title: "Save posts",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            I usually run out of copy, but when I see content this big, I try to
            integrate lorem ipsum.
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Lorem ipsum is for people who are too lazy to write copy. But we are
            not. Here are some more example of beautiful designs I built.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image src={savedPostsIMG} alt="placeholder" width={500} height={500} />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
