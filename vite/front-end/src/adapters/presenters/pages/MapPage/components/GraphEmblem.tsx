export function GraphEmblem() {
    return (
        <div className="relative w-32 h-32 mb-6 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-secondary/20 animate-[orbit-spin_60s_linear_infinite]" />
            <div className="absolute inset-2 rounded-full border border-dashed border-parchment-border" />

            <svg className="w-24 h-24 text-category-doctrine" fill="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <line stroke="#BFA584" strokeDasharray="3 3" strokeLinecap="round" strokeWidth="1.5" x1="50" x2="50" y1="14" y2="86" />
                <line stroke="#BFA584" strokeDasharray="3 3" strokeLinecap="round" strokeWidth="1.5" x1="18" x2="82" y1="42" y2="42" />
                <line stroke="#DCCDB6" strokeWidth="1" x1="28" x2="50" y1="28" y2="42" />
                <line stroke="#DCCDB6" strokeWidth="1" x1="72" x2="50" y1="28" y2="42" />
                <line stroke="#DCCDB6" strokeWidth="1" x1="32" x2="50" y1="72" y2="42" />
                <line stroke="#DCCDB6" strokeWidth="1" x1="68" x2="50" y1="72" y2="42" />

                <circle cx="50" cy="14" fill="#FFFFFF" r="5" stroke="#6B4A3A" strokeWidth="2" />
                <circle cx="50" cy="14" fill="#6B4A3A" r="2" />

                <circle cx="50" cy="42" fill="#FFFFFF" r="7.5" stroke="#B5654F" strokeWidth="2.5" />
                <circle cx="50" cy="42" fill="#B5654F" r="3.5" />

                <circle cx="18" cy="42" fill="#FFFFFF" r="4.5" stroke="#2E4A62" strokeWidth="2" />
                <circle cx="18" cy="42" fill="#2E4A62" r="1.75" />

                <circle cx="82" cy="42" fill="#FFFFFF" r="4.5" stroke="#7A4A6B" strokeWidth="2" />
                <circle cx="82" cy="42" fill="#7A4A6B" r="1.75" />

                <circle cx="50" cy="86" fill="#FFFFFF" r="5" stroke="#3F7C85" strokeWidth="2" />
                <circle cx="50" cy="86" fill="#3F7C85" r="2" />

                <circle cx="28" cy="28" fill="#DCCDB6" r="3" />
                <circle cx="72" cy="28" fill="#DCCDB6" r="3" />
                <circle cx="32" cy="72" fill="#DCCDB6" r="3" />
                <circle cx="68" cy="72" fill="#DCCDB6" r="3" />
            </svg>
        </div>
    );
}
