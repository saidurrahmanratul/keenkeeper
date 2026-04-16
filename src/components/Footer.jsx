export default function Footer() {
  return (
    <footer className="bg-[#2d5a4e] text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <div className="text-4xl font-bold mb-3">
          <span className="font-light">Keen</span>Keeper
        </div>
        <p className="text-gray-300 text-sm mb-6">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        <p className="text-sm text-gray-300 mb-4">Social Links</p>
        <div className="flex justify-center gap-3 mb-10">
          <a href="#" className="w-9 h-9 bg-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
            <img src="/instagram.png" alt="Instagram" className="w-5 h-5" />
          </a>
          <a href="#" className="w-9 h-9 bg-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
            <img src="/facebook.png" alt="Facebook" className="w-5 h-5" />
          </a>
          <a href="#" className="w-9 h-9 bg-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
            <img src="/twitter.png" alt="Twitter" className="w-5 h-5" />
          </a>
        </div>
        <div className="border-t border-[#3d6b5e] pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-300">
          <span>© 2026 KeenKeeper. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
