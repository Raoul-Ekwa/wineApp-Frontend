// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "../api/userApi";

const ProfilePage = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserProfile();
        setUser({ name: data.name, email: data.email });
      } catch (err) {
        console.error("Erreur chargement profil:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateUserProfile(user);
      alert("Profil mis à jour !");
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Chargement du profil...</p>;

  return (
    <div className="profile-page">
      <h1>Mon Profil</h1>
      <label>
        Nom:
        <input name="name" value={user.name} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input name="email" value={user.email} onChange={handleChange} />
      </label>
      <button onClick={handleSave} disabled={saving}>
        {saving ? "Sauvegarde en cours..." : "Sauvegarder"}
      </button>
    </div>
  );
};

export default ProfilePage;
