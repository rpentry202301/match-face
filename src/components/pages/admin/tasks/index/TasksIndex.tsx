import OrangeButton from "@/components/ui/button/OrangeButton";
import SearchByJobs from "./parts/SearchByJobs";
import TaskList from "./parts/TaskList";

const TasksIndex = () => {
  return (
    <main>
      <div className="mb-8">
        <SearchByJobs />
      </div>
      <div className="flex justify-center mb-8">
        <OrangeButton label="新規追加" />
      </div>
      <div className="flex justify-center">
        <TaskList />
      </div>
    </main>
  );
};

export default TasksIndex;
