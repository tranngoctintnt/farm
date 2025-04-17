import React from 'react'
import ErrorBoundary from '../../components/Event/ErrorBoundary'
import HeroSection from '../../components/Event/HeroSection'
import OffersSection from '../../components/Event/OffersSection'
import EventsSection from '../../components/Event/EventsSection'
import TestimonialSection from '../../components/Event/TestimonialSection'
import RegisterSection from '../../components/Event/RegisterSection'
// import SignatureExperiences from '../../components/Event/SignatureExperiences'
import WhyChoose from '../../components/Event/WhyChoose'
import EventTimeline from '../../components/Event/EventTimeline'
import EventGallery from '../../components/Event/EventGallery'
import SocialFeed from '../../components/Event/SocialFeed'

const Event = () => {
  return (
    <ErrorBoundary>
      <HeroSection />
      <WhyChoose/>
      <EventTimeline/>
      <EventGallery/>
      <SocialFeed/>
      {/* <OffersSection /> */}
      {/* <EventsSection />
      <TestimonialSection /> */}
      <RegisterSection />
    </ErrorBoundary>
  )
}

export default Event