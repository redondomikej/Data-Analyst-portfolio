import { motion } from "framer-motion";

const skills = [
  { name: "Data Analysis", color: "bg-cyan-500" },
  { name: "SQL & Databases", color: "bg-green-500" },
  { name: "Python (Pandas, NumPy)", color: "bg-blue-500" },
  { name: "Excel & Power BI", color: "bg-yellow-500" },
  { name: "Process Optimization", color: "bg-purple-500" },
  { name: "Machine Learning (Basics)", color: "bg-red-500" },
];

export default function Skills() {
  return (
    <section id="skills" className="min-h-screen flex flex-col items-center justify-center bg-[#1B263B] text-white px-6">
      <motion.h2
        className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Skills & Expertise
      </motion.h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className={`p-4 rounded-lg text-center font-semibold ${skill.color} text-white shadow-lg`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            {skill.name}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
