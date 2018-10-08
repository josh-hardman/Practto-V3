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

// const EddieWrapper = styled.div`
//   display: flex;
//   flex-wrap: wrap;
// `;

const AvatarWrapper = styled.div`
  width: 50%;
  min-width: 150px;
  float: left;
  padding: 12px;

  @media screen and (min-width: ${breakpoints._480}) {
    width: 25%;
  }
`

// const AboutParagraph = styled(SectionParagraph)`flex-grow: 1;`;

const About = () => (
  <div>
    <Section background={theme.aliceBlue}>
      <ListingHeader>About Us</ListingHeader>
    </Section>
    <Section background={theme.mediumBlue} zIndex={-2} squareBottom>
      <Card background={theme.aliceBlue}>
        <SectionHeader color={theme.textBlack}>Who are we?</SectionHeader>
        <SectionParagraph color={theme.textBlack}>
          Practto: Is the fastest and most convenient way for patients to
          interact with dental service providers.
        </SectionParagraph>
        <SectionParagraph color={theme.textBlack}>
          We give you the convenience of finding all your needs for choosing a
          dental provider within our directory. Our goal is to help you feel
          confident about the decisions you are making when choosing a dentist
          provider for your needs.
        </SectionParagraph>

        <Divider />

        <SectionHeader color={theme.textBlack}>How do we do it?</SectionHeader>
        <SectionParagraph color={theme.textBlack}>
          You can find all the information you need about dental businesses
          nearby within our website which contains the following:
        </SectionParagraph>
        <List>
          <LineItem margin={12} fontSize={12}>
            Digital business ID
          </LineItem>
          <LineItem margin={12} fontSize={12}>
            Filtered by insurance
          </LineItem>
          <LineItem margin={12} fontSize={12}>
            100% verified reviews
          </LineItem>
          <LineItem margin={12} fontSize={12}>
            Practice introduction videos
          </LineItem>
          <LineItem margin={12} fontSize={12}>
            Links to special offers
          </LineItem>
          <LineItem margin={12} fontSize={12}>
            Updated business information
          </LineItem>
        </List>

        <Divider />

        <SectionHeader color={theme.textBlack}>
          Eddie Laparra: Founder/ CEO of Practto
        </SectionHeader>

        <AvatarWrapper>
          <Avatar height={100} src='eddie.jpg' />
        </AvatarWrapper>
        <SectionParagraph color={theme.textBlack}>
          In 2005, he created the company Voda Reputation. Mr. Laparra started
          working with companies to help increase their reputation and ranking
          online with success but after recognizing inefficiencies with other
          directories, he saw an opportunity to please both businesses and their
          prospective clients by creating a more personalized directory targeted
          towards service providers.
        </SectionParagraph>

        <List>
          <LineItem margin={12} fontSize={12}>
            Graduated in 2014 with an emphasis on Business development from The
            Suazo Business Center hosted through Utah Valley University.
          </LineItem>
          <LineItem margin={12} fontSize={12}>
            Professional Sales, Basic Accounting and Quick Books, Personal
            Finances, and Protocol in The Suazo Business Center. (Utah)
          </LineItem>
        </List>

        <Divider />

        <SectionHeader color={theme.textBlack}>
          He knows what people are really looking for in an online directory
        </SectionHeader>
        <List>
          <LineItem margin={12} fontSize={12}>
            Companies that have experience in their field with friendly staff
          </LineItem>
          <LineItem margin={12} fontSize={12}>
            Accurate information with real reviews & testimonials
          </LineItem>
          <LineItem margin={12} fontSize={12}>
            Personalized introduction videos from the business owners
          </LineItem>
          <LineItem margin={12} fontSize={12}>
            Special offers and coupons
          </LineItem>
        </List>
        <SectionParagraph color={theme.textBlack}>
          Practto covers all aspects and helps patients/clients feel confidence
          in knowing that the provider they are choosing meets all their
          expectations before moving forward.
        </SectionParagraph>
      </Card>
    </Section>
  </div>
)

export default About
