"use client";

import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icon";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { T } from "@/lib/i18n";

export function About() {
	return (
		<section id="about" className="relative py-32">
			<div className="max-w-7xl mx-auto px-6 sm:px-10">
				{/* Section label */}
				<ScrollReveal className="mb-16">
					<span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-blue-400 uppercase">
						<span className="w-4 h-px bg-blue-400/60" />
						<T en="About Me" id="Tentang Saya" />
						<span className="w-4 h-px bg-blue-400/60" />
					</span>
				</ScrollReveal>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
					{/* LEFT: Text content */}
					<ScrollReveal delay={0.1}>
						<Heading level="h2" className="text-white mb-6 leading-snug">
							<T
								en={
									<>
										A bit about <br />
										<span className="text-blue-400">who I am</span>
									</>
								}
								id={
									<>
										Sedikit tentang <br />
										<span className="text-blue-400">siapa saya</span>
									</>
								}
							/>
						</Heading>

						<p className="text-lg text-gray-400 leading-relaxed mb-4">
							<T
								en={
									<>
										I&apos;m{" "}
										<span className="text-white font-medium">
											Joshtri Lenggu
										</span>{" "}
										— a Full-Stack Developer from Jakarta, Indonesia. I&apos;ve
										been building for the web since 2020, working on government
										platforms, internal tools, and personal projects across the
										full stack.
									</>
								}
								id={
									<>
										Saya{" "}
										<span className="text-white font-medium">
											Joshtri Lenggu
										</span>{" "}
										— seorang Full-Stack Developer dari Jakarta, Indonesia. Saya
										telah membangun untuk web sejak 2020, mengerjakan platform
										pemerintah, alat internal, dan proyek pribadi di seluruh
										stack.
									</>
								}
							/>
						</p>

						<p className="text-lg text-gray-400 leading-relaxed mb-8">
							<T
								en={
									<>
										What drives me is simple: I like writing code that{" "}
										<em className="text-white not-italic font-medium">
											actually works
										</em>
										. Not just passes a test — but holds up under real usage.
										Clean architecture, sensible APIs, and UIs that don&apos;t
										need a manual. That&apos;s the standard I aim for.
									</>
								}
								id={
									<>
										Yang mendorong saya sederhana: Saya suka menulis kode yang{" "}
										<em className="text-white not-italic font-medium">
											benar-benar berfungsi
										</em>
										. Bukan hanya lulus uji — tapi tahan di bawah penggunaan
										nyata. Arsitektur bersih, API yang masuk akal, dan UI yang
										tidak perlu manual. Itulah standar yang saya tuju.
									</>
								}
							/>
						</p>

						<Button href="/cv.pdf" variant="outline" download>
							<Icon icon="lucide:download" className="w-4 h-4" />
							<T en="Download CV" id="Unduh CV" />
						</Button>
					</ScrollReveal>

					{/* RIGHT: Terminal card */}
					<ScrollReveal delay={0.2} className="relative">
						<div className="absolute -inset-10 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

						<div className="relative rounded-2xl border border-white/10 bg-black/60 backdrop-blur-sm overflow-hidden">
							<div className="flex items-center gap-2 px-4 py-3 border-b border-white/8 bg-white/4">
								<span className="w-3 h-3 rounded-full bg-red-500/80" />
								<span className="w-3 h-3 rounded-full bg-yellow-500/80" />
								<span className="w-3 h-3 rounded-full bg-green-500/80" />
								<span className="ml-3 text-xs text-gray-500 font-mono">
									~/joshtri — zsh
								</span>
							</div>

							<div className="p-6 font-mono text-sm leading-7 select-none">
								<p>
									<span className="text-green-400">joshtri@dev</span>
									<span className="text-white/30">:</span>
									<span className="text-blue-400">~</span>
									<span className="text-white/40"> $ </span>
									<span className="text-white">whoami</span>
								</p>

								<div className="mt-3">
									<p>
										<span className="text-violet-400">const</span>
										<span className="text-blue-300"> me</span>
										<span className="text-white/40"> = </span>
										<span className="text-white/50">&#123;</span>
									</p>
									<p className="pl-6">
										<span className="text-sky-300">name</span>
										<span className="text-white/40">:</span>
										<span className="text-white/40">{"     "}</span>
										<span className="text-emerald-400">
											&quot;Joshtri Lenggu&quot;
										</span>
										<span className="text-white/30">,</span>
									</p>
									<p className="pl-6">
										<span className="text-sky-300">role</span>
										<span className="text-white/40">:</span>
										<span className="text-white/40">{"     "}</span>
										<span className="text-emerald-400">
											&quot;Full-Stack Developer&quot;
										</span>
										<span className="text-white/30">,</span>
									</p>
									<p className="pl-6">
										<span className="text-sky-300">location</span>
										<span className="text-white/40">:</span>
										<span className="text-white/40"> </span>
										<span className="text-emerald-400">
											&quot;Jakarta, 🇮🇩&quot;
										</span>
										<span className="text-white/30">,</span>
									</p>
									<p className="pl-6">
										<span className="text-sky-300">stack</span>
										<span className="text-white/40">:</span>
										<span className="text-white/40">{"    "}</span>
										<span className="text-white/50">[</span>
										<span className="text-emerald-400">&quot;Web&quot;</span>
										<span className="text-white/30">, </span>
										<span className="text-emerald-400">&quot;API&quot;</span>
										<span className="text-white/30">, </span>
										<span className="text-emerald-400">&quot;UI&quot;</span>
										<span className="text-white/50">]</span>
										<span className="text-white/30">,</span>
									</p>
									<p className="pl-6">
										<span className="text-sky-300">available</span>
										<span className="text-white/40">:</span>
										<span className="text-white/40"> </span>
										<span className="text-orange-400">true</span>
										<span className="text-white/30">,</span>
									</p>
									<p>
										<span className="text-white/50">&#125;</span>
									</p>
								</div>

								<div className="mt-4 flex items-center">
									<span className="text-green-400">joshtri@dev</span>
									<span className="text-white/30">:</span>
									<span className="text-blue-400">~</span>
									<span className="text-white/40"> $ </span>
									<span className="terminal-cursor" />
								</div>
							</div>

							<div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-blue-500/5 to-transparent pointer-events-none" />
						</div>
					</ScrollReveal>
				</div>
			</div>
		</section>
	);
}
