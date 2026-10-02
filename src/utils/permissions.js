import { ROLES } from './roles';

// Define permissions per role per resource
export const PERMISSIONS = {
  students: {
    view: [ROLES.ADMIN, ROLES.TEACHER, ROLES.PARENT],
    create: [ROLES.ADMIN],
    edit: [ROLES.ADMIN],
    delete: [ROLES.ADMIN],
    deactivate: [ROLES.ADMIN],
  },
  teachers: {
    view: [ROLES.ADMIN],
    create: [ROLES.ADMIN],
    edit: [ROLES.ADMIN],
    delete: [ROLES.ADMIN],
    deactivate: [ROLES.ADMIN],
  },
  parents: {
    view: [ROLES.ADMIN],
    create: [ROLES.ADMIN],
    edit: [ROLES.ADMIN],
    delete: [ROLES.ADMIN],
    deactivate: [ROLES.ADMIN],
  },
  attendance: {
    view: [ROLES.ADMIN, ROLES.TEACHER, ROLES.PARENT],
    mark: [ROLES.ADMIN, ROLES.TEACHER],
    edit: [ROLES.ADMIN],
  },
  fees: {
    view: [ROLES.ADMIN, ROLES.PARENT],
    create: [ROLES.ADMIN],
    edit: [ROLES.ADMIN],
    delete: [ROLES.ADMIN],
    pay: [ROLES.PARENT],
  },
  exams: {
    view: [ROLES.ADMIN, ROLES.TEACHER, ROLES.PARENT],
    create: [ROLES.ADMIN, ROLES.TEACHER],
    edit: [ROLES.ADMIN, ROLES.TEACHER],
    delete: [ROLES.ADMIN],
  },
  results: {
    view: [ROLES.ADMIN, ROLES.TEACHER, ROLES.PARENT],
    enter: [ROLES.ADMIN, ROLES.TEACHER],
    edit: [ROLES.ADMIN, ROLES.TEACHER],
  },
  notices: {
    view: [ROLES.ADMIN, ROLES.TEACHER, ROLES.PARENT],
    create: [ROLES.ADMIN],
    edit: [ROLES.ADMIN],
    delete: [ROLES.ADMIN],
  },
  reports: {
    view: [ROLES.ADMIN],
    export: [ROLES.ADMIN],
  },
  audit: {
    view: [ROLES.ADMIN],
  },
  settings: {
    view: [ROLES.ADMIN],
    edit: [ROLES.ADMIN],
  },
};

export const hasPermission = (role, resource, action) => {
  if (!PERMISSIONS[resource] || !PERMISSIONS[resource][action]) return false;
  return PERMISSIONS[resource][action].includes(role);
};
