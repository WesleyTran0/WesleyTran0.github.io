"use client";

import { useEffect, type ReactNode } from "react";

interface ModalProps {
	open: boolean;
	onClose: () => void;
	children: ReactNode;
	labelledBy?: string;
}

export default function Modal({ open, onClose, children, labelledBy }: ModalProps) {
	useEffect(() => {
		if (!open) return;
		function handleEsc(event: KeyboardEvent) {
			if (event.key === "Escape") onClose();
		}
		window.addEventListener("keydown", handleEsc);
		return () => window.removeEventListener("keydown", handleEsc);
	}, [open, onClose]);

	if (!open) return null;

	return (
		<div
			role="dialog"
			aria-modal="true"
			aria-labelledby={labelledBy}
			className="fixed inset-0 z-50 flex items-center justify-center px-7"
		>
			<button
				aria-label="close"
				onClick={onClose}
				className="absolute inset-0 cursor-default bg-[rgba(17,19,23,0.85)] backdrop-blur-sm"
			/>
			<div className="relative w-full max-w-[500px] rounded-lg border border-border bg-surface p-7">
				{children}
			</div>
		</div>
	);
}
