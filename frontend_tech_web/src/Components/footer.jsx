import React from "react";

const Footer = () => {
  return (
    <div className="h-auto">
      <div className="w-full fixed bottom-0 left-0 bg-slate-900">
        <nav className="max-w-screen-lg mx-auto flex flex-wrap items-center justify-between p-3">
          {/* Bloc gauche : Logo */}
          <div className="flex items-center text-white">
            <img src="/icon.svg" className="h-8 mr-2" alt="logo" />
            <span className="font-sans tracking-tight">SUN CO.</span>
          </div>

          {/* Bloc centre : Copyright */}
          <div className="w-full md:w-auto order-3 md:order-none mt-2 md:mt-0 text-white flex lg:justify-center items-center text-center">
            <img src="/copyright.png" alt="copyright" className="h-3 mr-2" />
            <span>2025 dot.cards text task. All rights reserved</span>
          </div>

          {/* Bloc droit : Réseaux sociaux */}
          <div className="flex items-center">
            <img
              src="/instagram.png"
              alt="Instagram"
              className="h-9 bg-slate-600 rounded-full px-1 py-1 mr-2"
            />
            <img
              src="/Twitter.png"
              alt="Twitter"
              className="h-9 bg-slate-600 rounded-full px-1 py-1 mr-2"
            />
            <img
              src="/youtube.png"
              alt="YouTube"
              className="h-9 bg-slate-600 rounded-full px-1 py-1 mr-2"
            />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Footer;
