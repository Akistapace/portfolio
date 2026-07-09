import { Document, Link, Page, Path, StyleSheet, Svg, Text, View } from '@react-pdf/renderer'

import i18n from '@/i18n'

const styles = StyleSheet.create({
	page: {
		fontSize: 10,
		fontFamily: 'Helvetica',
		color: '#1a1a1a',
	},
	header: {
		backgroundColor: '#262220',
		color: '#ffffff',
		paddingVertical: 28,
		paddingHorizontal: 32,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
	name: {
		fontSize: 26,
		fontFamily: 'Helvetica-Bold',
		marginBottom: 6,
	},
	title: {
		fontSize: 11,
		color: '#d9d3cd',
	},
	contactItem: {
		fontSize: 9,
		color: '#ffffff',
		marginBottom: 4,
	},
	socialRow: {
		flexDirection: 'row',
		gap: 12,
		marginTop: 2,
	},
	socialLink: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	socialText: {
		fontSize: 9,
		color: '#ffffff',
	},
	body: {
		flexDirection: 'row',
		paddingTop: 24,
		paddingHorizontal: 32,
		paddingBottom: 32,
		gap: 20,
	},
	sidebar: {
		width: '32%',
		gap: 20,
	},
	main: {
		width: '68%',
		gap: 10,
	},
	sectionTitle: {
		fontSize: 13,
		fontFamily: 'Helvetica-Bold',
		marginBottom: 6,
		color: '#1a1a1a',
	},
	divider: {
		borderBottomWidth: 1,
		borderBottomColor: '#d9d3cd',
		marginTop: 8,
		marginBottom: 4,
	},
	skillsWrap: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 4,
	},
	skillPill: {
		backgroundColor: '#262220',
		color: '#ffffff',
		fontSize: 9,
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 10,
	},
	langItem: {
		fontSize: 9,
		marginBottom: 3,
	},
	experienceItem: {
		marginBottom: 12,
	},
	experienceHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
	experienceRole: {
		fontSize: 11,
		fontFamily: 'Helvetica-Bold',
	},
	experiencePeriod: {
		fontSize: 9,
	},
	experienceSubtitle: {
		fontSize: 9.5,
		fontFamily: 'Helvetica-Bold',
		color: '#5c5c5c',
		marginTop: 2,
		marginBottom: 4,
	},
	experienceText: {
		fontSize: 9.5,
		lineHeight: 1.4,
		color: '#2b2b2b',
	},
})

const mainStack = [
	'Typescript',
	'Javascript',
	'React',
	'Nextjs',
	'Node',
	'Tailwind',
	'CSS',
	'Graphql',
	'Jest',
	'Playwright',
	'Supabase',
	'Git',
]

const skills = ['VTEX', 'Web Performance', 'Shopify', 'WordPress', 'Liquid', 'Clean Code', 'AI Engineering']

type ResumeLanguage = { label: string; level: string }
type ResumeExperience = { role: string; period: string; subtitle: string; text: string }

export const ResumeDocument = () => {
	const t = i18n.t

	const languages = t('resume.doc.languages', { returnObjects: true }) as ResumeLanguage[]
	const experiences = t('resume.doc.experiences', { returnObjects: true }) as ResumeExperience[]

	return (
		<Document title='Fernando Aquistapace - CV' author='Fernando Aquistapace'>
			<Page size='A4' style={styles.page}>
				<View style={styles.header}>
					<View>
						<Text style={styles.name}>Fernando Aquistapace</Text>
						<Text style={styles.title}>{t('resume.doc.title')}</Text>
					</View>
					<View>
						<Text style={styles.contactItem}>fernando.akistapace@gmail.com</Text>
						<View style={styles.socialRow}>
							<Link src='https://www.linkedin.com/in/fernando-aquistapace' style={styles.socialLink}>
								<Svg width={10} height={10} viewBox='0 0 24 24'>
									<Path
										fill='#ffffff'
										d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z'
									/>
								</Svg>
							</Link>
							<Link src='https://github.com/Akistapace' style={styles.socialLink}>
								<Svg width={10} height={10} viewBox='0 0 24 24'>
									<Path
										fill='#ffffff'
										d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'
									/>
								</Svg>
							</Link>
						</View>
					</View>
				</View>

				<View style={styles.body}>
					<View style={styles.sidebar}>
						<View>
							<Text style={styles.sectionTitle}>{t('resume.doc.sections.education')}</Text>
							<Text style={styles.experienceText}>{t('resume.doc.education')}</Text>
						</View>

						<View>
							<Text style={styles.sectionTitle}>{t('resume.doc.sections.mainStack')}</Text>
							<View style={styles.skillsWrap}>
								{mainStack.map(skill => (
									<Text key={skill} style={styles.skillPill}>
										{skill}
									</Text>
								))}
							</View>
							<Text style={{ ...styles.experienceText, marginTop: 8, color: '#5c5c5c' }}>
								{t('resume.doc.otherSkills')}
							</Text>
						</View>

						<View>
							<Text style={styles.sectionTitle}>{t('resume.doc.sections.skills')}</Text>
							<View style={styles.skillsWrap}>
								{skills.map(skill => (
									<Text key={skill} style={styles.skillPill}>
										{skill}
									</Text>
								))}
							</View>
						</View>

						<View>
							<Text style={styles.sectionTitle}>{t('resume.doc.sections.languages')}</Text>
							{languages.map(lang => (
								<Text key={lang.label} style={styles.langItem}>
									• {lang.label}: {lang.level}
								</Text>
							))}
						</View>
					</View>

					<View style={styles.main}>
						<Text style={styles.sectionTitle}>{t('resume.doc.sections.experience')}</Text>
						{experiences.map(exp => (
							<View key={exp.role} style={styles.experienceItem}>
								<View style={styles.experienceHeader}>
									<Text style={styles.experienceRole}>{exp.role}</Text>
									<Text style={styles.experiencePeriod}>{exp.period}</Text>
								</View>
								<Text style={styles.experienceSubtitle}>{exp.subtitle}</Text>
								<Text style={styles.experienceText}>{exp.text}</Text>
							</View>
						))}
					</View>
				</View>
			</Page>
		</Document>
	)
}
