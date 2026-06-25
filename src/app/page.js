import Banner from "@/components/Banner";
import GenresSection from "@/components/GenresSection";
import TopWritersSection from "@/components/TopWritersSection";
import Image from "next/image";

export default function Home() {
  return (
    
    <div>
      <Banner></Banner>
      <TopWritersSection></TopWritersSection>
      <GenresSection></GenresSection>
    </div>
    
  );
}
