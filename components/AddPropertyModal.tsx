import React, { useState } from "react";
import { X, Upload } from "lucide-react";
import { Property } from "../types";

interface AddPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (property: Property) => void;
}

const AddPropertyModal: React.FC<AddPropertyModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState<Partial<Property>>({
    title: "",
    price: 0,
    location: "",
    type: "Residential",
    status: "Available",
    beds: 0,
    baths: 0,
    sqft: 0,
    image: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.location) return;

    const newProperty: Property = {
      id: `p${Date.now()}`,
      title: formData.title || "",
      price: Number(formData.price),
      location: formData.location || "",
      coords: [33.8938, 35.5018], // Default to Beirut coords for now
      type: formData.type as "Residential" | "Commercial" | "Industrial",
      status: formData.status as "Available" | "Pending" | "Sold",
      beds: Number(formData.beds),
      baths: Number(formData.baths),
      sqft: Number(formData.sqft),
      image:
        formData.image ||
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800", // Default image
      assignedBrokerId: undefined,
    };

    onAdd(newProperty);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Add New Property</h2>
            <p className="text-slate-500 font-medium text-sm">Enter the details for the new listing</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                Property Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-bold text-slate-900"
                placeholder="e.g. Luxury Downtown Apartment"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-bold text-slate-900"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-bold text-slate-900"
                placeholder="e.g. Achrafieh, Beirut"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-bold text-slate-900"
              >
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Industrial">Industrial</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-bold text-slate-900"
              >
                <option value="Available">Available</option>
                <option value="Pending">Pending</option>
                <option value="Sold">Sold</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Bedrooms</label>
              <input
                type="number"
                name="beds"
                value={formData.beds}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Bathrooms</label>
              <input
                type="number"
                name="baths"
                value={formData.baths}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                Square Feet
              </label>
              <input
                type="number"
                name="sqft"
                value={formData.sqft}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-bold text-slate-900"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Image URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-bold text-slate-900"
                  placeholder="https://..."
                />
                <button
                  type="button"
                  className="px-4 py-3 bg-slate-100 rounded-xl text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  <Upload size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-slate-100 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-200"
            >
              Add Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyModal;
