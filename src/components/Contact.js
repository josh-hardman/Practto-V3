import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../theme/theme";
import { toRem } from "../utils/utils";
import Phone from "react-icons/lib/fa/phone";
import Email from "react-icons/lib/md/email";
import Web from "react-icons/lib/fa/globe";
import Place from "react-icons/lib/md/place";

import { compose, withProps, withStateHandlers } from "recompose";
import FaAnchor from "react-icons/lib/fa/anchor";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

const StyledLineItem = styled.a`
  color: ${props => (props.href ? theme.link : theme.textBlack)};
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const Detail = styled.span`
  padding-left: 8px;
  font-size: ${toRem(14)};
`;

const LineItem = ({ href, children }) => (
  <li>
    <StyledLineItem href={href}>{children}</StyledLineItem>
  </li>
);

const CenterContent = styled.div`
  display: flex;
  justify-content: center;
`;

const ContactBlock = styled.div`width: 100%;`;

const List = styled.ul`
  margin: 0;
  padding: 0 ${toRem(18)};
  list-style: none;
  line-height: ${toRem(18)};
`;

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

const Contact = ({ phone, email, website, location, practice }) => (
  <CenterContent>
    <ContactBlock>
      <List>
        <LineItem href="asdf">
          <Phone size={18} />
          <Detail>{phone}</Detail>
        </LineItem>
        <LineItem href="asdf">
          <Email size={18} />
          <Detail>{email}</Detail>
        </LineItem>
        <LineItem href="asdf">
          <Web size={18} />
          <Detail>{website}</Detail>
        </LineItem>
        <LineItem href="asdf">
          <Place size={18} />
          <Detail>stuff</Detail>
        </LineItem>
      </List>
      <MapContainer>
        <MapWithInfoWindow
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCAhKcZrLVKXET9xLs1tRA4y6tREWRa`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          lat={location.lat}
          lng={location.lon}
          practice={practice}
        />
      </MapContainer>
    </ContactBlock>
  </CenterContent>
);

export default Contact;
