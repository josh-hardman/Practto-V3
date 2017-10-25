import React, { Component } from "react";
import Section from "../layouts/Section";
import { withTheme } from "styled-components";
import ListingHeader from "../components/ListingHeader";
import SectionHeader from "../components/SectionHeader";
import SectionParagraph from "../components/SectionParagraph";
import Divider from "../components/Divider";
import Staff from "../components/Staff";
import Contact from "../components/Contact";
import Testimonials from "../components/Testimonials";
import MediaPlayer from "../components/MediaPlayer";
import Card from "../components/Card";
import TextField from "material-ui/TextField";
import { removeDash } from '../utils/utils';
import { CircularProgress } from 'material-ui/Progress';
import styled from 'styled-components'
// import DatePicker from "material-ui/DatePicker";
// import AutoComplete from "material-ui/AutoComplete";
// import Toggle from "material-ui/Toggle";


import { gql, graphql } from "react-apollo";
import queryString from "query-string";
import dummyData from "../listingPageData";
import RequestAppointmentForm from '../components/RequestAppointmentForm'

const ProgressWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

class ListingPage extends Component {
  handleGetInsurances = () =>
    this.props.data.Practice.insurances.map(item => item.name);

  handleGetTitle = () => this.props.data.Practice.name;

  render() {
    const { theme, location, data = dummyData, handleChange } = this.props;
    return (
      <div>
        <div>
          <Section background={theme.lightBlue} zIndex={-1}>
            {
              data.loading ? 
                <ProgressWrapper>
                  <CircularProgress size={50} /> 
                </ProgressWrapper> 
              : 
                <ListingHeader>
                  {data.Practice && removeDash(data.Practice.name)}
                </ListingHeader>
              }
          </Section>
          {data.loading ? (
            <Section background={theme.mediumBlue} zIndex={-2} squareBottom>
              <Card background={theme.aliceBlue}>
                <ProgressWrapper>
                  <CircularProgress size={50} /> 
                </ProgressWrapper>
              </Card>
            </Section>
          ) : data.Practice ? (
            <div>
              <Section background={theme.mediumBlue} zIndex={-2}>
                <Card background={theme.aliceBlue}>
                  {data.Practice.about && (
                    <div>
                      <SectionHeader color={theme.textBlack}>
                        About Us
                      </SectionHeader>
                      <SectionParagraph color={theme.textBlack}>
                        {data.Practice.about}
                      </SectionParagraph>

                      <Divider />
                    </div>
                  )}

                  {data.Practice.staffMembers.length > 0 && (
                    <div>
                      <SectionHeader color={theme.textBlack}>
                        Doctors
                      </SectionHeader>
                      <Staff items={data.Practice.staffMembers} />

                      <Divider />
                    </div>
                  )}

                  {data.Practice.welcomeVideo && (
                    <div>
                      <SectionHeader color={theme.textBlack}>
                        Welcome Video
                      </SectionHeader>
                      <MediaPlayer url={data.Practice.welcomeVideo} />
                    </div>
                  )}
                </Card>
              </Section>

              {data.Practice.testimonials.length > 0 && (
                <Section background={theme.lightRed} zIndex={-3}>
                  <SectionHeader color={theme.white}>
                    Patient Testimonials
                  </SectionHeader>
                  <Testimonials items={data.Practice.testimonials} />
                </Section>
              )}

              <Section background={theme.white} zIndex={-4}>
                <Card>
                  <SectionHeader color={theme.textBlack}>
                    Contact Us
                  </SectionHeader>
                  <Contact
                    practice={data.Practice.name}
                    phone={data.Practice.phone}
                    email={data.Practice.email}
                    website={data.Practice.website}
                    location={data.Practice.location}
                    address={data.Practice.address}
                  />
                </Card>
              </Section>

              <Section background={theme.orange} zIndex={-5} squareBottom>
                <Card>
                  <SectionHeader color={theme.textBlack}>
                    Request Appointment
                  </SectionHeader>

                  <RequestAppointmentForm insurances={data.Practice.insurances} specialOffers={data.Practice.specialOffers} handleUpdate={handleChange} />
                </Card>
              </Section>
            </div>
          ) : (
                <Section background={theme.mediumBlue} zIndex={-2} squareBottom>
                  <Card background={theme.aliceBlue}>Practice Not Found</Card>
                </Section>
              )}
        </div>
      </div>
    );
  }
}

const Query = gql`
  query FetchPractice($practice: ID!) {
    Practice(id: $practice) {
      name
      about
      staffMembers {
        name
        image {
          url
        }
        about
      }
      welcomeVideo
      testimonials {
        name
        content
        image {
          url
        }
      }
      location
      address
      phone
      email
      website
      insurances {
        id
        name
      }
      specialOffers {
        name
      }
    }
  }
`;

// Use Dumy Data
// export default withTheme(ListingPage);

// Fetch Live Data
const PracticeQuery = graphql(Query, {
  options: props => ({
    variables: {
      practice: queryString.parse(props.location.search).practice

    }
  })
})(withTheme(ListingPage));

export default PracticeQuery;
