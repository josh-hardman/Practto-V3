import React, { Component } from "react";
import styled from "styled-components";
import theme from "../theme/theme";
import { toRem } from "../utils/utils";
import ArrowDown from "react-icons/lib/md/arrow-drop-down";
import ArrowUp from "react-icons/lib/md/arrow-drop-up";

const StyledHours = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledTable = styled.table`width: 50%;`;

const TitleCell = styled.td`
  font-size: ${toRem(18)};
  font-weight: lighter;
  line-height: 12px;
  border: none;
  text-style: underline;
`;

const Cell = styled.td`
  font-size: ${toRem(12)};
  border: none;
`;

const Row = styled.tr`
  line-height: 0px;
  ${props => props.bold && "font-weight: bold"};
`;

const DayDetails = ({ day, open, close, bold }) => (
  <Row bold={bold}>
    <Cell>{day}</Cell>
    <Cell>{open}</Cell>
    <Cell>{close}</Cell>
  </Row>
);

class Hours extends Component {
  state = {
    expanded: false
  };

  handleToggleExpand = () => this.setState({ expanded: !this.state.expanded });

  render() {
    const { hours } = this.props;
    const dayOfWeek = new Date().getDay() - 1;
    return (
      <div>
        <StyledHours>
          <StyledTable>
            <Row>
              <TitleCell>
                {!this.state.expanded ? (
                  <div>
                    Today's hours
                    <ArrowDown onClick={this.handleToggleExpand} />
                  </div>
                ) : (
                  <div>
                    Office Hours
                    <ArrowUp onClick={this.handleToggleExpand} />
                  </div>
                )}
              </TitleCell>
            </Row>
            {!this.state.expanded ? (
              <DayDetails
                day={hours[dayOfWeek].name}
                open={hours[dayOfWeek].open}
                close={hours[dayOfWeek].close}
              />
            ) : (
              hours.map((day, i) => {
                return (
                  <DayDetails
                    key={i}
                    day={day.name}
                    open={day.open}
                    close={day.close}
                    bold={i === dayOfWeek}
                  />
                );
              })
            )}
          </StyledTable>
        </StyledHours>
      </div>
    );
  }
}

export default Hours;
