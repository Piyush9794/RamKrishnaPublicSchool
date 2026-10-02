// Application-wide constants
export const ATTENDANCE_STATUS = {
  PRESENT: 'Present',
  ABSENT: 'Absent',
  LATE: 'Late',
  HALF_DAY: 'Half Day',
};

export const ATTENDANCE_STATUS_COLORS = {
  Present: 'success',
  Absent: 'danger',
  Late: 'warning',
  'Half Day': 'info',
};

export const FEE_STATUS = {
  PENDING: 'Pending',
  PARTIAL: 'Partial',
  PAID: 'Paid',
  OVERDUE: 'Overdue',
  REFUNDED: 'Refunded',
};

export const FEE_STATUS_COLORS = {
  Pending: 'warning',
  Partial: 'info',
  Paid: 'success',
  Overdue: 'danger',
  Refunded: 'secondary',
};

export const NOTICE_CATEGORIES = [
  'General',
  'Attendance',
  'Fee',
  'Exam',
  'Homework',
  'Result',
  'Holiday',
  'Emergency',
];

export const NOTICE_AUDIENCE = [
  'School',
  'Class',
  'Section',
  'Teacher',
  'Parent',
];

export const LEAVE_STATUS = {
  PENDING: 'Pending',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  CANCELLED: 'Cancelled',
};

export const LEAVE_TYPES = [
  'Casual Leave',
  'Medical Leave',
  'Emergency Leave',
  'Maternity Leave',
  'Paternity Leave',
  'Study Leave',
  'Other',
];

export const GENDER_OPTIONS = ['Male', 'Female', 'Other'];

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const CLASS_LIST = [
  'Nursery', 'LKG', 'UKG',
  'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
  'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
  'Class 11', 'Class 12',
];

export const SECTION_LIST = ['A', 'B', 'C', 'D', 'E'];

export const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const EXAM_TYPES = ['Unit Test', 'Mid Term', 'Final Term', 'Annual', 'Pre-Board', 'Practice'];

export const DOCUMENT_TYPES_STUDENT = [
  'Birth Certificate',
  'Previous School Documents',
  'Transfer Certificate',
  'ID Document',
  'Medical Documents',
  'Certificate',
  'Other',
];

export const DOCUMENT_TYPES_TEACHER = [
  'Qualification Certificate',
  'ID Document',
  'Experience Certificate',
  'Other',
];

export const SORT_ORDERS = {
  ASC: 'asc',
  DESC: 'desc',
};

export const USER_STATUS = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
};

export const PAYMENT_METHODS = ['Cash', 'Online', 'Cheque', 'Bank Transfer', 'UPI'];
