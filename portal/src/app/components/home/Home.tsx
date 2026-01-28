// (C) Copyright 2026 Telefónica Innovación Digital (alexandremiquel.frauamar.practicas@telefonica.com, antonio.pastorperales@telefonica.com)

import { IUseDashboardData, useDashboardData } from "../../hooks/useDashboardData";
import { FetchDataStatus } from "../../shared/hooks/useFetch";
import { ITestParamsTLS,  ITestParamsIpsec } from "../../shared/models/quantum.interface";
import { ProtocolQuery } from "../protocol-query";
import { SubHeader } from "../sub-header";
import { useCallback, useEffect, useState } from 'react';
import styles from './Home.module.scss';
import { useLocation, useNavigate } from "react-router-dom";
import { ExperimentData } from "../all-experiments/models/experiments.interface";

export const Home: React.FC = () => {
    const [isSubHeaderOpen, setIsSubHeaderOpen] = useState<boolean>(true);
  
    const handleSubHeaderCloseClick: () => void = useCallback((): void => {
      setIsSubHeaderOpen(false);
    }, []);
    
    return (
      <>
        {isSubHeaderOpen && <SubHeader handleCloseClick={handleSubHeaderCloseClick} />}
        <HomeContent />
      </>
    );  
}

export const HomeContent: React.FC = () => {
  const { handleRunQueryClickTLS, handleRunQueryClickIpsec, status, testSuiteId }: IUseDashboardData = useDashboardData();
  const navigate = useNavigate();
  const location = useLocation();
  const [duplicateData, setDuplicateData] = useState<ExperimentData | undefined>(location.state?.row);

  useEffect(() => {
    // Clear the state after the duplicate data has been created
    setDuplicateData(undefined);
  }, []);

  useEffect(() => {
    if (status === FetchDataStatus.Success && testSuiteId) {
      // Navigate to the Experiment page
      navigate(`experiment/${testSuiteId}`,  { replace: true });
    }
  }, [navigate, status, testSuiteId]);
  
  const handleRunClickTLS: (params: ITestParamsTLS) => void = useCallback((params: ITestParamsTLS): void => {
    if (params.experimentName && params.algorithms && params.iterationsCount) {
      handleRunQueryClickTLS(params);
    }
  }, [handleRunQueryClickTLS]);

  const handleRunClickIpsec: (params: ITestParamsIpsec) => void = useCallback((params: ITestParamsIpsec): void => {
    if (params.experimentNameIperf && params.ipsecAlgorithms && params.time && params.connections && params.messageSizeIperf && params.bandwidth && params.intervals) {
      handleRunQueryClickIpsec(params);
    }
  }, [handleRunQueryClickIpsec]);

  return (
    <div className={styles.app_wrapper}>
      <ProtocolQuery
        isFetching={status === FetchDataStatus.Fetching}
        onRunClickTLS={handleRunClickTLS}
        onRunClickIpsec={handleRunClickIpsec}
        duplicateData={duplicateData}
        setDuplicateData={setDuplicateData}
      />
    </div>
  );
};
