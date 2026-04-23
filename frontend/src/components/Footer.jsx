function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; 2026 Homigo. All rights reserved.</p>
        <div className="flex flex-wrap gap-4">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Contact</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
