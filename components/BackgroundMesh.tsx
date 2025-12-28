import React, { useEffect, useRef } from 'react';

const BackgroundMesh: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    // We attach to the parent container to fill the area
    const container = containerRef.current?.parentElement;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    
    // Grid Animation State
    let offsetX = 0;
    let offsetY = 0;
    const speed = 0.3; // Slow, subtle movement speed
    const gridSize = 50; // Size of the grid cells

    const resize = () => {
      width = container.offsetWidth;
      height = container.offsetHeight;
      
      // Handle high DPI displays for crisp lines
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      const isDark = !document.documentElement.classList.contains('light');
      
      // Dynamic Line Color based on theme
      // Dark Mode: Very faint white
      // Light Mode: Very faint black
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)';
      ctx.lineWidth = 1;

      // Update offsets for diagonal movement (Bottom-Right)
      offsetX = (offsetX + speed) % gridSize;
      offsetY = (offsetY + speed) % gridSize;

      ctx.beginPath();

      // Vertical Lines
      // Start from just outside the view (offsetX - gridSize) to ensure smooth entry
      for (let x = offsetX - gridSize; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }

      // Horizontal Lines
      for (let y = offsetY - gridSize; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }

      ctx.stroke();

      animationFrameId = requestAnimationFrame(draw);
    };

    // Initialize and Listen
    resize();
    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(container);
    window.addEventListener('resize', resize);
    
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-full" />
      
      {/* 
         Gradients to blend the grid edges seamlessly into the page background.
         This prevents hard cut-offs at the nav and footer, creating an "infinite" feel.
      */}
      
      {/* Top Fade (Nav Area) */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-50 via-gray-50/50 to-transparent dark:from-brand-bg dark:via-brand-bg/50 dark:to-transparent" />
      
      {/* Bottom Fade (Footer Area) */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-gray-50 via-gray-50/80 to-transparent dark:from-brand-bg dark:via-brand-bg/80 dark:to-transparent" />
      
      {/* Side Vignette (Optional depth) */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(transparent_0%,var(--bg-overlay)_100%)] opacity-40 from-gray-50 to-gray-50 dark:from-brand-bg dark:to-brand-bg"
        style={{ '--bg-overlay': 'var(--tw-gradient-from)' } as React.CSSProperties}
      />
    </div>
  );
};

export default BackgroundMesh;