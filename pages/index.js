import dynamic from "next/dynamic";
const VoxelImage = dynamic(() => import("../components/VoxelImage.js"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="overflow-hidden">
      <VoxelImage />
    </div>
  );
}
