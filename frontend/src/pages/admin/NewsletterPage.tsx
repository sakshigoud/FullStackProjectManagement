import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Loader from '../../components/common/Loader';
import { API_ENDPOINTS } from '../../constants/api';
import apiClient from '../../services/apiClient';
import '../../styles.css';

interface Subscriber {
  _id: string;
  email: string;
  createdAt?: string;
}

const NewsletterPage = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(false);

  const loadSubscribers = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get<Subscriber[]>(API_ENDPOINTS.newsletter.admin);
      setSubscribers(res.data);
    } catch {
      toast.error('Failed to load subscribers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubscribers();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Newsletter Subscribers</h2>
          <p className="text-xs text-gray-500">Read-only list of subscribed email addresses.</p>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : subscribers.length === 0 ? (
        <div className="empty-state">No subscribers yet.</div>
      ) : (
        <div className="table-wrapper">
          <table className="table-base">
            <thead className="table-head-row">
              <tr>
                <th className="table-head-cell">Email</th>
                <th className="table-head-cell">Subscribed At</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((subscriber) => (
                <tr key={subscriber._id} className="table-row">
                  <td className="table-cell text-sm text-gray-800">{subscriber.email}</td>
                  <td className="table-cell text-xs text-gray-500">
                    {subscriber.createdAt
                      ? new Date(subscriber.createdAt).toLocaleString()
                      : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NewsletterPage;
