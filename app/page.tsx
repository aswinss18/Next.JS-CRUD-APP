import PersonCard from "@/components/PersonCard";

import axios from "axios";

export default async function Home() {
  const { data } = await axios.get("http://localhost:3000/api/getPlayers");

  console.log(data);

  return (
    <div>
      {data.map(
        (person: { _id: string; name: string; desc: string; img: string }) => (
          <PersonCard
            img={"/images/avatar.jpeg"}
            name={person.name}
            desc={person.desc}
            key={person._id}
          />
        )
      )}
    </div>
  );
}
