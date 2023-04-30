import { useState, useEffect } from "react";
import { format } from "date-fns";
import styled from "styled-components";
import raceData from "../../data/f1_data.json";

const F1 = () => {
  const [nextRace, setNextRace] = useState(null);

  useEffect(() => {
    const currentDate = new Date();

    const nextRace = raceData.MRData.RaceTable.Races.find(race => {
      const raceDateTime = new Date(race.date + "T" + race.time);
      return raceDateTime > currentDate;
    });

    setNextRace(nextRace);
  }, []);

  const isEventCompleted = (eventDate, eventTime) => {
    const eventDateTime = new Date(eventDate + "T" + eventTime);
    return new Date() > eventDateTime;
  };

  const getChronologicalEvents = (race) => {
    const events = [];

    ["FirstPractice", "SecondPractice", "ThirdPractice", "Qualifying", "Sprint"].forEach(eventType => {
      const event = race[eventType];
      if (event) {
        events.push({
          type: eventType,
          date: event.date,
          time: event.time,
          dateTime: new Date(event.date + "T" + event.time),
        });
      }
    });

    events.push({
      type: "Race",
      date: race.date,
      time: race.time,
      dateTime: new Date(race.date + "T" + race.time),
    });

    return events.sort((a, b) => a.dateTime - b.dateTime);
  };

  const formatEventType = (eventType) => {
    const eventNames = {
      FirstPractice: "Practice 1",
      SecondPractice: "Practice 2",
      ThirdPractice: "Practice 3",
      Qualifying: "Qualifying",
      Sprint: "Sprint",
      Race: "Race",
    };

    return eventNames[eventType] || eventType;
  };

  return (
    <Card>
      {nextRace ? (
        <div>
          <SubHeading>
            Next race weekend
          </SubHeading>
          <H1>{nextRace.raceName}</H1>

          <HR />
          <EventsContainer>
            {getChronologicalEvents(nextRace).map(event => {
              const completed = isEventCompleted(event.date, event.time);

              return (
                <EventItem key={event.type} className={completed ? "completed-event" : ""}>
                  <SubHeading isEventCompleted={completed}>
                    {formatEventType(event.type)}
                  </SubHeading>
                  <EventTime>
                    <P isEventCompleted={completed}>
                      {format(event.dateTime, "EEE dd MMMM")}
                    </P>

                    <P isEventCompleted={completed}>
                      {format(event.dateTime, "h:mmaa").toLowerCase()}
                    </P>
                  </EventTime>
                </EventItem>
              );
            })}
            <Subtext>Times shown based on your location</Subtext>
          </EventsContainer>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Card>
  );
};

const Card = styled.div`
  margin: 48px auto 0;
  max-width: 360px;
  border: 1px solid var(--mid-grey);
  padding: 24px;
  padding-bottom: 0px;
  border-radius: 12px;
  
`;

const H1 = styled.h1`
  font-family: 'Source Code Pro';
    font-size: 18px;
  line-height: 24px;
  color: var(--black);
  margin-top: 0;
`;

const SubHeading = styled.p`
  font-family: 'Source Code Pro';
  font-size: 14px;
  line-height: 20px;
  color: ${props => props.isEventCompleted ? "var(--pale-grey)" : "var(--black)"};
  margin-top: 0;
  margin-bottom: 0;
`;

const P = styled.p`
  color: ${props => props.isEventCompleted ? "var(--pale-grey)" : "var(--light-grey)"};
`;

const EventsContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;

const HR = styled.hr`
  height: 1px;
  background: var(--mid-grey);
  border-style: none;
  margin-bottom: 16px;
`;

const EventItem = styled.div`
  p { margin: 0; }
`;

const EventTime = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Subtext = styled.p`
  font-family: 'Source Code Pro';
  font-size: 10px;
  line-height: 16px;
  color: var(--light-grey);
  margin-top: 0;
`

export default F1;

