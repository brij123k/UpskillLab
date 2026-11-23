import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  FiPlus, FiX, FiLoader, FiPaperclip, FiUpload, FiTrash2, FiMessageSquare,
  FiClock, FiCheckCircle, FiAlertTriangle, FiInbox, FiChevronRight, FiEdit2,
  FiRotateCcw, FiFileText, FiLock, FiInfo,
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiConfig from '../../../config/apiConfig';
import {
  getDataHandlerWithToken,
  postDataHandlerWithToken,
  patchTokenDataHandler,
  uploadFileHandler,
} from '../../../config/services';

const REQUEST_TYPES = [
  { value: 'ACADEMIC', label: 'Academic Query' },
  { value: 'TECHNICAL', label: 'Technical Issue (LMS / Access / Login)' },
  { value: 'PAYMENT', label: 'Payment / EMI / Invoice' },
  { value: 'CERTIFICATE', label: 'Certificate / LOR / Documents' },
  { value: 'PLACEMENT', label: 'Internship / Placement Support' },
  { value: 'WELLNESS', label: 'Wellness / Counselling Support' },
  { value: 'TRAINER', label: 'Trainer / Session Related' },
  { value: 'OTHER', label: 'Other' },
];

const PRIORITIES = [
  { value: 'LOW', label: 'Low', hint: 'General query, no urgency' },
  { value: 'MEDIUM', label: 'Medium', hint: 'Needs resolution within 48 hours' },
  { value: 'HIGH', label: 'High', hint: 'Blocking progress / urgent' },
];
const PRIORITY_SHORT = { HIGH: 'High', MEDIUM: 'Medium', LOW: 'Low' };

const RESPONSE_MODES = [
  { value: 'EMAIL', label: 'Email' },
  { value: 'WHATSAPP', label: 'WhatsApp' },
  { value: 'CALL', label: 'Call (if required)' },
];

const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const PRIORITY_STYLE = {
  HIGH: 'bg-red-100 text-red-700',
  MEDIUM: 'bg-yellow-100 text-yellow-800',
  LOW: 'bg-green-100 text-green-700',
};
const STATUS_STYLE = {
  OPEN: 'bg-blue-100 text-blue-700',
  IN_PROGRESS: 'bg-purple-100 text-purple-700',
  RESOLVED: 'bg-green-100 text-green-700',
  CLOSED: 'bg-gray-200 text-gray-700',
};
const STATUS_ICON = {
  OPEN: <FiInbox />,
  IN_PROGRESS: <FiClock />,
  RESOLVED: <FiCheckCircle />,
  CLOSED: <FiLock />,
};

const emptyForm = {
  requestType: '',
  requestTypeOther: '',
  priority: '',
  subject: '',
  description: '',
  issueStartDate: '',
  declaration: false,
  preferredResponseModes: [],
  sendCopy: false,
};

const formatDateTime = (d) =>
  d ? new Date(d).toLocaleString([], { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-';
const formatDate = (d) => (d ? new Date(d).toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' }) : '-');
const today = () => new Date().toISOString().split('T')[0];
const toDateInput = (d) => (d ? new Date(d).toISOString().split('T')[0] : '');

const isImageAttachment = (a) =>
  !!a?.url && (a.mimeType?.startsWith('image/') || /\.(png|jpe?g|gif|webp|bmp|svg)(\?.*)?$/i.test(a.url));

const getErrorMessage = (error, fallback) => {
  const msg = error?.data?.message || error?.message;
  if (Array.isArray(msg)) return msg[0];
  return msg || fallback;
};

/** Full-screen image viewer (closes on Esc, backdrop click or ×) */
const ImageLightbox = ({ image, onClose }) => {
  useEffect(() => {
    if (!image) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [image, onClose]);

  if (!image) return null;
  return (
    <div className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-4" onClick={onClose}>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/40 rounded-full p-2"
        aria-label="Close image"
      >
        <FiX size={26} />
      </button>
      <img
        src={image.url}
        alt={image.name || 'Attachment'}
        className="max-w-[95vw] max-h-[88vh] object-contain rounded shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      {image.name && (
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm px-3 text-center truncate max-w-[90vw]">
          {image.name}
        </p>
      )}
    </div>
  );
};

/** Image → thumbnail that opens full screen; PDF → link */
const AttachmentView = ({ attachment, onOpenImage, size = 'md' }) => {
  if (!attachment?.url) return null;
  if (isImageAttachment(attachment)) {
    return (
      <button
        type="button"
        onClick={() => onOpenImage(attachment)}
        className="group block text-left"
        title="Click to view full screen"
      >
        <img
          src={attachment.url}
          alt={attachment.name || 'Attachment'}
          className={`${size === 'sm' ? 'h-20 w-28' : 'h-36 w-52'} object-cover rounded-md border border-gray-200 group-hover:opacity-90 transition`}
        />
        <span className="block text-xs text-gray-500 mt-1 truncate max-w-[13rem]">{attachment.name || 'Image'}</span>
      </button>
    );
  }
  return (
    <a
      href={attachment.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
    >
      <FiFileText className="mr-1 flex-shrink-0" /> <span className="truncate">{attachment.name || 'View attachment'}</span>
    </a>
  );
};

const StudentSupportTickets = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const openTicketId = searchParams.get('id');

  const [student, setStudent] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [activeTicket, setActiveTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusTab, setStatusTab] = useState('all');

  // create / edit form
  const [showForm, setShowForm] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null); // ticket being edited, null = create
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [attachment, setAttachment] = useState(null); // { url, name, mimeType, size }
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // reopen
  const [reopenTicket, setReopenTicket] = useState(null);
  const [reopenForm, setReopenForm] = useState({ reason: '', priority: '' });
  const [reopenAttachment, setReopenAttachment] = useState(null);
  const [reopenErrors, setReopenErrors] = useState({});
  const [reopening, setReopening] = useState(false);

  const [lightboxImage, setLightboxImage] = useState(null);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await getDataHandlerWithToken('mySupportTickets');
      setStudent(res?.student || null);
      setTickets(res?.tickets || []);
      setActiveTicket(res?.activeTicket || null);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast.error(getErrorMessage(error, 'Failed to load your tickets'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const selectedTicket = useMemo(
    () => (openTicketId ? tickets.find((t) => t._id === openTicketId) : null),
    [openTicketId, tickets],
  );

  const filteredTickets = useMemo(() => {
    if (statusTab === 'all') return tickets;
    if (statusTab === 'active') return tickets.filter((t) => t.status === 'OPEN' || t.status === 'IN_PROGRESS');
    return tickets.filter((t) => t.status === 'RESOLVED' || t.status === 'CLOSED');
  }, [tickets, statusTab]);

  const counts = useMemo(() => ({
    all: tickets.length,
    active: tickets.filter((t) => t.status === 'OPEN' || t.status === 'IN_PROGRESS').length,
    done: tickets.filter((t) => t.status === 'RESOLVED' || t.status === 'CLOSED').length,
  }), [tickets]);

  // ---------------------------------------------------------------- upload
  /** Validates and uploads one file; returns { url, name, mimeType, size } or null */
  const uploadAttachment = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return null;

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error('Only PDF or image files are allowed');
      return null;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error('File must be 10 MB or smaller');
      return null;
    }

    setUploading(true);
    try {
      const res = await uploadFileHandler('uploadFiles', file);
      const url = res?.files?.[0]?.fileUrl;
      if (!url) throw new Error('Upload failed');
      return { url, name: file.name, mimeType: file.type, size: file.size };
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload file');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const AttachmentPicker = ({ value, onChange }) =>
    value ? (
      <div className="flex items-start justify-between gap-3 p-3 border border-gray-200 rounded-md bg-gray-50 text-sm">
        {isImageAttachment(value) ? (
          <AttachmentView attachment={value} onOpenImage={setLightboxImage} size="sm" />
        ) : (
          <a href={value.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-800 truncate">
            <FiPaperclip className="mr-2 flex-shrink-0" />
            <span className="truncate">{value.name || 'Attachment'}</span>
          </a>
        )}
        <button type="button" onClick={() => onChange(null)} className="text-red-500 hover:text-red-700" title="Remove file">
          <FiTrash2 />
        </button>
      </div>
    ) : (
      <label className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50 ${uploading ? 'opacity-60 cursor-wait' : 'cursor-pointer'}`}>
        {uploading ? <FiLoader className="mr-2 animate-spin" /> : <FiUpload className="mr-2" />}
        {uploading ? 'Uploading...' : 'Upload File'}
        <input
          type="file"
          accept="application/pdf,image/*"
          onChange={async (e) => {
            const uploaded = await uploadAttachment(e);
            if (uploaded) onChange(uploaded);
          }}
          disabled={uploading}
          className="hidden"
        />
      </label>
    );

  // ---------------------------------------------------------------- create / edit form
  const setField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const toggleResponseMode = (mode) => {
    setForm((prev) => ({
      ...prev,
      preferredResponseModes: prev.preferredResponseModes.includes(mode)
        ? prev.preferredResponseModes.filter((m) => m !== mode)
        : [...prev.preferredResponseModes, mode],
    }));
  };

  const openCreateForm = () => {
    if (activeTicket) {
      toast.info(`You already have an active ticket (${activeTicket.ticketNumber}). You can raise a new one once it is resolved.`);
      return;
    }
    setEditingTicket(null);
    setForm(emptyForm);
    setAttachment(null);
    setErrors({});
    setShowForm(true);
  };

  const openEditForm = (ticket) => {
    setEditingTicket(ticket);
    setForm({
      requestType: ticket.requestType,
      requestTypeOther: ticket.requestTypeOther || '',
      priority: ticket.priority,
      subject: ticket.subject,
      description: ticket.description,
      issueStartDate: toDateInput(ticket.issueStartDate),
      declaration: true,
      preferredResponseModes: ticket.preferredResponseModes || [],
      sendCopy: ticket.sendCopy,
    });
    setAttachment(ticket.attachment?.url ? ticket.attachment : null);
    setErrors({});
    setShowForm(true);
  };

  const validate = () => {
    const e = {};
    if (!form.requestType) e.requestType = 'Please select the type of request';
    if (form.requestType === 'OTHER' && !form.requestTypeOther.trim()) e.requestTypeOther = 'Please specify your request type';
    if (!form.priority) e.priority = 'Please select a priority level';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.description.trim()) e.description = 'Description is required';
    if (!form.declaration) e.declaration = 'Please confirm the declaration';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const resetForm = () => {
    setForm(emptyForm);
    setErrors({});
    setAttachment(null);
    setEditingTicket(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (uploading) {
      toast.info('Please wait for the file to finish uploading');
      return;
    }
    if (!validate()) return;

    setSubmitting(true);
    try {
      if (editingTicket) {
        const payload = {
          requestType: form.requestType,
          ...(form.requestType === 'OTHER' && { requestTypeOther: form.requestTypeOther.trim() }),
          priority: form.priority,
          subject: form.subject.trim(),
          description: form.description.trim(),
          issueStartDate: form.issueStartDate || null,
          ...(attachment ? { attachment } : { removeAttachment: true }),
          preferredResponseModes: form.preferredResponseModes,
        };
        await patchTokenDataHandler(ApiConfig.editMySupportTicket(editingTicket._id), payload, true);
        toast.success('Ticket updated');
      } else {
        const payload = {
          requestType: form.requestType,
          ...(form.requestType === 'OTHER' && { requestTypeOther: form.requestTypeOther.trim() }),
          priority: form.priority,
          subject: form.subject.trim(),
          description: form.description.trim(),
          ...(form.issueStartDate && { issueStartDate: form.issueStartDate }),
          ...(attachment && { attachment }),
          declaration: true,
          preferredResponseModes: form.preferredResponseModes,
          sendCopy: form.sendCopy,
        };
        const ticket = await postDataHandlerWithToken('supportTickets', payload);
        toast.success(`Ticket ${ticket?.ticketNumber || ''} submitted successfully`);
      }
      resetForm();
      await fetchTickets();
    } catch (error) {
      console.error('Error saving ticket:', error);
      toast.error(getErrorMessage(error, editingTicket ? 'Failed to update ticket' : 'Failed to submit ticket'));
      if (editingTicket) fetchTickets(); // status may have changed to In Progress meanwhile
    } finally {
      setSubmitting(false);
    }
  };

  // ---------------------------------------------------------------- reopen
  const openReopen = (ticket) => {
    if (activeTicket && activeTicket._id !== ticket._id) {
      toast.info(`You already have an active ticket (${activeTicket.ticketNumber}). You can reopen this one once it is resolved.`);
      return;
    }
    setReopenTicket(ticket);
    setReopenForm({ reason: '', priority: ticket.priority });
    setReopenAttachment(null);
    setReopenErrors({});
  };

  const closeReopen = () => {
    setReopenTicket(null);
    setReopenAttachment(null);
    setReopenErrors({});
  };

  const handleReopen = async () => {
    if (uploading) {
      toast.info('Please wait for the file to finish uploading');
      return;
    }
    const e = {};
    if (!reopenForm.reason.trim()) e.reason = 'Please tell us why you are reopening this ticket';
    if (!reopenForm.priority) e.priority = 'Please select a priority level';
    setReopenErrors(e);
    if (Object.keys(e).length) return;

    setReopening(true);
    try {
      await postDataHandlerWithToken(
        ApiConfig.reopenSupportTicket(reopenTicket._id),
        {
          reason: reopenForm.reason.trim(),
          priority: reopenForm.priority,
          ...(reopenAttachment && { attachment: reopenAttachment }),
        },
        true,
      );
      toast.success(`Ticket ${reopenTicket.ticketNumber} reopened`);
      closeReopen();
      await fetchTickets();
    } catch (error) {
      console.error('Error reopening ticket:', error);
      toast.error(getErrorMessage(error, 'Failed to reopen ticket'));
      fetchTickets(); // ticket may have been closed meanwhile
    } finally {
      setReopening(false);
    }
  };

  // ---------------------------------------------------------------- ui
  const inputClass = (hasError) =>
    `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D2C5E] ${hasError ? 'border-red-400' : 'border-gray-300'}`;
  const ErrorText = ({ name, from = errors }) => (from[name] ? <p className="text-xs text-red-500 mt-1">{from[name]}</p> : null);

  const PriorityPicker = ({ value, onChange, name }) => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {PRIORITIES.map((p) => (
        <label
          key={p.value}
          className={`flex items-start gap-2 p-2 border rounded-md cursor-pointer text-sm ${
            value === p.value ? 'border-[#4D2C5E] bg-[#4D2C5E]/5' : 'border-gray-200 hover:bg-gray-50'
          }`}
        >
          <input
            type="radio"
            name={name}
            value={p.value}
            checked={value === p.value}
            onChange={() => onChange(p.value)}
            className="accent-[#4D2C5E] mt-1"
          />
          <span>
            <span className="font-medium">{p.label}</span>
            <span className="block text-xs text-gray-500">{p.hint}</span>
          </span>
        </label>
      ))}
    </div>
  );

  const remarkAuthor = (r) => {
    if (r.kind === 'STUDENT') return 'You reopened this ticket';
    if (r.kind === 'SYSTEM') return 'System';
    return 'Upskillab Support';
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#4D2C5E]">Support Tickets</h1>
            <p className="text-gray-600 text-sm">Raise a query, issue or request and track its status here.</p>
          </div>
          <button
            onClick={openCreateForm}
            disabled={loading}
            title={activeTicket ? 'You can raise a new ticket once your active ticket is resolved' : undefined}
            className={`flex items-center justify-center px-4 py-2 text-white rounded-md transition ${
              activeTicket ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#F36F21] hover:bg-[#e05e1a]'
            }`}
          >
            <FiPlus className="mr-2" /> Raise a Ticket
          </button>
        </div>

        {activeTicket && !loading && (
          <div className="mb-4 flex items-start gap-2 bg-blue-50 border border-blue-200 text-blue-800 text-sm rounded-md p-3">
            <FiInfo className="mt-0.5 flex-shrink-0" />
            <p>
              You have an active ticket{' '}
              <button onClick={() => navigate(`/Student/Tickets?id=${activeTicket._id}`)} className="font-semibold underline">
                {activeTicket.ticketNumber}
              </button>
              . You can raise a new ticket once it is resolved.
            </p>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {[
            { key: 'all', label: 'All' },
            { key: 'active', label: 'Open / In Progress' },
            { key: 'done', label: 'Resolved / Closed' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatusTab(tab.key)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                statusTab === tab.key ? 'bg-[#4D2C5E] text-white' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              {tab.label} ({counts[tab.key]})
            </button>
          ))}
        </div>

        {/* Ticket list */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-sm p-10 flex justify-center">
            <FiLoader className="animate-spin h-6 w-6 text-[#4D2C5E]" />
          </div>
        ) : filteredTickets.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-10 text-center">
            <FiMessageSquare className="mx-auto h-10 w-10 text-gray-300 mb-3" />
            <p className="text-gray-600 mb-1">No tickets here yet</p>
            <p className="text-sm text-gray-400">Facing an issue? Click “Raise a Ticket” and our team will help you.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTickets.map((t) => {
              const lastRemark = t.remarks?.[t.remarks.length - 1];
              return (
                <button
                  key={t._id}
                  onClick={() => navigate(`/Student/Tickets?id=${t._id}`)}
                  className="w-full text-left bg-white rounded-lg shadow-sm hover:shadow-md transition p-4 border border-gray-100"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs text-gray-500">{t.ticketNumber}</span>
                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${PRIORITY_STYLE[t.priority]}`}>
                          {PRIORITY_SHORT[t.priority]}
                        </span>
                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full inline-flex items-center gap-1 ${STATUS_STYLE[t.status]}`}>
                          {STATUS_ICON[t.status]} {t.statusLabel}
                        </span>
                        {t.reopenCount > 0 && (
                          <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-orange-100 text-orange-700 inline-flex items-center gap-1">
                            <FiRotateCcw /> Reopened
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900 truncate">{t.subject}</h3>
                      <p className="text-xs text-gray-500">{t.requestTypeLabel} · Raised {formatDateTime(t.createdAt)}</p>
                      {lastRemark && (
                        <p className="text-sm text-gray-700 mt-2 bg-gray-50 rounded p-2 truncate">
                          <span className="font-medium text-[#4D2C5E]">Latest update:</span> {lastRemark.message}
                        </p>
                      )}
                      {t.canReopen && (
                        <p className="text-xs text-green-700 mt-2">
                          Not solved? You can reopen this ticket until {formatDateTime(t.autoCloseAt)}.
                        </p>
                      )}
                    </div>
                    <FiChevronRight className="text-gray-400 mt-1 flex-shrink-0" />
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ------------------------------------------------ Create / edit ticket modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[92vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <div>
                <h2 className="text-lg md:text-xl font-bold text-[#4D2C5E]">
                  {editingTicket ? `Edit Ticket ${editingTicket.ticketNumber}` : 'Learner Support Ticket'}
                </h2>
                <p className="text-xs text-gray-500">
                  {editingTicket ? 'You can edit your ticket until our team starts working on it.' : 'Query / Issue / Request'}
                </p>
              </div>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600"><FiX size={24} /></button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* Student details (auto) */}
              <div className="bg-gray-50 p-4 rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500">Name</p>
                  <p className="font-medium text-gray-900">{student?.fullName || '—'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="font-medium text-gray-900 break-all">{student?.email || '—'}</p>
                </div>
              </div>

              {/* Type of request */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Type of Request <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {REQUEST_TYPES.map((rt) => (
                    <label
                      key={rt.value}
                      className={`flex items-center gap-2 p-2 border rounded-md cursor-pointer text-sm ${
                        form.requestType === rt.value ? 'border-[#4D2C5E] bg-[#4D2C5E]/5' : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="requestType"
                        value={rt.value}
                        checked={form.requestType === rt.value}
                        onChange={() => setField('requestType', rt.value)}
                        className="accent-[#4D2C5E]"
                      />
                      {rt.label}{rt.value === 'OTHER' ? ':' : ''}
                    </label>
                  ))}
                </div>
                {form.requestType === 'OTHER' && (
                  <input
                    type="text"
                    value={form.requestTypeOther}
                    onChange={(e) => setField('requestTypeOther', e.target.value)}
                    maxLength={150}
                    placeholder="Please specify"
                    className={`${inputClass(errors.requestTypeOther)} mt-2`}
                  />
                )}
                <ErrorText name="requestType" />
                <ErrorText name="requestTypeOther" />
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Priority Level <span className="text-red-500">*</span>
                </label>
                <PriorityPicker name="priority" value={form.priority} onChange={(v) => setField('priority', v)} />
                <ErrorText name="priority" />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Subject of the Ticket <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setField('subject', e.target.value)}
                  maxLength={200}
                  className={inputClass(errors.subject)}
                />
                <ErrorText name="subject" />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Detailed Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={5}
                  value={form.description}
                  onChange={(e) => setField('description', e.target.value)}
                  maxLength={5000}
                  className={inputClass(errors.description)}
                />
                <ErrorText name="description" />
              </div>

              {/* Issue start date */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Date when the issue started <span className="text-gray-400 font-normal">(if applicable)</span>
                </label>
                <input
                  type="date"
                  value={form.issueStartDate}
                  max={today()}
                  onChange={(e) => setField('issueStartDate', e.target.value)}
                  className={`${inputClass(false)} sm:w-60`}
                />
              </div>

              {/* Attachment */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Attachments <span className="text-gray-400 font-normal">(If Any)</span>
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Upload Supporting Documents / Screenshots — 1 file: PDF or image, max 10 MB.
                </p>
                <AttachmentPicker value={attachment} onChange={setAttachment} />
              </div>

              {/* Consent & confirmation */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <h3 className="text-sm font-semibold text-gray-800">Consent &amp; Confirmation</h3>

                {!editingTicket && (
                  <div>
                    <p className="text-sm font-medium text-gray-800 mb-1">
                      Declaration <span className="text-red-500">*</span>
                    </p>
                    <label className="flex items-start gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.declaration}
                        onChange={(e) => setField('declaration', e.target.checked)}
                        className="accent-[#4D2C5E] mt-1"
                      />
                      I confirm that the information provided is accurate to the best of my knowledge.
                    </label>
                    <ErrorText name="declaration" />
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium text-gray-800 mb-1">Preferred Mode of Response</p>
                  <div className="flex flex-wrap gap-4">
                    {RESPONSE_MODES.map((m) => (
                      <label key={m.value} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.preferredResponseModes.includes(m.value)}
                          onChange={() => toggleResponseMode(m.value)}
                          className="accent-[#4D2C5E]"
                        />
                        {m.label}
                      </label>
                    ))}
                  </div>
                </div>

                {!editingTicket && (
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.sendCopy}
                      onChange={(e) => setField('sendCopy', e.target.checked)}
                      className="accent-[#4D2C5E]"
                    />
                    Send me a copy of my responses.
                  </label>
                )}
              </div>
            </form>

            <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
              <button type="button" onClick={resetForm} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting || uploading}
                className="px-5 py-2 bg-[#4D2C5E] text-white rounded-md hover:bg-[#3a1f47] disabled:opacity-50 flex items-center"
              >
                {submitting && <FiLoader className="mr-2 animate-spin" />}
                {editingTicket ? 'Save Changes' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------ Ticket details modal */}
      {selectedTicket && !showForm && !reopenTicket && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => navigate('/Student/Tickets')}>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[92vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between p-5 border-b border-gray-200">
              <div className="min-w-0">
                <h2 className="text-lg font-bold text-[#4D2C5E] break-words">{selectedTicket.subject}</h2>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">{selectedTicket.ticketNumber}</span>
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${PRIORITY_STYLE[selectedTicket.priority]}`}>
                    {PRIORITY_SHORT[selectedTicket.priority]} priority
                  </span>
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded-full inline-flex items-center gap-1 ${STATUS_STYLE[selectedTicket.status]}`}>
                    {STATUS_ICON[selectedTicket.status]} {selectedTicket.statusLabel}
                  </span>
                  {selectedTicket.reopenCount > 0 && (
                    <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-orange-100 text-orange-700">
                      Reopened {selectedTicket.reopenCount > 1 ? `×${selectedTicket.reopenCount}` : ''}
                    </span>
                  )}
                </div>
              </div>
              <button onClick={() => navigate('/Student/Tickets')} className="text-gray-400 hover:text-gray-600"><FiX size={24} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4 text-sm">
              {/* State banner */}
              {selectedTicket.status === 'IN_PROGRESS' && (
                <div className="flex items-start gap-2 bg-purple-50 text-purple-800 rounded-md p-3">
                  <FiClock className="mt-0.5 flex-shrink-0" />
                  <p>Our team is working on this ticket, so it can no longer be edited.</p>
                </div>
              )}
              {selectedTicket.canReopen && (
                <div className="flex items-start gap-2 bg-green-50 text-green-800 rounded-md p-3">
                  <FiCheckCircle className="mt-0.5 flex-shrink-0" />
                  <p>
                    This ticket is resolved. If your issue is not solved, you can reopen it until{' '}
                    <strong>{formatDateTime(selectedTicket.autoCloseAt)}</strong>. After that it will be closed automatically.
                  </p>
                </div>
              )}
              {selectedTicket.status === 'CLOSED' && (
                <div className="flex items-start gap-2 bg-gray-100 text-gray-700 rounded-md p-3">
                  <FiLock className="mt-0.5 flex-shrink-0" />
                  <p>This ticket is closed and can't be reopened. Please raise a new ticket if you still need help.</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div><p className="text-gray-500">Type of Request</p><p className="text-gray-900">{selectedTicket.requestTypeLabel}</p></div>
                <div><p className="text-gray-500">Raised On</p><p className="text-gray-900">{formatDateTime(selectedTicket.createdAt)}</p></div>
                <div><p className="text-gray-500">Issue Started</p><p className="text-gray-900">{formatDate(selectedTicket.issueStartDate)}</p></div>
                <div><p className="text-gray-500">Preferred Response</p><p className="text-gray-900">{selectedTicket.preferredResponseModeLabels?.join(', ') || '—'}</p></div>
              </div>

              <div>
                <p className="text-gray-500 mb-1">Description</p>
                <div className="bg-gray-50 p-3 rounded whitespace-pre-wrap text-gray-800">{selectedTicket.description}</div>
                {selectedTicket.editedAt && (
                  <p className="text-xs text-gray-400 mt-1">Edited {formatDateTime(selectedTicket.editedAt)}</p>
                )}
              </div>

              {selectedTicket.attachment?.url && (
                <div>
                  <p className="text-gray-500 mb-1">Attachment</p>
                  <AttachmentView attachment={selectedTicket.attachment} onOpenImage={setLightboxImage} />
                </div>
              )}

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Updates &amp; Remarks</h3>
                {selectedTicket.remarks?.length ? (
                  <div className="space-y-3">
                    {selectedTicket.remarks.map((r) => (
                      <div
                        key={r._id}
                        className={`border-l-4 p-3 rounded ${
                          r.kind === 'STUDENT' ? 'border-[#F36F21] bg-orange-50' : r.kind === 'SYSTEM' ? 'border-gray-400 bg-gray-50' : 'border-[#4D2C5E] bg-gray-50'
                        }`}
                      >
                        <p className="text-gray-800 whitespace-pre-wrap">{r.message}</p>
                        {r.kind === 'STUDENT' && r.priority && (
                          <p className="text-xs text-gray-600 mt-1">
                            Priority: {r.previousPriority && r.previousPriority !== r.priority
                              ? `${PRIORITY_SHORT[r.previousPriority]} → ${PRIORITY_SHORT[r.priority]}`
                              : PRIORITY_SHORT[r.priority]}
                          </p>
                        )}
                        {r.attachment?.url && (
                          <div className="mt-2"><AttachmentView attachment={r.attachment} onOpenImage={setLightboxImage} size="sm" /></div>
                        )}
                        <p className="text-xs text-gray-500 mt-1">{remarkAuthor(r)} · {formatDateTime(r.createdAt)}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 flex items-center gap-2">
                    <FiAlertTriangle /> No remarks yet — our team will update you soon.
                  </p>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50 flex flex-wrap justify-end gap-3">
              {selectedTicket.canEdit && (
                <button
                  onClick={() => openEditForm(selectedTicket)}
                  className="px-4 py-2 border border-[#4D2C5E] text-[#4D2C5E] rounded-md hover:bg-[#4D2C5E]/5 flex items-center"
                >
                  <FiEdit2 className="mr-2" /> Edit Ticket
                </button>
              )}
              {selectedTicket.canReopen && (
                <button
                  onClick={() => openReopen(selectedTicket)}
                  className="px-4 py-2 bg-[#F36F21] text-white rounded-md hover:bg-[#e05e1a] flex items-center"
                >
                  <FiRotateCcw className="mr-2" /> Reopen Ticket
                </button>
              )}
              <button onClick={() => navigate('/Student/Tickets')} className="px-4 py-2 bg-[#4D2C5E] text-white rounded-md hover:bg-[#3a1f47]">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------ Reopen modal */}
      {reopenTicket && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[92vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-bold text-[#4D2C5E]">Reopen Ticket {reopenTicket.ticketNumber}</h2>
                <p className="text-xs text-gray-500 truncate">{reopenTicket.subject}</p>
              </div>
              <button onClick={closeReopen} className="text-gray-400 hover:text-gray-600"><FiX size={24} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Why are you reopening this ticket? <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  value={reopenForm.reason}
                  onChange={(e) => {
                    setReopenForm((p) => ({ ...p, reason: e.target.value }));
                    setReopenErrors((p) => ({ ...p, reason: undefined }));
                  }}
                  maxLength={3000}
                  placeholder="Tell us what is still not working, with any extra details..."
                  className={inputClass(reopenErrors.reason)}
                />
                <ErrorText name="reason" from={reopenErrors} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Priority Level <span className="text-red-500">*</span>
                </label>
                <PriorityPicker
                  name="reopenPriority"
                  value={reopenForm.priority}
                  onChange={(v) => {
                    setReopenForm((p) => ({ ...p, priority: v }));
                    setReopenErrors((p) => ({ ...p, priority: undefined }));
                  }}
                />
                <ErrorText name="priority" from={reopenErrors} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Additional Attachment <span className="text-gray-400 font-normal">(If Any)</span>
                </label>
                <p className="text-xs text-gray-500 mb-2">1 file: PDF or image, max 10 MB.</p>
                <AttachmentPicker value={reopenAttachment} onChange={setReopenAttachment} />
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
              <button type="button" onClick={closeReopen} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReopen}
                disabled={reopening || uploading}
                className="px-5 py-2 bg-[#F36F21] text-white rounded-md hover:bg-[#e05e1a] disabled:opacity-50 flex items-center"
              >
                {reopening ? <FiLoader className="mr-2 animate-spin" /> : <FiRotateCcw className="mr-2" />}
                Reopen Ticket
              </button>
            </div>
          </div>
        </div>
      )}

      <ImageLightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </div>
  );
};

export default StudentSupportTickets;
