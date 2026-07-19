import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectCaseStudy } from '@/components/project-case-study';
import { getAllProjectSlugs, getProject } from '@/site/projects';
import { siteConfig } from '@/config/site';

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = getProject(params.slug);
  if (!project) {
    return { title: 'Project not found' };
  }

  return {
    title: `${project.client} · Case study`,
    description: project.summary,
    openGraph: {
      title: `${project.client} | ${siteConfig.name}`,
      description: project.summary,
      url: `/work/${project.slug}/`,
    },
  };
}

export default function ProjectPage({ params }: PageProps) {
  const project = getProject(params.slug);
  if (!project) notFound();

  return <ProjectCaseStudy project={project} />;
}
