import React, { useState, useEffect } from "react";
import { auth, signIn, logOut, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

const adminEmails = ["Jamilmendez1016@gmail.com", "redondomikej@gmail.com"];

export default function Awards() {
  const [user, setUser] = useState(null);
  const [awards, setAwards] = useState([]);

  // Listen for authentication state changes
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  // Listen for real-time changes to the awards collection
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "awards"), (snapshot) => {
      const fetchedAwards = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAwards(fetchedAwards);
    });

    // Cleanup listener when component unmounts
    return () => unsubscribe();
  }, []);

  const isAdmin = user && adminEmails.includes(user.email);

  // Add a new award
  const addAward = async () => {
    const title = prompt("Enter award title:");
    const date = prompt("Enter award date:");
    const description = prompt("Enter award description:");

    if (title && date && description) {
      try {
        // Add award to Firestore
        await addDoc(collection(db, "awards"), { title, date, description });
      } catch (error) {
        console.error("Error adding award: ", error);
      }
    }
  };

  // Delete an award
  const deleteAward = async (awardId) => {
    try {
      // Delete award from Firestore
      await deleteDoc(doc(db, "awards", awardId));
    } catch (error) {
      console.error("Error deleting award: ", error);
    }
  };

  // Update an award
  const updateAward = async (awardId) => {
    const title = prompt("Enter new award title:");
    const date = prompt("Enter new award date:");
    const description = prompt("Enter new award description:");

    if (title && date && description) {
      try {
        // Update award in Firestore
        const awardRef = doc(db, "awards", awardId);
        await updateDoc(awardRef, { title, date, description });
      } catch (error) {
        console.error("Error updating award: ", error);
      }
    }
  };

  return (
    <section id="awards" className="py-20 bg-[#1B263B] text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-cyan-400">Awards</h2>

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
          <button onClick={addAward} className="mb-4 px-4 py-2 bg-green-500 rounded text-white">
            + Add Award
          </button>
        )}

        <div className="mt-10 px-10">
          <ul className="space-y-4 text-gray-300">
            {awards.map((award) => (
              <li key={award.id} className="relative">
                <span>🏆 <b>{award.title}</b> - {award.date}</span>
                {isAdmin && (
                  <div className="absolute top-0 right-0 flex space-x-2">
                    <button
                      onClick={() => updateAward(award.id)}
                      className="px-4 py-1 bg-yellow-500 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteAward(award.id)}
                      className="px-4 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                )}
                <div className="text-gray-400">{award.description}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
