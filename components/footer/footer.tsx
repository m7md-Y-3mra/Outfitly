"use client";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { footerLinks } from "./footer.constants";
import { useFooter } from "./useFooter";

export const Footer = () => {
  const { isDark, colors } = useFooter();

  return (
    <footer className="relative pt-24 pb-12 px-6 overflow-hidden">
      {/* Background gradients */}
      <div
        className="absolute inset-0 transition-all duration-300"
        style={{
          background: isDark
            ? `linear-gradient(to bottom, ${colors.bgPrimary}, ${colors.bgSecondary}, ${colors.bgPrimary})`
            : `linear-gradient(to bottom, ${colors.bgPrimary}, ${colors.bgSecondary}, ${colors.bgPrimary})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-[var(--outfitly-primary)/15] via-transparent to-[var(--outfitly-primary-hover)/15] animate-gradient" />

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[var(--outfitly-primary)]/20 to-transparent blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand Column */}
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
                  backgroundImage: `linear-gradient(to right, ${colors.textPrimary}, ${colors.textSecondary})`,
                }}
              >
                Outfitly
              </h3>
              <p className="opacity-70 mb-6 leading-relaxed" style={{ color: colors.textPrimary }}>
                Your smart wardrobe companion. Discover, create, and share amazing outfits with the
                power of AI and community.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                {[
                  { icon: Mail, text: "hello@outfitly.com" },
                  { icon: Phone, text: "+1 (555) 123-4567" },
                  { icon: MapPin, text: "San Francisco, CA" },
                ].map((info, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--outfitly-primary)] to-[var(--outfitly-primary-hover)] flex items-center justify-center">
                      <info.icon
                        className="w-4 h-4"
                        style={{ color: "var(--outfitly-text-light)" }}
                      />
                    </div>
                    <span className="text-sm" style={{ color: colors.textPrimary }}>
                      {info.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <h4 className="mb-4" style={{ color: colors.textPrimary }}>
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="opacity-70 hover:opacity-100 transition-all text-sm inline-block hover:translate-x-1 duration-200"
                      style={{ color: colors.textPrimary }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 relative rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--outfitly-primary)] via-[var(--outfitly-primary-hover)] to-[var(--outfitly-primary)] animate-gradient" />
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--outfitly-text-light)]/10 via-transparent to-[var(--outfitly-bg-secondary)]/10" />

          <div className="relative z-10 p-12 text-center">
            <h3 className="text-3xl mb-4" style={{ color: "var(--outfitly-text-light)" }}>
              Stay in Style
            </h3>
            <p
              className="mb-8 opacity-90 max-w-xl mx-auto"
              style={{ color: "var(--outfitly-text-light)" }}
            >
              Subscribe to our newsletter for the latest trends, tips, and exclusive offers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
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
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
