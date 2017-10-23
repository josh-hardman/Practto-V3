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

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },
});

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];

class TextFields extends React.Component {

    render() {
        const { classes, specialOffers = [], insurance, handleUpdate } = this.props;
        console.log(handleUpdate)
        return (
            <form method="post">
                <input
                    type="hidden"
                    name="form-name"
                    value="appointment_request"
                />
                <TextField
                    id="full_name"
                    label="Full Name"
                    margin="normal"
                />
                <TextField
                    id="email"
                    label="Email"
                    margin="normal"
                />
                <TextField
                    id="request_date"
                    label="Request Date"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <SelectFilter
                    label="Insurance"
                    suggestions={[]}
                    value={insurance}
                    handleUpdate={handleUpdate}
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
                {/* <DatePicker
                      fullWidth
                      name="request_date"
                      floatingLabelFixed={true}
                      floatingLabelText="Request Date"
                      minDate={new Date()}
                    /> */}
                {/* <AutoComplete
                      fullWidth
                      name="insuance"
                      floatingLabelFixed={true}
                      floatingLabelText="Insurance Provider"
                      filter={AutoComplete.fuzzyFilter}
                      dataSource={this.handleGetInsurances()}
                      maxSearchResults={5}
                    /> */}
                {specialOffers.length > 0 && (
                    <OffersWrapper>
                        <Offers>Special Offers</Offers>

                        {specialOffers.map((item, i) => (
                            <Switch
                                name={`special_offer[]`}
                                key={i}
                                aria-label="checkedA"
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
                      You should receive an email to confirm your visit shortly.
                    </FinePrint>
                {/* <RaisedButton type="submit" label="Submit" primary /> */}
            </form>
        );
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

// export default withStyles(styles)(TextFields);
export default TextFields;