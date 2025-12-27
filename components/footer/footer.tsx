"use client";
import { motion } from "framer-motion";
import { Instagram, Twitter, Facebook, Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("Footer");

  const footerLinks = {
    [t("links.product")]: [
      t("links.features"),
      t("links.pricing"),
      t("links.aiStyling"),
      t("links.wardrobeManager"),
      t("links.community"),
    ],
    [t("links.company")]: [
      t("links.aboutUs"),
      t("links.careers"),
      t("links.press"),
      t("links.partners"),
      t("links.blog"),
    ],
    [t("links.resources")]: [
      t("links.helpCenter"),
      t("links.tutorials"),
      t("links.apiDocs"),
      t("links.styleGuide"),
      t("links.inspiration"),
    ],
    [t("links.legal")]: [
      t("links.privacyPolicy"),
      t("links.termsOfService"),
      t("links.cookiePolicy"),
      t("links.licenses"),
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" },
  ];

  return (
    <footer className="relative pt-24 pb-12 px-6 overflow-hidden">
      {/* Complex gradient background using Outfitly vars */}
      <div
        className="absolute inset-0 transition-all duration-300"
        style={{
          background:
            "linear-gradient(to bottom, var(--outfitly-bg-primary), var(--outfitly-bg-secondary), var(--outfitly-bg-primary))",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-[var(--outfitly-primary)] via-transparent to-[var(--outfitly-primary-hover)] animate-gradient opacity-20" />

      {/* Gradient orbs (brand color) */}
      <motion.div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[var(--outfitly-primary)] blur-3xl opacity-20"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Decorative wave with gradient using Outfitly background vars */}
      <div className="absolute top-0 left-0 right-0 h-24 -mt-24">
        <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: "var(--outfitly-bg-secondary)", stopOpacity: 1 }}
              />
              <stop
                offset="50%"
                style={{ stopColor: "var(--outfitly-bg-primary)", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "var(--outfitly-bg-secondary)", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          <path
            fill="url(#waveGradient)"
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3
                className="text-4xl mb-4 bg-clip-text text-transparent transition-all duration-300"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, var(--outfitly-text-primary), var(--outfitly-text-secondary))",
                }}
              >
                Outfitly
              </h3>
              <p
                className="opacity-70 mb-6 leading-relaxed transition-colors duration-300"
                style={{ color: "var(--outfitly-text-primary)" }}
              >
                {t("brand.description")}
              </p>

              {/* Contact info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--outfitly-primary)] to-[var(--outfitly-primary-hover)] flex items-center justify-center">
                    <Mail className="w-4 h-4" style={{ color: "var(--outfitly-text-light)" }} />
                  </div>
                  <span
                    className="text-sm transition-colors duration-300"
                    style={{ color: "var(--outfitly-text-primary)" }}
                  >
                    {t("contact.email")}
                  </span>
                </div>
                <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--outfitly-primary)] to-[var(--outfitly-primary-hover)] flex items-center justify-center">
                    <Phone className="w-4 h-4" style={{ color: "var(--outfitly-text-light)" }} />
                  </div>
                  <span
                    className="text-sm transition-colors duration-300"
                    style={{ color: "var(--outfitly-text-primary)" }}
                  >
                    {t("contact.phone")}
                  </span>
                </div>
                <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--outfitly-primary)] to-[var(--outfitly-primary-hover)] flex items-center justify-center">
                    <MapPin className="w-4 h-4" style={{ color: "var(--outfitly-text-light)" }} />
                  </div>
                  <span
                    className="text-sm transition-colors duration-300"
                    style={{ color: "var(--outfitly-text-primary)" }}
                  >
                    {t("contact.location")}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <h4
                className="mb-4 transition-colors duration-300"
                style={{ color: "var(--outfitly-text-primary)" }}
              >
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="opacity-70 hover:opacity-100 transition-all text-sm inline-block hover:translate-x-1 duration-200"
                      style={{ color: "var(--outfitly-text-primary)" }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter section with gradient */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 relative rounded-3xl overflow-hidden shadow-2xl"
          style={{ boxShadow: "0 18px 40px var(--outfitly-shadow)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--outfitly-gradient-start)] via-[var(--outfitly-gradient-mid)] to-[var(--outfitly-gradient-end)] animate-gradient" />
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--outfitly-text-light)] via-transparent to-[var(--outfitly-bg-secondary)] opacity-20" />

          <div className="relative z-10 p-12 text-center">
            <h3 className="text-3xl mb-4" style={{ color: "var(--outfitly-text-light)" }}>
              {t("newsletter.heading")}
            </h3>
            <p
              className="mb-8 opacity-90 max-w-xl mx-auto"
              style={{ color: "var(--outfitly-text-light)" }}
            >
              {t("newsletter.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t("newsletter.placeholder")}
                className="flex-1 px-6 py-4 rounded-full outline-none backdrop-blur-md transition-all duration-300 focus:ring-2"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: "var(--outfitly-text-light)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
              />
              <button
                className="px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl whitespace-nowrap"
                style={{
                  backgroundColor: "var(--outfitly-text-light)",
                  color: "var(--outfitly-primary)",
                }}
              >
                {t("newsletter.button")}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ borderColor: "var(--outfitly-border-light)" }}
        >
          <p
            className="opacity-70 text-sm transition-colors duration-300"
            style={{ color: "var(--outfitly-text-primary)" }}
          >
            {t("copyright")}
          </p>

          {/* Social links with gradients */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-[var(--outfitly-primary)] to-[var(--outfitly-primary-hover)] relative overflow-hidden group"
                  style={{ color: "var(--outfitly-text-light)" }}
                >
                  <span className="relative z-10">
                    <Icon className="w-5 h-5" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--outfitly-primary-hover)] to-[var(--outfitly-primary-active)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.a>
              );
            })}
          </div>

          {/* Additional links */}
          <div
            className="flex items-center gap-6 text-sm opacity-70 transition-colors duration-300"
            style={{ color: "var(--outfitly-text-primary)" }}
          >
            <a href="#" className="hover:opacity-100 transition-opacity">
              {t("accessibility")}
            </a>
            <a href="#" className="hover:opacity-100 transition-opacity">
              {t("sitemap")}
            </a>
          </div>
        </motion.div>

        {/* Decorative gradient element */}
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full opacity-20 bg-gradient-to-br from-[var(--outfitly-primary)] via-[var(--outfitly-primary-hover)] to-[var(--outfitly-primary-active)]"
        />
      </div>
    </footer>
  );
}
