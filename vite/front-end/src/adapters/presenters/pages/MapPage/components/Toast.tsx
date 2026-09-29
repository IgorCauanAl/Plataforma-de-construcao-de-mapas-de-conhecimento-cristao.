type ToastProps = {
    message: string;
    isVisible: boolean;
};

export function Toast({ message, isVisible }: ToastProps) {
    return (
        <div
            aria-live="polite"
            className={`fixed top-20 right-6 z-50 bg-primary text-on-primary px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 transition-all duration-300 ${
                isVisible ? 'translate-y-0 opacity-100' : '-translate-y-[100px] opacity-0 pointer-events-none'
            }`}
            role="status"
        >
            <span className="material-symbols-outlined text-secondary-fixed text-[20px]">info</span>
            <span className="font-label-md text-label-md">{message}</span>
        </div>
    );
}
