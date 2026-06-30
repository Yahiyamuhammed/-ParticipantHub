import { useParams } from "react-router-dom";

function ResultsPage() {
  const { competitionId } = useParams();

  return <h1>Results {competitionId}</h1>;
}

export default ResultsPage;