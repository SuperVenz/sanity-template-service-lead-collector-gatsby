import React, { useState } from "react";
import styled from "styled-components";
import { GatsbyImage } from "gatsby-plugin-image";
import { useStaticQuery, graphql } from "gatsby";

// Styles
const Wrapper = styled.div`
  padding: 0 16px;
  display: flex;
  flex-flow: column nowrap;
  padding-bottom: 2vh;
  @media screen and (min-width: 600px) {
    height: 100vh;
    padding-bottom: 0;
  }
`;
const Header = styled.h2`
  height: 32px;
  text-align: center;
  font-weight: bold;
  padding: 32px 0px;
`;
const PicWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`;
const SideCircle = styled(GatsbyImage)`
  aspect-ratio: 1;
  height: 48px;
  border-radius: 25%;
  cursor: pointer;
  @media screen and (min-width: 600px) {
    height: 100px;
  }
  @media screen and (min-width: 1000px) {
    height: 200px;
  }
`;
const CenterCircle = styled(GatsbyImage)`
  height: 156px;
  aspect-ratio: 1;
  margin: 0 24px;
  border-radius: 25%;
  @media screen and (min-width: 600px) {
    height: 300px;
    margin: 0 50px;
  }
  @media screen and (min-width: 1000px) {
    height: 400px;
    margin: 0 150px;
  }
`;
const DotsWrappers = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  padding: 15px 0 0 0;
`;
const Dots = styled.div`
  height: 7px;
  width: 7px;
  margin: 5px;
  background-color: ${(props) =>
    props.current ? "var(--carousel-dots)" : "black"};
  border-radius: 50%;
  display: inline-block;
`;

const SubHeader = styled.h3`
  padding: 32px 0 8px 0px;
  text-align: center;
  font-weight: 600;
`;
const Text = styled.p`
  @media screen and (min-width: 600px) {
    text-align: center;
    margin: 0px 10%;
  }
`;
function Carousel() {
  const data = useStaticQuery(graphql`
    {
      sanityIndex {
        carousel {
          pictures {
            image {
              asset {
                gatsbyImageData
              }
            }
            altText
          }
          textContent {
            header
            subTitle
            text
          }
        }
      }
    }
  `);
  const [current, setCurrent] = useState(1);
  const [currentPrev, setCurrentPrev] = useState(0);
  const [currentAfter, setCurrentAfter] = useState(2);

  const nextSlide = () => {
    setCurrent(
      current === data.sanityIndex.carousel.length - 1 ? 0 : current + 1
    );

    setCurrentAfter(
      currentAfter === data.sanityIndex.carousel.length - 1
        ? 0
        : currentAfter + 1
    );
    setCurrentPrev(
      currentPrev === data.sanityIndex.carousel.length - 1 ? 0 : currentPrev + 1
    );
  };

  const prevSlide = () => {
    setCurrent(
      current === 0 ? data.sanityIndex.carousel.length - 1 : current - 1
    );
    setCurrentAfter(
      currentAfter === 0
        ? data.sanityIndex.carousel.length - 1
        : currentAfter - 1
    );
    setCurrentPrev(
      currentPrev === 0 ? data.sanityIndex.carousel.length - 1 : currentPrev - 1
    );
  };
  return (
    <Wrapper>
      <Header>{data.sanityIndex.carousel[current].textContent.header}</Header>
      <PicWrapper>
        <SideCircle
          image={
            data.sanityIndex.carousel[currentPrev].pictures.image.asset
              .gatsbyImageData
          }
          alt={data.sanityIndex.carousel[currentPrev].pictures.altText}
          onClick={prevSlide}
        />
        <CenterCircle
          image={
            data.sanityIndex.carousel[current].pictures.image.asset
              .gatsbyImageData
          }
          alt={data.sanityIndex.carousel[current].pictures.altText}
        />

        <SideCircle
          image={
            data.sanityIndex.carousel[currentAfter].pictures.image.asset
              .gatsbyImageData
          }
          alt={data.sanityIndex.carousel[currentAfter].pictures.altText}
          onClick={nextSlide}
        />
      </PicWrapper>
      <DotsWrappers>
        {data.sanityIndex.carousel.map((arr, i) => {
          if (i === current) {
            return <Dots current={true} key={i} />;
          } else {
            return <Dots key={i} />;
          }
        })}
      </DotsWrappers>
      <SubHeader>
        {data.sanityIndex.carousel[current].textContent.subTitle}
      </SubHeader>
      <Text>{data.sanityIndex.carousel[current].textContent.text}</Text>
    </Wrapper>
  );
}

export default Carousel;
