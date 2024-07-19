import Carousel from "@/components/Carousel";
import Introduce from "@/components/Introduce";
import PopularService from "@/components/PopularService";
import SessionExpired from "@/components/SessionExpired";
import { ChakraProvider } from "@chakra-ui/react";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      {/* <ChakraProvider>
        <SessionExpired />
      </ChakraProvider> */}
      <Carousel />
      <PopularService />
      <Introduce />
    </div>
  );
}
