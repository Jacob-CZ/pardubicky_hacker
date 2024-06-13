"use client"
import { IoMenu } from "react-icons/io5";
import { motion, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
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
const sites = [ 
  { name: "Home", url: "/" },
  { name: "Examples", url: "/examples" },
  { name: "Projects", url: "/projects" },
  { name: "Contact", url: "/contact" },
  { name: "Blog", url: "/blog" },
  { name: "Resume", url: "/resume" },
  { name: "Services", url: "/services" },
  { name: "Portfolio", url: "/portfolio" },
  { name: "Testimonials", url: "/testimonials" },
  { name: "FAQ", url: "/faq" },
]
export default function NavMenu() {
    const [startAnimation, setStartAnimation] = useState(false);
    return (
        <>
            <IoMenu className=" fixed top-2 right-2 text-2xl  z-50 w-10 h-10 " onClick={() => setStartAnimation(!startAnimation)}/>
            <motion.div
                className="fixed top-0 left-0 w-screen h-36 bg-transparent flex p-4 pr-8 gap-4 z-50"
                variants={containerVariants}
                initial="hidden"
                animate={startAnimation ? "visible" : "hidden"}
                onClick={() => setStartAnimation(false)}
            >
                {sites.map((obj, index) => (
                    <motion.div
                    whileHover={{ scale: 1.1,y: 20 }}
                        key={index}
                        className="w-[10%] h-full bg-primary-foreground flex items-center justify-center font-terminal text-console text-3xl rounded-3xl"
                        variants={itemVariants}
                        
                    >
                      <Link href={obj.url}>
                        {obj.name}
                      </Link>
                    </motion.div>
                ))}
            </motion.div>
            <div onClick={() => setStartAnimation(false)} className={"  backdrop-blur-lg fixed z-40 top-0 left-0 w-screen h-screen " + (startAnimation ? "visible" : "hidden")} >

            </div>
        </>
    )
}