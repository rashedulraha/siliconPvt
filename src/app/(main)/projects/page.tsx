import type { Metadata } from "next";
import { ProjectsClient } from "./ProjectsClient";

export const metadata: Metadata = {
	title: "Featured Projects | Silicon Real Estate (Pvt.) Ltd.",
	description:
		"Explore our premium, RAJUK-approved land development projects and plots across Dhaka's prime investment corridors.",
};

export default function ProjectsPage() {
	return <ProjectsClient />;
}
