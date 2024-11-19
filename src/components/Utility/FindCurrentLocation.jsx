// Finds current workdesk location (name or index)
// Needs user data object and location from: const location = useLocation();

export const findWorkdeskName = (location, data) => {
  // Gets the location which has / at the start
  const currentPath = location.pathname.substring(1);
  // Find the index of the workdesk object with the matching path
  let workdeskIndex = data.workdesks.findIndex((workdesk) => workdesk.path === currentPath);
  return data.workdesks[workdeskIndex].name;
};

export const findWorkdeskIndex = (currentPath, data) => {
  // Find the index of the workdesk object with the matching path
  let workdeskIndex = data.workdesks.findIndex((workdesk) => workdesk.path === currentPath);
  return workdeskIndex;
};
