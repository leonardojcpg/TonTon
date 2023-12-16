import "./styles.css";
import { useEffect, useState } from "react";
import { AxiosApi } from "../../Axios/axios.create";

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
      } catch (error) {
        console.error("Erro ao obter lista de bebês:", error.message);
      }
    };

    fetchingBabies();
    fetchUserData();
    fetchFeedList();
    fetchSleepList();
    fetchDiapersList();
  }, []);

  return (
    <div className="card-container">
      <div className="cards">
        {babies
          .filter((baby) => baby.user_id == userId)
          .slice(0, 1)
          .map((baby) => (
            <div key={baby.id}>
              <h1>{baby.name}</h1>
              <span>{baby.blood_type.toUpperCase()}</span>
            </div>
          ))}
      </div>
      <div className="cards">
        {feedList
          .filter((feed) => feed.user_id == userId)
          .map((feedEntry, index) => (
            <div key={index}>
              <h1>{feedEntry.name}</h1>
            </div>
          ))}
      </div>
      <div className="cards">
      <h1>Last Nap</h1>
        {sleepList
          .filter((sleep) => sleep.baby_id == userId)
          .map((entry, index) => (
            <span key={index}>{entry.name}</span>
          ))}
      </div>
      <div className="cards">
        {diapersList
          .filter((diaper) => diaper.user_id == userId)
          .map((entry, index) => (
            <span key={index}>{entry.label}</span>
          ))}
      </div>
    </div>
  );
};
