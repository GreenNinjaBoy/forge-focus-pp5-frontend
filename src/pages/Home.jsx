import { useEffect, useState } from "react";
import { axiosReq } from '../api/axiosDefaults';
import { useCurrentUser, useSetCurrentUser } from '../hooks/useCurrentUser';
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from '../styles/Home.module.css';

/**
 * Home component for displaying the user's dashboard.
 * Fetches user data, goals count, and tasks count.
 * Provides navigation buttons to create and view goals and tasks.
 */

const Home = () => {
  console.log('Home component rendering');
  
  // Get the current user and the function to set the current user from custom hooks
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  
  // Get the navigate function from react-router-dom to programmatically navigate
  const navigate = useNavigate();

  // State to manage the count of goals and tasks
  const [goalsCount, setGoalsCount] = useState(0);
  const [tasksCount, setTasksCount] = useState(0);
  
  // State to manage the loading status
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('Home useEffect, currentUser:', currentUser);
    
    // Function to fetch user data from the API
    const fetchUserData = async () => {
      try {
        console.log('Fetching user data...');
        const userResponse = await axiosReq.get('dj-rest-auth/user/');
        console.log('User data received:', userResponse.data);
        setCurrentUser(userResponse.data);
      } catch (err) {
        console.error("Failed to fetch user data", err);
      } finally {
        setIsLoading(false);
        console.log('Loading completed');
      }
    };

    if (!currentUser) {
      fetchUserData();
    } else {
      setIsLoading(false);
    }
  }, [currentUser, setCurrentUser]);

  useEffect(() => {
    console.log('Current user updated:', currentUser);
    
    // Function to fetch goals and tasks data from the API
    const fetchData = async () => {
      if (currentUser) {
        try {
          const [goalsResponse, tasksResponse] = await Promise.all([
            axiosReq.get('/goals/'),
            axiosReq.get('/tasks/')
          ]);
          
          console.log('Goals data received:', goalsResponse.data);
          setGoalsCount(goalsResponse.data.results.length);
          
          console.log('Tasks data received:', tasksResponse.data);
          const unassignedTasks = tasksResponse.data.results.filter(task => !task.goals);
          setTasksCount(unassignedTasks.length);
        } catch (err) {
          console.error("Failed to fetch data", err);
        }
      }
    };

    fetchData();
  }, [currentUser]);

  console.log('Rendering Home component. isLoading:', isLoading, 'currentUser:', currentUser);

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.homeContainer}>
      {currentUser ? (
        <>
          <h1 className={styles.heading}>Welcome, {currentUser.username}</h1>
          <div className={styles.cardContainer}>
            <Card className={styles.cardCustom}>
              <Card.Body>
                <Card.Title className={styles.cardTitleCustom}>Goals</Card.Title>
                <Card.Text className={styles.cardTextCustom}>
                  You currently have {goalsCount} goals you are working hard to achieve.
                </Card.Text>
                <div className={styles.buttonRow}>
                  <Button className={styles.buttonCustom} onClick={() => navigate('/goalscreate')}>Create New Goal</Button>
                  <Button className={styles.buttonCustom} onClick={() => navigate('/goalsarea')}>View Goals</Button>
                </div>
              </Card.Body>
            </Card>
            <Card className={styles.cardCustom}>
              <Card.Body>
                <Card.Title className={styles.cardTitleCustom}>Tasks</Card.Title>
                <Card.Text className={styles.cardTextCustom}>
                  You currently have {tasksCount} tasks that are not assigned to any goals.
                </Card.Text>
                <div className={styles.buttonRow}>
                  <Button className={styles.buttonCustom} onClick={() => navigate('/taskcreate')}>Create New Task</Button>
                  <Button className={styles.buttonCustom} onClick={() => navigate('/tasksarea')}>View Tasks</Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        </>
      ) : (
        <div className={styles.noUserInfo}>
          <h2>Please sign in to view your dashboard</h2>
          <Button onClick={() => navigate('/signin')}>Sign In</Button>
        </div>
      )}
    </div>
  );
};

export default Home;