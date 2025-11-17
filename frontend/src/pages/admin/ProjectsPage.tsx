import { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Loader from '../../components/common/Loader';
import { API_ENDPOINTS } from '../../constants/api';
import apiClient from '../../services/apiClient';
import type { Project } from '../../components/landing/ProjectCard';
import '../../styles.css';

interface ProjectFormState {
  projectName: string;
  projectDescription: string;
  projectImageFile: File | null;
}

const emptyForm: ProjectFormState = {
  projectName: '',
  projectDescription: '',
  projectImageFile: null
};

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [form, setForm] = useState<ProjectFormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get<Project[]>(API_ENDPOINTS.projects.admin);
      setProjects(res.data);
    } catch {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openCreate = () => {
    setEditingProject(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (project: Project) => {
    setEditingProject(project);
    setForm({
      projectName: project.projectName,
      projectDescription: project.projectDescription,
      projectImageFile: null
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.projectName || !form.projectDescription) {
      toast.error('Please fill in all required fields');
      return;
    }

    const formData = new FormData();
    formData.append('projectName', form.projectName);
    formData.append('projectDescription', form.projectDescription);
    if (form.projectImageFile) {
      formData.append('projectImage', form.projectImageFile);
    }

    try {
      setSubmitting(true);
      if (editingProject) {
        await apiClient.put(`${API_ENDPOINTS.projects.admin}/${editingProject._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Project updated');
      } else {
        await apiClient.post(API_ENDPOINTS.projects.admin, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Project created');
      }
      setModalOpen(false);
      await loadProjects();
    } catch {
      toast.error('Save failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (project: Project) => {
    const confirmed = window.confirm('Delete this project?');
    if (!confirmed) return;

    try {
      await apiClient.delete(`${API_ENDPOINTS.projects.admin}/${project._id}`);
      toast.success('Project deleted');
      await loadProjects();
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
          <p className="text-xs text-gray-500">Manage landing page projects cards.</p>
        </div>
        <Button onClick={openCreate}>Add Project</Button>
      </div>

      {loading ? (
        <Loader />
      ) : projects.length === 0 ? (
        <div className="empty-state">No projects yet. Click "Add Project" to create one.</div>
      ) : (
        <div className="table-wrapper">
          <table className="table-base">
            <thead className="table-head-row">
              <tr>
                <th className="table-head-cell">Image</th>
                <th className="table-head-cell">Name</th>
                <th className="table-head-cell">Description</th>
                <th className="table-head-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id} className="table-row">
                  <td className="table-cell">
                    {project.projectImage && (
                      <img
                        src={project.projectImage}
                        alt={project.projectName}
                        className="h-14 w-20 object-cover rounded-md"
                      />
                    )}
                  </td>
                  <td className="table-cell font-medium text-gray-900">{project.projectName}</td>
                  <td className="table-cell text-sm text-gray-600 max-w-xs">
                    {project.projectDescription}
                  </td>
                  <td className="table-cell">
                    <div className="flex gap-2">
                      <Button variant="outline" className="text-xs px-3 py-1" onClick={() => openEdit(project)}>
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        className="text-xs px-3 py-1 text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => handleDelete(project)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingProject ? 'Edit Project' : 'Add Project'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="input-label" htmlFor="projectName">
              Project Name
            </label>
            <input
              id="projectName"
              className="input-base"
              value={form.projectName}
              onChange={(e) => setForm((prev) => ({ ...prev, projectName: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="input-label" htmlFor="projectDescription">
              Description
            </label>
            <textarea
              id="projectDescription"
              className="textarea-base"
              value={form.projectDescription}
              onChange={(e) => setForm((prev) => ({ ...prev, projectDescription: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="input-label" htmlFor="projectImage">
              Project Image
            </label>
            <input
              id="projectImage"
              type="file"
              accept="image/*"
              className="input-base"
              onChange={(e) =>
                setForm((prev) => ({ ...prev, projectImageFile: e.target.files?.[0] ?? null }))
              }
            />
            {editingProject?.projectImage && (
              <p className="mt-1 text-xs text-gray-500">Current image will be kept if you don&apos;t upload a new one.</p>
            )}
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setModalOpen(false)}
              className="px-4"
            >
              Cancel
            </Button>
            <Button type="submit" className="px-4" disabled={submitting}>
              {submitting ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProjectsPage;
