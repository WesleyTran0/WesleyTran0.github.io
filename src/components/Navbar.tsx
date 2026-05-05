"use client"

import { usePathname } from "next/navigation";

export default function Navbar() {
  const navLinks = [
    { key: 1, label: "home", href: "/", kind: "section" as const },
    { key: 2, label: "projects", href: "/projects", kind: "section" as const },
    { key: 3, label: "contact", href: "/contact", kind: "modal" as const },
    // { label: 'Blogs', href: '/blogs' }
  ];

  function isActive(href: string): boolean {
    if (href === '/') {
      return usePathname() === '/';
    }
    return usePathname().startsWith(href);
  }


  return (
    <nav className="sticky flex flex-row justify-between px-7 py-5 border-b border-border-soft bg-surface">
      <a href="/" className="font-medium text-text">wesleytran<span className="text-accent">.me</span></a>
      <div className="flex gap-7">
        {navLinks.map((link) => {
          const active: boolean = link.kind === "section" && isActive(link.href);
          const labelColor = active
            ? 'text-text'
            : 'text-muted hover:text-text transition-colors';

          return (<button className="flex flex-row font-medium gap-2">
            <span className="text-accent">[{link.key}]</span>
            <span className={labelColor}>{link.label}</span>
          </button>)
        })}
      </div>
    </nav>
  )
}
