export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  personalId?: string;
  fatherInitial?: string;
}

export interface Student {
  id: number;
  studentNumber: number;
  person: Person;
  group?: {
    id: number;
  };
}