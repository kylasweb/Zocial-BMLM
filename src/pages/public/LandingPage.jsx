import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaChartLine, FaUsers, FaTrophy, FaQuestionCircle } from 'react-icons/fa';
import TestimonialCard from '../../components/TestimonialCard';
import FAQAccordion from '../../components/FAQAccordion';
import PlanCard from '../../components/PlanCard';
import ContactForm from '../../components/ContactForm';

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState({
    hero: {
      title: 'Welcome to Zocial Ecosystem',
      subtitle: 'Transform Your Digital Interactions with Blockchain Technology',
      cta: 'Join Now'
    },
    features: [
      {
        title: 'Zocial.network',
        description: 'Connect and interact with our vibrant community platform',
        icon: <FaUsers className="w-6 h-6 text-primary-600" />
      },
      {
        title: 'Zocial.chat',
        description: 'Seamless communication network between users',
        icon: <FaChartLine className="w-6 h-6 text-primary-600" />
      },
      {
        title: 'Zocial.exchange',
        description: 'Advanced trading platform for cryptocurrency exchange',
        icon: <FaTrophy className="w-6 h-6 text-primary-600" />
      },
      {
        title: 'Zocial.life',
        description: 'Easy platform for coin purchases and transactions',
        icon: <FaQuestionCircle className="w-6 h-6 text-primary-600" />
      }
    ],
    testimonials: [
      {
        name: 'John Doe',
        role: 'Team Leader',
        content: 'The binary matrix system has revolutionized our team structure.',
        avatar: '/avatars/john.jpg'
      },
      // Add more testimonials
    ],
    plans: [
      {
        name: 'Starter',
        price: '100 USDT',
        features: ['Basic Binary Matrix', 'Standard Rewards', 'Community Access'],
        recommended: false
      },
      // Add more plans
    ],
    faqs: [
      {
        question: 'How does the binary matrix system work?',
        answer: 'Our binary matrix system operates on a two-leg structure...'
      },
      // Add more FAQs
    ],
    tokenomics: {
      title: 'Tokenomics',
      supply: '21 Million Tokens (Mintable)',
      features: [
        'Binary Matrix System',
        'Spillover Pools',
        'Fast Track Bonuses',
        'Team Building Rewards'
      ]
    }
  });

  useEffect(() => {
    // Fetch content from API
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{content.hero.title}</h1>
          <p className="text-xl md:text-2xl mb-8">{content.hero.subtitle}</p>
          <div className="space-x-4">
            <Link
              to="/register"
              className="bg-white text-primary-600 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              {content.hero.cta}
            </Link>
            <Link
              to="/learn-more"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-primary-600 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Ecosystem</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-lg"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Binary Matrix Visualization */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Binary Matrix Structure</h2>
          {/* Add 3D visualization component here */}
        </div>
      </section>

      {/* Investment Plans */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Investment Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.plans.map((plan, index) => (
              <PlanCard key={index} {...plan} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">{content.tokenomics.title}</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-xl font-semibold mb-6 text-center">
                Total Supply: {content.tokenomics.supply}
              </div>
              <div className="grid grid-cols-2 gap-6">
                {content.tokenomics.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <FAQAccordion faqs={content.faqs} />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Get in Touch</h2>
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
