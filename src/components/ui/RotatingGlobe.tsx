import React, { useEffect, useRef } from 'react';
import { Sparkles, Globe, Terminal, Code2, Users } from 'lucide-react';

interface Hub {
  name: string;
  lat: number;
  lon: number;
}

interface Connection {
  from: number;
  to: number;
  speed: number;
  offset: number;
}

// Global education and learning hubs (latitude, longitude)
const HUBS: Hub[] = [
  { name: 'Silicon Valley', lat: 37.77, lon: -122.41 },
  { name: 'New York', lat: 40.71, lon: -74.0 },
  { name: 'London', lat: 51.5, lon: -0.12 },
  { name: 'Berlin', lat: 52.52, lon: 13.4 },
  { name: 'Bangalore', lat: 12.97, lon: 77.59 },
  { name: 'Tokyo', lat: 35.67, lon: 139.65 },
  { name: 'Singapore', lat: 1.35, lon: 103.81 },
  { name: 'Sydney', lat: -33.86, lon: 151.2 },
  { name: 'São Paulo', lat: -23.55, lon: -46.63 },
  { name: 'Nairobi', lat: -1.29, lon: 36.82 },
];

const CONNECTIONS: Connection[] = [
  { from: 0, to: 1, speed: 0.008, offset: 0.0 }, // SF -> NY
  { from: 1, to: 2, speed: 0.007, offset: 0.2 }, // NY -> London
  { from: 2, to: 3, speed: 0.009, offset: 0.4 }, // London -> Berlin
  { from: 2, to: 4, speed: 0.006, offset: 0.1 }, // London -> Bangalore
  { from: 4, to: 6, speed: 0.008, offset: 0.5 }, // Bangalore -> Singapore
  { from: 6, to: 5, speed: 0.007, offset: 0.3 }, // Singapore -> Tokyo
  { from: 5, to: 0, speed: 0.005, offset: 0.7 }, // Tokyo -> SF (Transpacific)
  { from: 6, to: 7, speed: 0.007, offset: 0.6 }, // Singapore -> Sydney
  { from: 1, to: 8, speed: 0.006, offset: 0.8 }, // NY -> São Paulo
  { from: 2, to: 9, speed: 0.006, offset: 0.45 }, // London -> Nairobi
];

// Generate dense geographical landmass points for earth shape
function generateLandmassPoints(): Array<{ lat: number; lon: number }> {
  const points: Array<{ lat: number; lon: number }> = [];

  // Regional bounding boxes: [minLat, maxLat, minLon, maxLon, densityStep]
  const landmasses = [
    // North America
    [25, 65, -125, -70, 4.5],
    [50, 70, -165, -130, 5], // Alaska
    [15, 30, -115, -85, 4], // Mexico
    // South America
    [-50, 10, -78, -36, 4.5],
    // Europe
    [36, 68, -10, 38, 3.8],
    // Africa
    [-34, 36, -16, 50, 4.2],
    // Asia & Middle East
    [12, 70, 40, 135, 4.2],
    [8, 35, 68, 92, 3.5], // India subcontinent
    [20, 45, 100, 130, 3.5], // East Asia
    // Australia & NZ
    [-38, -12, 115, 152, 4.2],
    [-46, -34, 166, 178, 4], // New Zealand
    // Japan
    [31, 45, 130, 145, 3.5],
    // UK & Ireland
    [50, 59, -10, 2, 2.5],
  ];

  for (const [minLat, maxLat, minLon, maxLon, step] of landmasses) {
    for (let lat = minLat; lat <= maxLat; lat += step) {
      for (let lon = minLon; lon <= maxLon; lon += step) {
        // Natural jitter so it looks organic and not like a rigid grid
        const jitterLat = lat + (Math.sin(lat * 12 + lon * 7) * step * 0.3);
        const jitterLon = lon + (Math.cos(lat * 7 + lon * 11) * step * 0.3);
        points.push({ lat: jitterLat, lon: jitterLon });
      }
    }
  }

  return points;
}

export function RotatingGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse interaction state
  const isDraggingRef = useRef(false);
  const lastMouseXRef = useRef(0);
  const autoRotateSpeedRef = useRef(0.0035);
  const rotationRef = useRef(0.8);
  const tiltRef = useRef(0.38); // ~22 degrees axial tilt
  const targetTiltRef = useRef(0.38);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const landPoints = generateLandmassPoints();
    let animationFrameId: number;
    let isVisible = true;

    // Pause animation when scrolled off screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Resize canvas with pixel ratio
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mathematical coordinate projection
    // Convert (lat, lon) on sphere to 3D (x, y, z) then rotate
    const project = (
      latDeg: number,
      lonDeg: number,
      radius: number,
      rotY: number,
      tiltX: number
    ) => {
      const latRad = (latDeg * Math.PI) / 180;
      const lonRad = (lonDeg * Math.PI) / 180 + rotY;

      // Base 3D coordinates on sphere
      const x = radius * Math.cos(latRad) * Math.sin(lonRad);
      const y = -radius * Math.sin(latRad);
      const z = radius * Math.cos(latRad) * Math.cos(lonRad);

      // Rotate around X-axis (axial tilt)
      const cosT = Math.cos(tiltX);
      const sinT = Math.sin(tiltX);
      const yTilted = y * cosT - z * sinT;
      const zTilted = y * sinT + z * cosT;

      return { x, y: yTilted, z: zTilted };
    };

    let time = 0;

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.38;

      ctx.clearRect(0, 0, width, height);

      // Smooth auto-rotation
      if (!isDraggingRef.current) {
        rotationRef.current += autoRotateSpeedRef.current;
        // Dampen tilt towards target
        tiltRef.current += (targetTiltRef.current - tiltRef.current) * 0.05;
      }

      const rot = rotationRef.current;
      const tilt = tiltRef.current;
      time += 0.015;

      // 1. OUTER ATMOSPHERIC GLOW
      const auraGrad = ctx.createRadialGradient(cx, cy, radius * 0.75, cx, cy, radius * 1.35);
      auraGrad.addColorStop(0, 'rgba(0, 141, 155, 0.18)');
      auraGrad.addColorStop(0.5, 'rgba(2, 62, 138, 0.12)');
      auraGrad.addColorStop(0.85, 'rgba(0, 128, 128, 0.05)');
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // 2. ORBITING RINGS (Planetary Halo & Technology Horizon)
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(tilt * 0.5);

      // Outer dashed orbital ring
      ctx.strokeStyle = 'rgba(0, 141, 155, 0.22)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 8]);
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.28, radius * 0.38, -0.2, 0, Math.PI * 2);
      ctx.stroke();

      // Orbiting satellite pulse beacon
      const orbitAngle = time * 0.8;
      const satX = radius * 1.28 * Math.cos(orbitAngle);
      const satY = radius * 0.38 * Math.sin(orbitAngle);
      ctx.setLineDash([]);
      ctx.fillStyle = '#00E5FF';
      ctx.shadowColor = '#00E5FF';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(satX, satY, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.restore();

      // 3. SPHERE BASE SHADING (Glassmorphic dark ocean sphere)
      const sphereGrad = ctx.createRadialGradient(
        cx - radius * 0.3,
        cy - radius * 0.3,
        radius * 0.1,
        cx,
        cy,
        radius
      );
      sphereGrad.addColorStop(0, 'rgba(14, 94, 119, 0.28)');
      sphereGrad.addColorStop(0.7, 'rgba(2, 62, 138, 0.22)');
      sphereGrad.addColorStop(1, 'rgba(1, 22, 40, 0.45)');

      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // Rim light edge border
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 4. LATITUDE & LONGITUDE GRATICULE LINES (Rotating in 3D)
      ctx.lineWidth = 0.75;

      // Parallels (Latitudes: -60, -30, 0, 30, 60)
      [-60, -30, 0, 30, 60].forEach((lat) => {
        ctx.beginPath();
        let first = true;
        for (let lon = -180; lon <= 180; lon += 5) {
          const pt = project(lat, lon, radius, rot, tilt);
          if (pt.z > 0) {
            const screenX = cx + pt.x;
            const screenY = cy + pt.y;
            if (first) {
              ctx.moveTo(screenX, screenY);
              first = false;
            } else {
              ctx.lineTo(screenX, screenY);
            }
          } else {
            first = true;
          }
        }
        ctx.strokeStyle =
          lat === 0 ? 'rgba(0, 229, 255, 0.28)' : 'rgba(0, 141, 155, 0.12)';
        ctx.stroke();
      });

      // Meridians (Longitudes every 45 degrees)
      for (let lon = 0; lon < 360; lon += 45) {
        ctx.beginPath();
        let first = true;
        for (let lat = -80; lat <= 80; lat += 4) {
          const pt = project(lat, lon, radius, rot, tilt);
          if (pt.z > 0) {
            const screenX = cx + pt.x;
            const screenY = cy + pt.y;
            if (first) {
              ctx.moveTo(screenX, screenY);
              first = false;
            } else {
              ctx.lineTo(screenX, screenY);
            }
          } else {
            first = true;
          }
        }
        ctx.strokeStyle = 'rgba(0, 141, 155, 0.12)';
        ctx.stroke();
      }

      // 5. LANDMASS POINT CLOUD (Illuminated Continents)
      for (let i = 0; i < landPoints.length; i++) {
        const lp = landPoints[i];
        const pt = project(lp.lat, lp.lon, radius, rot, tilt);

        if (pt.z > 0) {
          // Perspective depth fading (points on front center are brightest)
          const depthRatio = pt.z / radius; // 0 (edge) to 1 (center)
          const alpha = 0.25 + depthRatio * 0.65;
          const size = 1 + depthRatio * 1.2;

          ctx.fillStyle = `rgba(0, 168, 181, ${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(cx + pt.x, cy + pt.y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 6. 3D GREAT-CIRCLE CONNECTION ARCS & TRAVELING DATA PULSES
      CONNECTIONS.forEach((conn) => {
        const fromHub = HUBS[conn.from];
        const toHub = HUBS[conn.to];

        const p1 = project(fromHub.lat, fromHub.lon, radius, rot, tilt);
        const p2 = project(toHub.lat, toHub.lon, radius, rot, tilt);

        // Calculate arc interpolation points in 3D
        const steps = 30;
        const arcPoints: Array<{ x: number; y: number; z: number }> = [];

        for (let s = 0; s <= steps; s++) {
          const t = s / steps;
          // Interpolate lat and lon along great circle
          const curLat = fromHub.lat + (toHub.lat - fromHub.lat) * t;
          let diffLon = toHub.lon - fromHub.lon;
          // Handle shortest wrap-around path
          if (diffLon > 180) diffLon -= 360;
          if (diffLon < -180) diffLon += 360;
          const curLon = fromHub.lon + diffLon * t;

          // Arc altitude elevation: parabola that peaks in space between the two cities
          const elevation = Math.sin(t * Math.PI) * (radius * 0.22);
          const pt = project(curLat, curLon, radius + elevation, rot, tilt);
          arcPoints.push(pt);
        }

        // Draw the curved connection line
        ctx.beginPath();
        let arcVisible = false;
        let isFirst = true;

        for (let s = 0; s <= steps; s++) {
          const pt = arcPoints[s];
          if (pt.z > -radius * 0.2) {
            arcVisible = true;
            const sx = cx + pt.x;
            const sy = cy + pt.y;
            if (isFirst) {
              ctx.moveTo(sx, sy);
              isFirst = false;
            } else {
              ctx.lineTo(sx, sy);
            }
          } else {
            isFirst = true;
          }
        }

        if (arcVisible) {
          ctx.strokeStyle = 'rgba(0, 229, 255, 0.4)';
          ctx.lineWidth = 1.3;
          ctx.stroke();

          // Traveling glowing pulse packet along this arc
          const pulseT = (time * conn.speed * 40 + conn.offset) % 1;
          const pulseIdx = Math.floor(pulseT * (steps - 1));
          const pCur = arcPoints[pulseIdx];
          const pNext = arcPoints[pulseIdx + 1];

          if (pCur && pNext && pCur.z > -radius * 0.1) {
            const subT = pulseT * (steps - 1) - pulseIdx;
            const px = cx + pCur.x + (pNext.x - pCur.x) * subT;
            const py = cy + pCur.y + (pNext.y - pCur.y) * subT;

            // Packet glow aura
            ctx.shadowColor = '#00E5FF';
            ctx.shadowBlur = 10;
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.arc(px, py, 2.8, 0, Math.PI * 2);
            ctx.fill();

            // Trail particle
            ctx.fillStyle = 'rgba(0, 229, 255, 0.7)';
            ctx.beginPath();
            ctx.arc(px - 1.5, py - 1.5, 1.8, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      });

      // 7. MAJOR KNOWLEDGE HUBS (Pulsing Beacons)
      HUBS.forEach((hub) => {
        const pt = project(hub.lat, hub.lon, radius, rot, tilt);

        if (pt.z > 0) {
          const sx = cx + pt.x;
          const sy = cy + pt.y;
          const depthRatio = pt.z / radius;

          // Pulsing halo wave
          const pulseCycle = (time * 1.5 + hub.lat * 0.1) % 1;
          const pulseSize = 4 + pulseCycle * 10;
          const pulseAlpha = (1 - pulseCycle) * 0.65 * depthRatio;

          ctx.strokeStyle = `rgba(0, 229, 255, ${pulseAlpha.toFixed(3)})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(sx, sy, pulseSize, 0, Math.PI * 2);
          ctx.stroke();

          // Central solid hub node
          ctx.fillStyle = '#00E5FF';
          ctx.shadowColor = '#00E5FF';
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(sx, sy, 3 * depthRatio, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Mouse interactive drag & rotate handlers
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      lastMouseXRef.current = e.clientX;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        const deltaX = e.clientX - lastMouseXRef.current;
        rotationRef.current += deltaX * 0.006;
        lastMouseXRef.current = e.clientX;
      } else {
        // Subtle tilt responsiveness when hovering
        const rect = canvas.getBoundingClientRect();
        const normY = (e.clientY - rect.top) / rect.height - 0.5;
        targetTiltRef.current = 0.38 + normY * 0.2;
      }
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    // Touch event support for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        lastMouseXRef.current = e.touches[0].clientX;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isDraggingRef.current && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - lastMouseXRef.current;
        rotationRef.current += deltaX * 0.007;
        lastMouseXRef.current = e.touches[0].clientX;
      }
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const canvasEl = canvas;
    canvasEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvasEl.addEventListener('touchstart', onTouchStart, { passive: true });
    canvasEl.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      observer.disconnect();
      canvasEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvasEl.removeEventListener('touchstart', onTouchStart);
      canvasEl.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[480px] aspect-square flex items-center justify-center select-none"
    >
      {/* Dynamic 3D Interactive Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing z-10"
        title="Interactive 3D Knowledge Globe - Drag to rotate"
      />

      {/* Floating Creative Knowledge Badges around Globe */}
      <div className="absolute top-4 left-2 sm:left-4 z-20 animate-bounce duration-1000 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/90 backdrop-blur-md border border-primary/30 shadow-card text-xs font-semibold text-text-main">
        <Sparkles className="w-3.5 h-3.5 text-secondary" />
        <span>Global Knowledge Hub</span>
      </div>

      <div className="absolute bottom-6 left-0 sm:left-2 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/90 backdrop-blur-md border border-border shadow-card text-xs text-text-main font-medium">
        <Terminal className="w-3.5 h-3.5 text-primary" />
        <span>In-Browser SQLite WASM</span>
      </div>

      <div className="absolute bottom-12 right-2 sm:right-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/90 backdrop-blur-md border border-secondary/30 shadow-card text-xs text-text-main font-medium">
        <Code2 className="w-3.5 h-3.5 text-secondary" />
        <span>11 Active Tech Tracks</span>
      </div>

      <div className="absolute top-8 right-2 sm:right-6 z-20 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/90 backdrop-blur-md border border-border shadow-card text-xs text-text-main font-medium">
        <Users className="w-3.5 h-3.5 text-primary" />
        <span>Live Interactive Nodes</span>
      </div>

      {/* Mobile-Friendly Drag Hint */}
      <div className="absolute -bottom-2 text-[11px] text-text-muted flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity">
        <Globe className="w-3 h-3 text-secondary" />
        <span>Drag to rotate globe in 3D</span>
      </div>
    </div>
  );
}
