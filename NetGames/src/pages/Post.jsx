import { useEffect, useState } from "react";
import Navbar from '../components/Navbar';
import { getAllScores } from '../actions/Score.action';
import ScoreCard from '../components/ScoreCard';

export default function Post() {
    const [scores, setScores] = useState([]);

  useEffect(() => {
    getAllScores()
    .then((response) => {
        if (response.data != null) {
            setScores(response.data);
        } else {
            alert("Failed to get all scores!");
        }
    })
    .catch((error) => {
        console.error("Error fetching scores:", error.message);
    });
  }, []);

    return (
        <>
            <Navbar />
            <div style={{ display:'flex', flexDirection:'column', gap:'5px', overflowY:'auto', height:'calc(100vh - 80px)' }}>
                {scores.map((score, index) => (
                    <ScoreCard
                        key={index}
                        score_id={score._id}
                        username={score.owner.username}
                        score={score.value}
                        text={score.text}
                        comments={score.comments}
                    />
                ))}
            </div>
        </>
    );
}