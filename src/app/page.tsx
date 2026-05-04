import type { Metadata } from 'next';
import Card from '@/components/Card';
import Project from '@/components/Project';
import SocialLinks from '@/components/SocialLinks';
import shorelarkGif from '@/lib/projects/shorelark/shorelark.gif';

export const metadata: Metadata = {
	title: 'Wesley Tran | Home'
};

export default function Home() {
	return (
		<>
			<div className="flex flex-row w-full gap-4">
				<div className="flex items-center">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src="https://github.com/WesleyTran0.png"
						alt="headshot"
						loading="lazy"
						className="w-60 h-56 rounded-full object-cover"
					/>
				</div>
				<Card className="space-y-4 max-w-205">
					<header className="flex flex-row">
						Hi, I'm Wesley{' '}
						<div className="font-normal px-2 bg-linear-to-r from-accent via-fuchsia-500 to-cyan-400 gradient-animation bg-clip-text text-transparent bg-size-[200%_auto]">
							ᕕ( ᐛ )ᕗ
						</div>
					</header>
					<div>
						This is my personal website, a space for me to document my projects, hobbies, and processes.
					</div>
					<div>If you see anything that interests you, I'd love to talk about it!</div>
					<SocialLinks />
				</Card>
			</div>
			<Card className="space-y-4">
				<header className="flex text-center w-full">About Me</header>
				<div>
					I am a student studying Cybersecurity at Northeastern University with a passion for developing
					secure systems and applications.
				</div>
				<div>
					My current focus is building applications with a focus on creating applications with a focus on
					security, extensibility, and efficiency. To that end, enjoy competing in competitions like{' '}
					<a href="https://www.ncaecybergames.org/#">NCAE</a> and{' '}
					<a href="https://cyberforce.energy.gov/">CyberForce</a>, and slowly building up my a homelab to
					something I can consistently rely on for things like home utilities, file storages, and any
					other technology based experiments.
				</div>
				<div>
					Outside of all that, I'm busy spending time with friends, finding time to hit the gym, obsessing
					over a new game to obsess for a couple days, or exploring stores and neighborhoods around
					Boston.
				</div>
			</Card>
			<div className="grid grid-rows-2 gap-4">
				<Project title="Shorelark" heading="Featured: Shorelark" size="small" image={shorelarkGif.src} />
			</div>
		</>
	);
}
