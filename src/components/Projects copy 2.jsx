import React from "react";
import { motion } from "framer-motion";

export default function Projects() {
  const projects = [
    {
      title: "Sales Forecasting Dashboard",
      description: "Developed a dashboard using Python and Power BI to predict sales trends.",
      link: "https://github.com/Jamil1016/Projects",
    },
    {
      title: "Customer Segmentation Analysis",
      description: "Used clustering algorithms to categorize customers for targeted marketing.",
      link: "https://github.com/Jamil1016/Projects",
    },
    {
      title: "Supply Chain Optimization",
      description: "Analyzed logistics data to minimize costs and improve efficiency.",
      link: "https://github.com/Jamil1016/Projects",
    },
  ];

  return (
    <section id="projects" className="min-h-screen p-12 bg-gradient-to-r from-[#0D1B2A] via-[#1B263B] to-[#415A77] text-white">
      <h1 className="text-5xl font-bold text-center text-cyan-400 mb-6">
        My Projects
      </h1>
      <p className="text-center text-lg text-gray-300 mb-8">
        A collection of my Data Analytics reports and case studies.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="p-6 bg-[#1B263B] rounded-lg shadow-lg border border-gray-700 hover:border-cyan-400 transition duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-cyan-300">{project.title}</h2>
            <p className="text-gray-400 mt-2">{project.description}</p>
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 font-semibold mt-4 inline-block underline"
              whileHover={{
                textShadow: "0px 0px 10px rgba(34, 211, 238, 0.8)",
                scale: 1.1,
              }}
            >
              View on GitHub →
            </motion.a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
