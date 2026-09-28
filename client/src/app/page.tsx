import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import HeroSection from '@/components/home/HeroSection';

const FrameCarousel  = dynamic(() => import('@/components/home/FrameCarousel'));
const FeaturedProducts = dynamic(() => import('@/components/home/FeaturedProducts'));
const BrandStrip     = dynamic(() => import('@/components/home/BrandStrip'));

export const metadata: Metadata = {
  title:       'ARTEVO — Make Space for Your Vibe',
  description: 'The ARTEVO Wall Rack. A little piece that makes your space feel more like you. Natural wood. Wall mounted. The first drop.',
  openGraph: {
    title:       'ARTEVO — Your Wall. Your Vibe.',
    description: 'Shop the first drop. Natural wood wall racks for real rooms.',
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <FrameCarousel />
      <BrandStrip />
    </>
  );
}
