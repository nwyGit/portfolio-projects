import React, { forwardRef, useEffect, useRef, useState } from "react";

const BLOB_CONFIGS = [
	{ baseSize: 600, color: "#85a0e4" },
	{ baseSize: 500, color: "#ffd694" },
	{ baseSize: 400, color: "#ffb3c6" },
	{ baseSize: 350, color: "#baffc9" },
];
const BLOB_OPACITY = 0.45;
const BLOB_BLUR = 120;
const INTERVAL = 120;
const STEP = 30;

function clamp(val: number, min: number, max: number) {
	return Math.max(min, Math.min(max, val));
}

const randomBorderRadius = () => {
	const vals = Array(8)
		.fill(0)
		.map(() => Math.round(40 + Math.random() * 40));
	return `${vals[0]}% ${vals[1]}% ${vals[2]}% ${vals[3]}% / ${vals[4]}% ${vals[5]}% ${vals[6]}% ${vals[7]}%`;
};

function randomBlobState(baseSize: number) {
	return {
		x: 0,
		y: 0,
		width: baseSize * (0.9 + Math.random() * 0.3),
		height: baseSize * (0.9 + Math.random() * 0.3),
		scale: 1 + Math.random() * 0.2,
		rotate: Math.random() * 360,
		borderRadius: randomBorderRadius(),
	};
}

interface BlobBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
	children?: React.ReactNode;
}

const BlobBackground = forwardRef<HTMLDivElement, BlobBackgroundProps>(
	({ children, className, style, ...rest }, ref) => {
		const sectionRef = useRef<HTMLDivElement>(null);
		const [blobs, setBlobs] = useState(() =>
			BLOB_CONFIGS.map((cfg) => randomBlobState(cfg.baseSize))
		);
		const velocities = useRef(
			BLOB_CONFIGS.map(() => ({
				vx: (Math.random() - 0.5) * STEP,
				vy: (Math.random() - 0.5) * STEP,
			}))
		);

		// Set initial positions, velocities, and shapes after mount
		useEffect(() => {
			const node = (
				ref && typeof ref !== "function" ? ref.current : sectionRef.current
			) as HTMLDivElement | null;
			if (!node) return;
			const rect = node.getBoundingClientRect();
			setBlobs((prev) =>
				prev.map((blob) => ({
					...blob,
					x: Math.random() * (rect.width - blob.width),
					y: Math.random() * (rect.height - blob.height),
				}))
			);
			velocities.current = velocities.current.map(() => ({
				vx: (Math.random() - 0.5) * STEP,
				vy: (Math.random() - 0.5) * STEP,
			}));
		}, [ref]);

		// Brownian motion with morphing and size change
		useEffect(() => {
			let raf: number;
			let running = true;
			function moveBlobs() {
				const node = (
					ref && typeof ref !== "function" ? ref.current : sectionRef.current
				) as HTMLDivElement | null;
				if (!node) return;
				const rect = node.getBoundingClientRect();
				setBlobs((prev) =>
					prev.map((blob, i) => {
						const baseSize = BLOB_CONFIGS[i].baseSize;
						const maxVel = STEP;
						const delta = STEP * 0.2;
						const v = velocities.current[i];
						v.vx = clamp(v.vx + (Math.random() - 0.5) * delta, -maxVel, maxVel);
						v.vy = clamp(v.vy + (Math.random() - 0.5) * delta, -maxVel, maxVel);
						const width = clamp(
							blob.width + (Math.random() - 0.5) * 40,
							baseSize * 0.7,
							baseSize * 1.4
						);
						const height = clamp(
							blob.height + (Math.random() - 0.5) * 40,
							baseSize * 0.7,
							baseSize * 1.4
						);
						const scale = clamp(
							blob.scale + (Math.random() - 0.5) * 0.08,
							0.9,
							1.25
						);
						const rotate = (blob.rotate + (Math.random() - 0.5) * 8) % 360;
						const borderRadius =
							Math.random() < 0.2 ? randomBorderRadius() : blob.borderRadius;
						let x = blob.x + v.vx;
						let y = blob.y + v.vy;
						if (x < 0 || x > rect.width - width) {
							v.vx *= -1;
							x = clamp(x, 0, rect.width - width);
						}
						if (y < 0 || y > rect.height - height) {
							v.vy *= -1;
							y = clamp(y, 0, rect.height - height);
						}
						return { x, y, width, height, scale, rotate, borderRadius };
					})
				);
				if (running) {
					raf = window.setTimeout(moveBlobs, INTERVAL);
				}
			}
			moveBlobs();
			return () => {
				running = false;
				if (raf) window.clearTimeout(raf);
			};
		}, [ref]);

		return (
			<div
				ref={ref || sectionRef}
				className={className}
				style={{
					position: "relative",
					overflow: "hidden",
					background: "#fff",
					...style,
				}}
				{...rest}
			>
				{blobs.map((blob, i) => (
					<div
						key={i}
						style={{
							position: "absolute",
							width: blob.width,
							height: blob.height,
							background: BLOB_CONFIGS[i].color,
							top: blob.y,
							left: blob.x,
							borderRadius: blob.borderRadius,
							filter: `blur(${BLOB_BLUR}px)`,
							opacity: BLOB_OPACITY,
							pointerEvents: "none",
							zIndex: 1,
							transition: `top ${INTERVAL}ms linear, left ${INTERVAL}ms linear, width 0.5s, height 0.5s, border-radius 0.5s, transform ${INTERVAL}ms linear`,
							mixBlendMode: "multiply",
							transform: `scale(${blob.scale}) rotate(${blob.rotate}deg)`,
						}}
					/>
				))}
				<div style={{ position: "relative", zIndex: 2, width: "100%" }}>
					{children}
				</div>
			</div>
		);
	}
);

BlobBackground.displayName = "BlobBackground";

export default BlobBackground;
