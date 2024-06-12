"use client"
import { IoMenu } from "react-icons/io5";
import { motion, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";
const containerVariants = {
    hidden: { y: -500, opacity: 0},
    visible: {
      opacity: 1,
        y: 0,
      transition: {
        staggerChildren: 0.05, // delay between animations of each child
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: -500 },
    visible: { y: 0 }
  };
export default function NavMenu() {
    const [scope, animate] = useAnimate()
    const [startAnimation, setStartAnimation] = useState(false);
    return (
        <>
            <IoMenu className=" fixed top-2 right-2 text-2xl  z-50 w-10 h-10 " onClick={() => setStartAnimation(!startAnimation)}/>
            <motion.div
                className="fixed top-0 left-0 w-screen h-36 bg-transparent flex p-4 pr-8 gap-4"
                variants={containerVariants}
                initial="hidden"
                animate={startAnimation ? "visible" : "hidden"}
            >
                {Array.from({ length: 10 }).map((_, index) => (
                    <motion.div
                        key={index}
                        className="w-[10%] h-full bg-primary-foreground flex items-center justify-center font-terminal text-console text-3xl rounded-3xl"
                        variants={itemVariants}
                    >
                        home
                    </motion.div>
                ))}
            </motion.div>
        </>
    )
}