import React from "react";
import { ResponsiveHeader } from "../../Components/ResponsiveHeader";
import { ContainerContent } from "../../Components/ContainerContentPage";
import { PageTitle } from "../../Components/PageTitle";
import { useBabyContext } from "../../Context/BabyContext";
import Card from "../../Components/CardInfo";

export const Dashboard = () => {
  const { babyData } = useBabyContext();

  return (
    <>
      <ResponsiveHeader />
      <PageTitle pageTitle="Dashboard" />
      <ContainerContent />
      <div>
        {Object.keys(babyData).length > 0 ? (
          <div>
            <Card title="Name" value={babyData.name} />
            <Card title="Gender" value={babyData.gender} />
            {/* Adicione mais cards aqui para as outras informações do bebê */}
          </div>
        ) : (
          <p>Nenhum dado do bebê disponível.</p>
        )}
      </div>
    </>
  );
};
