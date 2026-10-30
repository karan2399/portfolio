import { Menu, X } from "lucide-react"
import Button from "../components/Button"
import { useState } from "react";

const Navbar = ({ content }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 bg-transparent py-5 right-0 z-50">
      <nav aria-label={content.navigationLabel} className="container mx-auto px-6 flex items-center justify-between ">
        <a href="#" className="text-xl font-bold tracking-tight hover:text-primary" aria-label={content.brand}>
          {content.brand}<span className="text-primary">{content.brandSuffix}</span>
        </a>
        {/* Desktop Nav */}
        <div className="hidden md:flex  items-center gap-1">
          <div className="glass rounded-full px-2 py-1 flex items-center gap-1">
            {
              content.navigation.map((link) => (
                <a className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-full hover:bg-surface"
                  key={link.href} href={link.href}>{link.label}</a>
              ))
            }
          </div>

        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Button
            size="sm"
            href={content.contactUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {content.contactLabel}
          </Button>
        </div>



        {/* Mobile */}
        <button
          className="md:hidden p-2 text-foreground cursor-pointer"
          aria-label={isMobileMenuOpen ? content.closeMenuLabel : content.openMenuLabel}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
         {isMobileMenuOpen ? <X size={24}/> : <Menu size={24} /> }
        </button>

      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-strong animate-fade-in">
          <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {content.navigation.map((link) => (
              <a
                href={link.href}
                key={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg text-muted-foreground hover:text-foreground py-2"
              >
                {link.label}
              </a>
            ))}

            <Button
              href={content.contactUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {content.contactLabel}
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
