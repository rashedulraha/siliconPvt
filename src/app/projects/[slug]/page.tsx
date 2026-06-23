"use client";

import { use } from "react";
import { ProjectDetailClient } from "./ProjectDetailClient";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  return <ProjectDetailClient slug={slug} />;
}
