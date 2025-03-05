import { lazy } from 'react';
import { lazyLoadComponent } from '../../../utils/lazyLoad';

// Lazy load sections
const Hero = lazyLoadComponent(() => import('./sections/Hero'));
const Features = lazyLoadComponent(() => import('./sections/Features'));
const Pricing = lazyLoadComponent(() => import('./sections/Pricing'));
const FAQ = lazyLoadComponent(() => import('./sections/FAQ'));
const Tokenomics = lazyLoadComponent(() => import('./sections/Tokenomics'));

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <Pricing />
      <FAQ />
      <Tokenomics />
    </div>
  );
}
