"use client"
import { useGSAP } from '@gsap/react'
import ScrollTrigger from "gsap/ScrollTrigger"
import SplitText from "gsap/SplitText"
import React, { useRef } from 'react'
import gsap from "gsap"


export default function FlavourTithe() {
  const firstTextRef = useRef(null);
  const secondTextRef = useRef(null);

  useGSAP(() => {
    const firstMsgSplit = new SplitText(firstTextRef.current, { type: "chars" });
    const secondTextSplit = new SplitText(secondTextRef.current, { type: "chars" });

    gsap.from(firstMsgSplit.chars, {
       yPercent: 200,
      stagger: 0.02,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".flavor-section",
        start: "top 30%",
      },
    });

    gsap.to(".flavor-text-scroll", {
      duration: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      scrollTrigger: {
        trigger: ".flavor-section",
        start: "top 10%",
      },
    });

    gsap.from(secondTextSplit.chars, {
      yPercent: 200,
      stagger: 0.02,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".flavor-section",
        start: "top 1%",
      
      }
    });
  });

  return (
    <div className='flavour-section general-title col-center h-full 2xl:gap-32 xl:gap-24 gap-16'>
      <div className='overflow-hidden 2xl:py-0 py-3'>
        <h1 ref={firstTextRef}>we have </h1>
      </div>
      <div style={{ clipPath: "polygon(0 0,0 0,0 100%, 0% 100%)" }} className='flavor-text-scroll'>
        <div className='bg-mid-brown pb-5 2xl:pt-0 pt-3'>
          <h2 className='text-milk'>
            Freaking
          </h2>
        </div>
      </div>
      <div className='overflow-hidden 2xl:py-0 py-3'>
        <h1 ref={secondTextRef}>delicious  flavors</h1>
      </div>
    </div>
  )
}
