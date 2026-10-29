
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

const experiences = [
  {
    title: "The Golden Letter",
    description: "A letter, sealed with care.",
    href: "/experiences/golden-letter",
    available: true,
  },
  {
    title: "Bloom",
    description: "A little garden of wishes.",
    href: null,
    available: false,
  },
  {
    title: "Story Arc",
    description: "Moments woven into a story.",
    href: null,
    available: false,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="evermore-nav">
      <div className="evermore-nav-inner">
        <Link
          href="/"
          className="evermore-nav-brand"
          aria-label="Evermore home"
        >
          evermore<span>.</span>
        </Link>

        <nav
          className="evermore-nav-desktop"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className={`evermore-nav-link ${
              isActive("/") ? "is-active" : ""
            }`}
          >
            Home
          </Link>

          <div
            className="evermore-nav-dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              type="button"
              className={`evermore-nav-link evermore-nav-dropdown-trigger ${
                pathname.startsWith("/experiences") ? "is-active" : ""
              }`}
              aria-expanded={dropdownOpen}
              onClick={() => setDropdownOpen((open) => !open)}
            >
              Experiences
              <ChevronDown
                size={14}
                className={dropdownOpen ? "is-rotated" : ""}
              />
            </button>

            <div
              className={`evermore-nav-dropdown-panel ${
                dropdownOpen ? "is-open" : ""
              }`}
              aria-hidden={!dropdownOpen}
            >
              <div className="evermore-nav-dropdown-heading">
                <span>THE COLLECTION</span>
                <span>01 — 03</span>
              </div>

              {experiences.map((experience, index) => (
                <div
                  className="evermore-nav-experience"
                  key={experience.title}
                >
                  {experience.available ? (
                    <Link
                      href={experience.href}
                      className="evermore-nav-experience-link"
                      tabIndex={dropdownOpen ? 0 : -1}
                    >
                      <span className="evermore-nav-experience-number">
                        0{index + 1}
                      </span>

                      <span className="evermore-nav-experience-copy">
                        <span>{experience.title}</span>
                        <small>{experience.description}</small>
                      </span>

                      <ArrowUpRight size={15} />
                    </Link>
                  ) : (
                    <div className="evermore-nav-experience-link is-coming">
                      <span className="evermore-nav-experience-number">
                        0{index + 1}
                      </span>

                      <span className="evermore-nav-experience-copy">
                        <span>{experience.title}</span>
                        <small>{experience.description}</small>
                      </span>

                      <span className="evermore-nav-coming-label">
                        SOON
                      </span>
                    </div>
                  )}
                </div>
              ))}

              <Link
                href="/experiences"
                className="evermore-nav-view-all"
                tabIndex={dropdownOpen ? 0 : -1}
              >
                Explore the collection
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>

          <Link
            href="/about"
            className="evermore-nav-link"
          >
            About
          </Link>
        </nav>

        <div className="evermore-nav-actions">
          <Link
            href="/experiences"
            className="evermore-nav-cta"
          >
            Explore collection
            <ArrowUpRight size={15} />
          </Link>

          <button
            type="button"
            className="evermore-nav-menu-button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      <div
        className={`evermore-nav-mobile ${
          menuOpen ? "is-open" : ""
        }`}
        aria-hidden={!menuOpen}
      >
        <nav
          className="evermore-nav-mobile-inner"
          aria-label="Mobile navigation"
          inert={!menuOpen}
        >
          <Link
            href="/"
            className="evermore-nav-mobile-link"
            tabIndex={menuOpen ? 0 : -1}
          >
            <span>01</span>
            Home
            <ArrowUpRight size={17} />
          </Link>

          <Link
            href="/experiences"
            className="evermore-nav-mobile-link"
            tabIndex={menuOpen ? 0 : -1}
          >
            <span>02</span>
            Experiences
            <ArrowUpRight size={17} />
          </Link>

          <div className="evermore-nav-mobile-submenu">
            {experiences.map((experience, index) => (
              <div key={experience.title}>
                {experience.available ? (
                  <Link
                    href={experience.href}
                    className="evermore-nav-mobile-experience"
                    tabIndex={menuOpen ? 0 : -1}
                  >
                    {experience.title}
                    <ArrowUpRight size={14} />
                  </Link>
                ) : (
                  <div className="evermore-nav-mobile-experience is-coming">
                    {experience.title}
                    <span>COMING SOON</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <Link
            href="/about"
            className="evermore-nav-mobile-link"
            tabIndex={menuOpen ? 0 : -1}
          >
            <span>03</span>
            About
            <ArrowUpRight size={17} />
          </Link>

          <div className="evermore-nav-mobile-footer">
            <span>A LITTLE WORLD, MADE WITH CARE.</span>
            <span>EVERMORE © 2026</span>
          </div>
        </nav>
      </div>
    </header>
  );
}
