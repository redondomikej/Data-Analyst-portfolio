import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-[#0D1B2A] to-[#1B263B] text-white text-center">
      <motion.h2
        className="text-5xl font-bold text-cyan-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Contact Me
      </motion.h2>

      <div className="mt-6 text-lg space-y-2">
        <motion.p 
          className="text-gray-300"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          📧 Jamilmendez1016@gmail.com
        </motion.p>
        
        <motion.p 
          className="text-gray-300"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          📞 09939155422
        </motion.p>
      </div>

      <motion.a
        href="https://www.linkedin.com/in/jamil-mendez-1302b6198/"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 text-lg font-semibold text-cyan-400 hover:text-cyan-300 transition duration-300"
        whileHover={{ textShadow: "0px 0px 10px rgba(34, 211, 238, 0.8)", scale: 1.1 }}
      >
        <FaLinkedin size={28} />
        Connect on LinkedIn
      </motion.a>
    </section>
  );
}
