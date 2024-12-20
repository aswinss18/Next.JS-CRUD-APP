export default function page() {
  return (
    <div>
      <h1 className="text-2xl font-bold my-8">Edit Player</h1>
      <form action="" className="flex gap-3 flex-col">
        <input
          type="text"
          name="name"
          placeholder="Fullname"
          className="py-1 px-4 border rounded-md"
        />
        <textarea
          name="desc"
          rows={4}
          placeholder="About Player"
          className="py-1 px-4 border rounded-md resize-none"
          id=""
        ></textarea>
        <input
          type="file"
          name="image"
          placeholder="Fullname"
          className="py-1 px-4 border rounded-md w-1/2"
        />
        <button className="bg-black text-white mt-5 px-4 py-1 rounded-md  shadow-md">
          Edit Player
        </button>
      </form>
    </div>
  );
}
