function Footer() {
  return (
    <footer className="mt-16 border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-zinc-900">
              Homigo
            </h2>

            <p className="mt-4 text-sm leading-6 text-zinc-600">
              Discover comfortable stays, unique experiences, and
              personalized travel recommendations tailored for modern travelers.
            </p>

            <div className="mt-5 flex gap-4 text-sm text-zinc-600">
              <span className="cursor-pointer hover:text-black">
                Facebook
              </span>

              <span className="cursor-pointer hover:text-black">
                Instagram
              </span>

              <span className="cursor-pointer hover:text-black">
                Twitter
              </span>

              <span className="cursor-pointer hover:text-black">
                LinkedIn
              </span>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900">
              Explore
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-zinc-600">
              <li className="cursor-pointer hover:text-black">
                Homes
              </li>

              <li className="cursor-pointer hover:text-black">
                Apartments
              </li>

              <li className="cursor-pointer hover:text-black">
                Villas
              </li>

              <li className="cursor-pointer hover:text-black">
                Workspaces
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900">
              Company
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-zinc-600">
              <li className="cursor-pointer hover:text-black">
                About Us
              </li>

              <li className="cursor-pointer hover:text-black">
                Careers
              </li>

              <li className="cursor-pointer hover:text-black">
                Privacy Policy
              </li>

              <li className="cursor-pointer hover:text-black">
                Terms & Conditions
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900">
              Contact
            </h3>

            <div className="mt-4 space-y-3 text-sm text-zinc-600">
              <p>Noida, Uttar Pradesh, India</p>

              <p>support@homigo.com</p>

              <p>+91 98765 43210</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-zinc-200 pt-6 text-sm text-zinc-500 sm:flex-row">
          <p> &copy; 2026 Homigo. All rights reserved.</p>

          <div className="flex items-center gap-5">
            <span className="cursor-pointer hover:text-black">
              Privacy
            </span>

            <span className="cursor-pointer hover:text-black">
              Terms
            </span>

            <span className="cursor-pointer hover:text-black">
              Contact
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;