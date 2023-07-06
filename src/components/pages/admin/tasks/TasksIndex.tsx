import OrangeButton from "@/components/ui/button/OrangeButton";
import SearchByJobs from "./parts/SearchByJobs";
import TaskList from "./parts/TaskList";

const TasksIndex = () => {
  return (
    <main>
      <div>
        <SearchByJobs />
      </div>
      <div>
        <OrangeButton label="新規追加" />
      </div>
      <div>
        <TaskList />
      </div>
    </main>
  );
};

export default TasksIndex;
