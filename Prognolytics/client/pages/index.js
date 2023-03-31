import Footer from '@/components/navigation/Footer';
import Navbar from '@/components/navigation/Navbar';
import Hero from '@/components/Hero';

export default function Home() {
	return (
		<>
			<Navbar />
			<main className='content relative'>
				<Hero />
			</main>
			<Footer />
		</>
	);
}
