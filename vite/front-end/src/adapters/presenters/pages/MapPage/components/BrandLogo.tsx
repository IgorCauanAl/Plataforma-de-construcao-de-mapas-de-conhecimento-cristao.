import { useState } from 'react';

const LOGO_URL =
    'https://lh3.googleusercontent.com/aida/AEtjO1WPy8GtIZDYQkkfw3fM8N7HfEF_cXaXhtvSIuX_Z05vIMF6cqHbFhX4katSeF0m_QnP44hZwlGOMNB_Xut8RjBPXxfkGSFaz0KAo_gpc-zTVgcaFdqoQugD3pcTOp5j9duSgfZqgKoeZvtOld7dJWvNGDu3nL1LPgsG4rw1mfyE1s1kl2n9ATLr6fLZQqDQlTaKxByuOOovPR4IaQJy48s8v9t5_Xy00bGiTg0dq_DLFZRjmyVGBpMspA';

type BrandLogoProps = {
    className?: string;
};

export function BrandLogo({ className = 'h-8 w-auto object-contain' }: BrandLogoProps) {
    const [hasFailed, setHasFailed] = useState(false);

    if (hasFailed) {
        return (
            <span
                aria-hidden="true"
                className={`flex items-center justify-center rounded bg-primary text-on-primary font-headline-sm text-headline-sm font-semibold ${className}`}
            >
                T
            </span>
        );
    }

    return (
        <img
            alt="TheoGraph Logo"
            className={className}
            onError={() => setHasFailed(true)}
            src={LOGO_URL}
        />
    );
}
