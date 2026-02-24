"use client"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitText from 'gsap/SplitText'
import React from 'react'

function MessgeSection() {
    useGSAP(() => {
        // Register ScrollTrigger only on client
        gsap.registerPlugin(ScrollTrigger, SplitText);

        // Split text for first and second message
        const firstMsgSplit = new SplitText('.first-message', { type: 'words' });
        const secMsgSplit = new SplitText('.second-message', { type: 'words' });
        const paragraphSplit = new SplitText('.message-content p', {
             type: 'words, lines', 
             linesClass:'paragraph-line'
            });

        // Animate first message words on scroll
        gsap.to(firstMsgSplit.words, {
            color: '#faeade',
            ease: 'power1.in',
            stagger: 1,
            scrollTrigger: {
                trigger: '.message-content',
                start: 'top center',
                end: '30% center',
                scrub: true,
            },
        });
        gsap.to(secMsgSplit.words, {
            color: '#faeade',
            ease:"power1.in",
            stagger: 1,
            scrollTrigger:{
                trigger:".second-message",
                start:"top center",
                end: "bottom center",
                scrub:true,
            }
        })
        const reveal = gsap.timeline({
          delay: 0.1,
          scrollTrigger:{
            trigger:".msg-text-scroll",
            start:"top 65%",
            scrub:true,
          }  
        })
        reveal.to(".msg-text-scroll",{
            duration:1,
            clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease:"circ.out"
        })
        const pragraphTl= gsap.timeline({
            scrollTrigger:{
                trigger:".message-content p",
                start:"top center",
                scrub:true,
            }
        })
        pragraphTl.from(paragraphSplit.words,{
            yPercent:300,
            rotate:3,
            ease:"power1.out",
            duration:1,
            stagger:0.01,
        })
    });
    return (
        <section className="message-content">
            <div className="container mx-auto flex-center py-28 relative">
                <div className="w-full h-full">
                    <div className="msg-wrapper">
                        <h1 className="first-message">Stir up Your fearless pass and</h1>
                        <div style={{clipPath:"polygon(0 0, 0 0, 0 100%, 0% 100% "}} className="msg-text-scroll">
                            <div className="bg-light-brown md:pb-5 pb-3 px-5">
                                <h2 className="text-red-brown">Fuel Up</h2>
                            </div>
                        </div>
                        <h1 className="second-message">
                            your future with every gulp of Perfect Protein
                        </h1>
                    </div>
                    <div className="flex-center md:mt-20 mt-10">
                        <div className="max-w-md px-10 flex-center overflow-hidden">
                            <p>
                                Rev up your rebel spirit and feed the adventure of life with Spylt, where you're one chug away from espic nostalgia and fearless fun
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )}

export default MessgeSection