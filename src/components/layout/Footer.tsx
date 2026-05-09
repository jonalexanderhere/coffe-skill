import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  MapPin,
  Phone,
  Code,
  Briefcase,
  Camera,
  PlaySquare,
} from "lucide-react";

const footerLinks = {
  platform: [
    { label: "Explore Kursus", href: "/explore" },
    { label: "Event & Webinar", href: "/events" },
    { label: "Community", href: "/community" },
    { label: "Subscription", href: "/subscription" },
    { label: "Sertifikat", href: "/certificate" },
  ],
  company: [
    { label: "Tentang Kami", href: "/about" },
    { label: "Kontak", href: "/contact" },
    { label: "Karir", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Press Kit", href: "#" },
  ],
  support: [
    { label: "Pusat Bantuan", href: "#" },
    { label: "FAQ", href: "/#faq" },
    { label: "Kebijakan Privasi", href: "#" },
    { label: "Syarat & Ketentuan", href: "#" },
    { label: "Panduan Mentor", href: "#" },
  ],
};

const socials = [
  { icon: Code, href: "#", label: "GitHub" },
  { icon: Briefcase, href: "#", label: "LinkedIn" },
  { icon: Camera, href: "#", label: "Instagram" },
  { icon: PlaySquare, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-coffee-800 dark:bg-charcoal text-coffee-200">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <Image
                src="/coffeskill.png"
                alt="CoffeeSkill"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span
                className="text-xl font-bold tracking-tight text-white"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Coffee<span className="text-accent">Skill</span>
              </span>
            </Link>
            <p className="text-coffee-300 text-sm leading-relaxed mb-6 max-w-sm">
              Platform pembelajaran teknologi modern dari Lampung Barat.
              Belajar skill digital bersama mentor berpengalaman, kapan saja,
              di mana saja.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2.5 rounded-xl bg-coffee-700/50 hover:bg-coffee-600 text-coffee-300 hover:text-white transition-colors"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Platform</h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-coffee-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Perusahaan</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-coffee-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Dukungan</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-coffee-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-coffee-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-coffee-400 text-center md:text-left">
              <p>&copy; {new Date().getFullYear()} CoffeeSkill. All rights reserved.</p>
              <p className="mt-1 text-coffee-500 text-xs">
                Production by <span className="text-coffee-300">Ghifari Azhar</span> · Powered by{" "}
                <span className="text-coffee-300">LTEC (Liwa Technology Excellence Community)</span>
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-coffee-500">
              <span className="flex items-center gap-1.5">
                <MapPin size={12} />
                Lampung Barat, Indonesia
              </span>
              <span className="flex items-center gap-1.5">
                <Mail size={12} />
                hello@coffeeskill.id
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
