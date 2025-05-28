"use client";
import React, { useState, useEffect } from "react";

export default function ProductModal({ onClose, onSave, initialProduct }) {
  const [form, setForm] = useState(
    initialProduct || { name: "", description: "", price: "", image: "", rating: 4.5 }
  );
  const [imgPreview, setImgPreview] = useState(initialProduct?.image || "");
  const [imgFile, setImgFile] = useState(null);

  useEffect(() => {
    if (initialProduct) {
      setForm(initialProduct);
      setImgPreview(initialProduct.image || "");
    }
  }, [initialProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImgFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImgPreview(ev.target.result);
      setForm((f) => ({ ...f, image: ev.target.result }));
    };
    reader.readAsDataURL(file);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    onSave({ ...form, price: parseFloat(form.price), id: form.id || Date.now() });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl">&times;</button>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-xl font-bold mb-2">{form.id ? "Modifier" : "Ajouter"} un produit</h2>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Nom" className="input" required />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="input" />
          <input name="price" value={form.price} onChange={handleChange} placeholder="Prix" type="number" className="input" required />
          {/* Champ image fichier */}
          <label className="block">
            <span className="block mb-1 font-medium">Image du produit</span>
            <input type="file" accept="image/*" onChange={handleImageChange} className="mb-2" />
            {imgPreview && (
              <img src={imgPreview} alt="Aperçu" className="w-32 h-24 object-cover rounded-lg border mb-2" />
            )}
          </label>
          <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-2 font-semibold mt-2">{form.id ? "Modifier" : "Ajouter"}</button>
        </form>
      </div>
    </div>
  );
}
