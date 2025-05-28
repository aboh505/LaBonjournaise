"use client";
import React, { useEffect } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.replace("/login");
    }
  }, [user, router]);

  // Optionnel : afficher un écran de chargement si user non encore chargé
  if (!user || user.role !== "admin") {
    return <div className="flex items-center justify-center min-h-screen text-xl text-gray-500">Redirection...</div>;
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
