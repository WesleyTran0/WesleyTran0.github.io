import InfoStrip from '../InfoStrip';
import NowList from '../NowList';
import RotatingWord from './RotatingWord';

export default function Hero() {
	return (
		<section id="about" className="scroll-mt-28 py-12">
			<div>
				<div className="mb-4 flex items-center gap-2.5 font-mono text-[14px]">
					<span className="inline-block h-2 w-2 rounded-full bg-green" aria-hidden="true" />
					<span className="text-accent">//</span>
					<span className="text-muted">currently finding a new hyperfixation</span>
				</div>

				<p className="mb-8 text-3xl leading-[1.45] font-medium tracking-[-0.01em] text-text">
					Hi, I'm Wesley <span className="text-accent">-</span>{' '}
					<RotatingWord words={['developer', 'hacker', 'tinkerer', 'engineer', 'student']} />
				</p>

				<p className="mb-7 text-[19px] leading-[1.7] text-text [&_em]:border-b [&_em]:border-dotted [&_em]:border-accent/30 [&_em]:text-accent [&_em]:not-italic [&_em]:transition-colors [&_em]:hover:border-solid [&_em]:hover:border-accent [&_strong]:font-medium [&_strong]:text-text">
					I'm a security-driven developer and Cybersecurity student at Northeastern, bridging programming
					and digital security by developing secure software that enables future developers. Currently, you'll
					find me splitting time between <a href="https://www.sandboxnu.com/" target="_blank" rel="noopener noreferrer">sandbox</a>, where I build nonprofit software
					projects for the NEU community, and <a href="https://nuccdc.club/" target="_blank" rel="noopener noreferrer">NUCCDC</a>, where I compete in blue team focused cyber competition.
				</p>
			</div>
			<NowList />
			<InfoStrip />
		</section>
	);
}
