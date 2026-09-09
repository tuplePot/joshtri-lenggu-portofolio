"use client";

import { useEffect, useRef } from "react";

// Galaxy background: two-arm spiral of tinted stars on a tilted disk, rotating
// nebulas, and occasional shooting stars. Static dim background stars fill the
// rest. Pauses via IntersectionObserver when off-screen; renders a single
// static frame when the user prefers reduced motion.
export function GalaxyCanvas() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const reduceMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		const dpr = Math.min(window.devicePixelRatio || 1, 2);

		let raf = 0;
		let running = false;
		let cssW = 0;
		let cssH = 0;

		function resize() {
			if (!canvas || !ctx) return;
			const w = canvas.offsetWidth;
			const h = canvas.offsetHeight;
			if (w > 0 && h > 0) {
				cssW = w;
				cssH = h;
				canvas.width = w * dpr;
				canvas.height = h * dpr;
				ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
				if (reduceMotion) draw(performance.now());
			}
		}

		// Vertical squash gives the disk a tilted, 3D look
		const SQUASH = 0.74;
		const ARMS = 2;
		const WIND = 2.4; // radians the arms wind from center to edge

		// Star tints: white, blue-white, warm yellow, soft violet
		const COLORS = ["255,255,255", "190,215,255", "255,230,195", "225,200,255"];
		const WEIGHTS = [0.4, 0.3, 0.15, 0.15];
		function pickColor() {
			let n = Math.random();
			for (let i = 0; i < COLORS.length; i++) {
				n -= WEIGHTS[i];
				if (n <= 0) return COLORS[i];
			}
			return COLORS[0];
		}

		const bgStars = Array.from({ length: 100 }, () => ({
			x: Math.random(),
			y: Math.random(),
			r: Math.random() * 0.6 + 0.08,
			b: Math.random() * 0.25 + 0.08,
			sp: Math.random() * 0.8 + 0.2,
			ph: Math.random() * Math.PI * 2,
		}));

		const galaxyStars = Array.from({ length: 170 }, () => {
			const t = Math.sqrt(Math.random());
			const arm = Math.floor(Math.random() * ARMS);
			const spread = (Math.random() - 0.5) * (0.25 + t * 0.55);
			return {
				baseAngle: arm * ((Math.PI * 2) / ARMS) + t * WIND + spread,
				radius: t * 0.48,
				r: Math.random() ** 2 * 1.8 + 0.2,
				rgb: pickColor(),
				b: Math.random() * 0.55 + 0.45,
				sp: Math.random() * 1.5 + 0.3,
				ph: Math.random() * Math.PI * 2,
			};
		});
		const SPIN = 0.00002;

		const nebulas = [
			{
				base: Math.PI * 0.2,
				radius: 0.3,
				r: 0.55,
				rgb: "110,40,230",
				sp: 0.0000034,
			},
			{
				base: Math.PI * 0.85,
				radius: 0.26,
				r: 0.5,
				rgb: "30,90,220",
				sp: 0.0000047,
			},
			{
				base: Math.PI * 1.38,
				radius: 0.32,
				r: 0.48,
				rgb: "0,160,180",
				sp: 0.000003,
			},
			{
				base: Math.PI * 1.82,
				radius: 0.28,
				r: 0.44,
				rgb: "220,35,145",
				sp: 0.0000041,
			},
		];

		let shooters: {
			x: number;
			y: number;
			len: number;
			sp: number;
			ang: number;
			born: number;
			life: number;
		}[] = [];
		let lastShot = 0;
		let nextDelay = 4000 + Math.random() * 3000;

		function draw(now: number) {
			if (!ctx) return;
			const W = cssW;
			const H = cssH;
			if (!W || !H) {
				if (running) raf = requestAnimationFrame(draw);
				return;
			}

			const cx = W / 2;
			const cy = H / 2;
			const dim = Math.min(W, H);

			ctx.fillStyle = "#000000";
			ctx.fillRect(0, 0, W, H);

			ctx.save();
			ctx.translate(cx, cy);
			ctx.scale(1, SQUASH);
			const core = ctx.createRadialGradient(0, 0, 0, 0, 0, dim * 0.38);
			core.addColorStop(0, "rgba(255,235,210,0.14)");
			core.addColorStop(0.15, "rgba(150,100,255,0.13)");
			core.addColorStop(0.5, "rgba(60,30,160,0.06)");
			core.addColorStop(1, "rgba(0,0,0,0)");
			ctx.fillStyle = core;
			ctx.fillRect(-cx, -cy / SQUASH, W, H / SQUASH);
			ctx.restore();

			for (const n of nebulas) {
				const a = n.base + now * n.sp;
				const nx = cx + Math.cos(a) * n.radius * dim;
				const ny = cy + Math.sin(a) * n.radius * dim * SQUASH;
				const gr = n.r * dim;
				const g = ctx.createRadialGradient(nx, ny, 0, nx, ny, gr);
				g.addColorStop(0, `rgba(${n.rgb},0.20)`);
				g.addColorStop(0.45, `rgba(${n.rgb},0.09)`);
				g.addColorStop(1, `rgba(${n.rgb},0)`);
				ctx.fillStyle = g;
				ctx.fillRect(0, 0, W, H);
			}

			for (const { x, y, r, b, sp, ph } of bgStars) {
				const tw = (Math.sin(now * 0.001 * sp + ph) + 1) * 0.5;
				const a = b * (0.4 + tw * 0.6);
				ctx.beginPath();
				ctx.arc(x * W, y * H, r, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(255,255,255,${a})`;
				ctx.fill();
			}

			const theta = now * SPIN;
			for (const s of galaxyStars) {
				const ang = s.baseAngle + theta;
				const px = cx + Math.cos(ang) * s.radius * dim;
				const py = cy + Math.sin(ang) * s.radius * dim * SQUASH;
				const tw = (Math.sin(now * 0.001 * s.sp + s.ph) + 1) * 0.5;
				const a = s.b * (0.35 + tw * 0.65);
				ctx.beginPath();
				ctx.arc(px, py, s.r, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(${s.rgb},${a})`;
				ctx.fill();
				if (s.r > 0.9) {
					const glow = ctx.createRadialGradient(px, py, 0, px, py, s.r * 6);
					glow.addColorStop(0, `rgba(${s.rgb},${a * 0.35})`);
					glow.addColorStop(1, "rgba(0,0,0,0)");
					ctx.beginPath();
					ctx.arc(px, py, s.r * 6, 0, Math.PI * 2);
					ctx.fillStyle = glow;
					ctx.fill();
				}
			}

			if (!reduceMotion) {
				if (now - lastShot > nextDelay) {
					lastShot = now;
					nextDelay = 4000 + Math.random() * 3500;
					shooters.push({
						x: Math.random() * 0.55,
						y: Math.random() * 0.4,
						len: 70 + Math.random() * 130,
						sp: 0.1 + Math.random() * 0.12,
						ang: 0.35 + Math.random() * 0.35,
						born: now,
						life: 600 + Math.random() * 500,
					});
				}
				shooters = shooters.filter((sh) => now - sh.born < sh.life);
				for (const { x, y, len, sp, ang, born, life } of shooters) {
					const p = (now - born) / life;
					const a = p < 0.15 ? p / 0.15 : 1 - (p - 0.15) / 0.85;
					const dx = Math.cos(ang);
					const dy = Math.sin(ang);
					const hx = (x + dx * sp * p) * W;
					const hy = (y + dy * sp * p) * H;
					const sg = ctx.createLinearGradient(
						hx - dx * len,
						hy - dy * len,
						hx,
						hy,
					);
					sg.addColorStop(0, "rgba(255,255,255,0)");
					sg.addColorStop(0.7, `rgba(200,220,255,${a * 0.5})`);
					sg.addColorStop(1, `rgba(255,255,255,${a})`);
					ctx.beginPath();
					ctx.moveTo(hx - dx * len, hy - dy * len);
					ctx.lineTo(hx, hy);
					ctx.strokeStyle = sg;
					ctx.lineWidth = 1.5;
					ctx.stroke();
				}
			}

			if (running) raf = requestAnimationFrame(draw);
		}

		function start() {
			if (running || reduceMotion) return;
			running = true;
			raf = requestAnimationFrame(draw);
		}
		function stop() {
			running = false;
			cancelAnimationFrame(raf);
		}

		resize();
		const ro = new ResizeObserver(resize);
		if (canvas.parentElement) ro.observe(canvas.parentElement);

		let io: IntersectionObserver | null = null;
		if (reduceMotion) {
			draw(performance.now());
		} else {
			io = new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting) start();
				else stop();
			});
			io.observe(canvas);
		}

		return () => {
			stop();
			ro.disconnect();
			io?.disconnect();
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="galaxy-canvas absolute inset-0 w-full h-full pointer-events-none"
			aria-hidden="true"
		/>
	);
}
