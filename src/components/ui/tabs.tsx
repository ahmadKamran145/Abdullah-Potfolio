'use client';

import { useRouter, usePathname } from 'next/navigation';

export interface Tab {
    id: string;
    label: string;
}

interface TabsProps {
    tabs: Tab[];
    activeTab?: string;
    setActiveTab?: (tab: string) => void;
}

export default function CustomTabs({ tabs, activeTab, setActiveTab }: TabsProps) {
    const router = useRouter();
    const pathname = usePathname();

    const handleNavClick = (sectionName: string) => {
        if (setActiveTab) {
            setActiveTab(sectionName);
        }

        // Simple hash navigation
        const element = document.getElementById(sectionName);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState(null, '', `/#${sectionName}`);
        } else {
            router.push(`/#${sectionName}`);
        }
    };

    return (
        <div className="tab-wrapper">
            {tabs.map(tab => (
                <div
                    key={tab.id}
                    className={`tab-item ${activeTab == tab.id ? 'active' : ''}`}
                    onClick={() => handleNavClick(tab.id)}
                >
                    <button
                        className={`tab-button px-5 flex justify-center items-center `}
                        style={{
                            fontWeight: activeTab != tab.id ? 400 : 600,
                            padding: '16px 20px',
                            height: '48px',
                        }}
                    >
                        {tab.label}
                    </button>
                </div>
            ))}
        </div>
    );
}
