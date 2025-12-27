'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import CustomTabs, { Tab } from './ui/tabs';
import AnimatedButton from './ui/animated-button';

const tabs: Tab[] = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'about', label: 'About' },
    { id: 'faq', label: 'FAQs' },
    { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const threshold = 100;

            if (currentScrollY < threshold) {
                setIsVisible(true);
            } else {
                setIsVisible(currentScrollY < lastScrollY);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <nav
            className={`px-4 md:px-[64px] fixed flex justify-center items-center top-0 left-0 right-0 z-[50] transition-all duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'
                }`}
        >
            <div className="max-w-[1440px] w-full px-4 py-4 mb-8 sm:mb-0 bg-transparent xl:bg-transparent">
                <div className="flex justify-between items-center bg-black/50 xl:bg-transparent backdrop-blur-md xl:backdrop-blur-none p-4 xl:p-0 rounded-2xl">
                    {/* Logo Placeholder */}
                    <Link href="/#home" className="flex items-center">
                        <Image
                            src="/logo.png"
                            alt="Lens & Frame Logo"
                            width={180}
                            height={40}
                            className="h-10 w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden xl:block">
                        <CustomTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="xl:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    <div className="hidden xl:block">
                        <AnimatedButton href="#contact">Book Now</AnimatedButton>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`block xl:hidden overflow-hidden transition-all duration-300 ease-in-out mt-2 rounded-2xl ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                    style={{ backdropFilter: 'blur(10px)', background: 'rgba(10, 10, 10, 0.9)' }}
                >
                    <div className="py-4 border-t border-white/20">
                        <CustomTabs tabs={tabs} activeTab={activeTab} setActiveTab={(tab) => { setActiveTab(tab); setIsMobileMenuOpen(false); }} />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
