import { motion } from "framer-motion";

export default function Hero() {
  const text = "Industrial Engineer | Data Analyst";

  return (
    <section
      id="home"
      className="h-screen flex flex-col justify-center px-12 lg:px-24 bg-gradient-to-r from-[#0D1B2A] via-[#1B263B] to-[#415A77] text-white"
    >
      {/* Name with glowing effect */}
      <motion.h1
        className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400 cursor-pointer"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        whileHover={{
          x: 15,
          scale: 1.1,
          textShadow: "0px 0px 8px rgba(34, 211, 238, 0.8)",
        }}
      >
        Jamil Mendez
      </motion.h1>

      {/* Crumbling effect */}
      <motion.p
        className="text-2xl mt-3 flex space-x-1 overflow-hidden"
        initial="hidden"
        animate="visible"
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            className="inline-block"
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: {
                opacity: 1,
                y: 0,
                rotate: Math.random() * 10 - 5, // Random slight rotation
                transition: {
                  delay: index * 0.05, // Staggered animation
                  duration: 0.5,
                  ease: "easeOut",
                },
              },
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.p>

      <p className="mt-4 text-gray-300 max-w-3xl leading-relaxed">
        Highly analytical and results-driven Industrial Engineer and Data Analyst with expertise in demand planning, quality assurance, and process optimization.
      </p>
      <p className="mt-4 text-gray-300">
        You can request an updated resume in my{" "}
        <motion.a
          href="#contact"
          className="text-cyan-400 underline"
          whileHover={{
            textShadow: "0px 0px 8px rgba(34, 211, 238, 0.8)",
            scale: 1.1,
          }}
        >
          contacts
        </motion.a>.  
        Also, check out my{" "}
        <motion.a
          href="#projects"
          className="text-green-400 underline"
          whileHover={{
            textShadow: "0px 0px 8px rgba(34, 211, 100, 0.8)",
            scale: 1.1,
          }}
        >
          sample projects
        </motion.a> to see my work.
      </p>
    </section>
  );
}
