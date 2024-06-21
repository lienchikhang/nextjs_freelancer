import Carousel from "@/components/Carousel";
import PopularService from "@/components/PopularService";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Carousel />
      <PopularService />
    </div>
  );
}
