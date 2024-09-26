import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/GoalsArea.module.css";

/**
 * GoalsView component for displaying a single goal card.
 * Shows the goal's image, name, and the number of associated tasks.
 * Provides a button to navigate to the goal details page.
 */

const GoalsView = ({ id, name, image, tasksCount }) => {
  // Get the navigate function from react-router-dom to programmatically navigate
  const navigate = useNavigate();

  // Function to handle navigation to the goal details page
  const handleViewGoal = () => {
    navigate(`/goaldetails/${id}`); 
  };

  return (
    <div className={styles.GoalCard}>
      <img src={image} alt={name} className={styles.Image} />
      <h3>{name}</h3>
      <p>
        {tasksCount > 0 
          ? `There are ${tasksCount} tasks associated with this goal` 
          : "There are no tasks associated with this goal"}
      </p>
      <button onClick={handleViewGoal} className={styles.ViewButton}>
        View Goal
      </button>
    </div>
  );
};

GoalsView.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  tasksCount: PropTypes.number.isRequired,
};

export default GoalsView;