import React from 'react'
import "../Policy/style.css"
import ErrorBoundary from '../../components/Policy/ErrorBoundary'
import HeroSection from '../../components/Policy/HeroSection'
import BenefitsSection from '../../components/Policy/BenefitsSection'
import ResponsibilitiesSection from '../../components/Policy/ResponsibilitiesSection'
import ProcessSection from '../../components/Policy/ProcessSection'
import TestimonialSection from '../../components/Policy/TestimonialSection'
import FAQSection from '../../components/Policy/FAQSection'
import ContactSection from '../../components/Policy/ContactSection'

const Policy = () => {
  return (
    <div className='main'>

<ErrorBoundary>
      <HeroSection />
      <BenefitsSection />
      <ResponsibilitiesSection />
      <ProcessSection />
      <TestimonialSection />
      <FAQSection />
      <ContactSection />
    </ErrorBoundary>
    </div>
  )
}

export default Policy