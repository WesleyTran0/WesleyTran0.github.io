import InfoStrip from '../InfoStrip';
import NowList from '../NowList';

export default function Hero() {
	return (
		<section id="about" className="scroll-mt-28 pt-20 pb-15">
			<div className="mb-10 flex items-center gap-2.5 font-mono text-sm">
				<span className="inline-block h-2 w-2 rounded-full bg-green" aria-hidden="true" />
				<span className="text-accent">//</span>
				<span className="text-muted">open to summer 2026 internships</span>
			</div>

			<div className="flex flex-row">
				<img
					src="https://github.com/WesleyTran0.png"
					alt="wesley tran"
					loading="lazy"
					className="mb-7 h-16 w-16 rounded-full border border-border-soft object-cover"
				/>
				<p className="m-0 mb-10 items-center text-center text-[28px] leading-[1.45] font-normal tracking-[-0.01em] text-text">
					Hi, I'm Wesley
				</p>
			</div>

			<p className="m-0 mb-7 text-[19px] leading-[1.7] text-text-soft [&_em]:border-b [&_em]:border-dotted [&_em]:border-accent/30 [&_em]:text-accent [&_em]:not-italic [&_em]:transition-colors [&_em]:hover:border-solid [&_em]:hover:border-accent [&_strong]:font-medium [&_strong]:text-text">
				i&rsquo;m a third-year at northeastern, splitting time between <em>sandbox</em>, the
				student-run software consultancy where i ship full-stack work for real clients, and{' '}
				<em>ccdc + ctf club</em>, where my team recently took first at the ncae regional
				competition.
			</p>

			<p className="m-0 mb-10 text-[19px] leading-[1.7] text-text-soft [&_em]:border-b [&_em]:border-dotted [&_em]:border-accent/30 [&_em]:text-accent [&_em]:not-italic [&_em]:transition-colors [&_em]:hover:border-solid [&_em]:hover:border-accent [&_strong]:font-medium [&_strong]:text-text">
				i&rsquo;m drawn to the layers most people skip past: writing my own dns resolver in rust,
				building tcp from scratch with reno-style congestion control, exploiting 32-bit binaries
				with rop chains. <strong>arch linux</strong> on a thinkpad, <strong>astronvim</strong> for
				everything, a proxmox homelab i tinker with on weekends.
			</p>

			<NowList />
			<InfoStrip />
		</section>
	);
}
