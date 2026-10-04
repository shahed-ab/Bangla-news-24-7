import Image from "next/image";
import type { BodyBlock } from "@/types/news";

interface ArticleBodyProps {
  blocks: BodyBlock[];
}

export default function ArticleBody({ blocks }: ArticleBodyProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <div className="article-body flex flex-col font-sans text-neutral-800 text-base sm:text-[17px] leading-relaxed">
      {blocks.map((block, index) => {
        if (block.type === "text") {
          const paragraphs = block.text
            ? block.text.split("\n").filter((p) => p.trim().length > 0)
            : [];
          return (
            <div key={index} className="space-y-4 mb-5">
              {paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          );
        }

        if (block.type === "image") {
          if (!block.url) return null;
          return (
            <figure key={index} className="my-6">
              <div className="relative w-full aspect-[16/9] bg-neutral-100 rounded-[2px] overflow-hidden">
                <Image
                  src={block.url}
                  alt={block.altText || block.caption || "সংবাদের ছবি"}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-cover"
                />
              </div>
              {(block.caption || block.copyrightHolder) && (
                <figcaption className="text-xs text-neutral-500 mt-2 font-sans flex items-center justify-between">
                  <span>{block.caption}</span>
                  {block.copyrightHolder && (
                    <span className="text-neutral-400 italic">ছবি: {block.copyrightHolder}</span>
                  )}
                </figcaption>
              )}
            </figure>
          );
        }

        if (block.type === "subheading") {
          return (
            <h2
              key={index}
              className="font-serif font-bold text-xl sm:text-2xl text-neutral-900 mt-8 mb-4 border-l-4 border-[#c8102e] pl-3"
            >
              {block.text}
            </h2>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote
              key={index}
              className="my-6 p-4 border-l-4 border-[#c8102e] bg-neutral-50 text-neutral-700 italic font-serif"
            >
              <p>{block.text}</p>
              {block.citation && (
                <cite className="block text-xs font-sans text-neutral-500 mt-2 not-italic">
                  — {block.citation}
                </cite>
              )}
            </blockquote>
          );
        }

        if (block.type === "list") {
          if (!block.items || block.items.length === 0) return null;
          const ListTag = block.ordered ? "ol" : "ul";
          return (
            <ListTag
              key={index}
              className={`my-4 space-y-2 pl-6 ${
                block.ordered ? "list-decimal" : "list-disc"
              }`}
            >
              {block.items.map((item, itemIdx) => (
                <li key={itemIdx}>{item}</li>
              ))}
            </ListTag>
          );
        }

        return null;
      })}
    </div>
  );
}
