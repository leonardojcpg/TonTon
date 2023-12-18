import "./styles.css";
import { useEffect, useState } from "react";
import { AxiosApi } from "../../Axios/axios.create";
import { Modal } from "../Modal/modal";
import { format } from "date-fns";

const decodeJwtToken = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Erro ao decodificar token JWT:", error.message);
    return null;
  }
};

export const DashboardCards = () => {
  const [feedList, setFeed] = useState([]);
  const [sleepList, setSleep] = useState([]);
  const [diapersList, setDiapers] = useState([]);
  const [babies, setBabies] = useState([]);
  const [userId, setUserId] = useState(null);

  const [diaperGroups, setDiaperGroups] = useState([]);
  const [totalDiapersQuantity, setTotalDiapersQuantity] = useState([]);
  const [isBabyModalOpen, setIsBabyModalOpen] = useState(false);
  const [isFeedModalOpen, setIsFeedModalOpen] = useState(false);
  const [isSleepModalOpen, setIsSleepModalOpen] = useState(false);
  const [isDiapersModalOpen, setIsDiapersModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          console.error("User has to authenticate.");
          return;
        }
        const decodedToken = decodeJwtToken(authToken);
        if (decodedToken) {
          const userId = decodedToken.sub;
          setUserId(userId);
          const response = await AxiosApi.get(`/user/${userId}`);
          const userData = response.data;

          console.log("Informações do usuário:", userData);
        } else {
          console.error("Invalid JWT Token.");
        }
      } catch (error) {
        //console.error("Error trying to get user info:", error.message);
      }
    };

    const fetchingBabies = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          console.error("User has to authenticate.");
          return;
        }
        const response = await AxiosApi.get("/baby");
        const listedBabies = response.data;
        setBabies(listedBabies);
      } catch (error) {
        console.error("Error trying to get babyId");
      }
    };

    const fetchFeedList = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          console.error("User has to authenticate");
          return;
        }
        const response = await AxiosApi.get("/breast_feeding", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        setFeed(response.data);
      } catch (error) {
        console.error("Erro ao obter lista de bebês:", error.message);
      }
    };
    const fetchSleepList = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          console.error("User has to authenticate");
          return;
        }
        const response = await AxiosApi.get("/sleep", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setSleep(response.data);
      } catch (error) {
        console.error("Erro ao obter lista de bebês:", error.message);
      }
    };
    const fetchDiapersList = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          console.error("User has to authenticate");
          return;
        }
        const response = await AxiosApi.get("/diapers", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setDiapers(response.data);

        const totalQuantity = response.data.reduce(
          (total, diaper) => total + diaper.quantity,
          0
        );
        setTotalDiapersQuantity(totalQuantity);

        const groups = response.data.reduce((groups, diaper) => {
          const { label, quantity, size } = diaper;

          if (!groups[label]) {
            groups[label] = { label, diapers: [] };
          }

          groups[label].diapers.push({
            size,
            quantity,
          });

          return groups;
        }, {});
        setDiaperGroups(Object.values(groups));
      } catch (error) {
        console.error("Erro ao obter lista de fraldas:", error.message);
      }
    };

    fetchingBabies();
    fetchUserData();
    fetchFeedList();
    fetchSleepList();
    fetchDiapersList();
  }, []);

  const openBabyModal = () => {
    setIsBabyModalOpen(true);
  };

  const openFeedModal = () => {
    setIsFeedModalOpen(true);
  };

  const openSleepModal = () => {
    setIsSleepModalOpen(true);
  };

  const openDiapersModal = () => {
    setIsDiapersModalOpen(true);
  };

  const closeBabyModal = () => {
    setIsBabyModalOpen(false);
  };

  const closeFeedModal = () => {
    setIsFeedModalOpen(false);
  };

  const closeSleepModal = () => {
    setIsSleepModalOpen(false);
  };

  const closeDiapersModal = () => {
    setIsDiapersModalOpen(false);
  };

  return (
    <div className="card-container">
      <div className="cards">
        {babies
          .filter((baby) => baby.user_id == userId)
          .slice(0, 1)
          .map((baby) => (
            <div key={baby.id} onClick={openBabyModal}>
              <h1>{baby.name}</h1>
              <span>{baby.blood_type.toUpperCase()}</span>
            </div>
          ))}
      </div>
      <div className="cards" onClick={openFeedModal}>
        <h1>Last Breast Side</h1>
        {feedList.slice(-1).map((feed) => (
          <div key={feed.id}>
            <span>{feed.side.toUpperCase()}</span>
          </div>
        ))}
      </div>
      <div className="cards" onClick={openSleepModal}>
        <h1>Last Nap</h1>
        {sleepList.slice(-1).map((feed) => (
          <div key={feed.id}>
            <span>{feed.duration + "h"}</span>
          </div>
        ))}
      </div>
      <div className="cards" onClick={openDiapersModal}>
        <h1>Diapers</h1>
        <div>
          <span>{totalDiapersQuantity}</span>
        </div>
      </div>
      <Modal
        isOpen={isBabyModalOpen}
        closeModal={closeBabyModal}
        content={
          <div className="modal-content">
            {babies
              .filter((baby) => baby.user_id == userId)
              .slice(0, 1)
              .map((baby) => (
                <div key={baby.id}>
                  <h1>{baby.name}</h1>
                  <span>
                    Age: <p>{baby.age + " months"}</p>
                  </span>
                  <span>
                    Weight: <p>{baby.weight + " kg"}</p>
                  </span>
                  <span>
                    Blood Type: <p>{baby.blood_type.toUpperCase()}</p>
                  </span>
                </div>
              ))}
          </div>
        }
      />
      <Modal
        isOpen={isFeedModalOpen}
        closeModal={closeFeedModal}
        content={
          <div className="modal-content">
            {feedList.slice(-1).map((feed) => (
              <div key={feed.id}>
                <h1>Last Breast</h1>
                <span>
                  Side: <p>{feed.side}</p>
                </span>
                <span>
                  Hour: <p>{feed.hour}</p>
                </span>
                <span>
                  Date: <p>{format(new Date(feed.date), "dd/MM/yyyy")}</p>
                </span>
              </div>
            ))}
          </div>
        }
      />
      <Modal
        isOpen={isSleepModalOpen}
        closeModal={closeSleepModal}
        content={
          <div className="modal-content">
            {sleepList.slice(-1).map((sleep) => (
              <div key={sleep.id}>
                <h1>Last Nap</h1>
                <span>
                  Date: <p>{format(new Date(sleep.date), "dd/MM/yyyy")}</p>
                </span>
                <span>
                  Start Time: <p>{sleep.start_time}</p>
                </span>
                <span>
                  Duration: <p>{sleep.duration + "h"}</p>
                </span>
              </div>
            ))}
          </div>
        }
      />
      <Modal
        isOpen={isDiapersModalOpen}
        closeModal={closeDiapersModal}
        content={
          <div className="modal-content">
            <h1>Diapers</h1>
            {diaperGroups.map((diapersGroup) => (
              <div key={diapersGroup.label}>
                <span>
                  Label: <p>{diapersGroup.label}</p>
                </span>
                <span>
                  {diapersGroup.diapers.slice(-1).map((diaper, index) => (
                    <div key={index}>
                      <span>
                        Size: <p>{diaper.size.toUpperCase()}</p>
                      </span>
                    </div>
                  ))}
                </span>
                <span>
                  Total Quantity:
                  <p>
                    {diapersGroup.diapers.reduce(
                      (total, diaper) => total + diaper.quantity,
                      0
                    )}
                  </p>
                </span>
              </div>
            ))}
          </div>
        }
      />
    </div>
  );
};
