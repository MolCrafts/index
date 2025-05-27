import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { fadeIn, staggerContainer } from "../lib/animations";
import { LazyImage } from "./LazyImage";
import molpyLogo from "../assets/molpy.webp";
import molpotLogo from "../assets/molpot.webp";
import molvisLogo from "../assets/molvis.webp";

export const EcosystemLogos = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <motion.section
      ref={sectionRef}
      className="py-16 bg-primary/5 backdrop-blur-sm rounded-2xl my-16 border border-primary/10"
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-10"
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold mb-4 gradient-text-primary">MolCraft Ecosystem</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive suite of integrated tools for molecular sciences research
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* MolPy */}
          <motion.div
            className="flex flex-col glass-card overflow-hidden"
            variants={fadeIn}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
          >
            <div className="bg-gradient-to-b from-[#f9f3e0] to-[#f5edd0] min-h-[200px] flex items-center justify-center p-8 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-32 h-32 rounded-full bg-green-800/5 animate-pulse" style={{ animationDuration: '3s' }}></div>
              </div>
              <LazyImage
                src={molpyLogo}
                alt="MolPy Logo"
                className="w-auto max-w-full object-contain relative z-10"
              />
            </div>
            <div className="bg-primary/10 p-6">
              <h3 className="text-xl font-semibold mb-2 text-green-700">MolPy</h3>
              <p className="text-muted-foreground mb-4">
                Python framework for molecular simulations with high-performance computing capabilities
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-700/10 text-green-700 rounded-full text-xs font-medium">Python</span>
                <span className="px-3 py-1 bg-green-700/10 text-green-700 rounded-full text-xs font-medium">Simulation</span>
                <span className="px-3 py-1 bg-green-700/10 text-green-700 rounded-full text-xs font-medium">HPC</span>
              </div>
            </div>
          </motion.div>

          {/* MolVis */}
          <motion.div
            className="flex flex-col glass-card overflow-hidden"
            variants={fadeIn}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
          >
            <div className="bg-gradient-to-b from-[#f9f3e0] to-[#f5edd0] min-h-[200px] flex items-center justify-center p-8 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-32 h-32 rounded-full bg-green-800/5 animate-pulse" style={{ animationDuration: '4s' }}></div>
              </div>
              <LazyImage
                src={molvisLogo}
                alt="MolVis Logo"
                className="w-auto max-w-full object-contain relative z-10"
              />
            </div>
            <div className="bg-primary/10 p-6">
              <h3 className="text-xl font-semibold mb-2 text-green-700">MolVis</h3>
              <p className="text-muted-foreground mb-4">
                Advanced 3D visualization toolkit for molecular structures and simulation results
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-700/10 text-green-700 rounded-full text-xs font-medium">WebGL</span>
                <span className="px-3 py-1 bg-green-700/10 text-green-700 rounded-full text-xs font-medium">3D Rendering</span>
                <span className="px-3 py-1 bg-green-700/10 text-green-700 rounded-full text-xs font-medium">Interactive</span>
              </div>
            </div>
          </motion.div>

          {/* MolPot */}
          <motion.div
            className="flex flex-col glass-card overflow-hidden"
            variants={fadeIn}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
          >
            <div className="bg-gradient-to-b from-[#f9f3e0] to-[#f5edd0] min-h-[200px] flex items-center justify-center p-8 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-32 h-32 rounded-full bg-green-800/5 animate-pulse" style={{ animationDuration: '5s' }}></div>
              </div>
              <LazyImage
                src={molpotLogo}
                alt="MolPot Logo"
                className="w-auto max-w-full object-contain relative z-10"
              />
            </div>
            <div className="bg-primary/10 p-6">
              <h3 className="text-xl font-semibold mb-2 text-green-700">MolPot</h3>
              <p className="text-muted-foreground mb-4">
                Force field library with customizable potential energy functions for molecular dynamics
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-700/10 text-green-700 rounded-full text-xs font-medium">Force Fields</span>
                <span className="px-3 py-1 bg-green-700/10 text-green-700 rounded-full text-xs font-medium">C++</span>
                <span className="px-3 py-1 bg-green-700/10 text-green-700 rounded-full text-xs font-medium">CUDA</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}; 