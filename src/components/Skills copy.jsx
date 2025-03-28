import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="h-screen flex items-center justify-center text-center bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-2xl opacity-30"></div>

      {/* Content */}
      <div className="relative z-10 p-6">
        <motion.h1 
          className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#ff7eb3] to-[#ffcc70] drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
        >
          Hi, I'm <span className="text-[#ffcc70]">Mike Redondo</span> 🚀
        </motion.h1>
        
        <motion.p 
          className="mt-4 text-xl text-gray-300"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Full-Stack Developer | JavaScript | Node.js | React
        </motion.p>

        {/* CTA Button */}
        <motion.div 
          className="mt-6"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 1, duration: 0.8 }}
        >
          <a 
            href="#projects" 
            className="px-6 py-3 text-lg font-semibold bg-white/10 backdrop-blur-md text-white rounded-lg shadow-lg hover:bg-white/20 transition duration-300 border border-white/20"
          >
            See My Work
          </a>
        </motion.div>
      </div>
    </section>
  );
}
