/*
import { useState, useEffect } from "react";
import axios from "axios";

export default function VehicleForm() {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    licensePlate: "",
    year: "",
  });

  const [vehicles, setVehicles] = useState([]);

  // To get the list of cars after loading
  useEffect(() => {
    axios.get("http://localhost:3000/api/vehicles")
      .then(res => setVehicles(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3000/api/vehicles", formData)
      .then(res => {
        setVehicles([...vehicles, res.data]);
        setFormData({ brand: "", model: "", licensePlate: "", year: "" });
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">ثبت خودرو</h2>

      <form onSubmit={handleSubmit} className="space-y-2">
        <input type="text" name="brand" placeholder="برند" value={formData.brand} onChange={handleChange} className="border p-2 w-full" required />
        <input type="text" name="model" placeholder="مدل" value={formData.model} onChange={handleChange} className="border p-2 w-full" required />
        <input type="text" name="licensePlate" placeholder="پلاک" value={formData.licensePlate} onChange={handleChange} className="border p-2 w-full" required />
        <input type="number" name="year" placeholder="سال ساخت" value={formData.year} onChange={handleChange} className="border p-2 w-full" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">ثبت</button>
      </form>

      <h3 className="text-lg font-semibold mt-6 mb-2">لیست خودروها</h3>
      <ul className="list-disc pl-6">
        {vehicles.map((v, i) => (
          <li key={i}>
            {v.brand} {v.model} - {v.licensePlate} ({v.year})
          </li>
        ))}
      </ul>
    </div>
  );
}
*/