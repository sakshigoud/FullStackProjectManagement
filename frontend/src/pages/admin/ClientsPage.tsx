import { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Loader from '../../components/common/Loader';
import { API_ENDPOINTS } from '../../constants/api';
import apiClient from '../../services/apiClient';
import type { Client } from '../../components/landing/ClientCard';
import '../../styles.css';

interface ClientFormState {
  clientName: string;
  clientDesignation: string;
  clientDescription: string;
  clientImageFile: File | null;
}

const emptyForm: ClientFormState = {
  clientName: '',
  clientDesignation: '',
  clientDescription: '',
  clientImageFile: null
};

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [form, setForm] = useState<ClientFormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const loadClients = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get<Client[]>(API_ENDPOINTS.clients.admin);
      setClients(res.data);
    } catch {
      toast.error('Failed to load clients');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  const openCreate = () => {
    setEditingClient(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (client: Client) => {
    setEditingClient(client);
    setForm({
      clientName: client.clientName,
      clientDesignation: client.clientDesignation,
      clientDescription: client.clientDescription,
      clientImageFile: null
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.clientName || !form.clientDesignation || !form.clientDescription) {
      toast.error('Please fill in all required fields');
      return;
    }

    const formData = new FormData();
    formData.append('clientName', form.clientName);
    formData.append('clientDesignation', form.clientDesignation);
    formData.append('clientDescription', form.clientDescription);
    if (form.clientImageFile) {
      formData.append('clientImage', form.clientImageFile);
    }

    try {
      setSubmitting(true);
      if (editingClient) {
        await apiClient.put(`${API_ENDPOINTS.clients.admin}/${editingClient._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Client updated');
      } else {
        await apiClient.post(API_ENDPOINTS.clients.admin, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Client created');
      }
      setModalOpen(false);
      await loadClients();
    } catch {
      toast.error('Save failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (client: Client) => {
    const confirmed = window.confirm('Delete this client?');
    if (!confirmed) return;

    try {
      await apiClient.delete(`${API_ENDPOINTS.clients.admin}/${client._id}`);
      toast.success('Client deleted');
      await loadClients();
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Clients</h2>
          <p className="text-xs text-gray-500">Manage testimonials shown on the landing page.</p>
        </div>
        <Button onClick={openCreate}>Add Client</Button>
      </div>

      {loading ? (
        <Loader />
      ) : clients.length === 0 ? (
        <div className="empty-state">No clients yet. Click "Add Client" to create one.</div>
      ) : (
        <div className="table-wrapper">
          <table className="table-base">
            <thead className="table-head-row">
              <tr>
                <th className="table-head-cell">Image</th>
                <th className="table-head-cell">Name</th>
                <th className="table-head-cell">Designation</th>
                <th className="table-head-cell">Testimonial</th>
                <th className="table-head-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client._id} className="table-row">
                  <td className="table-cell">
                    {client.clientImage && (
                      <img
                        src={client.clientImage}
                        alt={client.clientName}
                        className="h-14 w-14 object-cover rounded-full"
                      />
                    )}
                  </td>
                  <td className="table-cell font-medium text-gray-900">{client.clientName}</td>
                  <td className="table-cell text-sm text-gray-600">{client.clientDesignation}</td>
                  <td className="table-cell text-sm text-gray-600 max-w-xs">{client.clientDescription}</td>
                  <td className="table-cell">
                    <div className="flex gap-2">
                      <Button variant="outline" className="text-xs px-3 py-1" onClick={() => openEdit(client)}>
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        className="text-xs px-3 py-1 text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => handleDelete(client)}
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
        title={editingClient ? 'Edit Client' : 'Add Client'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="input-label" htmlFor="clientName">
              Name
            </label>
            <input
              id="clientName"
              className="input-base"
              value={form.clientName}
              onChange={(e) => setForm((prev) => ({ ...prev, clientName: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="input-label" htmlFor="clientDesignation">
              Designation
            </label>
            <input
              id="clientDesignation"
              className="input-base"
              value={form.clientDesignation}
              onChange={(e) => setForm((prev) => ({ ...prev, clientDesignation: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="input-label" htmlFor="clientDescription">
              Testimonial
            </label>
            <textarea
              id="clientDescription"
              className="textarea-base"
              value={form.clientDescription}
              onChange={(e) => setForm((prev) => ({ ...prev, clientDescription: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="input-label" htmlFor="clientImage">
              Client Image
            </label>
            <input
              id="clientImage"
              type="file"
              accept="image/*"
              className="input-base"
              onChange={(e) =>
                setForm((prev) => ({ ...prev, clientImageFile: e.target.files?.[0] ?? null }))
              }
            />
            {editingClient?.clientImage && (
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

export default ClientsPage;
