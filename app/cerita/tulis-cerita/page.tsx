"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function TulisCeritaPage() {
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const router = useRouter();

  const kirimCerita = async () => {
    if (!judul.trim() || !isi.trim()) {
      alert("Judul dan isi harus diisi ya!");
      return;
    }

    await addDoc(collection(db, "cerita"), {
      judul,
      isi,
      createdAt: serverTimestamp(),
    });

    router.push("/beranda");
  };

  return (
    <div className="min-h-screen bg-[#CDE7FF] flex justify-center py-10 px-5">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">

        <h1 className="text-xl font-bold text-blue-700 mb-4">
          Tulis Ceritamu ✨
        </h1>

        {/* Input Judul */}
        <input
          type="text"
          placeholder="Judul cerita…"
          className="
            w-full p-3 
            border border-gray-300 
            rounded-xl 
            mb-4
            text-gray-900
            placeholder-gray-500
            bg-white
            focus:outline-none
            focus:ring-2
            focus:ring-blue-400
          "
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
        />

        {/* Input Isi */}
        <textarea
          rows={6}
          placeholder="Tulis ceritamu di sini…"
          className="
            w-full p-3 
            border border-gray-300 
            rounded-xl 
            text-gray-900
            placeholder-gray-500
            bg-white
            focus:outline-none
            focus:ring-2
            focus:ring-blue-400
          "
          value={isi}
          onChange={(e) => setIsi(e.target.value)}
        />

        <button
          onClick={kirimCerita}
          className="w-full mt-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
        >
          Kirim Cerita
        </button>

      </div>
    </div>
  );
}