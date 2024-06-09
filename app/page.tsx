"use client"
import useMousePosition from "@/lib/useMousePosition";
import Mask from "../components/Mask";
import { Canvas } from "@react-three/fiber";
import Image from "next/image";
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function Home() {
  const ref = useRef(null);
  const { x, y } = useMousePosition();
  const inView  = useInView(ref);
  const {scrollYProgress} = useScroll({target: ref,offset: ["start end", "end end"] });

  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth);
    }
    window.onresize = () => {
      setWidth(window.innerWidth);
    }
  }, []);

  const scrollProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [width, 0],
  )
  const springyProgress = useSpring(scrollProgress, {stiffness: 400, damping: 90});
  return (
    <main className="h-fit w-full overflow-x-hidden">
      <div className=" w-full h-screen relative">
      <h1 className="text-[9vw] absolute w-full top-1/4 font-programing text-center text-white hacker-bg">Hackers &nbsp;&nbsp; Welcome</h1>
      <div className=" w-full h-full">
      <Canvas camera={{ fov: 15}}>
        <Mask/>
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 4]}  intensity={20}/>
      </Canvas>
      </div>
      </div>
      <motion.div ref={ref} style={{x:springyProgress}} className=" h-screen bg-slate-600">

      </motion.div>
    </main>
  );
}