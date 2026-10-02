// Roles
export const ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  PARENT: 'parent',
};

export const ROLE_LABELS = {
  [ROLES.ADMIN]: 'Admin',
  [ROLES.TEACHER]: 'Teacher',
  [ROLES.PARENT]: 'Parent',
};

export const ROLE_HOME_ROUTES = {
  [ROLES.ADMIN]: '/admin/dashboard',
  [ROLES.TEACHER]: '/teacher/dashboard',
  [ROLES.PARENT]: '/parent/dashboard',
};

export const ALL_ROLES = [ROLES.ADMIN, ROLES.TEACHER, ROLES.PARENT];
