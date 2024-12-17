export default function page() {
  return (
    <div>
      <h1 className="text-2xl font-bold my-8">Add New Interpretation</h1>
      <form action="" className="flex gap-3 flex-col">
        <input
          type="text"
          name="term"
          placeholder="Term"
          className="py-1 px-4 border rounded-md"
        />
        <textarea
          name="interpretation"
          rows={4}
          placeholder="Interpretation"
          className="py-1 px-4 border rounded-md resize-none"
          id=""
        ></textarea>
        <button className="bg-black text-white mt-5 px-4 py-1 rounded-md  shadow-md">
          Add Interpretation
        </button>
      </form>
    </div>
  );
}
