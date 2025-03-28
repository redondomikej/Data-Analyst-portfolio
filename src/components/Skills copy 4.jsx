import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { auth, signIn, logOut ,db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

const adminEmails = ["Jamilmendez1016@gmail.com", "redondomikej@gmail.com"];

export default function Skills() {
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState([
    { name: "Data Analysis", color: "bg-cyan-500" },
    { name: "SQL & Databases", color: "bg-green-500" },
    { name: "Python (Pandas, NumPy)", color: "bg-blue-500" },
    { name: "Excel & Power BI", color: "bg-yellow-500" },
    { name: "Process Optimization", color: "bg-purple-500" },
    { name: "Machine Learning (Basics)", color: "bg-red-500" },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const isAdmin = user && adminEmails.includes(user.email);

  const addSkill = () => {
    const skillName = prompt("Enter new skill:");
    if (skillName) {
      setSkills([...skills, { name: skillName, color: "bg-gray-500" }]);
    }
  };

  const deleteSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

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
        <button onClick={addSkill} className="mb-4 px-4 py-2 bg-green-500 rounded text-white">+ Add Skill</button>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className={`p-4 rounded-lg text-center font-semibold ${skill.color} text-white shadow-lg relative`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            {skill.name}
            {isAdmin && (
              <button
                onClick={() => deleteSkill(index)}
                className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded"
              >
                ✖
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
