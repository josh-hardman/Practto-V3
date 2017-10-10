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
import DatePicker from "material-ui/DatePicker";
import AutoComplete from "material-ui/AutoComplete";
import Toggle from "material-ui/Toggle";
import RaisedButton from "material-ui/RaisedButton";
import styled from "styled-components";
import { toRem, removeDash } from "../utils/utils";
import { toggleLabel } from "../theme/materialStyles";
import { gql, graphql } from "react-apollo";
import queryString from "query-string";
import dummyData from "../listingPageData";

const FinePrint = styled.p`
  padding: ${toRem(12)} 0;
  font-size: ${toRem(8)};
  line-height: ${toRem(12)};
`;

const OffersWrapper = styled.div`margin-bottom: ${toRem(12)};`;

const Offers = styled.h3`
  font-size: ${toRem(14)};
  margin: ${toRem(24)} 0 ${toRem(12)};
  font-weight: normal;
`;

class IndexPage extends Component {
  handleGetInsurances = () =>
    this.props.data.Practice.insurances.map(item => item.name);

  handleGetTitle = () => this.props.data.Practice.name;

  render() {
    const { theme, location, data = dummyData } = this.props;

    return (
      <div>
        <div>
          <Section background={theme.lightBlue} zIndex={-1}>
            <ListingHeader>
              {data.Practice && removeDash(data.Practice.name)}
            </ListingHeader>
          </Section>
          {data.loading ? (
            <Section background={theme.mediumBlue} zIndex={-2} squareBottom>
              <Card background={theme.aliceBlue} style={{ height: "800px" }}>
                loading...
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
                        Staff Members
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
                  {/* <Card background={theme.aliceBlue}> */}
                  <SectionHeader color={theme.white}>
                    Patient Testimonials
                  </SectionHeader>
                  <Testimonials items={data.Practice.testimonials} />
                  {/* </Card> */}
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

                  <form method="post">
                    <input
                      type="hidden"
                      name="form-name"
                      value="appointment_request"
                    />
                    <TextField
                      fullWidth
                      name="first_name"
                      floatingLabelFixed={true}
                      floatingLabelText="First Name"
                    />
                    <TextField
                      fullWidth
                      name="last_name"
                      floatingLabelFixed={true}
                      floatingLabelText="Last Name"
                    />
                    <TextField
                      fullWidth
                      name="email"
                      floatingLabelFixed={true}
                      floatingLabelText="Email Address"
                    />
                    <TextField
                      fullWidth
                      name="phone"
                      floatingLabelFixed={true}
                      floatingLabelText="Phone Number"
                    />
                    <DatePicker
                      fullWidth
                      name="request_date"
                      floatingLabelFixed={true}
                      floatingLabelText="Request Date"
                      minDate={new Date()}
                    />
                    <AutoComplete
                      fullWidth
                      name="insuance"
                      floatingLabelFixed={true}
                      floatingLabelText="Insurance Provider"
                      filter={AutoComplete.fuzzyFilter}
                      dataSource={this.handleGetInsurances()}
                      maxSearchResults={5}
                    />
                    {data.Practice.specialOffers.length > 0 && (
                      <OffersWrapper>
                        <Offers>Special Offers</Offers>

                        {data.Practice.specialOffers.map((item, i) => (
                          <Toggle
                            name={`special_offer[]`}
                            key={i}
                            labelStyle={toggleLabel}
                            label={item.name}
                            labelPosition="right"
                          />
                        ))}
                      </OffersWrapper>
                    )}

                    <TextField
                      fullWidth
                      name="additional_comments"
                      floatingLabelText="Additional Comments"
                      multiLine={true}
                      floatingLabelFixed={true}
                      rows={1}
                    />
                    <FinePrint>
                      * This form will request an appointment on your behalf.
                      You wiill receive a follow up via email or phone from the
                      listed practice to confirm your visit.
                    </FinePrint>
                    <RaisedButton type="submit" label="Submit" primary />
                  </form>
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

// const IndexPage = ({ location, data }) => {
//   const query = queryString.parse(location.search);
//   console.log(data);
//   return (
//     <div>
//       {data.loading ? (
//         "loading"
//       ) : data.Practice ? (
//         data.Practice.name
//       ) : (
//         "practice not found"
//       )}
//     </div>
//   );
// };

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
// export default withTheme(IndexPage);

// Fetch Live Data
const PracticeQuery = graphql(Query, {
  options: props => ({
    variables: {
      practice: queryString.parse(props.location.search).practice
    }
  })
})(withTheme(IndexPage));

export default PracticeQuery;
