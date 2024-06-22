import Carousel from "@/components/Carousel";
import Introduce from "@/components/Introduce";
import PopularService from "@/components/PopularService";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Carousel />
      <PopularService />
      <Introduce />
    </div>
  );
}
