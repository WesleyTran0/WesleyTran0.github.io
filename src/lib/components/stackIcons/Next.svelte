<script lang="ts">
	import Card from '../Card.svelte';
</script>

<Card class="flex flex-row items-center h-9 py-6 px-3 w-fit space-x-2" padding={false}>
	<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
		<g clip-path="url(#clip0_9_2)">
			<mask
				id="mask0_9_2"
				style="mask-type:alpha"
				maskUnits="userSpaceOnUse"
				x="0"
				y="0"
				width="32"
				height="32"
			>
				<path
					d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
					fill="black"
				/>
			</mask>
			<g mask="url(#mask0_9_2)">
				<path
					d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
					fill="black"
					stroke="white"
					stroke-width="1.33333"
				/>
				<path
					d="M26.5792 28.0035L12.2919 9.59998H9.59998V22.3946H11.7535V12.3348L24.8887 29.3058C25.4814 28.9091 26.046 28.4738 26.5792 28.0035Z"
					fill="url(#paint0_linear_9_2)"
				/>
				<path d="M22.5778 9.59998H20.4445V22.4H22.5778V9.59998Z" fill="url(#paint1_linear_9_2)" />
			</g>
		</g>
		<defs>
			<linearGradient
				id="paint0_linear_9_2"
				x1="19.3778"
				y1="20.7111"
				x2="25.6889"
				y2="28.5333"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="white" />
				<stop offset="1" stop-color="white" stop-opacity="0" />
			</linearGradient>
			<linearGradient
				id="paint1_linear_9_2"
				x1="21.5111"
				y1="9.59998"
				x2="21.4754"
				y2="19"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="white" />
				<stop offset="1" stop-color="white" stop-opacity="0" />
			</linearGradient>
			<clipPath id="clip0_9_2">
				<rect width="32" height="32" fill="white" />
			</clipPath>
		</defs>
	</svg>
	<span>Next.js</span>
</Card>
