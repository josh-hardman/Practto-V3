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
import { toRem } from "../utils/utils";
import { toggleLabel } from "../theme/materialStyles";
import { gql, graphql } from "react-apollo";
import queryString from "query-string";
import dummyData from "../listingPageData";

const fruit = [
  "Apple",
  "Apricot",
  "Avocado",
  "Banana",
  "Bilberry",
  "Blackberry",
  "Blackcurrant",
  "Blueberry",
  "Boysenberry",
  "Blood Orange",
  "Cantaloupe",
  "Currant",
  "Cherry",
  "Cherimoya",
  "Cloudberry",
  "Coconut",
  "Cranberry",
  "Clementine",
  "Damson",
  "Date",
  "Dragonfruit",
  "Durian",
  "Elderberry",
  "Feijoa",
  "Fig",
  "Goji berry",
  "Gooseberry",
  "Grape",
  "Grapefruit",
  "Guava",
  "Honeydew",
  "Huckleberry",
  "Jabouticaba",
  "Jackfruit",
  "Jambul",
  "Jujube",
  "Juniper berry",
  "Kiwi fruit",
  "Kumquat",
  "Lemon",
  "Lime",
  "Loquat",
  "Lychee",
  "Nectarine",
  "Mango",
  "Marion berry",
  "Melon",
  "Miracle fruit",
  "Mulberry",
  "Mandarine",
  "Olive",
  "Orange",
  "Papaya",
  "Passionfruit",
  "Peach",
  "Pear",
  "Persimmon",
  "Physalis",
  "Plum",
  "Pineapple",
  "Pumpkin",
  "Pomegranate",
  "Pomelo",
  "Purple Mangosteen",
  "Quince",
  "Raspberry",
  "Raisin",
  "Rambutan",
  "Redcurrant",
  "Salal berry",
  "Satsuma",
  "Star fruit",
  "Strawberry",
  "Squash",
  "Salmonberry",
  "Tamarillo",
  "Tamarind",
  "Tomato",
  "Tangerine",
  "Ugli fruit",
  "Watermelon"
];

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

  render() {
    const { theme, location, data = dummyData } = this.props;
    return (
      <div>
        {data.loading ? (
          "loading"
        ) : data.Practice ? (
          <div>
            <Section background={theme.lightBlue} zIndex={-1}>
              <ListingHeader>{data.Practice.name}</ListingHeader>
            </Section>

            <Section background={theme.mediumBlue} zIndex={-2}>
              <Card background={theme.aliceBlue}>
                <SectionHeader color={theme.textBlack}>About Us</SectionHeader>
                <SectionParagraph color={theme.textBlack}>
                  {data.Practice.about}
                </SectionParagraph>

                <Divider />

                <SectionHeader color={theme.textBlack}>
                  Staff Members
                </SectionHeader>
                <Staff items={data.Practice.staffMembers} />

                <Divider />

                <SectionHeader color={theme.textBlack}>
                  Welcome Video
                </SectionHeader>
                <MediaPlayer url={data.Practice.welcomeVideo} />
              </Card>
            </Section>

            <Section background={theme.lightRed} zIndex={-3}>
              {/* <Card background={theme.aliceBlue}> */}
              <SectionHeader color={theme.white}>
                Patient Testimonials
              </SectionHeader>
              <Testimonials items={data.Practice.testimonials} />
              {/* </Card> */}
            </Section>

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
                />
              </Card>
            </Section>

            <Section background={theme.orange} zIndex={-5} squareBottom>
              <Card>
                <SectionHeader color={theme.textBlack}>
                  Request Appointment
                </SectionHeader>
                <TextField
                  floatingLabelFixed={true}
                  floatingLabelText="First Name"
                />
                <TextField
                  floatingLabelFixed={true}
                  floatingLabelText="Last Name"
                />
                <TextField
                  floatingLabelFixed={true}
                  floatingLabelText="Email Address"
                />
                <TextField
                  floatingLabelFixed={true}
                  floatingLabelText="Phone Number"
                />
                <DatePicker
                  floatingLabelFixed={true}
                  floatingLabelText="Request Date"
                  minDate={new Date()}
                />
                <AutoComplete
                  floatingLabelFixed={true}
                  floatingLabelText="Insurance Provider"
                  filter={AutoComplete.fuzzyFilter}
                  dataSource={this.handleGetInsurances()}
                  maxSearchResults={5}
                />
                <OffersWrapper>
                  <Offers>Special Offers</Offers>
                  {data.Practice.specialOffers &&
                    data.Practice.specialOffers.map((item, i) => (
                      <Toggle
                        key={i}
                        labelStyle={toggleLabel}
                        label={item.name}
                        labelPosition="right"
                      />
                    ))}
                </OffersWrapper>

                <TextField
                  floatingLabelText="Additional Comments"
                  multiLine={true}
                  floatingLabelFixed={true}
                  rows={1}
                />
                <FinePrint>
                  * This form will request an appointment on your behalf. You
                  wiill receive a follow up via email or phone from the listed
                  practice to confirm your visit.
                </FinePrint>
                <RaisedButton label="Submit" primary />
              </Card>
            </Section>
          </div>
        ) : (
          "practice not found"
        )}
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
  query FetchPractice($slug: String!) {
    Practice(name: $slug) {
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
      phone
      email
      website
      insurances {
        id
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
      slug: queryString.parse(props.location.search).practice
    }
  })
})(withTheme(IndexPage));

export default PracticeQuery;
