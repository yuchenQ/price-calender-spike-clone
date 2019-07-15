import React from 'react';
import styled from 'styled-components';
import Dayzed from 'dayzed';

const monthNamesShort = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const weekdayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const StyledApp = styled.div`
  background: #f6f8fa;
  height: 100vh;
  
  @media only screen and (min-width: 768px) {
    padding: 10rem 0;
  }
`;

const Container = styled.div`
  margin: 0 auto;
  background: white;
  padding: 2rem 1rem;
  
  @media only screen and (min-width: 768px) {
    padding: 2rem 5rem;
    max-width: 60vw;
  }
`;

const Months = styled.div`
  --element-padding: 0.25rem 0;
  --months-per-line: ${({ monthsToDisplay }) => Number(monthsToDisplay)};

  @media only screen and (min-width: 768px) {
    --element-padding: 0.75rem 0;
  }

  display: grid;
  grid-template-columns: repeat(var(--months-per-line), 1fr);
  grid-gap: 2rem;
`;

const Month = styled.div`
`;

const MonthHeader = styled.div`
  padding: var(--element-padding);
  text-align: center;
  text-transform: uppercase;
  font-weight: 600;
`;

const MonthWeekDays = styled.div`
  display: none;

  @media only screen and (min-width: 768px) {
    display: grid;
    padding: var(--element-padding);
    grid-template-columns: repeat(7, 1fr);
    justify-items: center;
    color: rgba(0,0,0,0.5);
  }
`;

const MonthWeekDay = styled.div`
`;

const Weeks = styled.div`
  padding: var(--element-padding);
`;

const Week = styled.div`
  --days-per-line: 1;
  --days-gap: 0.75rem;

  @media only screen and (min-width: 768px) {
    --days-per-line: 7;
    --days-gap: 0;
  }

  display: grid;
  grid-template-columns: repeat(var(--days-per-line), 1fr);
  grid-row-gap: var(--days-gap);
  
  & ~ & {
    margin-top: var(--days-gap);
  }
`;

const DayButton = styled.button`
  background: transparent;
  outline: 0;
  border: 0;
  cursor: pointer;
  border: 1px solid lightgrey;
  font-size: medium;
  text-align: left;

  @media only screen and (min-width: 768px) {
    text-align: center;
    position: relative;
    overflow: hidden;
    height: 0;
    padding-bottom: 100%;
    /* clear overlapped border */
    margin: -1px 0 0 -1px;
  }
`;

const DayContainer = styled.div`
  @media only screen and (min-width: 768px) {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`;

const Day = styled.div`
  height: 100%;
  display: grid;
  grid-column-gap: 1.5rem;
  align-items: center;
  grid-template-columns: 50px 1fr auto;
  padding: 0.5rem 1rem;

  @media only screen and (min-width: 768px) {
    justify-content: center;
    align-content: center;
    grid-template-columns: 1fr;
    grid-row-gap: 0.5rem;
  }
`;

const DayDate = styled.div`
  font-size: xx-large;
`;

const DayExtra = styled.div`
  font-size: small;
  
  @media only screen and (min-width: 768px) {
    display: none;
  }
`;

const EmptyDay = styled.div`
`;

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      monthsToDisplay: 1,
      showWeekdayNames: true,
    };
  }

  render() {
    const { monthsToDisplay, showWeekdayNames } = this.state;

    return (
      <StyledApp>
        <Container>
          <h1>Price Calender Spike</h1>
          <hr />
          <br />
          <Dayzed
            onDateSelected={() => {}}
            monthsToDisplay={monthsToDisplay}
            render={({
              calendars,
              getBackProps,
              getForwardProps,
              getDateProps,
            }) => {
              if (!calendars.length) {
                return null;
              }

              return (
                <Months monthsToDisplay={monthsToDisplay}>
                  {calendars.map(calendar => (
                    <Month
                      key={`${calendar.month}${calendar.year}`}
                    >
                      <MonthHeader>
                        {monthNamesShort[calendar.month]}
                        &nbsp;
                        {calendar.year}
                      </MonthHeader>
                      {showWeekdayNames && (
                        <MonthWeekDays>
                          {weekdayNamesShort.map((weekDayName, i) => (
                            <MonthWeekDay key={`${weekDayName}${i}`}>{weekDayName}</MonthWeekDay>
                          ))}
                        </MonthWeekDays>
                      )}
                      <Weeks>
                        {calendar.weeks.map((week, i) => (
                          <Week key={`${week}${i}`}>
                            {week.map((dateObj, j) => (
                              <React.Fragment key={`${dateObj}${j}`}>
                                {dateObj ? (
                                  <DayButton
                                    {...getDateProps({ dateObj })}
                                  >
                                    <DayContainer>
                                      <Day>
                                        <DayDate>{dateObj.date.getDate()}</DayDate>
                                        <DayExtra>
                                          {monthNamesShort[calendar.month]}
                                          {' '}
                                          {calendar.year}
                                          <br />
                                          {weekdayNamesShort[dateObj.date.getDay()]}
                                        </DayExtra>
                                        <div>
                                          $1,000.00
                                        </div>
                                      </Day>
                                    </DayContainer>
                                  </DayButton>
                                ) : (
                                  <EmptyDay />
                                )}
                              </React.Fragment>
                            ))}
                          </Week>
                        ))}
                      </Weeks>
                    </Month>
                  ))}
                </Months>
              );
            }}
          />
        </Container>
      </StyledApp>
    );
  }
}

export default App;
