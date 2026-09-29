import { useCallback, useEffect, useRef, useState } from 'react';

const TOAST_DURATION_MS = 3200;

export function useToast() {
    const [message, setMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearPendingTimeout = useCallback(() => {
        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }, []);

    const showToast = useCallback(
        (nextMessage: string, delayMs = 0) => {
            clearPendingTimeout();
            timeoutRef.current = setTimeout(() => {
                setMessage(nextMessage);
                setIsVisible(true);
                timeoutRef.current = setTimeout(() => {
                    setIsVisible(false);
                    timeoutRef.current = null;
                }, TOAST_DURATION_MS);
            }, delayMs);
        },
        [clearPendingTimeout],
    );

    useEffect(() => clearPendingTimeout, [clearPendingTimeout]);

    return { message, isVisible, showToast };
}
