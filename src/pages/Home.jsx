import React from "react";
import Navbar from "../components/Navbar";
import SocialMedia from "../components/SocialMedia";
import PageTitle from "../components/PageTitle";
import ImageBackgroundSection from "../components/ImageBackgroundSection";
import PixDonationSection from "../components/PixDonationSection";
import EventosCarrossel from "../components/EventosCarrossel";
import Footer from "../components/Footer";
const Home = () => {
  return (
    <>
      <Navbar></Navbar>
      <SocialMedia></SocialMedia>
      <PageTitle title="Igreja Evangélica Restitui"></PageTitle>
      <ImageBackgroundSection
        title="Conheça nossa História"
        buttonLink="/"
        backgroundImage="../../images/sobre-nos.jpg"
      ></ImageBackgroundSection>

      <PixDonationSection></PixDonationSection>
      <EventosCarrossel></EventosCarrossel>
      <Footer></Footer>
    </>
  );
};

export default Home;
