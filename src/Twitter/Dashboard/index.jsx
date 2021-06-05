import PageHeader from "./PageHeader";
import UserTweet from "./UserTweet";

import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
      <PageHeader />
      <UserTweet />
    </div>
  );
};

export default Dashboard;
