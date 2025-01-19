import PersonCard from "@/components/PersonCard";

import axios from "axios";

export default async function Home() {
  const { data } = await axios.get("http://localhost:3000/api/getPlayers");

  // console.log(data);

  const dummyData = [
    {
      _id: "uewydgwiue",
      name: "neymar",
      desc: "Hellooosxo freevc fvf fvdfv",
      img: "jfvgfjhjvf",
    },
    {
      _id: "uewydgwiuedcfdsfc",
      name: "neymar",
      desc: "Hellooosxo freevc fvf fvdfv",
      img: "jfvgfjhjvf",
    },
  ];

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
