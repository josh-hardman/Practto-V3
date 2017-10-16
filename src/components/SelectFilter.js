import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        width: '30%',
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class NativeSelect extends React.Component {
    render() {
        const { classes, label, suggestions, value, handleUpdate } = this.props;

        return (
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">{label}</InputLabel>
                <Select
                    native
                    value={value}
                    onChange={handleUpdate(label.toLowerCase())}
                    input={<Input id="age-native-simple" />}
                >
                    <option value="" />
                    {
                        suggestions && suggestions.map((suggestion, i) => (
                            <option key={i} value={suggestion}>{suggestion}</option>
                        ))
                    }

                </Select>
            </FormControl>
        );
    }
}

NativeSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NativeSelect);