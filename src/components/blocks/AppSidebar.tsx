import { Link, useRouter } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { ArrowUpCircleIcon, PlusIcon, EllipsisIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useLiveQuery } from "dexie-react-hooks";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ReactNode, useState } from "react";
import ProjectForm from "./ProjectForm";
import { useDialog } from "../ui/alert-dialog";
import ProjectRepository from "@/db/repositories/ProjectRepository";
import { Project } from "@/db/models";

export default function AppSidebar() {
  const dialog = useDialog();
  const router = useRouter();
  const projects = useLiveQuery(() => ProjectRepository.list());

  const onProjectDelete = async (id: string) => {
    dialog.alert({
      title: "Are you sure you want to delete this project ?",
      description:
        "Deleting this project means that all of its tasks will be deleted. Do you want to continue ?",
      onContinueClick: async () => {
        try {
          const project = projects?.find((e) => e.id == id);
          if (!project) return true;
          if (
            router.matchRoute({
              to: "/app/projects/$slug",
              params: { slug: project.slug! },
            })
          ) {
            router.navigate({ to: "/app/inbox" });
          }
          await ProjectRepository.delete(id);
          return true;
        } catch (error) {
          return false;
        }
      },
    });
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="data-[slot=sidebar-menu-button]:!p-1.5">
              <ArrowUpCircleIcon className="h-5 w-5" />
              <span className="text-base font-semibold">Maham App</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/app">Dashboard</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/app/inbox">Inbox</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex w-full items-center justify-between">
              <span>Projects</span>
              <ProjectCreateModal>
                <Button size="xs" variant="ghost">
                  <PlusIcon />
                </Button>
              </ProjectCreateModal>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects &&
                projects.map((project) => (
                  <ProjectItem
                    project={project}
                    key={project.id}
                    onDelete={onProjectDelete}
                  />
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export type ProjectItemProps = {
  project: Project;
  onDelete?: (id: string) => void;
};
function ProjectItem({ project, onDelete }: ProjectItemProps) {
  return (
    <SidebarMenuItem key={project.id}>
      <div className="group/project-item relative">
        <SidebarMenuButton asChild>
          <Link to="/app/projects/$slug" params={{ slug: project.slug! }}>
            {project.name}
          </Link>
        </SidebarMenuButton>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-0 group-hover/project-item:opacity-100 group-[&:has([aria-expanded=true])]/project-item:opacity-1000">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="xs" variant="ghost">
                <EllipsisIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onDelete?.(project.id!)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </SidebarMenuItem>
  );
}

function ProjectCreateModal({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const onCreate = (project: Project) => {
    ProjectRepository.save(project);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="top-80 lg:w-[600px] lg:max-w-[600px] xl:w-[900px] xl:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Create a new project</DialogTitle>
        </DialogHeader>
        <ProjectForm onCancel={() => setOpen(false)} onSubmit={onCreate} />
      </DialogContent>
    </Dialog>
  );
}
