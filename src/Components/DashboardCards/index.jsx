import "./styles.css";
import { useEffect, useState } from "react";
import { AxiosApi } from "../../Services/axios.create";
import { Modal } from "../Modal/modal";
import { format } from "date-fns";

export const DashboardCards = () => {
  const [feedList, setFeed] = useState([]);
  const [sleepList, setSleep] = useState([]);
  const [diapersList, setDiapers] = useState([]);
  const [babies, setBabies] = useState([]);
  const [userId, setUserId] = useState(null);
  const [babyId, setBabyId] = useState("");

  const [diaperGroups, setDiaperGroups] = useState([]);
  const [totalDiapersQuantity, setTotalDiapersQuantity] = useState([]);
  const [isBabyModalOpen, setIsBabyModalOpen] = useState(false);
  const [isFeedModalOpen, setIsFeedModalOpen] = useState(false);
  const [isSleepModalOpen, setIsSleepModalOpen] = useState(false);
  const [isDiapersModalOpen, setIsDiapersModalOpen] = useState(false);

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
        const filteredBabies = listedBabies.filter(
          (item) => item.user_id == userId
        );
        const babyId = filteredBabies[0].id;
        setBabyId(babyId);
      } catch (error) {
        //console.error("Error trying to get babyId");
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

        const feedList = response.data.filter((feed) => feed.baby_id == babyId);
        setFeed(feedList);
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

        const totalDiapersQuantity = response.data
          .filter((item) => item.baby_id == babyId)
          .reduce((total, diaper) => total + diaper.quantity, 0);

        setTotalDiapersQuantity(totalDiapersQuantity);

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
  }, [babyId, userId]);

  const openBabyModal = () => {
    if (babies.filter((item) => item.user_id == userId).length === 0) {
      setIsBabyModalOpen(false);
    }
    setIsBabyModalOpen(true);
  };

  const openFeedModal = () => {
    if (feedList.filter((item) => item.baby_id == babyId).length === 0) {
      setIsFeedModalOpen(false);
    } else {
      setIsFeedModalOpen(true);
    }
  };

  const openSleepModal = () => {
    if (sleepList.filter((item) => item.baby_id == babyId).length === 0) {
      setIsSleepModalOpen(false);
    } else {
      setIsSleepModalOpen(true);
    }
  };

  const openDiapersModal = () => {
    if (diapersList.filter((item) => item.baby_id == babyId).length === 0) {
      setIsDiapersModalOpen(false);
    } else {
      setIsDiapersModalOpen(true);
    }
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
        {babies.filter((item) => item.user_id == userId).length > 0 ? (
          babies
            .filter((baby) => baby.user_id == userId)
            .slice(0, 1)
            .map((baby) => (
              <div key={baby.id} onClick={openBabyModal}>
                <h2>{baby.name}</h2>
                <span>{baby.blood_type.toUpperCase()}</span>
              </div>
            ))
        ) : (
          <h2>No Babies Recorded</h2>
        )}
      </div>
      <div className="cards" onClick={openFeedModal}>
        {feedList.filter((item) => item.baby_id == babyId).length > 0 ? (
          feedList.slice(-1).map((feed) => (
            <div key={feed.id}>
              <h2>Last Breast Side</h2>
              <span>{feed.side.toUpperCase()}</span>
            </div>
          ))
        ) : (
          <h2>No Feed Recorded</h2>
        )}
      </div>
      <div className="cards" onClick={openSleepModal}>
        {sleepList.filter((item) => item.baby_id == babyId).length > 0 ? (
          sleepList
            .filter((sleep) => sleep.baby_id == babyId)
            .slice(-1)
            .map((item) => (
              <div key={item.id}>
                <h2>Last Nap</h2>
                <span>{item.duration + "h"}</span>
              </div>
            ))
        ) : (
          <h2>No Nap Recorded</h2>
        )}
      </div>
      <div className="cards" onClick={openDiapersModal}>
        {diapersList.filter((item) => item.baby_id == babyId).length > 0 ? (
          <div>
            <h2>Diapers</h2>
            <span>{totalDiapersQuantity}</span>
          </div>
        ) : (
          <h2>No Diapers Recorded</h2>
        )}
      </div>
      <Modal
        buttonName="Close"
        isOpen={isBabyModalOpen}
        closeModal={closeBabyModal}
        content={
          <div className="modal-content">
            {babies
              .filter((baby) => baby.user_id == userId)
              .slice(0, 1)
              .map((baby) => (
                <div key={baby.id}>
                  <h2>{baby.name}</h2>
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
        buttonName="Close"
        isOpen={isFeedModalOpen}
        closeModal={closeFeedModal}
        content={
          <div className="modal-content">
            {feedList
              .filter((item) => item.baby_id == babyId)
              .slice(-1)
              .map((feed) => (
                <div key={feed.id}>
                  <h2>Last Breast</h2>
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
        buttonName="Close"
        isOpen={isSleepModalOpen}
        closeModal={closeSleepModal}
        content={
          <div className="modal-content">
            {sleepList.slice(-1).map((sleep) => (
              <div key={sleep.id}>
                <h2>Last Nap</h2>
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
        buttonName="Close"
        isOpen={isDiapersModalOpen}
        closeModal={closeDiapersModal}
        content={
          <div className="modal-content">
            <h2>Diapers</h2>
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
                  Total Quantity: <p>{totalDiapersQuantity}</p>
                </span>
              </div>
            ))}
          </div>
        }
      />
    </div>
  );
};
