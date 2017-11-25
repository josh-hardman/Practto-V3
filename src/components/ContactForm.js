import React, { Component } from "react";
import PropTypes from "prop-types";
import TextField from "material-ui/TextField";
import styled from "styled-components";
import Button from "material-ui/Button";
import theme from "../theme/theme";

const ButtonContainer = styled.div`padding: 14px;`;

const StyledForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const FieldWrapper = styled.div`
  padding: 16px;
  width: 100%;
  font-size: 16px;
`;

const style = {
  marginTop: "8px",
  paddingRight: "8px",
  width: "100%",
  maxWidth: "250px"
};

class TextFields extends Component {
  render() {
    return (
      <StyledForm name="new_inquiry" method="post" action="thank-you" netlify>
        <input type="hidden" name="form-name" value="new_inquiry" />
        <FieldWrapper>
          <TextField
            style={style}
            id="full_name"
            name="full_name"
            label="Full Name"
          />
          <TextField style={style} id="email" name="email" label="Email" />
          <TextField
            style={style}
            id="phone"
            name="phone"
            label="Phone Number"
          />
          <TextField
            style={style}
            label="Message"
            id="message"
            name="message"
            floatingLabelFixed={true}
          />
        </FieldWrapper>

        <ButtonContainer>
          <Button
            type="submit"
            raised
            style={{
              background: theme.darkBlue,
              color: "white",
              fontWeight: "lighter"
            }}
          >
            Submit
          </Button>
        </ButtonContainer>
      </StyledForm>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired
};

export default TextFields;
