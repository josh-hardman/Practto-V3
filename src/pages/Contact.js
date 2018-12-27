import React from 'react'
import styled from 'styled-components'
import Section from '../layouts/Section'
import Card from '../components/Card'
import theme from '../theme/theme'
import ListingHeader from '../components/ListingHeader'
import SectionHeader from '../components/SectionHeader'
import ContactForm from '../components/ContactForm'
import Divider from '../components/Divider'
import SectionParagraph from '../components/SectionParagraph'
import Phone from 'react-icons/lib/fa/phone'
import Email from 'react-icons/lib/md/email'
import LineItem from '../components/LineItem'
import List from '../components/List'
import { toRem } from '../utils/utils'

const Detail = styled.span`
  padding-left: 8px;
  font-size: ${toRem(14)};
`

const Contact = () => (
  <div>
    <Section background={theme.aliceBlue}>
      <ListingHeader>Contact</ListingHeader>
    </Section>
    <Section background={theme.burgandy} zIndex={-2} squareBottom>
      <Card background={theme.aliceBlue}>
        <SectionHeader color={theme.textBlack}>
          {'How can we help?'}
          <ContactForm />
        </SectionHeader>
        <Divider />
        <SectionHeader color={theme.textBlack}>{'Contact Info'}</SectionHeader>
        <SectionParagraph color={theme.textBlack}>
          <List>
            <LineItem margin={4} target='_blank' href={`tel:385-335-1213`}>
              <Phone size={22} />
              <Detail>385-335-1213</Detail>
            </LineItem>
            <LineItem
              margin={4}
              target='_blank'
              href='mailto:info@practto.com?subject=Question about Practto'
            >
              <Email size={22} />
              <Detail>info@practto.com</Detail>
            </LineItem>
          </List>
        </SectionParagraph>
      </Card>
    </Section>
  </div>
)

export default Contact
