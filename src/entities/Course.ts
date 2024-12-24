import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from "./User"
import { Absence } from "./Absence"

@Entity()
export class Course {
	@PrimaryGeneratedColumn()
	course_id!: number;

	@Column()
	course_name!: string;

	@ManyToOne(() => User, user => user.courses)
	@JoinColumn({ name: "user_id" })
	user!: User;

	@Column()
	instituition!: string;

	@Column({ type: "int" })
	total_classes!: number;

	@Column({ type: "int" })
	total_absences_allowed!: number;

	@Column({ type: "int" })
	total_absences!: number;

	@Column({ type: "float" })
	max_absences_percentage!: number;

	@Column()
	class_days!: Text;

	@Column()
	course_start_date!: Date;

	@Column()
	course_end_date!: Date;

	@OneToMany(() => Absence, (absence) => absence.course)
	absences!: Absence[];
}
