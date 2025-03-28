import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { auth, signIn, logOut, db } from "../../firebase"; 
import { onAuthStateChanged } from "firebase/auth"; 
import { collection, addDoc, getDocs } from "firebase/firestore"; // Import getDocs for fetching skills

const adminEmails = ["Jamilmendez1016@gmail.com", "redondomikej@gmail.com"];

export default function Skills() {
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState([]); // Start with an empty array to fetch skills from Firestore

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Fetch skills from Firestore
    const fetchSkills = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "skills"));
        const skillsArray = querySnapshot.docs.map(doc => ({
          id: doc.id, // Get document ID for easy reference
          ...doc.data(),
        }));
        setSkills(skillsArray);
      } catch (error) {
        console.error("Error fetching skills: ", error);
      }
    };

    fetchSkills();
  }, []);

  const isAdmin = user && adminEmails.includes(user.email);

  const addSkill = async () => {
    const skillName = prompt("Enter new skill:");
    if (skillName) {
      try {
        // Add new skill to Firestore
        const docRef = await addDoc(collection(db, "skills"), {
          name: skillName,
          color: "bg-gray-500", // Default color
        });
        console.log("Skill added with ID:", docRef.id);

        // Add the new skill to the state (to update the UI immediately)
        setSkills(prevSkills => [
          ...prevSkills,
          { id: docRef.id, name: skillName, color: "bg-gray-500" }
        ]);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  const deleteSkill = async (id) => {
    try {
      // Delete the skill from Firestore
      await deleteDoc(doc(db, "skills", id));
      // Remove the skill from the state
      setSkills(prevSkills => prevSkills.filter(skill => skill.id !== id));
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
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
        {skills.map((skill) => (
          <motion.div
            key={skill.id}
            className={`p-4 rounded-lg text-center font-semibold ${skill.color} text-white shadow-lg relative`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: skills.indexOf(skill) * 0.2, duration: 0.5 }}
          >
            {skill.name}
            {isAdmin && (
              <button
                onClick={() => deleteSkill(skill.id)}
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
