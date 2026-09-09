"use client";

import { Heading } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icon";
import { Paragraph } from "@/components/ui/Paragraph";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { T, useLang } from "@/lib/i18n";
import type { Education, WorkExperience } from "@/utils/types";

function formatPeriod(startDate: string, endDate?: string): string {
	const start = new Date(startDate);
	const startStr = start.toLocaleDateString("en-US", {
		month: "short",
		year: "numeric",
	});
	if (!endDate) return startStr;
	const end = new Date(endDate);
	const endStr = end.toLocaleDateString("en-US", {
		month: "short",
		year: "numeric",
	});
	return `${startStr} – ${endStr}`;
}

function formatEduPeriod(startYear: number, endYear?: number): string {
	return endYear ? `${startYear} – ${endYear}` : `${startYear}`;
}

export function ExperienceClient({
	workExperience,
	education,
}: {
	workExperience: WorkExperience[];
	education: Education[];
}) {
	const { field } = useLang();
	const yearsOfCoding = new Date().getFullYear() - 2020;

	return (
		<section id="experience" className="relative overflow-hidden py-24">
			<div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10">
				{/* Header */}
				<ScrollReveal className="text-center mb-14" threshold={0.08}>
					<span className="text-xs font-semibold tracking-widest text-blue-400 uppercase mb-3 block">
						<T en="Background" id="Latar Belakang" />
					</span>
					<Heading level="h2" className="text-white mb-3">
						<T en="Experience & Education" id="Pengalaman & Pendidikan" />
					</Heading>
					<Paragraph color="muted" className="max-w-lg mx-auto">
						<T
							en={`${yearsOfCoding}+ years writing code — from college assignments to production systems.`}
							id={`${yearsOfCoding}+ tahun menulis kode — dari tugas kuliah hingga sistem produksi.`}
						/>
					</Paragraph>
				</ScrollReveal>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
					{/* LEFT — Work Experience */}
					<ScrollReveal threshold={0.08} delay={0.12}>
						<div className="flex items-center gap-2 mb-8">
							<Icon icon="lucide:briefcase" className="w-4 h-4 text-blue-400" />
							<h3 className="text-sm font-semibold text-white uppercase tracking-widest">
								<T en="Work" id="Pekerjaan" />
							</h3>
						</div>

						<div className="relative">
							<div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/10" />
							<div className="space-y-8">
								{workExperience.map((item) => {
									const desc = field(item.description);
									return (
										<div key={item._id} className="relative pl-8">
											<div
												className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 ${
													item.current
														? "bg-blue-500 border-blue-400"
														: "bg-gray-700 border-gray-500"
												}`}
											/>
											<div className="rounded-xl border border-white/8 bg-white/4 p-5 hover:border-white/15 transition-colors duration-200">
												<div className="flex items-start justify-between gap-3 mb-1">
													<h4 className="text-sm font-semibold text-white leading-snug">
														{field(item.role)}
													</h4>
													{item.current && (
														<span className="shrink-0 flex items-center gap-1 text-xs text-green-400 bg-green-400/10 border border-green-400/20 px-2 py-0.5 rounded-full">
															<span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
															<T en="Now" id="Sekarang" />
														</span>
													)}
												</div>

												<div className="flex items-center gap-2 mb-3">
													{item.companyUrl && item.companyUrl !== "#" ? (
														<a
															href={item.companyUrl}
															target="_blank"
															rel="noopener noreferrer"
															className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
														>
															{field(item.company)}
														</a>
													) : (
														<span className="text-xs text-gray-400">
															{field(item.company)}
														</span>
													)}
													<span className="text-white/20">·</span>
													<span className="text-xs text-gray-500">
														{item.current ? (
															<>
																{formatPeriod(item.startDate)} –{" "}
																<T en="Present" id="Sekarang" />
															</>
														) : (
															formatPeriod(item.startDate, item.endDate)
														)}
													</span>
												</div>

												{desc && (
													<p className="text-xs text-gray-400 leading-relaxed mb-3">
														{desc}
													</p>
												)}

												{item.keyProjects && item.keyProjects.length > 0 && (
													<div className="mb-4">
														<p className="text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-2">
															<T en="Key Projects" id="Proyek Utama" />
														</p>
														<div className="space-y-2">
															{item.keyProjects.map((kp) => {
																const kpDesc = field(kp.description);
																return (
																	<div
																		key={field(kp.title)}
																		className="flex gap-2"
																	>
																		<span className="mt-1.5 w-1 h-1 shrink-0 rounded-full bg-blue-400/60" />
																		<div>
																			<span className="text-xs text-white/80 font-medium">
																				{field(kp.title)}
																			</span>
																			{kpDesc && (
																				<span className="text-xs text-gray-500">
																					{" — "}
																					{kpDesc}
																				</span>
																			)}
																		</div>
																	</div>
																);
															})}
														</div>
													</div>
												)}

												<div className="flex flex-wrap gap-1.5">
													{(item.tags ?? []).map((tag) => (
														<span
															key={tag}
															className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/8 text-gray-400"
														>
															{tag}
														</span>
													))}
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</ScrollReveal>

					{/* RIGHT — Education */}
					<ScrollReveal threshold={0.08} delay={0.24}>
						<div className="flex items-center gap-2 mb-8">
							<Icon
								icon="lucide:graduation-cap"
								className="w-4 h-4 text-yellow-400"
							/>
							<h3 className="text-sm font-semibold text-white uppercase tracking-widest">
								<T en="Education" id="Pendidikan" />
							</h3>
						</div>

						<div className="relative">
							<div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/10" />
							<div className="space-y-8">
								{education.map((item) => (
									<div key={item._id} className="relative pl-8">
										<div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 bg-yellow-500/30 border-yellow-500/60" />
										<div className="rounded-xl border border-white/8 bg-white/4 p-5 hover:border-white/15 transition-colors duration-200">
											<h4 className="text-sm font-semibold text-white mb-1">
												{field(item.degree)}
											</h4>
											<div className="flex items-center gap-2 mb-3">
												<span className="text-xs text-gray-400">
													{field(item.school)}
												</span>
												<span className="text-white/20">·</span>
												<span className="text-xs text-gray-500">
													{formatEduPeriod(item.startYear, item.endYear)}
												</span>
												{item.gpa && (
													<>
														<span className="text-white/20">·</span>
														<span className="text-xs text-yellow-400/80">
															GPA {item.gpa}
														</span>
													</>
												)}
											</div>
											<p className="text-xs text-gray-400 leading-relaxed">
												{field(item.description)}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</ScrollReveal>
				</div>
			</div>
		</section>
	);
}
