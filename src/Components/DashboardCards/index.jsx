import "./styles.css";

export const DashboardCards = () => {
  const cardDataList = [
    {
      name: "Antonella",
      ageInDays: 40 + " Days",
    },
    {
      breastFeeding: "Last Breast Side Used",
      lastBreastFeedingSide: "Left",
    },
    {
      sleep: "Last Nap",
      sleepDurationInHour: 2 + " Hours",
    },
    {
      diaperSide: "Diapers",
      remainingDiapers: 40,
    },
  ];

  return (
    <div className="card-container">
      {cardDataList.map((cardData, index) => (
        <div key={index} className="cards">
          <h1>
            {cardData.name ||
              cardData.breastFeeding ||
              cardData.sleep ||
              cardData.diaperSide}
          </h1>
          <span>
            {cardData.ageInDays ||
              cardData.lastBreastFeedingSide ||
              cardData.sleepDurationInHour ||
              cardData.remainingDiapers}
          </span>
        </div>
      ))}
    </div>
  );
};
