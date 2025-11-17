import '../../styles.css';
import Button from '../common/Button';

export interface Project {
  _id: string;
  projectName: string;
  projectDescription: string;
  projectImage: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <article className="project-card">
      <img src={project.projectImage} alt={project.projectName} className="project-card-image" />
      <div className="project-card-body">
        <h3 className="project-card-title">{project.projectName}</h3>
        <p className="project-card-desc">{project.projectDescription}</p>
        <div className="project-card-footer">
          <Button>Read More</Button>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
