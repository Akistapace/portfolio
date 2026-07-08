import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'

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
		paddingHorizontal: 18,
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
	contactRow: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		gap: 16,
		marginTop: -34,
	},
	contactItem: {
		fontSize: 9,
		color: '#ffffff',
	},
	body: {
		flexDirection: 'row',
		paddingTop: 24,
		paddingHorizontal: 18,
		paddingBottom: 32,
		gap: 24,
	},
	sidebar: {
		width: '32%',
		gap: 20,
	},
	main: {
		width: '68%',
		gap: 16,
	},
	sectionTitle: {
		fontSize: 13,
		fontFamily: 'Helvetica-Bold',
		marginBottom: 8,
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
		gap: 6,
	},
	skillPill: {
		backgroundColor: '#262220',
		color: '#ffffff',
		fontSize: 8,
		paddingVertical: 4,
		paddingHorizontal: 8,
		borderRadius: 10,
	},
	langItem: {
		fontSize: 9,
		marginBottom: 3,
	},
	experienceItem: {
		marginBottom: 12,
	},
	experienceRole: {
		fontSize: 11,
		fontFamily: 'Helvetica-Bold',
	},
	experiencePeriod: {
		fontSize: 9,
		color: '#5c5c5c',
	},
	experienceSubtitle: {
		fontSize: 9.5,
		fontFamily: 'Helvetica-Bold',
		marginTop: 2,
		marginBottom: 4,
	},
	experienceText: {
		fontSize: 9.5,
		lineHeight: 1.4,
		color: '#2b2b2b',
	},
})

const skills = [
	'Javascript',
	'React',
	'Node',
	'Web Performance',
	'Typescript',
	'Jest & Testing Library',
	'Graphql',
	'CSS-SASS-SCSS',
	'WordPress',
	'Git',
	'Vue',
	'Shopify',
	'VTEX',
	'Liquid',
]

const languages = [
	{ label: 'Português', level: 'Nativo' },
	{ label: 'Inglês', level: 'Intermediário' },
	{ label: 'Espanhol', level: 'Intermediário' },
]

const experiences = [
	{
		role: 'Senior Frontend Developer, Ilegra',
		period: 'Atualmente',
		subtitle: 'Criação de plataformas na SLC Agrícola.',
		text: 'Atualmente, trabalho em uma empresa agrícola, onde ajudo a desenvolver plataformas de gerenciamento para fazendas e funcionários. Criamos ferramentas para monitoramento de safras, rastreamento de tratores e operações agrícolas em geral. Concentro-me no desenvolvimento front-end, trabalhando em conjunto com a equipe para criar interfaces eficientes e fáceis de usar.',
	},
	{
		role: 'Senior Frontend Developer, Corebiz',
		period: '2022 - 2023',
		subtitle: 'Líder Técnico em Web Performance, Samsung',
		text: 'Como líder de Performance nas lojas da Samsung Brasil, dediquei-me a melhorar o desempenho da plataforma e a oferecer uma ótima experiência ao cliente. Minhas responsabilidades vão desde a identificação e resolução de gargalos técnicos até a implementação de estratégias para otimizar a eficiência do comércio eletrônico e impulsionar as conversões. Anteriormente, colaborei com iniciativas estratégicas de comércio eletrônico no Hub da Argentina por 11 meses, demonstrando minha capacidade de prosperar em ambientes multiculturais e contribuir para o sucesso do time. Minha liderança é caracterizada pela solução avançada de problemas, otimização contínua do desempenho e foco na formação de equipes de alto desempenho.',
	},
	{
		role: 'Junior Frontend Developer, Vnda Ecommerce',
		period: '2021 - 2022',
		subtitle: 'Criação e otimização de ecommerces de alto desempenho',
		text: 'Desenvolvi novas lojas e recursos, bem como implementei melhorias nos sites existentes na plataforma Vnda, utilizando habilidades avançadas em Liquid, Javascript, HTML e CSS. Garanti que os projetos estivessem de acordo com as especificações do cliente e atendessem aos padrões de qualidade da empresa. Também colaborei com a equipe para solucionar problemas e otimizar o desempenho dos sites.',
	},
	{
		role: 'Junior Frontend Developer, Nerau CX',
		period: '2020 - 2021',
		subtitle: 'Frontend Development and Maintenance of E-commerce Platforms',
		text: 'Atuei corrigindo bugs críticos e implementando soluções otimizadas para melhorar o desempenho e a usabilidade em plataformas diversas de ecommerce.',
	},
]

export const ResumeDocument = () => (
	<Document title='Fernando Aquistapace - CV' author='Fernando Aquistapace'>
		<Page size='A4' style={styles.page}>
			<View style={styles.header}>
				<Text style={styles.name}>Fernando Aquistapace</Text>
				<Text style={styles.title}>Frontend | VTEX | Web Performance</Text>
				<View style={styles.contactRow}>
					<Text style={styles.contactItem}>+55 51 985654436</Text>
					<Text style={styles.contactItem}>fernando.akistapace@gmail.com</Text>
					<Text style={styles.contactItem}>Canoas / RS-Brasil</Text>
				</View>
			</View>

			<View style={styles.body}>
				<View style={styles.sidebar}>
					<View>
						<Text style={styles.sectionTitle}>Formação</Text>
						<Text style={styles.experienceText}>Análise e Desenvolvimento de Sistemas | 2018-2021</Text>
					</View>

					<View>
						<Text style={styles.sectionTitle}>Conhecimentos</Text>
						<View style={styles.skillsWrap}>
							{skills.map(skill => (
								<Text key={skill} style={styles.skillPill}>
									{skill}
								</Text>
							))}
						</View>
						<Text style={{ ...styles.experienceText, marginTop: 8, color: '#5c5c5c' }}>Entre outros</Text>
					</View>

					<View>
						<Text style={styles.sectionTitle}>Idiomas</Text>
						{languages.map(lang => (
							<Text key={lang.label} style={styles.langItem}>
								• {lang.label}: {lang.level}
							</Text>
						))}
					</View>
				</View>

				<View style={styles.main}>
					<Text style={styles.sectionTitle}>Experiências</Text>
					{experiences.map(exp => (
						<View key={exp.role} style={styles.experienceItem}>
							<Text style={styles.experienceRole}>
								{exp.role} <Text style={styles.experiencePeriod}>({exp.period})</Text>
							</Text>
							<Text style={styles.experienceSubtitle}>{exp.subtitle}</Text>
							<Text style={styles.experienceText}>{exp.text}</Text>
						</View>
					))}
				</View>
			</View>
		</Page>
	</Document>
)
