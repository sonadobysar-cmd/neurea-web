import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Záložní rewrite na úrovni Nextu — na subdoméně vždy obsluhovat /rezervace místo úvodní stránky.
   * (Middleware + headers() v layoutu zůstávají jako hlavní logika.)
   */
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          has: [{ type: "host", value: "rezervace.neurea.cz" }],
          destination: "/rezervace",
        },
        {
          source: "/",
          has: [{ type: "host", value: "www.rezervace.neurea.cz" }],
          destination: "/rezervace",
        },
      ],
    };
  },
};

export default nextConfig;
