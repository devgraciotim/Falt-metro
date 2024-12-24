import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Course } from "./Course"

@Entity()
export class Absence {
    @PrimaryGeneratedColumn()
    absence_id!: number;

    @Column()
    justification !: Text;

    @ManyToOne(() => Course, course => course.absences)
    @JoinColumn({ name: "course_id" })
    course!: Course;
}
