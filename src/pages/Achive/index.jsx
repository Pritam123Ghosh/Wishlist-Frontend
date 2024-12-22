import { injectReducer } from "../../store";
import AchievdWishesList from "./components/AchievdWishesList";
import AchievedWishreducer from "./store";
injectReducer("achievedWish", AchievedWishreducer);
const Achive = () => {
  return (
    <div>
      <AchievdWishesList />
    </div>
  );
};

export default Achive;
