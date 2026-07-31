export class Timetable {
  id: number;
  name: string;
  academicYear: string;
  semester: number;

  constructor(
    id: number,
    name: string,
    academicYear: string,
    semester: number,
  ) {
    this.id = id;
    this.name = name;
    this.academicYear = academicYear;
    this.semester = semester;
  }
}
