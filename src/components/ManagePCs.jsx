// import React, { useEffect, useState, useRef } from "react";

// export default function ManagePCs() {
//   const [pcs, setPcs] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     full_description: "",
//   });
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState("");
//   const [editingId, setEditingId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");
//   const [dragOver, setDragOver] = useState(false);
//   const fileInputRef = useRef(null);

//   const token = localStorage.getItem("token");

//   // ✅ Fetch logged-in user's blogs safely
//   useEffect(() => {
//     const fetchMyBlogs = async () => {
//       if (!token) {
//         setMessage("⚠️ Please log in to manage your blogs.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await fetch(`${import.meta.env.VITE_API_URL}/api/pcs/my`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (res.status === 401) {
//           // Token invalid or expired
//           localStorage.removeItem("token");
//           setMessage("⚠️ Session expired. Please log in again.");
//           setLoading(false);
//           return;
//         }

//         if (!res.ok) throw new Error("Failed to load blogs");

//         const data = await res.json();
//         setPcs(Array.isArray(data) ? data : []);
//       } catch (error) {
//         console.error("Error fetching user PCs:", error);
//         setMessage("❌ Unable to connect to server.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMyBlogs();
//   }, [token]);

//   // ✅ Handle input changes
//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   // ✅ Handle drag-drop
//   const handleDrop = (e) => {
//     e.preventDefault();
//     setDragOver(false);
//     const file = e.dataTransfer.files[0];
//     if (file) handleFile(file);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setDragOver(true);
//   };

//   const handleDragLeave = () => setDragOver(false);

//   // ✅ Handle file input
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) handleFile(file);
//   };

//   // ✅ Preview selected image
//   const handleFile = (file) => {
//     setImageFile(file);
//     const reader = new FileReader();
//     reader.onloadend = () => setImagePreview(reader.result);
//     reader.readAsDataURL(file);
//   };

//   // ✅ Create or Update Blog
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!token) {
//       alert("You must log in first!");
//       return;
//     }

//     try {
//       const method = editingId ? "PUT" : "POST";
//       const url = editingId
//         ? `${import.meta.env.VITE_API_URL}/api/pcs/${editingId}`
//         : `${import.meta.env.VITE_API_URL}/api/pcs`;

//       const formData = new FormData();
//       formData.append("name", form.name);
//       formData.append("description", form.description);
//       formData.append("full_description", form.full_description);
//       if (imageFile) formData.append("image", imageFile);

//       const res = await fetch(url, {
//         method,
//         headers: { Authorization: `Bearer ${token}` },
//         body: formData,
//       });

//       const data = await res.json();
//       if (res.status === 401) {
//         setMessage("⚠️ Session expired. Please log in again.");
//         localStorage.removeItem("token");
//         return;
//       }

//       if (!res.ok) throw new Error(data.error || "Failed to save blog");

//       setMessage(data.message || "✅ Blog saved successfully!");
//       resetForm();

//       // Refresh list
//       await refreshBlogs();
//     } catch (error) {
//       console.error("Error saving blog:", error);
//       setMessage("❌ Failed to save blog.");
//     }
//   };

//   // ✅ Refresh user blogs
//   const refreshBlogs = async () => {
//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_URL}/api/pcs/my`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       setPcs(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error("Error refreshing blogs:", error);
//     }
//   };

//   // ✅ Reset form after submit
//   const resetForm = () => {
//     setForm({ name: "", description: "", full_description: "" });
//     setImageFile(null);
//     setImagePreview("");
//     setEditingId(null);
//   };

//   // ✅ Edit blog
//   const handleEdit = (pc) => {
//     setForm({
//       name: pc.name,
//       description: pc.description,
//       full_description: pc.full_description,
//     });
//     setImagePreview(
//       pc.image_url?.startsWith("http")
//         ? pc.image_url
//         : `${import.meta.env.VITE_API_URL}${pc.image_url}`
//     );
//     setEditingId(pc.id);
//     setMessage("✏️ Editing your blog...");
//   };

//   // ✅ Delete blog
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this blog?")) return;

//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_URL}/api/pcs/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const data = await res.json();

//       if (res.status === 401) {
//         setMessage("⚠️ Session expired. Please log in again.");
//         localStorage.removeItem("token");
//         return;
//       }

//       if (!res.ok) throw new Error(data.error || "Failed to delete blog");

//       setMessage(data.message || "🗑️ Blog deleted successfully!");
//       setPcs(pcs.filter((p) => p.id !== id));
//     } catch (error) {
//       console.error("Error deleting blog:", error);
//       setMessage("❌ Failed to delete blog.");
//     }
//   };

//   // ✅ Loading screen
//   if (loading)
//     return (
//       <div className="text-center text-green-400 mt-10 text-lg">
//         ⏳ Loading your blogs...
//       </div>
//     );

//   return (
//     <div className="max-w-5xl mx-auto mt-8 bg-[#001a00]/60 p-8 rounded-2xl border border-green-800 shadow-[0_0_30px_rgba(0,255,0,0.2)]">
//       <h1 className="text-3xl font-extrabold text-green-300 mb-6 text-center">
//         ⚙️ Manage Your Blogs
//       </h1>

//       {message && (
//         <div className="mb-6 text-center text-yellow-300 bg-[#002200]/60 rounded-lg py-2 border border-green-600">
//           {message}
//         </div>
//       )}

//       {/* 🧩 Blog Form */}
//       <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
//         <input
//           type="text"
//           name="name"
//           placeholder="Blog Title"
//           value={form.name}
//           onChange={handleChange}
//           className="p-3 rounded-md bg-black/60 text-green-300 border border-green-700"
//           required
//         />
//         <input
//           type="text"
//           name="description"
//           placeholder="Short Description"
//           value={form.description}
//           onChange={handleChange}
//           className="p-3 rounded-md bg-black/60 text-green-300 border border-green-700"
//           required
//         />

//         {/* 🖼️ Image Upload */}
//         <div
//           onDrop={handleDrop}
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//           onClick={() => fileInputRef.current.click()}
//           className={`col-span-1 sm:col-span-2 h-40 flex flex-col items-center justify-center rounded-md border-2 border-dashed cursor-pointer transition-all ${
//             dragOver ? "border-green-400 bg-green-900/20" : "border-green-700 bg-black/40"
//           } text-green-300`}
//         >
//           {imagePreview ? (
//             <div className="flex flex-col items-center">
//               <img
//                 src={imagePreview}
//                 alt="Preview"
//                 className="h-32 w-auto rounded-md border border-green-700 shadow-[0_0_10px_rgba(0,255,0,0.3)]"
//               />
//               <button
//                 type="button"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setImageFile(null);
//                   setImagePreview("");
//                 }}
//                 className="mt-2 text-sm text-red-400 hover:text-red-300 underline"
//               >
//                 Remove Image
//               </button>
//             </div>
//           ) : (
//             <>
//               <p>🖼️ Drag & Drop or Click to Upload</p>
//               <p className="text-sm text-green-400">Supports JPG, PNG</p>
//             </>
//           )}
//           <input
//             type="file"
//             accept="image/*"
//             ref={fileInputRef}
//             onChange={handleFileChange}
//             className="hidden"
//           />
//         </div>

//         <textarea
//           name="full_description"
//           placeholder="Full Description"
//           value={form.full_description}
//           onChange={handleChange}
//           className="p-3 col-span-1 sm:col-span-2 rounded-md bg-black/60 text-green-300 border border-green-700"
//           rows="3"
//         ></textarea>

//         <button
//           type="submit"
//           className="col-span-1 sm:col-span-2 py-3 mt-3 text-lg font-bold text-black bg-gradient-to-br from-green-600 to-green-400 rounded-lg hover:scale-105 transition-transform"
//         >
//           {editingId ? "💾 Update Blog" : "➕ Create Blog"}
//         </button>
//       </form>

//       {/* 🧩 Blog Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {pcs.length === 0 ? (
//           <p className="text-center col-span-full text-green-400 text-lg">
//             You haven’t created any blogs yet. Start by adding one!
//           </p>
//         ) : (
//           pcs.map((pc) => (
//             <div
//               key={pc.id}
//               className="p-4 rounded-lg border border-green-700 bg-black/60 shadow-[0_0_20px_rgba(0,255,0,0.3)] hover:shadow-[0_0_35px_rgba(0,255,0,0.6)] transition-all"
//             >
//               {pc.image_url && (
//                 <img
//                   src={
//                     pc.image_url.startsWith("http")
//                       ? pc.image_url
//                       : `${import.meta.env.VITE_API_URL}${pc.image_url}`
//                   }
//                   alt={pc.name}
//                   className="w-full h-40 object-cover rounded-md mb-3"
//                 />
//               )}
//               <h3 className="text-xl font-bold text-green-300 mb-1">{pc.name}</h3>
//               <p className="text-sm text-green-200 mb-2">{pc.description}</p>

//               <div className="flex justify-between">
//                 <button
//                   onClick={() => handleEdit(pc)}
//                   className="px-3 py-1 bg-yellow-400 text-black rounded-md hover:bg-yellow-300 font-semibold"
//                 >
//                   ✏️ Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(pc.id)}
//                   className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-500 font-semibold"
//                 >
//                   🗑️ Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState, useRef } from "react";

export default function ManagePCs() {
  const [pcs, setPcs] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    full_description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const token = localStorage.getItem("token");

  // ✅ Fetch user's blogs
  useEffect(() => {
    const fetchMyBlogs = async () => {
      if (!token) {
        setMessage("⚠️ Please log in to manage your blogs.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/pcs/my`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          localStorage.removeItem("token");
          setMessage("⚠️ Session expired. Please log in again.");
          setLoading(false);
          return;
        }

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load blogs");

        setPcs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setMessage("❌ Unable to connect to server.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyBlogs();
  }, [token]);

  // ✅ Handle input
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // ✅ Handle file
  const handleFile = (file) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  // ✅ Create or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("You must log in first!");
      return;
    }

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `${import.meta.env.VITE_API_URL}/api/pcs/${editingId}`
        : `${import.meta.env.VITE_API_URL}/api/pcs`;

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("full_description", form.full_description);
      if (imageFile) formData.append("image", imageFile);

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save blog");

      setMessage(data.message || "✅ Blog saved successfully!");
      resetForm();
      await refreshBlogs();
    } catch (error) {
      console.error("Error saving blog:", error);
      setMessage("❌ Failed to save blog.");
    }
  };

  // ✅ Refresh user's blogs
  const refreshBlogs = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/pcs/my`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setPcs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error refreshing blogs:", error);
    }
  };

  // ✅ Reset form
  const resetForm = () => {
    setForm({ name: "", description: "", full_description: "" });
    setImageFile(null);
    setImagePreview("");
    setEditingId(null);
  };

  // ✅ Edit
  const handleEdit = (pc) => {
    setForm({
      name: pc.name,
      description: pc.description,
      full_description: pc.full_description,
    });
    setImagePreview(
      pc.image_url?.startsWith("http")
        ? pc.image_url
        : `${import.meta.env.VITE_API_URL}${pc.image_url}`
    );
    setEditingId(pc.id);
    setMessage("✏️ Editing your blog...");
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/pcs/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete blog");

      setMessage(data.message || "🗑️ Blog deleted successfully!");
      setPcs(pcs.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
      setMessage("❌ Failed to delete blog.");
    }
  };

  if (loading)
    return <div className="text-center text-green-400 mt-10">⏳ Loading your blogs...</div>;

  return (
    <div className="max-w-5xl mx-auto mt-8 bg-[#001a00]/60 p-8 rounded-2xl border border-green-800 shadow-[0_0_30px_rgba(0,255,0,0.2)]">
      <h1 className="text-3xl font-extrabold text-green-300 mb-6 text-center">
        ⚙️ Manage Your Blogs
      </h1>

      {message && (
        <div className="mb-6 text-center text-yellow-300 bg-[#002200]/60 rounded-lg py-2 border border-green-600">
          {message}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <input
          type="text"
          name="name"
          placeholder="Blog Title"
          value={form.name}
          onChange={handleChange}
          className="p-3 rounded-md bg-black/60 text-green-300 border border-green-700"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Short Description"
          value={form.description}
          onChange={handleChange}
          className="p-3 rounded-md bg-black/60 text-green-300 border border-green-700"
          required
        />
        <textarea
          name="full_description"
          placeholder="Full Description"
          value={form.full_description}
          onChange={handleChange}
          className="p-3 col-span-1 sm:col-span-2 rounded-md bg-black/60 text-green-300 border border-green-700"
          rows="3"
        ></textarea>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="col-span-1 sm:col-span-2 text-green-300"
        />

        <button
          type="submit"
          className="col-span-1 sm:col-span-2 py-3 mt-3 text-lg font-bold text-black bg-gradient-to-br from-green-600 to-green-400 rounded-lg hover:scale-105 transition-transform"
        >
          {editingId ? "💾 Update Blog" : "➕ Create Blog"}
        </button>
      </form>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pcs.length === 0 ? (
          <p className="text-center col-span-full text-green-400 text-lg">
            You haven’t created any blogs yet. Start by adding one!
          </p>
        ) : (
          pcs.map((pc) => (
            <div
              key={pc.id}
              className="p-4 rounded-lg border border-green-700 bg-black/60 shadow-[0_0_20px_rgba(0,255,0,0.3)] hover:shadow-[0_0_35px_rgba(0,255,0,0.6)] transition-all"
            >
              {pc.image_url && (
                <img
                  src={
                    pc.image_url.startsWith("http")
                      ? pc.image_url
                      : `${import.meta.env.VITE_API_URL}${pc.image_url}`
                  }
                  alt={pc.name}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
              )}
              <h3 className="text-xl font-bold text-green-300 mb-1">{pc.name}</h3>
              <p className="text-sm text-green-200 mb-2">{pc.description}</p>

              <div className="flex justify-between">
                <button
                  onClick={() => handleEdit(pc)}
                  className="px-3 py-1 bg-yellow-400 text-black rounded-md hover:bg-yellow-300 font-semibold"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(pc.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-500 font-semibold"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
