import type { Metadata } from 'next';
import Button from '@/components/Button';
import Project from '@/components/Project';

import goodDogImg from '@/lib/projects/good-dog-licensing/good-dog-licensing.png';
import pngmeGif from '@/lib/projects/pngme/pngme.gif';
import searchNEUImg from '@/lib/projects/searchneu/searchneu.png';
import shorelarkGif from '@/lib/projects/shorelark/shorelark.gif';

import Docker from '@/components/stackIcons/Docker';
import Next from '@/components/stackIcons/Next';
import Postgres from '@/components/stackIcons/Postgres';
import Prisma from '@/components/stackIcons/Prisma';
import React from '@/components/stackIcons/React';
import Rust from '@/components/stackIcons/Rust';
import Scss from '@/components/stackIcons/Scss';
import TRPC from '@/components/stackIcons/TRPC';
import Tailwind from '@/components/stackIcons/Tailwind';
import TypeScript from '@/components/stackIcons/TypeScript';
import Wasm from '@/components/stackIcons/Wasm';

export const metadata: Metadata = {
	title: 'Wesley Tran | Projects'
};

export default function Projects() {
	return (
		<div className="flex flex-col gap-10">
			<div className="flex flex-col space-y-1">
				<Project
					heading="Good Dog Licensing — Connecting Musicians and Media Makers Alike"
					title="Good-Dog-Licensing"
					size="large"
					image={goodDogImg.src}
				/>
				<div className="flex flow-row gap-2">
					<Next />
					<React />
					<TypeScript />
					<Tailwind />
					<TRPC />
					<Prisma />
					<Postgres />
					<Docker />
				</div>
				<div className="flex flex-row">
					<Button href="https://good-dog-licensing.vercel.app/">Check it out</Button>
					<Button icon="github" href="https://github.com/sandboxnu/good-dog-licensing">
						View on Github
					</Button>
				</div>
			</div>
			<div className="flex flex-col space-y-1">
				<Project
					heading="Shorelark — A Neural Network Simulation"
					title="Shorelark"
					size="large"
					image={shorelarkGif.src}
				/>
				<div className="flex flow-row gap-2">
					<Rust />
					<Wasm />
				</div>
				<Button icon="github" href="https://github.com/WesleyTran0/shorelark">
					View on Github
				</Button>
			</div>
			<div className="flex flex-col space-y-1">
				<Project
					heading="PNGme — Encode Secret Messages in PNGs"
					title="PNGme"
					size="large"
					image={pngmeGif.src}
				/>
				<div className="flex flow-row gap-2">
					<Rust />
				</div>
				<Button icon="github" href="https://github.com/WesleyTran0/pngme">
					View on Github
				</Button>
			</div>
			<div className="flex flex-col space-y-1">
				<Project
					heading="SearchNEU — A Course Catalog Made by Students for Students"
					title="searchNEU"
					size="large"
					image={searchNEUImg.src}
				/>
				<div className="flex flow-row gap-2">
					<Next />
					<React />
					<TypeScript />
					<Scss />
					<Prisma />
					<Postgres />
					<Docker />
				</div>
				<div className="flex flex-row">
					<Button href="https://searchneu.com/">Check it out</Button>
					<Button icon="github" href="https://github.com/sandboxnu/searchneu">
						View on Github
					</Button>
				</div>
			</div>
		</div>
	);
}
