import React from 'react';
import { Download } from 'lucide-react';

interface AnimatedButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children: React.ReactNode;
    icon?: React.ReactNode;
}

const AnimatedButton = ({ children, icon, className, ...props }: AnimatedButtonProps) => {
    return (
        <a
            className={`
    group relative     
    flex items-center justify-center gap-2     
    px-[20px] py-[16px]     
    text-white cursor-pointer     
    transition-all duration-300 hover:scale-105     
    rounded-full     
    overflow-hidden     
    h-12
    ${className}
    `}
            {...props}
        >
            {/* gradient border layer */}
            <span
                className="absolute inset-0 rounded-full p-[2px]"
                style={{
                    background:
                        'conic-gradient(from 270deg at 50% 50%, rgba(168,85,247,1) 0%, rgba(68,23,255,1) 50%, rgba(9,146,212,1) 100%)',
                    WebkitMask:
                        'linear-gradient(#fff,#fff) content-box, linear-gradient(#fff,#fff)',
                    WebkitMaskComposite: 'xor', // Chrome/Safari
                    maskComposite: 'exclude', // Standard (FF, where supported)
                }}
            />

            {/* hover effect layer */}
            <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute left-0 aspect-square w-full origin-center translate-x-full rounded-full bg-purple-600 transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
            </span>

            {/* content */}
            <span className="relative z-10 flex items-center gap-2">
                {icon || <Download className="w-5 h-5" />}
                <span>{children}</span>
            </span>
        </a>
    );
};

export default AnimatedButton;
