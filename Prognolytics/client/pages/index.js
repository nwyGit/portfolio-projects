import Footer from '@/components/navigation/Footer';
import Navbar from '@/components/navigation/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';

export default function Home() {
	return (
		<>
			<Navbar />
			<main>
				<Hero />
				<Features />
				<Pricing />
			</main>
			<Footer />
		</>
	);
}
