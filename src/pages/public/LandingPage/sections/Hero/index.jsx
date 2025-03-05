import { lazyLoadComponent } from '../../../../../utils/lazyLoad';

const HeroHeader = lazyLoadComponent(() => import('./HeroHeader'));
const HeroContent = lazyLoadComponent(() => import('./HeroContent'));
const HeroCTA = lazyLoadComponent(() => import('./HeroCTA'));

export default function Hero() {
  return (
    <section className="relative py-20">
      <HeroHeader />
      <HeroContent />
      <HeroCTA />
    </section>
  );
}