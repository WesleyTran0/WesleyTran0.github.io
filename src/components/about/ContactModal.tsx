"use client";

import GithubIcon from "../icons/GithubIcon";
import LinkedinIcon from "../icons/LinkedinIcon";
import MailIcon from "../icons/MailIcon";
import Modal from "../Modal";

interface ContactModalProps {
	open: boolean;
	onClose: () => void;
}

export default function ContactModal({ open, onClose }: ContactModalProps) {
	return (
		<Modal open={open} onClose={onClose} labelledBy="contact-heading">
			<h2 id="contact-heading" className="m-0 mb-5 text-[23px] font-medium text-text">
				Find me at any of the following:
			</h2>
			<ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-base">
				<li>
					<a
						href="mailto:tran.we@northeastern.edu"
						className="inline-flex items-center gap-2.5 text-muted transition-colors hover:text-accent"
					>
						<MailIcon size={20} />
						<span>Email</span>
					</a>
				</li>
				<li>
					<a
						href="https://github.com/WesleyTran0"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2.5 text-muted transition-colors hover:text-accent"
					>
						<GithubIcon size={20} />
						<span>Github</span>
					</a>
				</li>
				<li>
					<a
						href="https://www.linkedin.com/in/wesley-tran/"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2.5 text-muted transition-colors hover:text-accent"
					>
						<LinkedinIcon size={20} />
						<span>Linkedin</span>
					</a>
				</li>
			</ul>
		</Modal>
	);
}
