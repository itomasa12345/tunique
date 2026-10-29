"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { navigation } from "@/lib/site";
export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const mobileNavigation = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    mobileNavigation.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);
  return (
    <header className="header">
      <Link
        href="/"
        className="wordmark"
        onClick={() => setOpen(false)}
        aria-label="TUNIQUE ホーム"
      >
        TUNIQUE
        <span className="brand-dot" />
      </Link>
      <nav className="desktop-nav" aria-label="メインナビゲーション">
        {navigation.map((x) => (
          <Link
            key={x.href}
            href={x.href}
            aria-current={path === x.href ? "page" : undefined}
          >
            {x.label}
          </Link>
        ))}
        <Link
          className="nav-contact"
          href="/contact"
          aria-current={path === "/contact" ? "page" : undefined}
        >
          CONTACT <span aria-hidden="true">↗</span>
        </Link>
      </nav>
      <button
        className="menu-toggle"
        ref={menuButton}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "メニューを閉じる" : "メニューを開く"}
        onClick={() => setOpen(!open)}
      >
        {open ? "CLOSE −" : "MENU +"}
      </button>
      {open && (
        <nav
          id="mobile-nav"
          ref={mobileNavigation}
          className="mobile-nav"
          aria-label="モバイルナビゲーション"
        >
          {[
            { href: "/", label: "HOME" },
            ...navigation,
            { href: "/contact", label: "CONTACT" },
          ].map((x, i) => (
            <Link key={x.href} href={x.href} onClick={() => setOpen(false)}>
              <span>0{i + 1}</span>
              {x.label}
              <span>↗</span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
