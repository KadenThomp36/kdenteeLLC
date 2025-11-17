export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-gray-400">
          <p className="text-sm">
            © {currentYear} Kdentee LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
