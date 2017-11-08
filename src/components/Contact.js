import React from "react";
import styled from "styled-components";
import theme from "../theme/theme";
import { toRem, removeDash } from "../utils/utils";
import Phone from "react-icons/lib/fa/phone";
import Email from "react-icons/lib/md/email";
import Web from "react-icons/lib/fa/globe";
import Place from "react-icons/lib/md/place";
import LineItem from "../components/LineItem";
import List from "../components/List";
import Hours from "../components/Hours";

import { compose, withStateHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

const Detail = styled.span`
  padding-left: 8px;
  font-size: ${toRem(12)};
`;

const CenterContent = styled.div`
  display: flex;
  justify-content: center;
`;

const ContactBlock = styled.div`width: 100%;`;

const MapContainer = styled.div`padding: ${toRem(24)} ${toRem(14)};`;

const MapWithInfoWindow = compose(
  withStateHandlers(
    () => ({
      isOpen: false
    }),
    {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen
      })
    }
  ),
  withScriptjs,
  withGoogleMap
)(({ lat, lng, isOpen, onToggleOpen, practice }) => (
  <GoogleMap defaultZoom={13} defaultCenter={{ lat, lng }}>
    <Marker position={{ lat, lng }} onClick={onToggleOpen}>
      {isOpen && (
        <InfoWindow onCloseClick={onToggleOpen}>
          <span>{practice}</span>
        </InfoWindow>
      )}
    </Marker>
  </GoogleMap>
));

const Contact = ({
  phone,
  email,
  website,
  location,
  practice,
  address,
  officeHours
}) => (
  <CenterContent>
    <ContactBlock>
      <List>
        {phone && (
          <LineItem margin={4} target="_blank" href={`tel:${phone}`}>
            <Phone size={18} />
            <Detail>{phone}</Detail>
          </LineItem>
        )}
        {email && (
          <LineItem margin={4} target="_blank" href={`mailto:${email}`}>
            <Email size={18} />
            <Detail>{email}</Detail>
          </LineItem>
        )}
        {website && (
          <LineItem margin={4} target="_blank" href={website}>
            <Web size={18} />
            <Detail>{website}</Detail>
          </LineItem>
        )}
        {address && (
          <LineItem
            href={`http://www.google.com/maps/place/${removeDash(
              practice
            )}/${location.lat},${location.lng}`}
            target="_blank"
            margin={4}
          >
            <Place size={18} />
            <Detail>{address}</Detail>
          </LineItem>
        )}
      </List>
      <MapContainer>
        <MapWithInfoWindow
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBMJG2Y0T5xHmtrxL8yrHG7Tka8TxSMaU0`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          lat={location.lat}
          lng={location.lng}
          practice={practice}
        />
      </MapContainer>
      <Hours hours={officeHours} />
    </ContactBlock>
  </CenterContent>
);

export default Contact;
