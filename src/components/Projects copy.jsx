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
    <section id="projects" className="min-h-screen p-12 bg-gray-100">
      <h1 className="text-5xl font-bold text-center text-gray-800 mb-6">
        My Projects
      </h1>
      <p className="text-center text-lg text-gray-600 mb-8">
        A collection of my Data Analytics reports and case studies.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800">{project.title}</h2>
            <p className="text-gray-600 mt-2">{project.description}</p>
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-500 font-semibold mt-4 inline-block underline"
              whileHover={{
                textShadow: "0px 0px 8px rgba(34, 211, 238, 0.8)",
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
