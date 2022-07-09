import dynamic from "next/dynamic";
const VoxelImage = dynamic(() => import("../../components/VoxelImage"), {
  ssr: false,
});

export default function Home() {
  const hexValues = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
  ];
  function populate(a) {
    for (let i = 0; i < 6; i++) {
      let x = Math.round(Math.random() * 14);
      let y = hexValues[x];
      a += y;
    }
    return a;
  }

  const newColor2 = populate("#");

  const gradient = "linear-gradient(#ffffff, " + newColor2 + ")";
  return (
    <div
      id="overall"
      style={{
        background: gradient,
      }}
    >
      <VoxelImage />
    </div>
  );
}
