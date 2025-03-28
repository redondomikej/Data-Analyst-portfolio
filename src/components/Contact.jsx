import React, { useState, useEffect } from "react";
import { auth, signIn, logOut, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

const adminEmails = ["Jamilmendez1016@gmail.com", "redondomikej@gmail.com"];

export default function Contact() {
  const [user, setUser] = useState(null);
  const [contacts, setContacts] = useState([]);

  // Listen for authentication state changes
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  // Listen for real-time changes to the contacts collection
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "contacts"), (snapshot) => {
      const fetchedContacts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContacts(fetchedContacts);
    });

    // Cleanup listener when component unmounts
    return () => unsubscribe();
  }, []);

  const isAdmin = user && adminEmails.includes(user.email);

  // Add a new contact
  const addContact = async () => {
    const title = prompt("Enter contact title (e.g., Email, Phone):");
    const value = prompt("Enter contact value (e.g., email or phone number):");

    if (title && value) {
      try {
        // Add contact to Firestore
        await addDoc(collection(db, "contacts"), { title, value });
      } catch (error) {
        console.error("Error adding contact: ", error);
      }
    }
  };

  // Delete a contact
  const deleteContact = async (contactId) => {
    try {
      // Delete contact from Firestore
      await deleteDoc(doc(db, "contacts", contactId));
    } catch (error) {
      console.error("Error deleting contact: ", error);
    }
  };

  // Update a contact
  const updateContact = async (contactId) => {
    const contact = contacts.find((contact) => contact.id === contactId);
    const newTitle = prompt("Enter new title:", contact.title);
    const newValue = prompt("Enter new value:", contact.value);

    if (newTitle && newValue) {
      try {
        // Update contact in Firestore
        const contactRef = doc(db, "contacts", contactId);
        await updateDoc(contactRef, { title: newTitle, value: newValue });
      } catch (error) {
        console.error("Error updating contact: ", error);
      }
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#1B263B] text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-cyan-400">Contact Information</h2>

        {user ? (
          <button onClick={logOut} className="mb-4 px-4 py-2 bg-red-500 rounded text-white">
            Logout
          </button>
        ) : (
          <button
            onClick={signIn}
            className="absolute top-2 right-2 text-sm text-blue-500 opacity-30 hover:opacity-100"
          >
            Admin
          </button>
        )}

        {isAdmin && (
          <button onClick={addContact} className="mb-4 px-4 py-2 bg-green-500 rounded text-white">
            + Add Contact
          </button>
        )}

        <div className="mt-10 px-10">
          <ul className="space-y-4 text-gray-300">
            {contacts.map((contact) => (
              <li key={contact.id} className="relative">
                <span><b>{contact.title}:</b> {contact.value}</span>
                {isAdmin && (
                  <div className="absolute top-0 right-0 flex space-x-2">
                    <button
                      onClick={() => updateContact(contact.id)}
                      className="px-4 py-1 bg-yellow-500 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteContact(contact.id)}
                      className="px-4 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
