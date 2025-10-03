"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';

const Hero = () => {
  const typingTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = typingTextRef.current;
    if (!element) return;

    const words = ['TrueGoods', 'TrueGds'];
    let currentWordIndex = 0;

    const typeWord = (word: string) => {
      return new Promise<void>((resolve) => {
        element.textContent = '';
        const letters = word.split('');
        
        gsap.to({}, {
          duration: letters.length * 0.1,
          ease: "none",
          onUpdate: function() {
            const progress = this.progress();
            const currentLetterIndex = Math.floor(progress * letters.length);
            element.textContent = letters.slice(0, currentLetterIndex + 1).join('');
          },
          onComplete: resolve
        });
      });
    };

    const deleteWord = () => {
      return new Promise<void>((resolve) => {
        const currentText = element.textContent || '';
        const letters = currentText.split('');
        
        gsap.to({}, {
          duration: letters.length * 0.05,
          ease: "none",
          onUpdate: function() {
            const progress = this.progress();
            const remainingLetters = Math.ceil((1 - progress) * letters.length);
            element.textContent = letters.slice(0, remainingLetters).join('');
          },
          onComplete: resolve
        });
      });
    };

    const animateLoop = async () => {
      while (true) {
        // Type current word
        await typeWord(words[currentWordIndex]);
        
        // Wait for 2 seconds
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Delete current word
        await deleteWord();
        
        // Wait for 0.5 seconds
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Move to next word
        currentWordIndex = (currentWordIndex + 1) % words.length;
      }
    };

    animateLoop();

    // Cleanup function
    return () => {
      gsap.killTweensOf({});
    };
  }, []);

  return (
    <div className="relative bg-gradient-to-r from-[#003494] to-[#0046be] overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 transform -skew-y-6 bg-white"></div>
        <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
          <div className="w-64 h-64 rounded-full bg-white opacity-20"></div>
        </div>
        <div className="absolute top-0 left-0 transform -translate-x-1/4 -translate-y-1/4">
          <div className="w-96 h-96 rounded-full bg-white opacity-20"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <div className="mb-4">
              <span 
                ref={typingTextRef}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight inline-block min-h-[1.2em]"
              >
                TrueGoods
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Your Marketplace for Trusted Goods
            </h1>
            <p className="mt-4 text-lg md:text-xl text-blue-100 max-w-lg mx-auto md:mx-0">
              Discover trusted deals on cameras, laptops, bikes, and more — all in one easy-to-use online marketplace.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <a 
                href="#products" 
                className="px-8 py-3 bg-white text-[#0046be] font-medium rounded-lg shadow-md hover:bg-blue-50 transition duration-300 flex items-center justify-center"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a 
                href="#featured" 
                className="px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:bg-opacity-10 transition duration-300 flex items-center justify-center"
              >
                Featured Products
              </a>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-r from-[#003494] to-[#0046be] rounded-2xl transform rotate-3 scale-105 opacity-50 blur-xl"></div>
              <Image 
                src="/g7x.webp" 
                alt="Canon G7X Camera" 
                width={500}
                height={400}
                priority
                className="relative z-10 rounded-2xl shadow-2xl w-full h-auto object-cover object-center"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4 z-20">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-[#313a4b] font-medium">Special Offers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;