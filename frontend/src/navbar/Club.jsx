"use client";

import React, { useState } from "react";
import Layout from "@/components/Layout";
import { FocusCards } from "@/components/ui/focus-cards";

export default function Club() {
  // Use the provided image URLs and club names
  const clubCards = [
    { title: "AUST Robotics Club", src: "https://ik.imagekit.io/qlaegzdb2/Adobe%20Express%20-%20file%20(86).png", url: "https://austpic.com/" },
    { title: "AUST Robotics Club 2", src: "https://ik.imagekit.io/qlaegzdb2/Adobe%20Express%20-%20file%20(87).png", url: "https://aust.edu/austrc" },
    { title: "BUET Club", src: "https://ik.imagekit.io/qlaegzdb2/271756523_109469641627057_2744856006829852045_n_1_removebg_preview.png", url: "http://www.buet.ac.bd/clubs" },
    { title: "RUET Club", src: "https://ik.imagekit.io/qlaegzdb2/476816991_1031997955634005_5751634906524642340_n_removebg_preview.png", url: "https://www.ruet.ac.bd/clubs" },
    { title: "CUET Club", src: "https://ik.imagekit.io/qlaegzdb2/495506446_1085555516933852_7516840257830876744_n_removebg_preview.png", url: "https://www.cuet.ac.bd/clubs" },
    { title: "Dhaka University Club", src: "https://ik.imagekit.io/qlaegzdb2/526631485_782085651020538_1352053436245588455_n_removebg_preview.png", url: "https://www.du.ac.bd/clubs" },
    { title: "NSU Club", src: "https://ik.imagekit.io/qlaegzdb2/austpic%20new%20logo%20(light%20theme)-01%20(1)%20(2).png?updatedAt=1756048907819", url: "https://www.northsouth.edu/clubs" },
    { title: "BRAC University Club", src: "https://ik.imagekit.io/qlaegzdb2/Adobe%20Express%20-%20file%20(87).png", url: "https://www.bracu.ac.bd/clubs" },
    { title: "United International University (UIU) Clubs", src: "https://ik.imagekit.io/qlaegzdb2/Adobe%20Express%20-%20file%20(86).png", url: "https://www.uiu.ac.bd/clubs" },
    { title: "RU Club", src: "https://ik.imagekit.io/qlaegzdb2/271756523_109469641627057_2744856006829852045_n_1_removebg_preview.png", url: "https://www.ru.ac.bd/clubs" },
    { title: "Chittagong University Club (CU)", src: "https://ik.imagekit.io/qlaegzdb2/476816991_1031997955634005_5751634906524642340_n_removebg_preview.png", url: "https://www.cu.ac.bd/clubs" },
    { title: "Khulna University of Engineering & Technology (KUET)", src: "https://ik.imagekit.io/qlaegzdb2/495506446_1085555516933852_7516840257830876744_n_removebg_preview.png", url: "https://www.kuet.ac.bd/clubs" },
    { title: "Shahjalal University of Science and Technology (SUST) Clubs", src: "https://ik.imagekit.io/qlaegzdb2/526631485_782085651020538_1352053436245588455_n_removebg_preview.png", url: "https://www.sust.edu/clubs" },
    // Continue to add more clubs with image and URL...
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [clubsPerPage] = useState(12);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClubs = clubCards.filter((club) =>
    club.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get clubs for the current page
  const indexOfLastClub = currentPage * clubsPerPage;
  const indexOfFirstClub = indexOfLastClub - clubsPerPage;
  const currentClubs = filteredClubs.slice(indexOfFirstClub, indexOfLastClub);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredClubs.length / clubsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 text-white">
      <Layout>
        {/* Global background */}
        <BackgroundFX />

        <section className="relative z-10 mx-auto w-[min(1200px,92%)] pt-12 sm:pt-16 md:pt-20 pb-20 sm:pb-24 md:pb-28">
          {/* Title */}
          <h2 className="mt-8 mb-8 text-4xl font-bold text-center bg-gradient-to-r from-indigo-500 via-sky-300 to-fuchsia-300 bg-clip-text text-transparent">
            Explore University Clubs
          </h2>

          {/* Search Filter Bar */}
          <div className="flex justify-center mb-8">
            <input
              type="text"
              placeholder="Search for a club..."
              className="rounded-lg py-2 px-4 text-white bg-neutral-800 border border-neutral-600 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-teal-400"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Club Cards */}
          <FocusCards
            cards={currentClubs.map((club) => ({
              title: club.title,
              src: club.src,
              onClick: () => window.open(club.url, "_blank"),
              websiteButton: (
                <button
                  onClick={() => window.open(club.url, "_blank")}
                  className="mt-3 py-2 px-4 rounded-lg bg-teal-400 text-white hover:bg-teal-500 transition-colors"
                >
                  Visit Website
                </button>
              ),
            }))}
          />

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <nav>
              <ul className="flex gap-4 items-center">
                <li>
                  <button
                    onClick={prevPage}
                    className="px-4 py-2 rounded-lg text-white bg-neutral-700 hover:bg-teal-400 transition-colors"
                  >
                    &lt;
                  </button>
                </li>
                {Array.from({ length: Math.ceil(filteredClubs.length / clubsPerPage) }, (_, index) => (
                  <li key={index}>
                    <button
                      onClick={() => paginate(index + 1)}
                      className={`px-4 py-2 rounded-lg text-white bg-neutral-700 hover:bg-teal-400 transition-colors ${
                        currentPage === index + 1 ? "bg-teal-400" : ""
                      }`}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={nextPage}
                    className="px-4 py-2 rounded-lg text-white bg-neutral-700 hover:bg-teal-400 transition-colors"
                  >
                    &gt;
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </section>
      </Layout>
    </main>
  );
}

/* BackgroundFX component */
function BackgroundFX() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_10%_-10%,#7d9dd2_12%,transparent_60%),radial-gradient(1000px_600px_at_90%_-10%,#3fc3b1_12%,transparent_60%)] opacity-30" />
      <div className="pointer-events-none absolute -top-40 -left-32 h-[36rem] w-[36rem] rounded-full bg-[#7d9dd2]/25 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute -top-32 -right-32 h-[32rem] w-[32rem] rounded-full bg-[#3fc3b1]/25 blur-3xl animate-float-slower" />
    </>
  );
}
