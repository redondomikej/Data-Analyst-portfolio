import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { auth, signIn, logOut, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

const adminEmails = ["Jamilmendez1016@gmail.com", "redondomikej@gmail.com"];

export default function Experience() {
  const [user, setUser] = useState(null);
  const [experiences, setExperiences] = useState([
    {
      title: "Demand Planning Analyst",
      company: "Emerson Electric (Asia) Ltd. ROHQ",
      dates: "June 2023 – Present",
      responsibilities: [
        "Compiled reports detailing demand plans and forecasts.",
        "Developed custom dashboards to deliver actionable insights.",
        "Automated reports using Power BI & Power Query.",
      ],
    },
    {
      title: "Quality Assurance Engineer",
      company: "Citizen Finedevice Philippines Corporation",
      dates: "Nov 2020 – May 2023",
      responsibilities: [
        "Led root cause analysis for product quality improvements.",
        "Developed Excel tools to automate data processing.",
        "Increased process yield by 2.7% through continuous improvement.",
      ],
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const isAdmin = user && adminEmails.includes(user.email);

  // Add a new experience
  const addExperience = async () => {
    const title = prompt("Enter experience title:");
    const company = prompt("Enter company name:");
    const dates = prompt("Enter dates:");
    const responsibilities = prompt("Enter responsibilities (comma-separated):").split(',');

    if (title && company && dates && responsibilities.length > 0) {
      try {
        // Add experience to Firestore
        await addDoc(collection(db, "experiences"), { title, company, dates, responsibilities });

        // Update state
        setExperiences([...experiences, { title, company, dates, responsibilities }]);
      } catch (error) {
        console.error("Error adding experience: ", error);
      }
    }
  };

  // Delete an experience
  const deleteExperience = async (experienceId) => {
    try {
      // Delete experience from Firestore
      await deleteDoc(doc(db, "experiences", experienceId));

      // Update local state
      setExperiences(experiences.filter((experience) => experience.id !== experienceId));
    } catch (error) {
      console.error("Error deleting experience: ", error);
    }
  };

  // Update an experience
  const updateExperience = async (experienceId) => {
    const title = prompt("Enter new experience title:");
    const company = prompt("Enter new company name:");
    const dates = prompt("Enter new dates:");
    const responsibilities = prompt("Enter new responsibilities (comma-separated):").split(',');

    if (title && company && dates && responsibilities.length > 0) {
      try {
        // Update experience in Firestore
        const experienceRef = doc(db, "experiences", experienceId);
        await updateDoc(experienceRef, { title, company, dates, responsibilities });

        // Update local state
        setExperiences(experiences.map(exp =>
          exp.id === experienceId ? { ...exp, title, company, dates, responsibilities } : exp
        ));
      } catch (error) {
        console.error("Error updating experience: ", error);
      }
    }
  };

  return (
    <section id="experience" className="py-20 bg-[#0D1B2A] text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-cyan-400">Experience</h2>

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
          <button onClick={addExperience} className="mb-4 px-4 py-2 bg-green-500 rounded text-white">
            + Add Experience
          </button>
        )}

        <div className="mt-10 space-y-6">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              className="px-6 max-w-3xl mx-auto border-l-4 border-cyan-400 pl-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <h3 className="text-2xl font-semibold">{experience.title}</h3>
              <p className="text-gray-300">{experience.company} | {experience.dates}</p>
              <ul className="mt-3 text-gray-400 space-y-2">
                {experience.responsibilities.map((task, idx) => (
                  <li key={idx}>{task}</li>
                ))}
              </ul>

              {isAdmin && (
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => updateExperience(experience.id)}
                    className="px-4 py-1 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteExperience(experience.id)}
                    className="px-4 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
