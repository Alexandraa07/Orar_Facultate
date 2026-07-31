import type { Professor } from "../professor/Professor";
import type { Group } from "../group/Group";

export interface Course {
  id: number;
  name: string;
  credits?: number;
  year?: number;
  semester?: number;
  abbreviation?: string;
}

export interface Room {
  id: number;
  name?: string;
  building?: string;
}

export interface Activity {
  id: number;
  startTime: string; // ex: "08:00:00"
  endTime: string;   // ex: "10:00:00"
  day: string;   
  activityType: "COURSE" | "LABORATORY" | "SEMINAR";
  week?: string;
  professor?: Professor;
  course?: Course;
  group?: Group;
  room?: Room;
}