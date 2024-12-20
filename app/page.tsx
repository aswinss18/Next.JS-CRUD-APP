import PersonCard from "@/components/PersonCard";

export default function Home() {
  const person = {
    name: "Lionel Messi",
    img: "/images/messi.jpeg",
    desc: `Lionel Messi, often hailed as one of the greatest footballers of all time, is a legendary Argentine player renowned for his extraordinary
          skill, vision, and consistency on the field. Born on June 24, 1987, in
          Rosario, Argentina, Messi rose to prominence with FC Barcelona, where
          he spent over two decades dazzling fans with his dribbling, precision,
          and unmatched goal-scoring ability, becoming the club's all-time
          leading scorer.`,
  };

  return (
    <div>
      <PersonCard img={person.img} name={person.name} desc={person.desc} />
    </div>
  );
}
