export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-16 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white">🚗</div>
              <span className="text-lg font-bold text-white">RentWheels</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your journey, our priority. Premium car rentals for every destination.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                f
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                𝕏
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                📷
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                in
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-white mb-4">Company</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-white mb-4">Support</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-white mb-4">Contact Info</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex gap-3">
                <span>📍</span>
                <span>123 Freedom Drive, Liberty City, USA</span>
              </li>
              <li className="flex gap-3">
                <span>📞</span>
                <span>(555) 123-4567</span>
              </li>
              <li className="flex gap-3">
                <span>✉️</span>
                <span>support@rentwheels.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-500 text-sm">© 2025 RentWheels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
