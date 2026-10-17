"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AppGrid } from "@/components/AppGrid";
import { PrivacySummary } from "@/components/PrivacySummary";
import { DeletionSection } from "@/components/DeletionSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { DeleteDataModal } from "@/components/DeleteDataModal";

export default function Home() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("action") === "delete") {
      setIsDeleteModalOpen(true);
    }
  }, []);

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b1326] text-[#dae2fd] selection:bg-indigo-600 selection:text-white">
      {/* Global Header */}
      <Header onOpenDeleteModal={handleOpenDeleteModal} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onOpenDeleteModal={handleOpenDeleteModal} />

        {/* 2. App Showcase Grid */}
        <AppGrid />

        {/* 3. Privacy Policy Summary */}
        <PrivacySummary />

        {/* 4. Data Deletion Guide & Action */}
        <DeletionSection onOpenDeleteModal={handleOpenDeleteModal} />

        {/* 5. FAQ Section */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer onOpenDeleteModal={handleOpenDeleteModal} />

      {/* 2-Step Google Auth Data Deletion Modal */}
      <DeleteDataModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
      />
    </div>
  );
}
