import { ProjectActions } from "fmtm/ProjectSlice";
import CoreModules from "fmtm/CoreModules";
export const ProjectById = (url, existingProjectList) => {
  return async (dispatch) => {
    // dispatch(HomeActions.HomeProjectLoading(true))
    const fetchProjectById = async (url, existingProjectList) => {
      try {
        const project = await CoreModules.axios.get(url);
        const resp = project.data;
        console.log("loading :", project.data);
        const persistingValues = resp.project_tasks.map((data) => {
          return {
            id: data.id,
            project_task_name: data.project_task_name,
            task_status_str: data.task_status_str,
            outline_geojson: data.outline_geojson,
            outline_centroid: data.outline_centroid,
            task_history: data.task_history,
          };
        });

        // console.log("loading :", persistingValues);
        dispatch(
          ProjectActions.SetProjectTaskBoundries([
            { id: resp.id, taskBoundries: persistingValues },
          ])
        );
      } catch (error) {
        // console.log('error :', error)
      }
    };

    await fetchProjectById(url, existingProjectList);
    dispatch(ProjectActions.SetNewProjectTrigger());
  };
};
