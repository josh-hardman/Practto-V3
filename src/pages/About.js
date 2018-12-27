import React from 'react'
import styled from 'styled-components'
import Section from '../layouts/Section'
import Card from '../components/Card'
import theme from '../theme/theme'
import ListingHeader from '../components/ListingHeader'
import SectionHeader from '../components/SectionHeader'
import SectionParagraph from '../components/SectionParagraph'
import Divider from '../components/Divider'
import LineItem from '../components/LineItem'
import List from '../components/List'
import Avatar from '../components/Avatar'
import breakpoints from '../theme/breakpoints'

const AvatarWrapper = styled.div`
  width: 50%;
  min-width: 150px;
  float: left;
  padding: 12px;

  @media screen and (min-width: ${breakpoints._480}) {
    width: 25%;
  }
`

const About = () => (
  <div>
    <Section background={theme.aliceBlue}>
      <ListingHeader>About Us</ListingHeader>
    </Section>
    <Section background={theme.burgandy} zIndex={-2} squareBottom>
      <Card background={theme.aliceBlue}>
        <SectionHeader color={theme.textBlack}>Our Goal</SectionHeader>
        <SectionParagraph color={theme.textBlack}>
          Our goal is to help you feel confident about the decisions you are
          making when choosing a professional provider for your needs.
        </SectionParagraph>
        <SectionParagraph color={theme.textBlack}>
          Practto carefully selects professionals that provide the best quality
          work and overall experience near you.
        </SectionParagraph>

        <Divider />

        <SectionHeader color={theme.textBlack}>
          Eddie Laparra: Founder/ CEO of Practto
        </SectionHeader>

        <AvatarWrapper>
          <Avatar height={100} src='eddie.jpg' />
        </AvatarWrapper>
        <SectionParagraph color={theme.textBlack}>
          Eddie Laparra understands that moving to a new area is like starting a
          new life. You live in a new neighborhood, start making new friends,
          and need to find professionals like: dentists, electritians,
          pediatricians, daycare, pest control, etc.
        </SectionParagraph>

        <SectionParagraph color={theme.textBlack}>
          We make it easy for you to find professionals that you can trust, and
          are highly reputable in their fields.
        </SectionParagraph>
        <Divider />
      </Card>
    </Section>
  </div>
)

export default About
