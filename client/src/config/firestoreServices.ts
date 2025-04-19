import { collection, doc, getDoc, getDocs, setDoc, deleteDoc } from "firebase/firestore";
import db from "../config/firebaseConfig"; // Import Firestore instance

// Add a new caregiver profile
export const addCaregiverProfile = async (data: {
  caregiverName: string;
  childName: string;
  childAgeRange: string;
  diagnoses: string[];
  communicationStyle: string;
  language: string;
}) => {
  try {
    const colRef = collection(db, "caregiverProfiles"); // Collection name
    const newDocRef = doc(colRef); // Auto-generate an ID
    await setDoc(newDocRef, data);
    return { id: newDocRef.id, ...data };
  } catch (error) {
    console.error("Error adding caregiver profile:", error);
    throw error;
  }
};

// Get all caregiver profiles
export const getCaregiverProfiles = async () => {
  try {
    const colRef = collection(db, "caregiverProfiles"); // Collection name
    const querySnapshot = await getDocs(colRef);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching caregiver profiles:", error);
    throw error;
  }
};

// Update an existing caregiver profile by ID
export const updateCaregiverProfile = async (
  docId: string,
  data: {
    caregiverName?: string;
    childName?: string;
    childAgeRange?: string;
    diagnoses?: string[];
    communicationStyle?: string;
    language?: string;
  }
) => {
  try {
    const docRef = doc(db, "caregiverProfiles", docId); // Reference to the document
    await setDoc(docRef, data, { merge: true }); // Merge updates with existing data
    return { id: docId, ...data };
  } catch (error) {
    console.error("Error updating caregiver profile:", error);
    throw error;
  }
};

// Delete a caregiver profile by ID
export const deleteCaregiverProfile = async (docId: string) => {
  try {
    const docRef = doc(db, "caregiverProfiles", docId); // Reference to the document
    await deleteDoc(docRef); // Delete the document
    return { id: docId, message: "Profile successfully deleted" };
  } catch (error) {
    console.error("Error deleting caregiver profile:", error);
    throw error;
  }
};