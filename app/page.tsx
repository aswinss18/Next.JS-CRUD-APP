import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="p-4 my-2 rounded-md border-b leading-8">
        <h2 className="font-bold">Natural Language Processing (NLP)</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo,
          atque asperiores commodi neque, laudantium tenetur architecto voluptas
          et soluta possimus dolores.
        </p>
        <div className="flex gap-4 justify-end">
          <Link
            href={"/edit"}
            className="tracking-widest px-4 py-2 rounded-md text-sm font-bold bg-slate-100 shadow-md"
          >
            Edit
          </Link>
          <Link
            className="tracking-widest px-4 py-2 rounded-md text-sm font-bold bg-red-500 shadow-md text-white"
            href={"/delete"}
          >
            Delete
          </Link>
        </div>
      </div>
    </div>
  );
}
