import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Course } from "./Course";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	user_id!: number;

	@Column()
	name!: string;

	@Column()
	password!: string;

	@Column({ unique: true })
	email!: string;

	@Column()
	instituicion!: string;

	@Column({ type: "bytea" })
	photo!: Buffer;

	@Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	account_created!: Date;

	@Column({ default: false })
	email_verified!: boolean;

	@Column({ type: "text", nullable: true })
	bio!: string;

	@Column()
	country!: string;

	@Column()
	state!: string;

	@Column()
	city!: string;

	@Column({ type: "date" })
	date_of_birth!: Date;

	@Column({ type: "jsonb", nullable: true })
	social_links!: Record<string, any>;

	@OneToMany(() => Course, (course) => course.user)
	courses!: Course[];
}
