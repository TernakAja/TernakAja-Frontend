import { useState, useEffect } from "react";
import { ArrowUpCircle } from "lucide-react"; // Menggunakan ikon dari Lucide

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Menyembunyikan atau menampilkan tombol berdasarkan scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) { // Tampilkan tombol setelah scroll lebih dari 300px
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener saat komponen unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fungsi untuk scroll ke atas
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll dengan efek halus
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
      >
        <ArrowUpCircle className="w-6 h-6" />
      </button>
    )
  );
};

export default ScrollToTopButton;
