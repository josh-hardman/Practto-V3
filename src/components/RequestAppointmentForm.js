import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import styled from "styled-components";
import { toRem, removeDash } from "../utils/utils";
import { toggleLabel } from "../theme/materialStyles";
import Switch from 'material-ui/Switch';
import SelectFilter from '../components/SelectFilter';
import Button from 'material-ui/Button';
import { Link } from "react-router-dom";
import { FormControl, FormControlLabel } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
import breakpoints from "../theme/breakpoints";

const FinePrint = styled.p`
  padding: 0 ${toRem(12)};
  font-size: ${toRem(8)};
  line-height: ${toRem(12)};
  margin: 0;
`;

const OffersWrapper = styled.div`margin-bottom: ${toRem(12)};`;

const Offers = styled.h3`
  font-size: ${toRem(14)};
  margin: ${toRem(24)} 0 ${toRem(12)};
  font-weight: normal;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 32px;
  padding-right: 8px;
`;

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%',
    },
    menu: {
        width: 200,
    },
});

const StyledForm = styled.form`
    display: flex;
    flex-wrap: wrap;
`

const FieldWrapper = styled.div`
    padding: 16px;
    width: 100%;

    @media screen and (min-width: ${breakpoints._480}) {
        width: 50%; 
    }
`

class TextFields extends React.Component {

    render() {
        const { classes, specialOffers = [], insurance, insurances = [], handleUpdate } = this.props;
        console.log(handleUpdate)
        return (
            <StyledForm method="post" >
                <input
                    type="hidden"
                    name="form-name"
                    value="appointment_request"
                />
                <FieldWrapper>
                    <TextField
                        id="full_name"
                        label="Full Name"
                        margin="normal"
                        className={classes.textField}
                    />
                </FieldWrapper>
                <FieldWrapper>
                    <TextField
                        id="email"
                        label="Email"
                        margin="normal"
                        className={classes.textField}
                    />
                </FieldWrapper>
                <FieldWrapper>
                    <TextField
                        id="request_date"
                        label="Request Date"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        className={classes.textField}
                    />
                </FieldWrapper>
                <FieldWrapper>
                    <FormControl className={classes.textField}>
                        <InputLabel htmlFor="age-native-simple">Insurance</InputLabel>
                        <Select
                            native
                            value={insurance}
                            onChange={handleUpdate('insurance')}
                            input={<Input id="age-native-simple" />}
                        >
                            <option value="" />
                            {
                                insurances && insurances.map((suggestion, i) => (
                                    <option key={i} value={suggestion}>{suggestion}</option>
                                ))
                            }

                        </Select>
                    </FormControl>
                </FieldWrapper>
                <FieldWrapper>
                    <TextField
                        label="email"
                        className={classes.textField}
                    />
                </FieldWrapper>
                <FieldWrapper>
                    <TextField
                        label="Additional Comments"
                        floatingLabelFixed={true}
                        floatingLabelText="Phone Number"
                        className={classes.textField}
                    />
                </FieldWrapper>
                <FieldWrapper>
                    {specialOffers.length > 0 && (
                        <OffersWrapper>
                            <Offers>Special Offers</Offers>

                            {specialOffers.map((item, i) => (
                                <FormControlLabel
                                    key={i}
                                    control={
                                        <Switch
                                            name={`special_offer[]`}
                                            aria-label="checkedA"
                                        />
                                    }
                                    label={item.name}
                                />
                            ))}
                        </OffersWrapper>
                    )}
                </FieldWrapper>
                
                <ButtonContainer>
                    <Link style={{ textDecoration: 'none' }} to="/search">
                        <Button raised color='primary'>Search</Button>
                    </Link>
                    <FinePrint>
                    * This form will request an appointment on your behalf.
                        You should receive an email to confirm your visit shortly.
                    </FinePrint>
                </ButtonContainer>
            </StyledForm>
        );
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
// export default TextFields;