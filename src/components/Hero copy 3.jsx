import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="h-screen flex flex-col justify-center px-12 lg:px-24 bg-gradient-to-r from-[#0D1B2A] via-[#1B263B] to-[#415A77] text-white"
    >
      <motion.h1
        className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        Jamil Mendez
      </motion.h1>
      <p className="text-2xl mt-3">Industrial Engineer | Data Analyst</p>
      <p className="mt-4 text-gray-300 max-w-3xl leading-relaxed">
        Highly analytical and results-driven Industrial Engineer and Data Analyst with expertise in demand planning, quality assurance, and process optimization.
      </p>
      <p className="mt-4 text-gray-300">
        You can request an updated resume in my <a href="#contact" className="text-cyan-400 underline">contacts</a>.  
        Also, check out my <a href="#projects" className="text-green-400 underline">sample projects</a> to see my work.
      </p>
      <motion.a
        href="#contact"
        className="mt-6 px-8 py-3 bg-cyan-500 text-white font-bold rounded-lg hover:bg-cyan-600 transition inline-block"
        whileHover={{ scale: 1.1 }}
      >
        Contact Me
      </motion.a>
    </section>
  );
}
