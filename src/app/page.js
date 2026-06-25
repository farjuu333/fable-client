import Banner from "@/components/Banner";
import FeaturedEbooksSection from "@/components/FeaturedEbooksSection";
import GenresSection from "@/components/GenresSection";
import TopWritersSection from "@/components/TopWritersSection";
import Image from "next/image";

export default function Home() {
  return (
    
    <div>
      <Banner></Banner>
      <FeaturedEbooksSection></FeaturedEbooksSection>
      <TopWritersSection></TopWritersSection>
      <GenresSection></GenresSection>
    </div>
    
  );
}
