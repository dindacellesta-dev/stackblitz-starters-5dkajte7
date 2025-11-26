"use client";

import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

interface Cerita {
  judul: string;
  isi: string;
  balasan?: string;
}

export default function BacaCeritaPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [cerita, setCerita] = useState<Cerita | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDoc(doc(db, "cerita", id));
      if (snap.exists()) {
        setCerita(snap.data() as Cerita);
      }
    };
    fetch();
  }, [id]);

  if (!cerita) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-[#F1F5FF] p-6">
      <h1 className="text-xl font-bold">{cerita.judul}</h1>

      <div className="bg-white p-4 rounded-xl shadow mt-4">
        <p className="whitespace-pre-line">{cerita.isi}</p>
      </div>

      {/* === BAGIAN BALASAN === */}
      {cerita.balasan && (
        <div className="bg-blue-50 p-4 rounded-xl mt-4 border border-blue-200">
          <h2 className="font-semibold text-blue-700">Balasan Guru BK:</h2>
          <p className="mt-1 whitespace-pre-line text-gray-700">
            {cerita.balasan}
          </p>
        </div>
      )}
    </div>
  );
}