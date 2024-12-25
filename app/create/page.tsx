"use client";
import { useState } from "react";
import axios from "axios";

export default function Page() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if fields are filled
    if (!name || !desc || !image) {
      setError("Please fill all fields.");
      return;
    }

    setLoading(true);
    setError(null);

    // FormData object to handle file upload
    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("img", image);
    console.log(formData);
    try {
      // POST request to the API
      const response = await axios.post(
        "http://localhost:3000/api/createPlayer",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      setSuccessMessage("Player added successfully!");
      console.log(response.data); // Optional: log the response from the server
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred while adding the player.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold my-8">Add New Player</h1>
      <form onSubmit={handleSubmit} className="flex gap-3 flex-col">
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Fullname"
          className="py-1 px-4 border rounded-md"
        />
        <textarea
          name="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows={4}
          placeholder="About Player"
          className="py-1 px-4 border rounded-md resize-none"
        ></textarea>
        <input
          type="file"
          name="image"
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          className="py-1 px-4 border rounded-md w-1/2"
        />
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        <button
          type="submit"
          className="bg-black text-white mt-5 px-4 py-1 rounded-md shadow-md"
          disabled={loading}
        >
          {loading ? "Adding Player..." : "Add Player"}
        </button>
      </form>
    </div>
  );
}
