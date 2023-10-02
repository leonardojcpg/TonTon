import { ResponsiveHeader } from "../../Components/ResponsiveHeader"
import { ContainerContent } from "../../Components/ContainerContentPage"
import { PageTitle } from "../../Components/PageTitle"
import { useBabyContext } from "../../Context/BabyContext";
import Card from "../../Components/CardInfo";

export const Dashboard = () => {
  const {babyData} = useBabyContext()

  return (
    <>
      <ResponsiveHeader />
      <PageTitle pageTitle="Dashboard" />
      <ContainerContent />
      <div>
      {Object.keys(babyData).length > 0 ? (
        <div>
          <Card title="Nome" value={babyData.nome} />
          <Card title="Sexo" value={babyData.sexo} />
        </div>
      ) : (
        <p>Nenhum dado do bebê disponível.</p>
      )}
      </div>
     </>
  );
};
