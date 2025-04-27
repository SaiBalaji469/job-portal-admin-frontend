export interface JobType {
  _id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  jobType: string;
  salary: string;
  experience: string;
  postedAt: Date;
  isOnsite: boolean;
  description: string;
  applicationDeadline?: Date;
}

export interface SearchFilters {
  query: string;
  location: string;
  jobType: string;
  salaryRange: [number, number];
}