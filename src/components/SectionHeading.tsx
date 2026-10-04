interface SectionHeadingProps {
  title: string;
}

export default function SectionHeading({ title }: SectionHeadingProps) {
  return (
    <div className="mb-4 mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-bold font-serif text-neutral-900 relative inline-block pb-1.5">
          {title}
          <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#c8102e]" />
        </h2>
      </div>
      <div className="w-full h-[1px] bg-[#e5e5e5] -mt-[1px]" />
    </div>
  );
}
