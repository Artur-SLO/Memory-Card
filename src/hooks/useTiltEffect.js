import { useRef } from "react";

export function useTiltEffect() {
    const ref = useRef(null);

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = -(y - centerY) / 5;
        const rotateY = (x - centerX) / 5;

        ref.current.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.05)
        `;
    };

    const handleMouseLeave = () => {
        ref.current.style.transform = `
            perspective(1000px)
            rotateX(0deg)
            rotateY(0deg)
            scale(1)
        `;
    };

    return {
        ref,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave
    };
}
