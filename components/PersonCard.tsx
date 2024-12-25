"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

// Dynamically import CldImage and disable SSR for it
const CldImage = dynamic(
  () => import("next-cloudinary").then((mod) => mod.CldImage),
  {
    ssr: false, // Disable SSR for this component
  }
);

interface PersonCardProps {
  img: string;
  name: string;
  desc: string;
}

export default function PersonCard({ img, name, desc }: PersonCardProps) {
  return (
    <div className="p-8 rounded-2xl shadow-xl border-2 border-blue-500 h-fit flex gap-8">
      <div className="flex flex-col gap-4 w-1/3 items-center text-center">
        <h2 className="font-bold text-xl">{name}</h2>
        {/* Render CldImage as a client-side only component */}
        <ClientCldImage
          src={img} // Image URL
          alt={name} // Alt text for accessibility
          width={150} // Width of the image
          height={150} // Height of the image
          className="rounded-3xl aspect-square object-cover shadow-xl border-2 rows-span-2"
          crop="fill" // Optional crop setting, can be "fill", "scale", "fit", etc.
        />
        <div className="flex gap-4">
          <Link
            href={"/edit"}
            className="tracking-widest px-4 py-2 rounded-md text-sm font-bold bg-slate-100 shadow-md hover:bg-slate-200 transition-all ease-in-out duration-300"
          >
            Edit
          </Link>
          <Link
            className="tracking-widest px-4 py-2 rounded-md text-sm font-bold bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 shadow-md text-white"
            href={"/delete"}
          >
            Delete
          </Link>
        </div>
      </div>
      <div className="w-2/3">
        <p className="row-span-2">{desc}</p>
      </div>
    </div>
  );
}

function ClientCldImage(props: any) {
  return <CldImage {...props} />;
}
