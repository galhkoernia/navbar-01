/*
 * File  : Navbar.js
 * Created on Tue Oct 24 2025
 * Galuh Kurnia
 * Copyright (c) 2025 Your Company
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function NavLinks() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  const isActive = (path) => pathname?.startsWith(path);

  const navLinks = [
    { href: "/", label: "Home", color: "from-blue-400 to-blue-600" },
    { href: "/about_me", label: "About Me", color: "from-purple-400 to-purple-600",},
    { href: "/my_work", label: "My Work", color: "from-purple-400 to-purple-600",},
    { href: "/contact", label: "Contact", color: "from-cyan-400 to-cyan-600" },
    { href: "/blog", label: "Blog", color: "from-pink-400 to-pink-600" },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-1 relative">
        {navLinks.map((link) => {
          const isHovered = hoveredLink === link.href;
          const active = isActive(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-4 py-2 z-10 transition-all duration-300 ${
                active
                  ? "text-white font-medium"
                  : "text-gray-300 hover:text-white"
              }`}
              onMouseEnter={() => setHoveredLink(link.href)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {link.label}

              {/* Animated underline */}
              <motion.div
                className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${link.color}`}
                initial={{ width: 0 }}
                animate={{ width: active || isHovered ? "100%" : 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </Link>
          );
        })}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <button
          className="p-2 text-gray-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-14 left-0 w-full bg-gray-800/95 backdrop-blur-lg flex flex-col items-center space-y-4 py-6 z-50"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-lg ${
                    isActive(link.href)
                      ? "text-white font-medium"
                      : "text-gray-300 hover:text-white"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)} // tutup menu setelah klik
                >
                  {link.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
