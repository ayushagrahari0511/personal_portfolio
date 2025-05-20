import React, { useEffect, useRef } from 'react';

const StarryBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let stars = [];

        // Set canvas size
        const setCanvasSize = () => {
            const container = canvas.parentElement;
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        };

        // Create stars
        const createStars = () => {
            stars = [];
            const numberOfStars = 150;
            for (let i = 0; i < numberOfStars; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.2,
                    vx: Math.random() * 0.4 - 0.2,
                    vy: Math.random() * 0.4 - 0.2,
                    alpha: Math.random()
                });
            }
        };

        // Draw stars
        const drawStars = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
                ctx.fill();

                // Update star position and alpha
                star.x += star.vx;
                star.y += star.vy;
                star.alpha = Math.sin(Date.now() * 0.0008 + star.x) * 0.4 + 0.6;

                // Reset star position if it goes off screen
                if (star.x < 0) star.x = canvas.width;
                if (star.x > canvas.width) star.x = 0;
                if (star.y < 0) star.y = canvas.height;
                if (star.y > canvas.height) star.y = 0;
            });

            animationFrameId = requestAnimationFrame(drawStars);
        };

        // Initialize
        setCanvasSize();
        createStars();
        drawStars();

        // Handle resize
        const handleResize = () => {
            setCanvasSize();
            createStars();
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full"
            style={{ 
                background: 'transparent',
                pointerEvents: 'none'
            }}
        />
    );
};

export default StarryBackground; 