import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { auth, signIn, logOut, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

const adminEmails = ["Jamilmendez1016@gmail.com", "redondomikej@gmail.com"];

export default function Projects() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([
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
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const isAdmin = user && adminEmails.includes(user.email);

  // Add a new project
  const addProject = async () => {
    const title = prompt("Enter project title:");
    const description = prompt("Enter project description:");
    const link = prompt("Enter project GitHub link:");

    if (title && description && link) {
      try {
        // Add project to Firestore
        await addDoc(collection(db, "projects"), { title, description, link });

        // Update state
        setProjects([...projects, { title, description, link }]);
      } catch (error) {
        console.error("Error adding project: ", error);
      }
    }
  };

  // Delete a project
  const deleteProject = async (projectId) => {
    try {
      // Delete project from Firestore
      await deleteDoc(doc(db, "projects", projectId));

      // Update local state
      setProjects(projects.filter((project) => project.id !== projectId));
    } catch (error) {
      console.error("Error deleting project: ", error);
    }
  };

  // Update a project
  const updateProject = async (projectId) => {
    const title = prompt("Enter new project title:");
    const description = prompt("Enter new project description:");
    const link = prompt("Enter new project GitHub link:");

    if (title && description && link) {
      try {
        // Update project in Firestore
        const projectRef = doc(db, "projects", projectId);
        await updateDoc(projectRef, { title, description, link });

        // Update local state
        setProjects(projects.map(project =>
          project.id === projectId ? { ...project, title, description, link } : project
        ));
      } catch (error) {
        console.error("Error updating project: ", error);
      }
    }
  };

  return (
    <section id="projects" className="min-h-screen p-12 bg-gradient-to-r from-[#0D1B2A] via-[#1B263B] to-[#415A77] text-white">
      <h1 className="text-5xl font-bold text-center text-cyan-400 mb-6">
        My Projects
      </h1>
      <p className="text-center text-lg text-gray-300 mb-8">
        A collection of my Data Analytics reports and case studies.
      </p>

      {user ? (
        <button onClick={logOut} className="mb-4 px-4 py-2 bg-red-500 rounded text-white">Logout</button>
      ) : (
        <button
          onClick={signIn}
          className="absolute top-2 right-2 text-sm text-blue-500 opacity-30 hover:opacity-100"
        >
          Admin
        </button>
      )}

      {isAdmin && (
        <button onClick={addProject} className="mb-4 px-4 py-2 bg-green-500 rounded text-white">
          + Add Project
        </button>
      )}

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

            {isAdmin && (
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => updateProject(project.id)}
                  className="px-4 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProject(project.id)}
                  className="px-4 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
