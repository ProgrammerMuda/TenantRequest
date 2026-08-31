import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Collapse,
  TextField,
  Snackbar,
  Alert,
  Checkbox,
  FormControlLabel,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  CaretLeft,
  CaretDown,
  CaretUp,
  FileText,
  Info,
  DownloadSimple,
  Ticket,
  CalendarBlank,
  Clock,
  ArrowRight,
  ListChecks,
  Buildings,
  SquareHalf,
  House,
  CheckCircle,
  RadioButton,
  CheckSquareOffset,
  Check,
  X,
  Users,
  Wrench,
  ShieldCheck,
  CheckSquare,
  Circle,
  CalendarPlus,
  Receipt,
  Invoice,
  Eye,
  FilePdf,
  UserCircle,
  Phone,
  IdentificationCard,
  Camera
} from '@phosphor-icons/react';
import { getPermitDetailData } from '../models/FitOutPermitModel';

export function FitOutPermitDetailView({ permit, controller }) {
  const data = getPermitDetailData(permit);

  // POV State: 'tenant_relation' | 'engineering'
  const [activePov, setActivePov] = useState('tenant_relation');

  // Accordion state
  const [earlyInspectionOpen, setEarlyInspectionOpen] = useState(false);
  const [dailyInspectionOpen, setDailyInspectionOpen] = useState(true);
  const [contractorOpen, setContractorOpen] = useState(false);
  const [paymentsOpen, setPaymentsOpen] = useState(false);
  const [trackingOpen, setTrackingOpen] = useState(true);

  // Common Modal / Toast States
  const [extensionModalOpen, setExtensionModalOpen] = useState(false);
  const [extensionSuccessOpen, setExtensionSuccessOpen] = useState(false);
  const [completeSuccessOpen, setCompleteSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [extensionSubmittedData, setExtensionSubmittedData] = useState(null);
  const [invoiceDetailOpen, setInvoiceDetailOpen] = useState(false);
  const [depositInvoiceOpen, setDepositInvoiceOpen] = useState(false);
  const [earlyInspectionDetailOpen, setEarlyInspectionDetailOpen] = useState(false);
  const [selectedDailyInspection, setSelectedDailyInspection] = useState(null);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [previewDoc, setPreviewDoc] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(null);

  // 1. Tenant Relation (TR) Extension Form State
  const dateInputRef = useRef(null);
  const [trRawDate, setTrRawDate] = useState(''); // YYYY-MM-DD
  const [trNewEndDate, setTrNewEndDate] = useState(''); // DD/MM/YYYY
  const [trExtendedDaysCount, setTrExtendedDaysCount] = useState(0);
  const [trTotalDurationCount, setTrTotalDurationCount] = useState(6);
  const [trFeePolicy, setTrFeePolicy] = useState('FREE_OF_CHARGE'); // 'FREE_OF_CHARGE' | 'CHARGEABLE'
  const [trChargeableAmount, setTrChargeableAmount] = useState('');
  const [trExemptionReason, setTrExemptionReason] = useState('');
  const [trNotes, setTrNotes] = useState('');

  const handleChargeableAmountChange = (val) => {
    const rawDigits = val.replace(/\D/g, '');
    if (!rawDigits) {
      setTrChargeableAmount('');
      return;
    }
    const num = parseInt(rawDigits, 10);
    const formatted = new Intl.NumberFormat('id-ID').format(num);
    setTrChargeableAmount(formatted);
  };

  const handleDateChange = (dateVal) => {
    if (!dateVal) return;
    setTrRawDate(dateVal);
    const [y, m, d] = dateVal.split('-');
    const formatted = `${d}/${m}/${y}`;
    setTrNewEndDate(formatted);

    // Calculate diff from 2026-08-10 (base end date)
    const baseDate = new Date(2026, 7, 10);
    const targetDate = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
    const diffTime = targetDate - baseDate;
    const diffDays = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));
    setTrExtendedDaysCount(diffDays);
    setTrTotalDurationCount(6 + diffDays);
  };

  const handleSelectPreset = (days, dateString, rawString) => {
    setTrRawDate(rawString);
    setTrNewEndDate(dateString);
    setTrExtendedDaysCount(days);
    setTrTotalDurationCount(6 + days);
  };

  const handleTriggerDatePicker = () => {
    if (dateInputRef.current) {
      if (typeof dateInputRef.current.showPicker === 'function') {
        dateInputRef.current.showPicker();
      } else {
        dateInputRef.current.focus();
        dateInputRef.current.click();
      }
    }
  };

  // 2. Engineering Extension Form State
  const engDateInputRef = useRef(null);
  const [engRawDate, setEngRawDate] = useState('2026-02-15');
  const [engNewEndDate, setEngNewEndDate] = useState('15/02/2026');
  const [engExtendedDaysCount, setEngExtendedDaysCount] = useState(3);
  const [engPhotos, setEngPhotos] = useState([]);
  const [engNotes, setEngNotes] = useState('');

  const handleEngPhotoUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const remainingSlots = 5 - engPhotos.length;
    if (remainingSlots <= 0) return;
    const newFiles = files.slice(0, remainingSlots);
    const newPreviews = newFiles.map(file => URL.createObjectURL(file));
    setEngPhotos(prev => [...prev, ...newPreviews].slice(0, 5));
    e.target.value = '';
  };

  const handleRemoveEngPhoto = (indexToRemove) => {
    setEngPhotos(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleEngDateChange = (dateVal) => {
    if (!dateVal) return;
    setEngRawDate(dateVal);
    const [y, m, d] = dateVal.split('-');
    const formatted = `${d}/${m}/${y}`;
    setEngNewEndDate(formatted);

    // Calculate diff from 2026-02-12 (base end date)
    const baseDate = new Date(2026, 1, 12);
    const targetDate = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
    const diffTime = targetDate - baseDate;
    const diffDays = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));
    setEngExtendedDaysCount(diffDays);
  };

  const handleEngSelectPreset = (days, dateString, rawString) => {
    setEngRawDate(rawString);
    setEngNewEndDate(dateString);
    setEngExtendedDaysCount(days);
  };

  const handleEngTriggerDatePicker = () => {
    if (engDateInputRef.current) {
      if (typeof engDateInputRef.current.showPicker === 'function') {
        engDateInputRef.current.showPicker();
      } else {
        engDateInputRef.current.focus();
        engDateInputRef.current.click();
      }
    }
  };

  const handleBack = () => {
    controller.setActiveTab('fit_out_permit');
  };

  const formatDisplayDate = (dStr) => {
    if (!dStr) return '13 Aug 2026';
    const parts = dStr.split('/');
    if (parts.length === 3) {
      const [d, m, y] = parts;
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const mIdx = parseInt(m, 10) - 1;
      return `${d} ${months[mIdx] || m} ${y}`;
    }
    return dStr;
  };

  const handleTrSubmit = () => {
    if (!trNewEndDate) {
      setSuccessMessage('Silakan pilih tanggal perpanjangan terlebih dahulu!');
      setExtensionSuccessOpen(true);
      return;
    }
    
    const formattedEnd = formatDisplayDate(trNewEndDate);
    const amountVal = trChargeableAmount || '2.000.000';
    
    setExtensionSubmittedData({
      submittedBy: 'tenant_relation',
      startDate: '10 Aug 2026',
      endDate: formattedEnd,
      extendedDays: trExtendedDaysCount || 3,
      feePolicy: trFeePolicy,
      amount: amountVal,
      invoiceNo: 'PRO/INV/082026/000032',
      issuedDate: '10/08/2026, 03:55 PM',
      dueDate: '11/08/2026, 11:59 PM',
      permitNo: '#PRO/FP/082026/000104',
      status: 'UNPAID',
      authorizedBy: 'Tenant Relation Lead - Management'
    });

    setExtensionModalOpen(false);
    setSuccessMessage(`Fitout Schedule Extension (+${trExtendedDaysCount} Days until ${trNewEndDate}) successfully submitted!`);
    setExtensionSuccessOpen(true);
  };

  const handleEngSubmit = () => {
    const formattedEnd = formatDisplayDate(engNewEndDate);
    const finalPhotos = engPhotos.length > 0 ? engPhotos : [
      'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80'
    ];
    const finalNotes = engNotes.trim() || 'Pekerjaan perapihan partisi gypsum dan instalasi kabel tray MEP memerlukan tambahan waktu 3 hari sebelum inspeksi serah terima.';

    setExtensionSubmittedData({
      submittedBy: 'engineering',
      startDate: '13 Feb 2026',
      endDate: formattedEnd,
      extendedDays: engExtendedDaysCount || 3,
      feePolicy: 'FREE_OF_CHARGE',
      amount: '0',
      invoiceNo: 'REQ-ENG-2026-0034',
      issuedDate: '12/02/2026 16:20',
      dueDate: '13 Feb 2026, 23:59',
      permitNo: data.permitNumber || '#PRO/FP/122025/000032',
      status: 'FREE_OF_CHARGE',
      reason: finalNotes,
      notes: finalNotes,
      photos: finalPhotos,
      photoCount: finalPhotos.length,
      authorizedBy: 'Engineering Lead'
    });

    setExtensionModalOpen(false);
    setSuccessMessage(`Extension request (+${engExtendedDaysCount} Days until ${engNewEndDate}) has been submitted successfully as requested by tenant.`);
    setExtensionSuccessOpen(true);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', flexGrow: 1, overflow: 'hidden', backgroundColor: '#f1f5f9' }}>
      
      {/* Top Header */}
      <Box 
        sx={{ 
          backgroundColor: '#ffffff', 
          px: 2,
          pb: 1.5,
          pt: 4,
          display: 'flex', 
          alignItems: 'center',
          position: 'relative',
          zIndex: 10
        }}
      >
        <IconButton onClick={handleBack} sx={{ color: '#334155', p: 0, mr: 2 }}>
          <CaretLeft size={24} weight="bold" />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b', fontSize: '1.05rem', flexGrow: 1, textAlign: 'center', pr: 4 }}>
          Detail Fit Out Permit
        </Typography>
      </Box>

      {/* Role / POV Switcher Bar */}
      <Box sx={{ px: 2, pb: 1.5, pt: 0.5, backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
        <Box 
          sx={{ 
            display: 'flex', 
            backgroundColor: '#f1f5f9', 
            p: 0.5, 
            borderRadius: '10px' 
          }}
        >
          <Button
            fullWidth
            disableElevation
            disableRipple
            disableFocusRipple
            disableTouchRipple
            onClick={() => setActivePov('tenant_relation')}
            startIcon={<Users size={16} weight="bold" />}
            sx={{
              borderRadius: '8px',
              py: 0.8,
              fontSize: '0.78rem',
              fontWeight: 700,
              textTransform: 'none',
              transition: 'none !important',
              backgroundColor: activePov === 'tenant_relation' ? '#ffffff !important' : 'transparent !important',
              color: activePov === 'tenant_relation' ? '#f97316 !important' : '#64748b !important',
              boxShadow: activePov === 'tenant_relation' ? '0 1px 3px rgba(0,0,0,0.08) !important' : 'none !important',
              '&:hover, &:focus, &:active, &.MuiButton-root:hover, &.MuiButton-root:focus, &.MuiButton-root:active': {
                backgroundColor: activePov === 'tenant_relation' ? '#ffffff !important' : 'transparent !important',
                color: activePov === 'tenant_relation' ? '#f97316 !important' : '#64748b !important',
                boxShadow: activePov === 'tenant_relation' ? '0 1px 3px rgba(0,0,0,0.08) !important' : 'none !important'
              }
            }}
          >
            Tenant Relation
          </Button>

          <Button
            fullWidth
            disableElevation
            disableRipple
            disableFocusRipple
            disableTouchRipple
            onClick={() => setActivePov('engineering')}
            startIcon={<Wrench size={16} weight="bold" />}
            sx={{
              borderRadius: '8px',
              py: 0.8,
              fontSize: '0.78rem',
              fontWeight: 700,
              textTransform: 'none',
              transition: 'none !important',
              backgroundColor: activePov === 'engineering' ? '#ffffff !important' : 'transparent !important',
              color: activePov === 'engineering' ? '#0284c7 !important' : '#64748b !important',
              boxShadow: activePov === 'engineering' ? '0 1px 3px rgba(0,0,0,0.08) !important' : 'none !important',
              '&:hover, &:focus, &:active, &.MuiButton-root:hover, &.MuiButton-root:focus, &.MuiButton-root:active': {
                backgroundColor: activePov === 'engineering' ? '#ffffff !important' : 'transparent !important',
                color: activePov === 'engineering' ? '#0284c7 !important' : '#64748b !important',
                boxShadow: activePov === 'engineering' ? '0 1px 3px rgba(0,0,0,0.08) !important' : 'none !important'
              }
            }}
          >
            Engineering
          </Button>
        </Box>
      </Box>

      {/* Scrollable Content */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2, pb: extensionSubmittedData ? 3 : 12, display: 'flex', flexDirection: 'column', gap: 2 }}>
        
        {/* Card 1: Permit Document Card */}
        <Box sx={{ backgroundColor: '#ffffff', borderRadius: '12px', p: 2, border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          {/* Top Row: Permit Number & Status Badge */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
            <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#1e293b' }}>
              {data.permitNumber}
            </Typography>
            <Box 
              sx={{ 
                backgroundColor: '#3b82f6', 
                color: '#ffffff', 
                borderRadius: '100px', 
                px: 1.5, 
                py: 0.35, 
                fontSize: '0.72rem', 
                fontWeight: 600,
                letterSpacing: '0.2px'
              }}
            >
              {data.status}
            </Box>
          </Box>

          {/* Document Row */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
            <Box 
              sx={{ 
                width: 36, 
                height: 36, 
                borderRadius: '8px', 
                backgroundColor: '#ecfdf5', 
                color: '#10b981', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}
            >
              <FileText size={22} weight="fill" />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: '0.88rem', color: '#1e293b', lineHeight: 1.2 }}>
                {data.fileInfo?.name || 'work permit letter'}
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', color: '#94a3b8', mt: 0.2 }}>
                {data.fileInfo?.size || '200kb'}
              </Typography>
            </Box>
          </Box>

          {/* Info Callout */}
          <Box 
            sx={{ 
              backgroundColor: '#f0f9ff', 
              borderRadius: '8px', 
              p: 1.2, 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: 1,
              mb: 1.5
            }}
          >
            <Info size={18} color="#0284c7" weight="fill" style={{ flexShrink: 0, marginTop: 1 }} />
            <Typography sx={{ fontSize: '0.75rem', color: '#0369a1', fontWeight: 500, lineHeight: 1.4 }}>
              Please print and display the work permit at the unit or work area.
            </Typography>
          </Box>

          {/* Download Button */}
          <Button
            fullWidth
            variant="contained"
            disableElevation
            disableRipple
            disableFocusRipple
            disableTouchRipple
            startIcon={<DownloadSimple size={18} weight="bold" />}
            sx={{
              backgroundColor: '#3b82f6 !important',
              color: '#ffffff !important',
              borderRadius: '8px',
              py: 1,
              fontWeight: 700,
              fontSize: '0.88rem',
              textTransform: 'none',
              boxShadow: 'none !important',
              transition: 'none !important',
              '&:hover, &:focus, &:active, &.MuiButton-root:hover, &.MuiButton-root:focus, &.MuiButton-root:active': {
                backgroundColor: '#2563eb !important',
                color: '#ffffff !important',
                boxShadow: 'none !important'
              }
            }}
          >
            Download Work Permit Letter (PDF)
          </Button>
        </Box>

        {/* Card 2: Request Information */}
        <Box sx={{ backgroundColor: '#ffffff', borderRadius: '12px', p: 2, border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
            <Typography sx={{ fontWeight: 700, fontSize: '0.92rem', color: '#1e293b' }}>
              Request Information
            </Typography>
            <Typography sx={{ color: '#3b82f6', fontWeight: 600, fontSize: '0.78rem' }}>
              {data.category || 'Renovation'}
            </Typography>
          </Box>

          {/* Title & Created At */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Box 
              sx={{ 
                width: 36, 
                height: 36, 
                borderRadius: '8px', 
                backgroundColor: '#fef3c7', 
                color: '#f59e0b', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}
            >
              <Ticket size={22} weight="fill" />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: '0.92rem', color: '#1e293b', lineHeight: 1.2 }}>
                {data.title}
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', color: '#94a3b8', mt: 0.2 }}>
                Created at {data.submittedAt}
              </Typography>
            </Box>
          </Box>

          {/* 2-Column Info Grid */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '1.1fr 1.3fr', gap: 2, mb: 2 }}>
            {/* Left: Work Period */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, mb: 0.4 }}>
                <CalendarBlank size={15} color="#94a3b8" />
                <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 500 }}>
                  Work Period
                </Typography>
              </Box>
              <Typography sx={{ fontWeight: 700, fontSize: '0.82rem', color: '#1e293b' }}>
                {data.startDate}
              </Typography>
              <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8', mt: 0.2 }}>
                {data.duration}
              </Typography>
            </Box>

            {/* Right: Working Hours */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, mb: 0.4 }}>
                <Clock size={15} color="#94a3b8" />
                <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 500 }}>
                  Working Hours
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.2 }}>
                <Typography sx={{ color: '#3b82f6', fontWeight: 600, fontSize: '0.75rem' }}>
                  Weekday
                </Typography>
                <Typography sx={{ color: '#1e293b', fontWeight: 600, fontSize: '0.75rem' }}>
                  {data.workingHours?.weekday || '12.00 - 17.00'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ color: '#f97316', fontWeight: 600, fontSize: '0.75rem' }}>
                  Weekend
                </Typography>
                <Typography sx={{ color: '#1e293b', fontWeight: 600, fontSize: '0.75rem' }}>
                  {data.workingHours?.weekend || '08.00 - 14.00'}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Photo Gallery */}
          {data.photos && data.photos.length > 0 && (
            <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
              {data.photos.map((src, idx) => (
                <Box
                  key={idx}
                  component="img"
                  src={src}
                  alt={`request photo ${idx + 1}`}
                  sx={{
                    width: 68,
                    height: 68,
                    borderRadius: '8px',
                    objectFit: 'cover',
                    border: '1px solid #e2e8f0'
                  }}
                />
              ))}
            </Box>
          )}

          {/* Notes Box */}
          <Box sx={{ backgroundColor: '#f8fafc', borderRadius: '8px', p: 1.5, mb: 2 }}>
            <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 500 }}>
              Notes
            </Typography>
            <Typography sx={{ fontSize: '0.8rem', color: '#334155', fontWeight: 500, mt: 0.3 }}>
              {data.notes}
            </Typography>
          </Box>

          {/* Start Work / End Work Banner */}
          <Box 
            sx={{ 
              backgroundColor: '#3b82f6', 
              color: '#ffffff', 
              borderRadius: '8px', 
              p: 1.5, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between' 
            }}
          >
            <Box>
              <Typography sx={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.8)' }}>
                Start Work
              </Typography>
              <Typography sx={{ fontWeight: 700, fontSize: '0.78rem', mt: 0.2 }}>
                {data.startWork || '12 Feb 2026, 22:33'}
              </Typography>
            </Box>
            <ArrowRight size={18} color="#ffffff" weight="bold" />
            <Box sx={{ textAlign: 'right' }}>
              <Typography sx={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.8)' }}>
                End Work
              </Typography>
              <Typography sx={{ fontWeight: 700, fontSize: '0.78rem', mt: 0.2 }}>
                {data.endWork || 'Not Finished yet'}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Extension Information Card (Displayed above Early Inspection when submitted) */}
        {extensionSubmittedData && (
          <Box 
            sx={{ 
              backgroundColor: '#ffffff', 
              borderRadius: '16px', 
              p: 2.2, 
              border: '1.5px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}
          >
            {/* Header: Extension Information & Status Badge */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#1e293b' }}>
                Extension Information
              </Typography>
              {extensionSubmittedData.submittedBy === 'engineering' && (
                <Box 
                  sx={{ 
                    backgroundColor: '#fff7ed', 
                    color: '#ea580c', 
                    border: '1px solid #ffedd5',
                    borderRadius: '100px', 
                    px: 1.4, 
                    py: 0.35, 
                    fontSize: '0.72rem', 
                    fontWeight: 700,
                    display: 'inline-block',
                    letterSpacing: '0.01em'
                  }}
                >
                  Waiting for Approval
                </Box>
              )}
            </Box>

            <Box sx={{ height: '1px', backgroundColor: '#f1f5f9', my: 1.8 }} />

            {/* Top 2 Items: Schedule Extension & Extension Scheme */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.8 }}>
              {/* Left Item: Schedule Extension */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box 
                  sx={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: '10px', 
                    backgroundColor: '#ecfdf5', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    flexShrink: 0 
                  }} 
                >
                  <CalendarBlank size={22} color="#27b29b" weight="fill" />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: '#94a3b8' }}>
                    Schedule Extension
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mt: 0.2 }}>
                    <Typography sx={{ fontSize: '0.88rem', fontWeight: 500, color: '#1e293b' }}>
                      {extensionSubmittedData.startDate} → {extensionSubmittedData.endDate}
                    </Typography>
                    <Box 
                      sx={{ 
                        px: 1.1, 
                        py: 0.3, 
                        backgroundColor: '#eff6ff', 
                        borderRadius: '100px', 
                        color: '#2563eb', 
                        fontWeight: 700, 
                        fontSize: '0.72rem',
                        lineHeight: 1.2
                      }} 
                    >
                      + {extensionSubmittedData.extendedDays} Day
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Right Item: Extension Scheme */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box 
                  sx={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: '10px', 
                    backgroundColor: '#ecfdf5', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    flexShrink: 0 
                  }} 
                >
                  <ShieldCheck size={22} color="#27b29b" weight="fill" />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: '#94a3b8' }}>
                    Extension Scheme
                  </Typography>
                  <Typography sx={{ fontSize: '0.88rem', fontWeight: 500, color: '#1e293b', mt: 0.2 }}>
                    {extensionSubmittedData.feePolicy === 'CHARGEABLE' 
                      ? 'Chargeable Daily Supervision' 
                      : 'Free of Charge (Grace Period)'}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Bill Information Section (Shown for CHARGEABLE - Exact match to user reference) */}
            {extensionSubmittedData.feePolicy === 'CHARGEABLE' && (
              <Box sx={{ mt: 2.2 }}>
                <Box sx={{ height: '1px', backgroundColor: '#f1f5f9', mb: 2.2 }} />

                {/* Top Row: Icon + Title/Date on Left, Price + Unpaid Pill on Right */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  {/* Left: Bill Icon + Title + Timestamp */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <Invoice size={34} weight="bold" color="#1e293b" />
                    </Box>

                    <Box>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.96rem', color: '#1e293b', lineHeight: 1.25 }}>
                        FitOut Extension Bill
                      </Typography>
                      <Typography sx={{ fontSize: '0.82rem', color: '#94a3b8', mt: 0.4 }}>
                        {extensionSubmittedData.issuedDate || '12/02/2026 16:07'}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Right: Price + Unpaid Pill */}
                  <Box sx={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.6 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '1.05rem', color: '#0f172a', letterSpacing: '-0.3px' }}>
                      Rp {extensionSubmittedData.amount},00
                    </Typography>
                    <Box 
                      sx={{ 
                        px: 1.6, 
                        py: 0.3, 
                        backgroundColor: '#f97316', 
                        borderRadius: '20px', 
                        color: '#ffffff', 
                        fontWeight: 600, 
                        fontSize: '0.78rem',
                        lineHeight: 1.2,
                        display: 'inline-block'
                      }}
                    >
                      Unpaid
                    </Box>
                  </Box>
                </Box>

                {/* Detail Invoice Button (Matching screenshot: clean light border, dark text, zero hover) */}
                <Button
                  fullWidth
                  variant="outlined"
                  disableElevation
                  disableRipple
                  disableFocusRipple
                  disableTouchRipple
                  onClick={() => setInvoiceDetailOpen(true)}
                  sx={{
                    borderColor: '#cbd5e1 !important',
                    borderWidth: '1.5px !important',
                    color: '#334155 !important',
                    borderRadius: '10px',
                    py: 1.1,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.92rem',
                    backgroundColor: '#ffffff !important',
                    boxShadow: 'none !important',
                    transition: 'none !important',
                    '&:hover, &:focus, &:active, &.MuiButton-root:hover, &.MuiButton-root:focus, &.MuiButton-root:active': {
                      borderColor: '#94a3b8 !important',
                      backgroundColor: '#f8fafc !important',
                      color: '#0f172a !important',
                      boxShadow: 'none !important'
                    }
                  }}
                >
                  Detail Invoice
                </Button>
              </Box>
            )}

            {/* 1. Site Progress Documentation Photos (Visual Proof First - No Icon) */}
            {extensionSubmittedData.photos && extensionSubmittedData.photos.length > 0 && (
              <Box sx={{ mt: 2.2 }}>
                <Box sx={{ height: '1px', backgroundColor: '#f1f5f9', mb: 2 }} />

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.2 }}>
                  <Typography sx={{ fontSize: '0.84rem', fontWeight: 700, color: '#1e293b' }}>
                    Progress Photos
                  </Typography>

                  <Box
                    sx={{
                      px: 1.1,
                      py: 0.3,
                      borderRadius: '100px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      backgroundColor: '#f1f5f9',
                      color: '#475569',
                      border: '1px solid #e2e8f0',
                      lineHeight: 1.2,
                      display: 'inline-block'
                    }}
                  >
                    {extensionSubmittedData.photos.length} Photo{extensionSubmittedData.photos.length > 1 ? 's' : ''}
                  </Box>
                </Box>

                {/* Horizontal Scrollable Thumbnail Row */}
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1.2,
                    overflowX: 'auto',
                    py: 0.5,
                    px: 0.2,
                    '&::-webkit-scrollbar': { display: 'none' },
                    scrollbarWidth: 'none'
                  }}
                >
                  {extensionSubmittedData.photos.map((photoUrl, idx) => (
                    <Box
                      key={idx}
                      onClick={() => setPreviewPhoto(photoUrl)}
                      sx={{
                        width: 82,
                        height: 82,
                        flexShrink: 0,
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: '1.5px solid #cbd5e1',
                        cursor: 'pointer',
                        position: 'relative',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          transform: 'scale(1.04)',
                          borderColor: '#27b29b',
                          boxShadow: '0 4px 12px rgba(39, 178, 155, 0.2)'
                        },
                        '&:active': {
                          transform: 'scale(0.97)'
                        }
                      }}
                    >
                      <Box
                        component="img"
                        src={photoUrl}
                        alt={`Progress Photo ${idx + 1}`}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block'
                        }}
                      />
                      {/* Zoom Eye Badge */}
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 5,
                          right: 5,
                          backgroundColor: 'rgba(15, 23, 42, 0.65)',
                          backdropFilter: 'blur(2px)',
                          borderRadius: '6px',
                          p: '3px 6px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Eye size={13} color="#ffffff" weight="bold" />
                      </Box>
                    </Box>
                  ))}
                </Box>
                <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8', mt: 0.8, fontStyle: 'italic' }}>
                  *Tap foto untuk memperbesar tampilan
                </Typography>
              </Box>
            )}

            {/* 2. Notes & Technical Remarks (Elaboration / Narrative below photos - No Icon) */}
            {(extensionSubmittedData.notes || extensionSubmittedData.reason) && (
              <Box sx={{ mt: 2.2 }}>
                <Box sx={{ height: '1px', backgroundColor: '#f1f5f9', mb: 2 }} />
                
                <Typography sx={{ fontSize: '0.84rem', fontWeight: 700, color: '#1e293b', mb: 1 }}>
                  Notes & Remarks
                </Typography>

                <Box
                  sx={{
                    backgroundColor: '#f8fafc',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '12px',
                    p: 1.6
                  }}
                >
                  <Typography sx={{ fontSize: '0.84rem', color: '#334155', lineHeight: 1.55, whiteSpace: 'pre-line' }}>
                    {extensionSubmittedData.notes || extensionSubmittedData.reason}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        )}

        {/* Card 3: Early Inspection (Accordion) */}
        <Box sx={{ backgroundColor: '#ffffff', borderRadius: '12px', p: 2, border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <Box 
            onClick={() => setEarlyInspectionOpen(prev => !prev)}
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          >
            <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#1e293b' }}>
              Early Inspection
            </Typography>
            <IconButton size="small" sx={{ p: 0.5, color: '#27b29b' }}>
              {earlyInspectionOpen ? <CaretUp size={18} weight="bold" /> : <CaretDown size={18} weight="bold" />}
            </IconButton>
          </Box>

          <Collapse in={earlyInspectionOpen}>
            {/* Header Divider */}
            <Box sx={{ mt: 1.5, mx: -2, borderTop: '1px solid #e2e8f0' }} />

            <Box sx={{ pt: 2 }}>
              {/* Header Info: Icon + Inspection Code + Sub-label */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: '8px',
                    backgroundColor: '#27b29b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    flexShrink: 0
                  }}
                >
                  <ListChecks size={22} weight="bold" color="#ffffff" />
                </Box>

                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.94rem', color: '#1e293b', lineHeight: 1.2 }}>
                    PRO/INS/022026/A1202/0004
                  </Typography>
                  <Typography sx={{ fontSize: '0.8rem', color: '#94a3b8', mt: 0.3 }}>
                    Fitout Inspection
                  </Typography>
                </Box>
              </Box>

              {/* Key-Value Details */}
              <Box sx={{ mt: 1.8, display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                {/* PIC */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                    PIC
                  </Typography>
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e293b' }}>
                    Engineering
                  </Typography>
                </Box>

                {/* Scheduled Date */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                    Scheduled Date
                  </Typography>
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e293b' }}>
                    12/01/2026, 16:20 PM
                  </Typography>
                </Box>

                {/* Inspection Date */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                    Inspection Date
                  </Typography>
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e293b' }}>
                    12/01/2026, 17:20 PM
                  </Typography>
                </Box>

                {/* Handle by */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                    Handle by
                  </Typography>
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e293b' }}>
                    Asep Sudrajat
                  </Typography>
                </Box>

                {/* Inspection Result */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                    Inspection Result
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: '#f0fdf4',
                      color: '#16a34a',
                      borderRadius: '100px',
                      px: 1.5,
                      py: 0.35,
                      fontWeight: 600,
                      fontSize: '0.78rem'
                    }}
                  >
                    Good Condition
                  </Box>
                </Box>
              </Box>

              {/* View Detail Button */}
              <Button
                fullWidth
                variant="outlined"
                disableElevation
                disableRipple
                disableFocusRipple
                disableTouchRipple
                onClick={() => setEarlyInspectionDetailOpen(true)}
                sx={{
                  mt: 2,
                  borderColor: '#cbd5e1 !important',
                  borderWidth: '1.5px !important',
                  color: '#1e293b !important',
                  backgroundColor: '#ffffff !important',
                  borderRadius: '8px',
                  py: 0.9,
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  textTransform: 'none',
                  boxShadow: 'none !important',
                  transition: 'none !important',
                  '&:hover, &:focus, &:active, &.MuiButton-root:hover, &.MuiButton-root:focus, &.MuiButton-root:active': {
                    borderColor: '#94a3b8 !important',
                    backgroundColor: '#f8fafc !important',
                    color: '#0f172a !important',
                    boxShadow: 'none !important'
                  }
                }}
              >
                View Detail
              </Button>
            </Box>
          </Collapse>
        </Box>

        {/* Card 4: Daily Inspection (Accordion - Expanded) */}
        <Box sx={{ backgroundColor: '#ffffff', borderRadius: '12px', p: 2, border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <Box 
            onClick={() => setDailyInspectionOpen(prev => !prev)}
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          >
            <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#1e293b' }}>
              Daily Inspection
            </Typography>
            <IconButton size="small" sx={{ p: 0.5, color: '#27b29b' }}>
              {dailyInspectionOpen ? <CaretUp size={18} weight="bold" /> : <CaretDown size={18} weight="bold" />}
            </IconButton>
          </Box>

          <Collapse in={dailyInspectionOpen}>
            {/* Header Divider */}
            <Box sx={{ mt: 1.5, mx: -2, borderTop: '1px solid #e2e8f0' }} />

            <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column' }}>
              {(() => {
                // Default daily inspections list matching screenshot + dynamic engineering inspections
                const baseInspections = [
                  {
                    id: 'ins-0004',
                    code: 'PRO/INS/022026/A1202/0004',
                    title: 'Fitout Inspection',
                    pic: 'Security',
                    scheduledDate: '12/01/2026, 16:20 PM',
                    inspectionDate: '12/01/2026, 16:18 PM',
                    handleBy: 'Asep Sudrajat',
                    result: 'Good Condition'
                  },
                  {
                    id: 'ins-0005',
                    code: 'PRO/INS/022026/A1202/0005',
                    title: 'Fitout Inspection',
                    pic: 'Security',
                    scheduledDate: '12/01/2026, 17:20 PM',
                    inspectionDate: '12/01/2026, 17:19 PM',
                    handleBy: 'Asep Sudrajat',
                    result: 'Good Condition'
                  }
                ];

                // Append extra daily inspection if extension was submitted
                const extraInspections = extensionSubmittedData ? [
                  {
                    id: 'ins-ext-6',
                    code: 'PRO/INS/022026/A1202/0006',
                    title: 'Fitout Inspection',
                    pic: 'Security',
                    scheduledDate: '13/01/2026, 14:00 PM',
                    inspectionDate: '13/01/2026, 14:05 PM',
                    handleBy: 'Asep Sudrajat',
                    result: 'Good Condition'
                  }
                ] : [];

                const allInspections = [...baseInspections, ...extraInspections];

                return allInspections.map((ins, idx) => (
                  <Box key={ins.id || idx}>
                    {idx > 0 && (
                      <Box sx={{ my: 2.2, mx: -2, borderTop: '1px solid #e2e8f0' }} />
                    )}

                    {/* Top: Icon + Code + Title */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box
                        sx={{
                          width: 38,
                          height: 38,
                          borderRadius: '8px',
                          backgroundColor: '#27b29b',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#ffffff',
                          flexShrink: 0
                        }}
                      >
                        <ListChecks size={22} weight="bold" color="#ffffff" />
                      </Box>

                      <Box>
                        <Typography sx={{ fontWeight: 700, fontSize: '0.94rem', color: '#1e293b', lineHeight: 1.2 }}>
                          {ins.code}
                        </Typography>
                        <Typography sx={{ fontSize: '0.8rem', color: '#94a3b8', mt: 0.3 }}>
                          {ins.title}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Key-Value Details */}
                    <Box sx={{ mt: 1.8, display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                      {/* PIC */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                          PIC
                        </Typography>
                        <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e293b' }}>
                          {ins.pic}
                        </Typography>
                      </Box>

                      {/* Scheduled Date */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                          Scheduled Date
                        </Typography>
                        <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e293b' }}>
                          {ins.scheduledDate}
                        </Typography>
                      </Box>

                      {/* Inspection Date */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                          Inspection Date
                        </Typography>
                        <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e293b' }}>
                          {ins.inspectionDate}
                        </Typography>
                      </Box>

                      {/* Handle by */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                          Handle by
                        </Typography>
                        <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e293b' }}>
                          {ins.handleBy}
                        </Typography>
                      </Box>

                      {/* Inspection Result */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                          Inspection Result
                        </Typography>
                        <Box
                          sx={{
                            backgroundColor: '#f0fdf4',
                            color: '#16a34a',
                            borderRadius: '100px',
                            px: 1.5,
                            py: 0.35,
                            fontWeight: 600,
                            fontSize: '0.78rem'
                          }}
                        >
                          {ins.result}
                        </Box>
                      </Box>
                    </Box>

                    {/* View Detail Button */}
                    <Button
                      fullWidth
                      variant="outlined"
                      disableElevation
                      disableRipple
                      disableFocusRipple
                      disableTouchRipple
                      onClick={() => setSelectedDailyInspection(ins)}
                      sx={{
                        mt: 2,
                        borderColor: '#cbd5e1 !important',
                        borderWidth: '1.5px !important',
                        color: '#1e293b !important',
                        backgroundColor: '#ffffff !important',
                        borderRadius: '8px',
                        py: 0.9,
                        fontWeight: 600,
                        fontSize: '0.88rem',
                        textTransform: 'none',
                        boxShadow: 'none !important',
                        transition: 'none !important',
                        '&:hover, &:focus, &:active, &.MuiButton-root:hover, &.MuiButton-root:focus, &.MuiButton-root:active': {
                          borderColor: '#94a3b8 !important',
                          backgroundColor: '#f8fafc !important',
                          color: '#0f172a !important',
                          boxShadow: 'none !important'
                        }
                      }}
                    >
                      View Detail
                    </Button>
                  </Box>
                ));
              })()}
            </Box>
          </Collapse>
        </Box>

        {/* Card 5: Work Location */}
        <Box sx={{ backgroundColor: '#ffffff', borderRadius: '12px', p: 2, border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#1e293b' }}>
            Work Location
          </Typography>

          {/* Header Divider */}
          <Box sx={{ mt: 1.5, mb: 2, mx: -2, borderTop: '1px solid #e2e8f0' }} />

          {/* Tower */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '6px',
                  backgroundColor: 'rgba(39, 178, 155, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#27b29b'
                }}
              >
                <Buildings size={18} color="#27b29b" weight="fill" />
              </Box>
              <Typography sx={{ fontSize: '0.84rem', color: '#64748b' }}>
                Tower
              </Typography>
            </Box>
            <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b' }}>
              {data.location?.tower || 'Tower A'}
            </Typography>
          </Box>

          <Box sx={{ borderTop: '1px solid #f1f5f9', my: 1.2 }} />

          {/* Floor */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '6px',
                  backgroundColor: 'rgba(39, 178, 155, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#27b29b'
                }}
              >
                <SquareHalf size={18} color="#27b29b" weight="fill" />
              </Box>
              <Typography sx={{ fontSize: '0.84rem', color: '#64748b' }}>
                Floor
              </Typography>
            </Box>
            <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b' }}>
              {data.location?.floor || 'Lantai 1'}
            </Typography>
          </Box>

          <Box sx={{ borderTop: '1px solid #f1f5f9', my: 1.2 }} />

          {/* Unit */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '6px',
                  backgroundColor: 'rgba(39, 178, 155, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#27b29b'
                }}
              >
                <House size={18} color="#27b29b" weight="fill" />
              </Box>
              <Typography sx={{ fontSize: '0.84rem', color: '#64748b' }}>
                Unit
              </Typography>
            </Box>
            <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b' }}>
              {data.location?.unit || 'A1202'}
            </Typography>
          </Box>
        </Box>

        {/* Card 6: Contractor & Resources (Accordion) */}
        <Box sx={{ backgroundColor: '#ffffff', borderRadius: '12px', p: 2, border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <Box 
            onClick={() => setContractorOpen(prev => !prev)}
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          >
            <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#1e293b' }}>
              Contractor & Resources
            </Typography>
            <IconButton size="small" sx={{ p: 0.5, color: '#27b29b' }}>
              {contractorOpen ? <CaretUp size={18} weight="bold" /> : <CaretDown size={18} weight="bold" />}
            </IconButton>
          </Box>

          <Collapse in={contractorOpen}>
            {/* Header Divider */}
            <Box sx={{ mt: 1.5, mx: -2, borderTop: '1px solid #e2e8f0' }} />

            <Box sx={{ pt: 2 }}>
              {/* SECTION 1: Contractor Information */}
              <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#1e293b', mb: 2 }}>
                Contractor Information
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* Company Name */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Buildings size={22} color="#27b29b" weight="fill" style={{ flexShrink: 0 }} />
                  <Box>
                    <Typography sx={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.2 }}>
                      Company Name
                    </Typography>
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b', mt: 0.3 }}>
                      PT Kolang Kaling
                    </Typography>
                  </Box>
                </Box>

                {/* PIC */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <UserCircle size={22} color="#27b29b" weight="fill" style={{ flexShrink: 0 }} />
                  <Box>
                    <Typography sx={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.2 }}>
                      PIC
                    </Typography>
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b', mt: 0.3 }}>
                      Raga Murtadha Muthahari
                    </Typography>
                  </Box>
                </Box>

                {/* Phone Number */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Phone size={22} color="#27b29b" weight="fill" style={{ flexShrink: 0 }} />
                  <Box>
                    <Typography sx={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.2 }}>
                      Phone Number
                    </Typography>
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b', mt: 0.3 }}>
                      089637568674
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Section Divider 1 */}
              <Box sx={{ my: 2.5, mx: -2, borderTop: '1px solid #e2e8f0' }} />

              {/* SECTION 2: Manpower Details */}
              <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#1e293b', mb: 1 }}>
                Manpower Details
              </Typography>

              <Typography sx={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                Number of Workers
              </Typography>
              <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b', mt: 0.2 }}>
                2 Worker
              </Typography>

              {/* Dashed Separator */}
              <Box sx={{ my: 1.8, borderBottom: '1px dashed #cbd5e1' }} />

              {/* Workers List */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.8 }}>
                {/* Worker 1 */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <IdentificationCard size={26} color="#27b29b" weight="fill" style={{ flexShrink: 0 }} />
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: '0.88rem', color: '#1e293b', lineHeight: 1.2 }}>
                        Jajang Susanto
                      </Typography>
                      <Typography sx={{ fontSize: '0.78rem', color: '#94a3b8', mt: 0.3 }}>
                        Manpower
                      </Typography>
                    </Box>
                  </Box>

                  <Button
                    size="small"
                    startIcon={<Eye size={16} weight="fill" />}
                    onClick={() => setSelectedWorker({ name: 'Jajang Susanto', role: 'Manpower', idCard: '3201198827390001', phone: '081298374829' })}
                    sx={{
                      backgroundColor: '#eff6ff !important',
                      color: '#3b82f6 !important',
                      borderRadius: '8px',
                      px: 1.6,
                      py: 0.4,
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      textTransform: 'none',
                      boxShadow: 'none !important',
                      transition: 'none !important',
                      '&:hover, &:focus, &:active, &.MuiButton-root:hover, &.MuiButton-root:focus, &.MuiButton-root:active': {
                        backgroundColor: '#dbeafe !important',
                        color: '#2563eb !important',
                        boxShadow: 'none !important'
                      }
                    }}
                  >
                    View
                  </Button>
                </Box>

                {/* Worker 2 */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <IdentificationCard size={26} color="#27b29b" weight="fill" style={{ flexShrink: 0 }} />
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: '0.88rem', color: '#1e293b', lineHeight: 1.2 }}>
                        Zaki Ramadhan
                      </Typography>
                      <Typography sx={{ fontSize: '0.78rem', color: '#94a3b8', mt: 0.3 }}>
                        Manpower
                      </Typography>
                    </Box>
                  </Box>

                  <Button
                    size="small"
                    startIcon={<Eye size={16} weight="fill" />}
                    onClick={() => setSelectedWorker({ name: 'Zaki Ramadhan', role: 'Manpower', idCard: '3201199402180004', phone: '085719384729' })}
                    sx={{
                      backgroundColor: '#eff6ff !important',
                      color: '#3b82f6 !important',
                      borderRadius: '8px',
                      px: 1.6,
                      py: 0.4,
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      textTransform: 'none',
                      boxShadow: 'none !important',
                      transition: 'none !important',
                      '&:hover, &:focus, &:active, &.MuiButton-root:hover, &.MuiButton-root:focus, &.MuiButton-root:active': {
                        backgroundColor: '#dbeafe !important',
                        color: '#2563eb !important',
                        boxShadow: 'none !important'
                      }
                    }}
                  >
                    View
                  </Button>
                </Box>
              </Box>

              {/* Section Divider 2 */}
              <Box sx={{ my: 2.5, mx: -2, borderTop: '1px solid #e2e8f0' }} />

              {/* SECTION 3: Material & Equipment */}
              <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#1e293b', mb: 1.8 }}>
                Material & Equipment
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <FilePdf size={36} weight="fill" color="#ef4444" style={{ flexShrink: 0 }} />
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.88rem', color: '#1e293b', lineHeight: 1.2 }}>
                      BoQ Material.pdf
                    </Typography>
                    <Typography sx={{ fontSize: '0.78rem', color: '#94a3b8', mt: 0.3 }}>
                      200kb
                    </Typography>
                  </Box>
                </Box>

                <Button
                  size="small"
                  startIcon={<Eye size={16} weight="fill" />}
                  onClick={() => setPreviewDoc({ name: 'BoQ Material.pdf', size: '200kb' })}
                  sx={{
                    backgroundColor: '#eff6ff !important',
                    color: '#3b82f6 !important',
                    borderRadius: '8px',
                    px: 1.6,
                    py: 0.4,
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    textTransform: 'none',
                    boxShadow: 'none !important',
                    transition: 'none !important',
                    '&:hover, &:focus, &:active, &.MuiButton-root:hover, &.MuiButton-root:focus, &.MuiButton-root:active': {
                      backgroundColor: '#dbeafe !important',
                      color: '#2563eb !important',
                      boxShadow: 'none !important'
                    }
                  }}
                >
                  View
                </Button>
              </Box>
            </Box>
          </Collapse>
        </Box>

        {/* Card 7: Payments & Documents (Accordion) */}
        <Box sx={{ backgroundColor: '#ffffff', borderRadius: '12px', p: 2, border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <Box 
            onClick={() => setPaymentsOpen(prev => !prev)}
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          >
            <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#1e293b' }}>
              Payments & Documents
            </Typography>
            <IconButton size="small" sx={{ p: 0.5, color: '#27b29b' }}>
              {paymentsOpen ? <CaretUp size={18} weight="bold" /> : <CaretDown size={18} weight="bold" />}
            </IconButton>
          </Box>

          <Collapse in={paymentsOpen}>
            {/* 1. Full-Width Header Divider */}
            <Box sx={{ mt: 1.5, mx: -2, borderTop: '1px solid #e2e8f0' }} />

            <Box sx={{ pt: 2 }}>
              {/* 1. Payment Information Section */}
              <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#1e293b', mb: 1.8 }}>
                Payment Information
              </Typography>

              {/* Bill Details Row */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.8 }}>
                {/* Left: Bill Icon + Title + Timestamp */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Invoice size={32} weight="bold" color="#1e293b" />
                  </Box>

                  <Box>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.92rem', color: '#1e293b', lineHeight: 1.2 }}>
                      FitOut Deposit Bill
                    </Typography>
                    <Typography sx={{ fontSize: '0.78rem', color: '#94a3b8', mt: 0.4 }}>
                      12/02/2026 16:07
                    </Typography>
                  </Box>
                </Box>

                {/* Right: Price + Unpaid Badge */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.92rem', color: '#1e293b' }}>
                    Rp 2.000.000,00
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: '#f97316',
                      color: '#ffffff',
                      borderRadius: '100px',
                      px: 1.5,
                      py: 0.25,
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      lineHeight: 1.2
                    }}
                  >
                    Unpaid
                  </Box>
                </Box>
              </Box>

              {/* Detail Invoice Button */}
              <Button
                fullWidth
                variant="outlined"
                disableElevation
                disableRipple
                disableFocusRipple
                disableTouchRipple
                onClick={() => setDepositInvoiceOpen(true)}
                sx={{
                  borderColor: '#cbd5e1 !important',
                  borderWidth: '1.5px !important',
                  color: '#334155 !important',
                  backgroundColor: '#ffffff !important',
                  borderRadius: '8px',
                  py: 0.9,
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  textTransform: 'none',
                  boxShadow: 'none !important',
                  transition: 'none !important',
                  '&:hover, &:focus, &:active, &.MuiButton-root:hover, &.MuiButton-root:focus, &.MuiButton-root:active': {
                    borderColor: '#94a3b8 !important',
                    backgroundColor: '#f8fafc !important',
                    color: '#0f172a !important',
                    boxShadow: 'none !important'
                  }
                }}
              >
                Detail Invoice
              </Button>
            </Box>

            {/* 2. Full-Width Section Divider */}
            <Box sx={{ my: 2.2, mx: -2, borderTop: '1px solid #e2e8f0' }} />

            <Box>
              {/* 2. Technical & Supporting Documents Section */}
              <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#1e293b', mb: 1.8 }}>
                Technical & Supporting Documents
              </Typography>

              {/* Document List */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.8 }}>
                {/* Doc 1: MEP Drawings.pdf */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <FilePdf size={36} weight="fill" color="#ef4444" style={{ flexShrink: 0 }} />

                    <Box>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.88rem', color: '#1e293b', lineHeight: 1.2 }}>
                        MEP Drawings.pdf
                      </Typography>
                      <Typography sx={{ fontSize: '0.74rem', color: '#94a3b8', mt: 0.3 }}>
                        200kb
                      </Typography>
                    </Box>
                  </Box>

                  <Button
                    size="small"
                    startIcon={<Eye size={16} weight="fill" />}
                    onClick={() => setPreviewDoc({ name: 'MEP Drawings.pdf', size: '200kb' })}
                    sx={{
                      backgroundColor: '#eff6ff !important',
                      color: '#3b82f6 !important',
                      borderRadius: '8px',
                      px: 1.6,
                      py: 0.4,
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      textTransform: 'none',
                      boxShadow: 'none !important',
                      transition: 'none !important',
                      '&:hover, &:focus, &:active, &.MuiButton-root:hover, &.MuiButton-root:focus, &.MuiButton-root:active': {
                        backgroundColor: '#dbeafe !important',
                        color: '#2563eb !important',
                        boxShadow: 'none !important'
                      }
                    }}
                  >
                    View
                  </Button>
                </Box>

                {/* Doc 2: Proposed Layouts.pdf */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <FilePdf size={36} weight="fill" color="#ef4444" style={{ flexShrink: 0 }} />

                    <Box>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.88rem', color: '#1e293b', lineHeight: 1.2 }}>
                        Proposed Layouts.pdf
                      </Typography>
                      <Typography sx={{ fontSize: '0.74rem', color: '#94a3b8', mt: 0.3 }}>
                        200kb
                      </Typography>
                    </Box>
                  </Box>

                  <Button
                    size="small"
                    startIcon={<Eye size={16} weight="fill" />}
                    onClick={() => setPreviewDoc({ name: 'Proposed Layouts.pdf', size: '200kb' })}
                    sx={{
                      backgroundColor: '#eff6ff !important',
                      color: '#3b82f6 !important',
                      borderRadius: '8px',
                      px: 1.6,
                      py: 0.4,
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      textTransform: 'none',
                      boxShadow: 'none !important',
                      transition: 'none !important',
                      '&:hover, &:focus, &:active, &.MuiButton-root:hover, &.MuiButton-root:focus, &.MuiButton-root:active': {
                        backgroundColor: '#dbeafe !important',
                        color: '#2563eb !important',
                        boxShadow: 'none !important'
                      }
                    }}
                  >
                    View
                  </Button>
                </Box>

                {/* Doc 3: Contractor Insurance.pdf */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <FilePdf size={36} weight="fill" color="#ef4444" style={{ flexShrink: 0 }} />

                    <Box>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.88rem', color: '#1e293b', lineHeight: 1.2 }}>
                        Contractor Insurance.pdf
                      </Typography>
                      <Typography sx={{ fontSize: '0.74rem', color: '#94a3b8', mt: 0.3 }}>
                        200kb
                      </Typography>
                    </Box>
                  </Box>

                  <Button
                    size="small"
                    startIcon={<Eye size={16} weight="fill" />}
                    onClick={() => setPreviewDoc({ name: 'Contractor Insurance.pdf', size: '200kb' })}
                    sx={{
                      backgroundColor: '#eff6ff !important',
                      color: '#3b82f6 !important',
                      borderRadius: '8px',
                      px: 1.6,
                      py: 0.4,
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      textTransform: 'none',
                      boxShadow: 'none !important',
                      transition: 'none !important',
                      '&:hover, &:focus, &:active, &.MuiButton-root:hover, &.MuiButton-root:focus, &.MuiButton-root:active': {
                        backgroundColor: '#dbeafe !important',
                        color: '#2563eb !important',
                        boxShadow: 'none !important'
                      }
                    }}
                  >
                    View
                  </Button>
                </Box>
              </Box>
            </Box>
          </Collapse>
        </Box>

        {/* Card 8: Tracking Progress (Accordion - Expanded) */}
        <Box sx={{ backgroundColor: '#ffffff', borderRadius: '12px', p: 2, border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <Box 
            onClick={() => setTrackingOpen(prev => !prev)}
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          >
            <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#1e293b' }}>
              Tracking Progress
            </Typography>
            <IconButton size="small" sx={{ p: 0.5, color: '#27b29b' }}>
              {trackingOpen ? <CaretUp size={18} weight="bold" /> : <CaretDown size={18} weight="bold" />}
            </IconButton>
          </Box>

          <Collapse in={trackingOpen}>
            {/* Header Divider */}
            <Box sx={{ mt: 1.5, mx: -2, borderTop: '1px solid #e2e8f0' }} />

            <Box sx={{ position: 'relative', pt: 2, pb: 0.5 }}>
              {data.trackingProgress?.map((step, idx) => {
                const isLast = idx === data.trackingProgress.length - 1;
                return (
                  <Box key={step.id || idx} sx={{ display: 'flex', gap: 1.5, position: 'relative', pb: isLast ? 0 : 3 }}>
                    
                    {/* Connecting Line Spanning from Current Circle to Next Circle */}
                    {!isLast && (
                      <Box 
                        sx={{ 
                          position: 'absolute', 
                          top: 22, 
                          bottom: 0, 
                          left: '10px', 
                          width: 0, 
                          borderLeft: '2px dotted #27b29b',
                          zIndex: 1 
                        }} 
                      />
                    )}

                    {/* Left Timeline Bubble */}
                    <Box sx={{ position: 'relative', width: 22, flexShrink: 0, zIndex: 2 }}>
                      {step.status === 'completed' ? (
                        <Box 
                          sx={{ 
                            width: 22, 
                            height: 22, 
                            borderRadius: '50%', 
                            backgroundColor: '#27b29b', 
                            color: '#ffffff', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            boxShadow: '0 0 0 2px #ffffff'
                          }}
                        >
                          <Check size={13} weight="bold" />
                        </Box>
                      ) : (
                        <Box 
                          sx={{ 
                            width: 22, 
                            height: 22, 
                            borderRadius: '50%', 
                            border: '2px solid #27b29b', 
                            backgroundColor: '#ffffff', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            boxShadow: '0 0 0 2px #ffffff'
                          }}
                        >
                          <Box 
                            sx={{ 
                              width: 8, 
                              height: 8, 
                              borderRadius: '50%', 
                              backgroundColor: '#27b29b' 
                            }} 
                          />
                        </Box>
                      )}
                    </Box>

                    {/* Right Timeline Content */}
                    <Box sx={{ flexGrow: 1, mt: -0.1 }}>
                      <Typography sx={{ fontWeight: 700, fontSize: '0.84rem', color: '#1e293b', lineHeight: 1.3 }}>
                        {step.title}
                      </Typography>
                      <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8', mt: 0.2 }}>
                        {step.role}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.3 }}>
                        <Clock size={12} color="#94a3b8" />
                        <Typography sx={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                          {step.time}
                        </Typography>
                      </Box>

                      {/* Note Callout */}
                      {step.note && (
                        <Box 
                          sx={{ 
                            mt: 1.2, 
                            backgroundColor: '#eff6ff', 
                            borderLeft: '3px solid #3b82f6', 
                            p: 1.2, 
                            borderRadius: '4px' 
                          }}
                        >
                          <Typography sx={{ fontSize: '0.74rem', color: '#1d4ed8', fontWeight: 500 }}>
                            {step.note}
                          </Typography>
                        </Box>
                      )}

                      {/* Approvals nested card */}
                      {step.approvals && (
                        <Box 
                          sx={{ 
                            mt: 1.2, 
                            backgroundColor: '#f8fafc', 
                            border: '1px solid #e2e8f0', 
                            borderRadius: '8px', 
                            p: 1.2, 
                            display: 'flex', 
                            flexDirection: 'column', 
                            gap: 1 
                          }}
                        >
                          {step.approvals.map((appr, appIdx) => (
                            <Box 
                              key={appIdx}
                              sx={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center',
                                py: 0.3
                              }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CheckSquareOffset size={18} color="#27b29b" weight="fill" />
                                <Box>
                                  <Typography sx={{ fontWeight: 600, fontSize: '0.76rem', color: '#1e293b', lineHeight: 1.2 }}>
                                    {appr.name}
                                  </Typography>
                                  <Typography sx={{ fontSize: '0.68rem', color: '#94a3b8' }}>
                                    {appr.dept}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box 
                                sx={{ 
                                  backgroundColor: '#27b29b', 
                                  color: '#ffffff', 
                                  fontSize: '0.68rem', 
                                  fontWeight: 600, 
                                  px: 1.4, 
                                  py: 0.3, 
                                  borderRadius: '100px' 
                                }}
                              >
                                {appr.status}
                              </Box>
                            </Box>
                          ))}
                        </Box>
                      )}

                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Collapse>
        </Box>

      </Box>

      {/* Fixed Bottom Action: 2 Buttons (Extension & Work Complete) - Hidden after extension submission */}
      {!extensionSubmittedData && (
        <Box 
          sx={{ 
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            right: 0, 
            p: 2, 
            pt: 1.5, 
            pb: { xs: 4, sm: 3 }, 
            backgroundColor: '#ffffff', 
            borderTop: '1px solid #e2e8f0', 
            zIndex: 20,
            display: 'flex',
            gap: 1.5
          }}
        >
          {/* Extension Button (Locked Static Style, Zero Hover) */}
          <Button
            fullWidth
            variant="outlined"
            disableElevation
            disableRipple
            disableFocusRipple
            disableTouchRipple
            onClick={() => setExtensionModalOpen(true)}
            sx={{
              borderColor: '#f97316 !important',
              color: '#f97316 !important',
              backgroundColor: '#ffffff !important',
              borderRadius: '10px',
              py: 1.3,
              fontWeight: 700,
              fontSize: '0.9rem',
              textTransform: 'none',
              flex: 1,
              borderWidth: '1.5px !important',
              boxShadow: 'none !important',
              transition: 'none !important',
              '&:hover, &:focus, &:active, &.MuiButton-root:hover, &.MuiButton-root:focus, &.MuiButton-root:active': {
                borderColor: '#f97316 !important',
                backgroundColor: '#ffffff !important',
                color: '#f97316 !important',
                borderWidth: '1.5px !important',
                boxShadow: 'none !important'
              }
            }}
          >
            {activePov === 'engineering' ? 'Request Extension' : 'Extension'}
          </Button>

          {/* Work Complete Button (Locked Static Style, Zero Hover) */}
          <Button
            fullWidth
            variant="contained"
            disableElevation
            disableRipple
            disableFocusRipple
            disableTouchRipple
            onClick={() => setCompleteSuccessOpen(true)}
            sx={{
              backgroundColor: '#22c55e !important',
              color: '#ffffff !important',
              borderRadius: '10px',
              py: 1.3,
              fontWeight: 700,
              fontSize: '0.9rem',
              textTransform: 'none',
              flex: 1,
              boxShadow: 'none !important',
              transition: 'none !important',
              '&:hover, &:focus, &:active, &.MuiButton-root:hover, &.MuiButton-root:focus, &.MuiButton-root:active': {
                backgroundColor: '#22c55e !important',
                color: '#ffffff !important',
                boxShadow: 'none !important'
              }
            }}
          >
            Work Complete
          </Button>
        </Box>
      )}

      {/* In-Frame Backdrop Overlay */}
      <Box
        onClick={() => setExtensionModalOpen(false)}
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.5)',
          backdropFilter: 'blur(2px)',
          zIndex: 40,
          opacity: extensionModalOpen ? 1 : 0,
          pointerEvents: extensionModalOpen ? 'auto' : 'none',
          transition: 'opacity 0.25s ease'
        }}
      />

      {/* In-Frame Mobile Bottom Sheet */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          maxHeight: '85%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#ffffff',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          boxShadow: '0 -10px 30px rgba(0,0,0,0.15)',
          zIndex: 50,
          overflow: 'hidden',
          transform: extensionModalOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: extensionModalOpen ? 'auto' : 'none'
        }}
      >
        {/* Fixed Header Bar & Handle */}
        <Box sx={{ pt: 1.5, px: 2.5, pb: 1.5, borderBottom: '1px solid #f1f5f9', backgroundColor: '#ffffff', flexShrink: 0 }}>
          {/* Drag / Handle Indicator */}
          <Box sx={{ width: 40, height: 4, borderRadius: '4px', backgroundColor: '#cbd5e1', mx: 'auto', mb: 1.5 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box sx={{ pr: 1 }}>
              <Typography sx={{ fontWeight: 700, fontSize: '1.15rem', color: '#1e293b', letterSpacing: '-0.3px' }}>
                {activePov === 'tenant_relation' ? 'Fitout Schedule Extension' : 'Request Extension (Engineering)'}
              </Typography>
              <Typography sx={{ fontSize: '0.78rem', color: '#94a3b8', mt: 0.3, lineHeight: 1.4, fontWeight: 400 }}>
                {activePov === 'tenant_relation' 
                  ? 'Extend renovation period and determine fee policy for this permit.' 
                  : 'Submit extension request as requested by tenant, select new schedule, attach progress photos, and provide technical remarks.'}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Scrollable Form Body */}
        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2.5 }}>
          {/* ========================================================================================= */}
          {/* CASE 1: TENANT RELATION (TR) POV BOTTOM SHEET FORM */}
          {/* ========================================================================================= */}
          {activePov === 'tenant_relation' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {/* Card: Current Schedule */}
              <Box 
                sx={{ 
                  backgroundColor: '#f8fafc', 
                  borderRadius: '14px', 
                  border: '1px solid #e2e8f0', 
                  p: 2
                }}
              >
                <Typography sx={{ fontSize: '0.74rem', fontWeight: 600, color: '#94a3b8', mb: 0.6 }}>
                  Current Schedule
                </Typography>
                <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#334155' }}>
                  04 Aug 2026 — 10 Aug 2026 (6 Days Duration)
                </Typography>
              </Box>

              {/* Section 1: Select New Scheduled End Date */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography sx={{ fontSize: '0.86rem', fontWeight: 600, color: '#334155' }}>
                  1. Select New Scheduled End Date <span style={{ color: '#ef4444' }}>*</span>
                </Typography>
                
                {/* Date Input Field (Clickable to open Date Picker) */}
                <Box 
                  onClick={handleTriggerDatePicker}
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    backgroundColor: '#ffffff', 
                    border: trNewEndDate ? '1.5px solid #27b29b' : '1.5px solid #cbd5e1', 
                    borderRadius: '10px',
                    px: 2,
                    py: 1.3,
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'border-color 0.2s ease',
                    '&:hover': {
                      borderColor: '#27b29b'
                    }
                  }}
                >
                  {/* Hidden Native Date Input */}
                  <input 
                    type="date" 
                    ref={dateInputRef}
                    value={trRawDate}
                    min="2026-08-11"
                    onChange={(e) => handleDateChange(e.target.value)}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      cursor: 'pointer',
                      zIndex: 2
                    }}
                  />

                  <Typography sx={{ fontSize: '0.9rem', color: trNewEndDate ? '#334155' : '#94a3b8', fontWeight: trNewEndDate ? 600 : 400 }}>
                    {trNewEndDate || 'Pilih Tanggal Selesai (DD/MM/YYYY)'}
                  </Typography>
                  <CalendarBlank size={22} color={trNewEndDate ? '#27b29b' : '#94a3b8'} weight="bold" />
                </Box>

                {/* Quick Preset Buttons (Zero Hover, Flat) */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {[
                    { days: 1, label: '+1 Day', date: '11/08/2026', raw: '2026-08-11' },
                    { days: 3, label: '+3 Days', date: '13/08/2026', raw: '2026-08-13' },
                    { days: 7, label: '+7 Days', date: '17/08/2026', raw: '2026-08-17' },
                    { days: 30, label: '+30 Days', date: '09/09/2026', raw: '2026-09-09' }
                  ].map((preset) => {
                    const isSelected = trExtendedDaysCount === preset.days;
                    return (
                      <Button
                        key={preset.days}
                        size="small"
                        variant={isSelected ? 'contained' : 'outlined'}
                        disableElevation
                        disableRipple
                        disableFocusRipple
                        disableTouchRipple
                        onClick={() => handleSelectPreset(preset.days, preset.date, preset.raw)}
                        sx={{
                          flex: 1,
                          textTransform: 'none',
                          fontSize: '0.74rem',
                          fontWeight: 600,
                          py: 0.6,
                          borderRadius: '8px',
                          borderColor: isSelected ? '#27b29b !important' : '#cbd5e1 !important',
                          color: isSelected ? '#ffffff !important' : '#475569 !important',
                          backgroundColor: isSelected ? '#27b29b !important' : 'transparent !important',
                          boxShadow: 'none !important',
                          transition: 'none !important',
                          '&:hover, &:focus, &:active, &.MuiButton-root:hover, &.MuiButton-root:focus, &.MuiButton-root:active': {
                            borderColor: isSelected ? '#27b29b !important' : '#cbd5e1 !important',
                            backgroundColor: isSelected ? '#27b29b !important' : 'transparent !important',
                            color: isSelected ? '#ffffff !important' : '#475569 !important',
                            boxShadow: 'none !important'
                          }
                        }}
                      >
                        {preset.label}
                      </Button>
                    );
                  })}
                </Box>

                {/* Duration Tag Pill Box (Full Width, Dynamic Calculation) */}
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    backgroundColor: '#fff7ed', 
                    border: '1.5px solid #fed7aa', 
                    borderRadius: '10px',
                    px: 2,
                    py: 1.2
                  }}
                >
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#ea580c' }}>
                    +{trExtendedDaysCount} Days Extended
                  </Typography>
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
                    Total Duration: {trTotalDurationCount} Days
                  </Typography>
                </Box>
              </Box>

              {/* Section 2: Extension Fee Policy (Vertical Stack for Clean Mobile View) */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                <Typography sx={{ fontSize: '0.86rem', fontWeight: 600, color: '#334155' }}>
                  2. Extension Fee Policy <span style={{ color: '#ef4444' }}>*</span>
                </Typography>
                
                {/* Option 1: FREE OF CHARGE */}
                <Box 
                  onClick={() => setTrFeePolicy('FREE_OF_CHARGE')}
                  sx={{
                    p: 2,
                    borderRadius: '14px',
                    cursor: 'pointer',
                    backgroundColor: trFeePolicy === 'FREE_OF_CHARGE' ? '#f0fdfa' : '#ffffff',
                    border: trFeePolicy === 'FREE_OF_CHARGE' ? '2px solid #27b29b' : '1.5px solid #e2e8f0',
                    boxShadow: trFeePolicy === 'FREE_OF_CHARGE' ? '0 3px 10px rgba(39, 178, 155,0.12)' : 'none',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1.5
                  }}
                >
                  <Box sx={{ mt: 0.2, flexShrink: 0 }}>
                    {trFeePolicy === 'FREE_OF_CHARGE' ? (
                      <RadioButton size={22} color="#27b29b" weight="fill" />
                    ) : (
                      <Circle size={22} color="#cbd5e1" />
                    )}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: '0.88rem', fontWeight: 600, color: trFeePolicy === 'FREE_OF_CHARGE' ? '#0f766e' : '#334155' }}>
                      FREE OF CHARGE (Tolerance / Grace Period)
                    </Typography>
                    <Typography sx={{ fontSize: '0.78rem', color: '#94a3b8', mt: 0.4, lineHeight: 1.4, fontWeight: 400 }}>
                      Granted tolerance without additional fitout supervision fee.
                    </Typography>
                  </Box>
                </Box>

                {/* Option 2: CHARGEABLE */}
                <Box 
                  onClick={() => setTrFeePolicy('CHARGEABLE')}
                  sx={{
                    p: 2,
                    borderRadius: '14px',
                    cursor: 'pointer',
                    backgroundColor: trFeePolicy === 'CHARGEABLE' ? '#f0fdfa' : '#ffffff',
                    border: trFeePolicy === 'CHARGEABLE' ? '2px solid #27b29b' : '1.5px solid #e2e8f0',
                    boxShadow: trFeePolicy === 'CHARGEABLE' ? '0 3px 10px rgba(39, 178, 155,0.12)' : 'none',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1.5
                  }}
                >
                  <Box sx={{ mt: 0.2, flexShrink: 0 }}>
                    {trFeePolicy === 'CHARGEABLE' ? (
                      <RadioButton size={22} color="#27b29b" weight="fill" />
                    ) : (
                      <Circle size={22} color="#cbd5e1" />
                    )}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: '0.88rem', fontWeight: 600, color: trFeePolicy === 'CHARGEABLE' ? '#0f766e' : '#334155' }}>
                      CHARGEABLE (Additional Bill)
                    </Typography>
                    <Typography sx={{ fontSize: '0.78rem', color: '#94a3b8', mt: 0.4, lineHeight: 1.4, fontWeight: 400 }}>
                      Subject to fitout supervision charge and issuance of a new invoice.
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Conditional Card: Extension Fee Amount (for CHARGEABLE) */}
              {trFeePolicy === 'CHARGEABLE' && (
                <Box 
                  sx={{ 
                    backgroundColor: '#ffffff', 
                    borderRadius: '14px', 
                    border: '1.5px solid #e2e8f0', 
                    p: 2
                  }}
                >
                  <Typography sx={{ fontSize: '0.84rem', fontWeight: 600, color: '#334155', mb: 1 }}>
                    Extension Fee Amount <span style={{ color: '#ef4444' }}>*</span>
                  </Typography>
                  
                  {/* Rp Input Box */}
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      border: '1.5px solid #cbd5e1', 
                      borderRadius: '10px', 
                      overflow: 'hidden',
                      backgroundColor: '#ffffff',
                      transition: 'border-color 0.2s ease',
                      '&:focus-within': {
                        borderColor: '#27b29b'
                      }
                    }}
                  >
                    <Box 
                      sx={{ 
                        px: 1.8, 
                        py: 1.2, 
                        backgroundColor: '#f8fafc', 
                        borderRight: '1.5px solid #cbd5e1', 
                        color: '#334155', 
                        fontWeight: 700, 
                        fontSize: '0.9rem' 
                      }}
                    >
                      Rp
                    </Box>
                    <input 
                      type="text"
                      placeholder="0,00"
                      value={trChargeableAmount}
                      onChange={(e) => handleChargeableAmountChange(e.target.value)}
                      style={{
                        flex: 1,
                        border: 'none',
                        outline: 'none',
                        padding: '10px 14px',
                        fontSize: '0.9rem',
                        color: '#334155',
                        fontWeight: 600,
                        backgroundColor: 'transparent'
                      }}
                    />
                  </Box>

                  {/* Divider Line */}
                  <Box sx={{ height: '1px', backgroundColor: '#f1f5f9', my: 1.5 }} />

                  {/* Bottom Summary Row */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500 }}>
                      Total Invoice Amount to be Issued:
                    </Typography>
                    <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: '#ea580c' }}>
                      {trChargeableAmount ? `Rp ${trChargeableAmount},00` : 'Rp 0,00'}
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* Section 3: Notes (Optional) */}
              <Box>
                <Typography sx={{ fontSize: '0.86rem', fontWeight: 600, color: '#334155', mb: 1 }}>
                  3. Notes <span style={{ color: '#94a3b8', fontWeight: 400 }}>(Optional)</span>
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Enter decision details, supervision guidelines, or approval notes..."
                  value={trNotes}
                  onChange={(e) => setTrNotes(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                      fontSize: '0.84rem',
                      color: '#334155',
                      backgroundColor: '#ffffff',
                      '&:hover fieldset': { borderColor: '#94a3b8' },
                      '&.Mui-focused fieldset': { borderColor: '#27b29b' },
                      '& .MuiInputBase-input::placeholder, & textarea::placeholder': {
                        color: '#94a3b8 !important',
                        opacity: '1 !important'
                      }
                    }
                  }}
                />
              </Box>
            </Box>
          )}

          {/* ========================================================================================= */}
          {/* CASE 2: ENGINEERING POV BOTTOM SHEET FORM (End Date + Photo Upload + Notes) */}
          {/* ========================================================================================= */}
          {activePov === 'engineering' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.2 }}>
              {/* Info: Current Schedule */}
              <Box sx={{ backgroundColor: '#f8fafc', p: 1.5, borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 500 }}>
                  Current Schedule
                </Typography>
                <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b', mt: 0.2 }}>
                  12 Jan 2026 → 12 Feb 2026 (3 Days Duration)
                </Typography>
              </Box>

              {/* 1. Select New Scheduled End Date with Quick Preset Buttons (Identical to TR) */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography sx={{ fontSize: '0.86rem', fontWeight: 600, color: '#334155' }}>
                  1. Select New Scheduled End Date <span style={{ color: '#ef4444' }}>*</span>
                </Typography>
                
                {/* Date Input Field (Clickable to open Date Picker) */}
                <Box 
                  onClick={handleEngTriggerDatePicker}
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    backgroundColor: '#ffffff', 
                    border: engNewEndDate ? '1.5px solid #27b29b' : '1.5px solid #cbd5e1', 
                    borderRadius: '10px',
                    px: 2,
                    py: 1.3,
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'border-color 0.2s ease',
                    '&:hover': {
                      borderColor: '#27b29b'
                    }
                  }}
                >
                  {/* Hidden Native Date Input */}
                  <input 
                    type="date" 
                    ref={engDateInputRef}
                    value={engRawDate}
                    min="2026-02-13"
                    onChange={(e) => handleEngDateChange(e.target.value)}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      cursor: 'pointer',
                      zIndex: 2
                    }}
                  />

                  <Typography sx={{ fontSize: '0.9rem', color: engNewEndDate ? '#334155' : '#94a3b8', fontWeight: engNewEndDate ? 600 : 400 }}>
                    {engNewEndDate || 'Select End Date (DD/MM/YYYY)'}
                  </Typography>
                  <CalendarBlank size={22} color={engNewEndDate ? '#27b29b' : '#94a3b8'} weight="bold" />
                </Box>

                {/* Quick Preset Buttons (Zero Hover, Flat) */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {[
                    { days: 1, label: '+1 Day', date: '13/02/2026', raw: '2026-02-13' },
                    { days: 3, label: '+3 Days', date: '15/02/2026', raw: '2026-02-15' },
                    { days: 7, label: '+7 Days', date: '19/02/2026', raw: '2026-02-19' },
                    { days: 30, label: '+30 Days', date: '14/03/2026', raw: '2026-03-14' }
                  ].map((preset) => {
                    const isSelected = engExtendedDaysCount === preset.days;
                    return (
                      <Button
                        key={preset.days}
                        size="small"
                        variant={isSelected ? 'contained' : 'outlined'}
                        disableElevation
                        disableRipple
                        disableFocusRipple
                        disableTouchRipple
                        onClick={() => handleEngSelectPreset(preset.days, preset.date, preset.raw)}
                        sx={{
                          flex: 1,
                          textTransform: 'none',
                          fontSize: '0.74rem',
                          fontWeight: 600,
                          py: 0.6,
                          borderRadius: '8px',
                          borderColor: isSelected ? '#27b29b !important' : '#cbd5e1 !important',
                          color: isSelected ? '#ffffff !important' : '#475569 !important',
                          backgroundColor: isSelected ? '#27b29b !important' : 'transparent !important',
                          boxShadow: 'none !important',
                          transition: 'none !important',
                          '&:hover, &:focus, &:active, &.MuiButton-root:hover, &.MuiButton-root:focus, &.MuiButton-root:active': {
                            borderColor: isSelected ? '#27b29b !important' : '#cbd5e1 !important',
                            backgroundColor: isSelected ? '#27b29b !important' : 'transparent !important',
                            color: isSelected ? '#ffffff !important' : '#475569 !important',
                            boxShadow: 'none !important'
                          }
                        }}
                      >
                        {preset.label}
                      </Button>
                    );
                  })}
                </Box>
              </Box>

              {/* 2. Upload Progress Photos (Max 5 Photos) */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: '#1e293b' }}>
                    2. Upload Progress Photos <span style={{ color: '#ef4444' }}>*</span>
                  </Typography>
                  <Typography sx={{ fontSize: '0.74rem', color: engPhotos.length > 0 ? '#27b29b' : '#94a3b8', fontWeight: 600 }}>
                    {engPhotos.length}/5 Photos
                  </Typography>
                </Box>

                {/* Permanent Dropzone Box */}
                <Box
                  component="label"
                  sx={{
                    width: '100%',
                    height: 145,
                    borderRadius: '12px',
                    border: engPhotos.length >= 5 ? '1.5px dashed #e2e8f0' : '1.5px dashed #cbd5e1',
                    backgroundColor: '#f8fafc',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: engPhotos.length >= 5 ? 'not-allowed' : 'pointer',
                    opacity: engPhotos.length >= 5 ? 0.7 : 1,
                    transition: 'all 0.2s',
                    p: 2,
                    '&:hover': engPhotos.length < 5 ? {
                      borderColor: '#27b29b',
                      backgroundColor: '#f0fdf4'
                    } : {}
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    disabled={engPhotos.length >= 5}
                    hidden
                    onChange={handleEngPhotoUpload}
                  />
                  <Box
                    sx={{
                      width: 46,
                      height: 46,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(39, 178, 155, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#27b29b',
                      mb: 1.2
                    }}
                  >
                    <Camera size={24} weight="bold" />
                  </Box>
                  <Typography sx={{ fontSize: '0.86rem', fontWeight: 600, color: '#1e293b' }}>
                    {engPhotos.length >= 5 ? 'Maximum 5 Photos Reached' : 'Choose or Take Progress Photos'}
                  </Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8', mt: 0.4 }}>
                    {engPhotos.length >= 5 ? 'Delete a photo below to add another' : 'Max 5 photos, JPG or PNG format (Max 5MB each)'}
                  </Typography>
                </Box>

                {/* Uploaded Photos Thumbnails (Placed BELOW the Dropzone) */}
                {engPhotos.length > 0 && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.2, mt: 0.2 }}>
                    {engPhotos.map((photoSrc, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          position: 'relative',
                          width: 72,
                          height: 72,
                          borderRadius: '10px',
                          overflow: 'hidden',
                          border: '1.5px solid #e2e8f0',
                          flexShrink: 0
                        }}
                      >
                        <Box
                          component="img"
                          src={photoSrc}
                          alt={`progress photo ${idx + 1}`}
                          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleRemoveEngPhoto(idx);
                          }}
                          sx={{
                            position: 'absolute',
                            top: 3,
                            right: 3,
                            width: 20,
                            height: 20,
                            backgroundColor: 'rgba(15, 23, 42, 0.75)',
                            color: '#ffffff',
                            p: 0,
                            '&:hover': { backgroundColor: 'rgba(15, 23, 42, 0.95)' }
                          }}
                        >
                          <X size={12} weight="bold" />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>

              {/* 3. Reason & Notes (Tenant Request) */}
              <Box>
                <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: '#1e293b', mb: 0.8 }}>
                  3. Reason & Notes (Tenant Request) <span style={{ color: '#ef4444' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Enter reason for extension, tenant request details, or field condition notes..."
                  value={engNotes}
                  onChange={(e) => setEngNotes(e.target.value)}
                  InputProps={{
                    sx: {
                      borderRadius: '10px',
                      fontSize: '0.86rem',
                      color: '#1e293b',
                      backgroundColor: '#ffffff',
                      '& fieldset': { borderColor: '#cbd5e1' },
                      '&:hover fieldset': { borderColor: '#94a3b8' },
                      '&.Mui-focused fieldset': { borderColor: '#27b29b' },
                      '& .MuiInputBase-input::placeholder, & textarea::placeholder': {
                        color: '#94a3b8 !important',
                        opacity: '1 !important'
                      }
                    }
                  }}
                />
              </Box>
            </Box>
          )}
        </Box>

        {/* ========================================================================================= */}
        {/* STICKY FIXED FOOTER BUTTONS WITH FORM VALIDATION DISABLE */}
        {/* ========================================================================================= */}
        <Box 
          sx={{ 
            p: 2, 
            pt: 1.5, 
            pb: { xs: 3.5, sm: 2.5 }, 
            borderTop: '1px solid #e2e8f0', 
            backgroundColor: '#ffffff', 
            display: 'flex', 
            gap: 1.5, 
            zIndex: 10,
            flexShrink: 0
          }}
        >
          <Button 
            fullWidth
            variant="outlined"
            disableElevation
            disableRipple
            disableFocusRipple
            disableTouchRipple
            onClick={() => setExtensionModalOpen(false)}
            sx={{ 
              flex: 1,
              textTransform: 'none', 
              color: '#334155 !important', 
              borderColor: '#cbd5e1 !important',
              fontWeight: 600, 
              fontSize: '0.9rem',
              borderRadius: '10px',
              py: 1.2,
              backgroundColor: '#ffffff !important',
              boxShadow: 'none !important',
              transition: 'none !important',
              '&:hover, &:focus, &:active, &.MuiButton-root:hover, &.MuiButton-root:focus, &.MuiButton-root:active': {
                borderColor: '#cbd5e1 !important',
                backgroundColor: '#ffffff !important',
                color: '#334155 !important',
                boxShadow: 'none !important'
              }
            }}
          >
            Cancel
          </Button>

          {/* Submit / Approve Button with Validation State */}
          {activePov === 'tenant_relation' ? (
            (() => {
              const isTrValid = Boolean(
                trNewEndDate && 
                (trFeePolicy !== 'CHARGEABLE' || trChargeableAmount.trim().length > 0)
              );
              return (
                <Button
                  fullWidth
                  variant="contained"
                  disabled={!isTrValid}
                  disableElevation
                  disableRipple
                  disableFocusRipple
                  disableTouchRipple
                  onClick={handleTrSubmit}
                  startIcon={<CheckCircle size={18} weight="bold" />}
                  sx={{
                    flex: 1,
                    backgroundColor: isTrValid ? '#27b29b !important' : '#e2e8f0 !important',
                    color: isTrValid ? '#ffffff !important' : '#94a3b8 !important',
                    borderColor: 'transparent !important',
                    borderRadius: '10px',
                    textTransform: 'none',
                    fontWeight: 600, 
                    fontSize: '0.9rem',
                    py: 1.2,
                    boxShadow: 'none !important',
                    transition: 'none !important',
                    cursor: isTrValid ? 'pointer' : 'not-allowed !important',
                    '&.Mui-disabled': {
                      backgroundColor: '#e2e8f0 !important',
                      color: '#94a3b8 !important',
                      cursor: 'not-allowed !important'
                    },
                    '&:hover, &:focus, &:active, &.MuiButton-root:hover, &.MuiButton-root:focus, &.MuiButton-root:active': {
                      backgroundColor: isTrValid ? '#27b29b !important' : '#e2e8f0 !important',
                      color: isTrValid ? '#ffffff !important' : '#94a3b8 !important',
                      boxShadow: 'none !important'
                    }
                  }}
                >
                  Submit Extension
                </Button>
              );
            })()
          ) : (
            (() => {
              const isEngValid = Boolean(engNewEndDate && engPhotos.length > 0 && engNotes.trim().length > 0);
              return (
                <Button
                  fullWidth
                  variant="contained"
                  disabled={!isEngValid}
                  disableElevation
                  disableRipple
                  disableFocusRipple
                  disableTouchRipple
                  onClick={handleEngSubmit}
                  startIcon={<CheckCircle size={18} weight="bold" />}
                  sx={{
                    flex: 1,
                    backgroundColor: isEngValid ? '#27b29b !important' : '#e2e8f0 !important',
                    color: isEngValid ? '#ffffff !important' : '#94a3b8 !important',
                    borderColor: 'transparent !important',
                    borderRadius: '10px',
                    textTransform: 'none',
                    fontWeight: 600, 
                    fontSize: '0.9rem',
                    py: 1.2,
                    boxShadow: 'none !important',
                    transition: 'none !important',
                    cursor: isEngValid ? 'pointer' : 'not-allowed !important',
                    '&.Mui-disabled': {
                      backgroundColor: '#e2e8f0 !important',
                      color: '#94a3b8 !important',
                      cursor: 'not-allowed !important'
                    },
                    '&:hover, &:focus, &:active, &.MuiButton-root:hover, &.MuiButton-root:focus, &.MuiButton-root:active': {
                      backgroundColor: isEngValid ? '#1c8b78 !important' : '#e2e8f0 !important',
                      color: isEngValid ? '#ffffff !important' : '#94a3b8 !important',
                      boxShadow: 'none !important'
                    }
                  }}
                >
                  Submit Request
                </Button>
              );
            })()
          )}
        </Box>
      </Box>

      {/* ========================================================================================= */}
      {/* SUCCESS BOTTOM SHEET MODAL (After Extension Submitted - Constrained to Mobile Frame) */}
      {/* ========================================================================================= */}
      {/* In-Frame Backdrop */}
      <Box
        onClick={() => setExtensionSuccessOpen(false)}
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.5)',
          backdropFilter: 'blur(2px)',
          zIndex: 60,
          opacity: extensionSuccessOpen ? 1 : 0,
          pointerEvents: extensionSuccessOpen ? 'auto' : 'none',
          transition: 'opacity 0.25s ease'
        }}
      />

      {/* In-Frame Success Sliding Bottom Sheet */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#ffffff',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          boxShadow: '0 -10px 30px rgba(0,0,0,0.15)',
          zIndex: 70,
          overflow: 'hidden',
          transform: extensionSuccessOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: extensionSuccessOpen ? 'auto' : 'none',
          p: 3,
          pt: 1.5,
          pb: { xs: 4, sm: 3 },
          textAlign: 'center'
        }}
      >
        {/* Drag / Handle Indicator */}
        <Box sx={{ width: 40, height: 4, borderRadius: '4px', backgroundColor: '#cbd5e1', mx: 'auto', mb: 2.5 }} />

        {/* Big Success Animated Icon */}
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            backgroundColor: 'rgba(39, 178, 155, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 2,
            color: '#27b29b'
          }}
        >
          <CheckCircle size={44} weight="fill" />
        </Box>

        {/* Title */}
        <Typography sx={{ fontWeight: 700, fontSize: '1.2rem', color: '#1e293b', letterSpacing: '-0.3px', mb: 0.8 }}>
          Extension Request Submitted!
        </Typography>

        {/* Subtitle */}
        <Typography sx={{ fontSize: '0.86rem', color: '#64748b', mb: 2.5, px: 2, lineHeight: 1.45 }}>
          {successMessage || 'Your fit out permit working schedule extension has been submitted successfully.'}
        </Typography>

        {/* Summary Info Card */}
        {extensionSubmittedData && (
          <Box 
            sx={{ 
              backgroundColor: '#f8fafc', 
              borderRadius: '12px', 
              border: '1px solid #e2e8f0', 
              p: 2, 
              mb: 2.5,
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>
                Permit Number
              </Typography>
              <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: '#1e293b' }}>
                {extensionSubmittedData.permitNo || data.permitNumber}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>
                New Scheduled End Date
              </Typography>
              <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: '#27b29b' }}>
                {extensionSubmittedData.endDate} (+{extensionSubmittedData.extendedDays} Days)
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>
                Requested By
              </Typography>
              <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155' }}>
                {extensionSubmittedData.authorizedBy || (activePov === 'engineering' ? 'Engineering Lead' : 'Tenant Relation')}
              </Typography>
            </Box>
          </Box>
        )}

        {/* Action Button */}
        <Button
          fullWidth
          variant="contained"
          disableElevation
          disableRipple
          disableFocusRipple
          disableTouchRipple
          onClick={() => setExtensionSuccessOpen(false)}
          sx={{
            backgroundColor: '#27b29b !important',
            color: '#ffffff !important',
            borderRadius: '12px',
            py: 1.3,
            fontWeight: 700,
            fontSize: '0.92rem',
            textTransform: 'none',
            boxShadow: 'none !important',
            transition: 'none !important',
            '&:hover, &:focus, &:active, &.MuiButton-root:hover, &.MuiButton-root:focus, &.MuiButton-root:active': {
              backgroundColor: '#1c8b78 !important',
              color: '#ffffff !important',
              boxShadow: 'none !important'
            }
          }}
        >
          OK, Got It
        </Button>
      </Box>

      {/* Work Complete Success Snackbar */}
      <Snackbar
        open={completeSuccessOpen}
        autoHideDuration={3500}
        onClose={() => setCompleteSuccessOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setCompleteSuccessOpen(false)} severity="success" sx={{ width: '100%', borderRadius: '8px', fontWeight: 600, fontSize: '0.82rem' }}>
          Permit status successfully updated to Complete!
        </Alert>
      </Snackbar>

      {/* Invoice Detail Preview Dialog */}
      <Dialog
        open={invoiceDetailOpen}
        onClose={() => setInvoiceDetailOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            p: 1
          }
        }}
      >
        <DialogTitle sx={{ pb: 1, pt: 1.5 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#1e293b' }}>
            Extension Invoice Detail
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          {(() => {
            const invData = extensionSubmittedData || {
              invoiceNo: 'PRO/INV/082026/000032',
              dueDate: '11/08/2026, 11:59 PM',
              endDate: '15 Feb 2026',
              permitNo: data.permitNumber || '#PRO/FP/122025/000032',
              amount: '2.000.000'
            };
            return (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ p: 1.5, backgroundColor: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8' }}>Invoice Number</Typography>
                  <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: '#27b29b' }}>{invData.invoiceNo}</Typography>
                  
                  <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8', mt: 1 }}>Payment Due Date</Typography>
                  <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: '#ef4444' }}>{invData.dueDate}</Typography>
                </Box>

                <Box sx={{ p: 1.5, borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: '#334155' }}>Invoice Description</Typography>
                  <Typography sx={{ fontSize: '0.74rem', color: '#64748b', mt: 0.3 }}>
                    Supervision fee for fit out renovation work until {invData.endDate} ({invData.permitNo}).
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1.5, pt: 1, borderTop: '1px solid #f1f5f9' }}>
                    <Typography sx={{ fontSize: '0.84rem', fontWeight: 700, color: '#1e293b' }}>Total Amount</Typography>
                    <Typography sx={{ fontSize: '0.95rem', fontWeight: 800, color: '#ea580c' }}>Rp {invData.amount},00</Typography>
                  </Box>
                </Box>
              </Box>
            );
          })()}
        </DialogContent>
        <DialogActions sx={{ p: 1.5 }}>
          <Button
            fullWidth
            variant="contained"
            disableElevation
            disableRipple
            disableFocusRipple
            disableTouchRipple
            onClick={() => setInvoiceDetailOpen(false)}
            sx={{
              backgroundColor: '#27b29b !important',
              color: '#ffffff !important',
              borderRadius: '10px',
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: 'none !important',
              transition: 'none !important',
              '&:hover, &:focus, &:active, &.MuiButton-root:hover, &.MuiButton-root:focus, &.MuiButton-root:active': {
                backgroundColor: '#1c8b78 !important',
                color: '#ffffff !important',
                boxShadow: 'none !important'
              }
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {/* Deposit Invoice Detail Dialog */}
      <Dialog
        open={depositInvoiceOpen}
        onClose={() => setDepositInvoiceOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            p: 1
          }
        }}
      >
        <DialogTitle sx={{ pb: 1, pt: 1.5 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#1e293b' }}>
            FitOut Deposit Bill Detail
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Box sx={{ p: 1.5, backgroundColor: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8' }}>Deposit Invoice Number</Typography>
              <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: '#0284c7' }}>INV-DEP-2026-0021</Typography>
              
              <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8', mt: 1 }}>Invoice Date</Typography>
              <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155' }}>12/02/2026 16:07</Typography>

              <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8', mt: 1 }}>Payment Status</Typography>
              <Box
                sx={{
                  backgroundColor: '#f97316',
                  color: '#ffffff',
                  borderRadius: '100px',
                  px: 1.2,
                  py: 0.15,
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  width: 'fit-content',
                  mt: 0.3
                }}
              >
                Unpaid
              </Box>
            </Box>

            <Box sx={{ p: 1.5, borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: '#334155' }}>Payment Description</Typography>
              <Typography sx={{ fontSize: '0.74rem', color: '#64748b', mt: 0.3 }}>
                Security deposit for fit out & renovation work execution ({data.permitNumber || 'FOP-2026-0812'}). Deposit will be refunded upon project completion and final inspection approval.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1.5, pt: 1, borderTop: '1px solid #f1f5f9' }}>
                <Typography sx={{ fontSize: '0.84rem', fontWeight: 700, color: '#1e293b' }}>Total Bill</Typography>
                <Typography sx={{ fontSize: '0.95rem', fontWeight: 800, color: '#ea580c' }}>Rp 2.000.000,00</Typography>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 1.5 }}>
          <Button
            fullWidth
            variant="contained"
            disableElevation
            disableRipple
            disableFocusRipple
            disableTouchRipple
            onClick={() => setDepositInvoiceOpen(false)}
            sx={{
              backgroundColor: '#0284c7 !important',
              color: '#ffffff !important',
              borderRadius: '10px',
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: 'none !important',
              transition: 'none !important',
              '&:hover, &:focus, &:active, &.MuiButton-root:hover, &.MuiButton-root:focus, &.MuiButton-root:active': {
                backgroundColor: '#0369a1 !important',
                color: '#ffffff !important',
                boxShadow: 'none !important'
              }
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Document View Preview Dialog */}
      <Dialog
        open={Boolean(previewDoc)}
        onClose={() => setPreviewDoc(null)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            p: 1
          }
        }}
      >
        <DialogTitle sx={{ pb: 1, pt: 1.5 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#1e293b' }}>
            {previewDoc?.name}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <Box sx={{ p: 3, backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1', textAlign: 'center' }}>
            <FilePdf size={52} weight="fill" color="#ef4444" style={{ margin: '0 auto 12px auto', display: 'block' }} />
            <Typography sx={{ fontWeight: 700, fontSize: '0.92rem', color: '#1e293b' }}>
              {previewDoc?.name}
            </Typography>
            <Typography sx={{ fontSize: '0.78rem', color: '#94a3b8', mt: 0.5 }}>
              Document Size: {previewDoc?.size}
            </Typography>
            <Typography sx={{ fontSize: '0.76rem', color: '#64748b', mt: 1.5 }}>
              Verified technical document for unit renovation permit.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 1.5 }}>
          <Button
            fullWidth
            variant="contained"
            disableElevation
            disableRipple
            disableFocusRipple
            disableTouchRipple
            onClick={() => setPreviewDoc(null)}
            sx={{
              backgroundColor: '#3b82f6 !important',
              color: '#ffffff !important',
              borderRadius: '10px',
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: 'none !important',
              transition: 'none !important',
              '&:hover, &:focus, &:active, &.MuiButton-root:hover, &.MuiButton-root:focus, &.MuiButton-root:active': {
                backgroundColor: '#2563eb !important',
                color: '#ffffff !important',
                boxShadow: 'none !important'
              }
            }}
          >
            Close Preview
          </Button>
        </DialogActions>
      </Dialog>

      {/* Site Photo Lightbox Preview Dialog */}
      <Dialog
        open={Boolean(previewPhoto)}
        onClose={() => setPreviewPhoto(null)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '20px',
            overflow: 'hidden',
            backgroundColor: '#0f172a',
            m: 2
          }
        }}
      >
        <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              zIndex: 10
            }}
          >
            <IconButton
              onClick={() => setPreviewPhoto(null)}
              size="small"
              sx={{
                color: '#ffffff',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)'
                }
              }}
            >
              <X size={20} weight="bold" />
            </IconButton>
          </Box>
          {previewPhoto && (
            <Box
              component="img"
              src={previewPhoto}
              alt="Site Progress Photo"
              sx={{
                width: '100%',
                maxHeight: '65vh',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          )}
          <Box sx={{ p: 2, backgroundColor: 'rgba(15, 23, 42, 0.95)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Camera size={18} color="#27b29b" weight="fill" />
              <Typography sx={{ color: '#ffffff', fontSize: '0.86rem', fontWeight: 600 }}>
                Site Progress Photo
              </Typography>
            </Box>
            <Button
              size="small"
              onClick={() => setPreviewPhoto(null)}
              sx={{
                color: '#94a3b8',
                fontSize: '0.8rem',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': { color: '#ffffff' }
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Dialog>

      {/* Early Inspection Detail Dialog */}
      <Dialog
        open={earlyInspectionDetailOpen}
        onClose={() => setEarlyInspectionDetailOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            p: 1
          }
        }}
      >
        <DialogTitle sx={{ pb: 1, pt: 1.5 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#1e293b' }}>
            Early Inspection Detail
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Box sx={{ p: 1.5, backgroundColor: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8' }}>Inspection Report Number</Typography>
              <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: '#27b29b' }}>PRO/INS/022026/A1202/0004</Typography>
              
              <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8', mt: 1 }}>Inspector (Handled By)</Typography>
              <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: '#1e293b' }}>Asep Sudrajat (Engineering Lead)</Typography>

              <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8', mt: 1 }}>Early Inspection Result</Typography>
              <Box
                sx={{
                  backgroundColor: '#f0fdf4',
                  color: '#16a34a',
                  borderRadius: '100px',
                  px: 1.2,
                  py: 0.2,
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  width: 'fit-content',
                  mt: 0.3
                }}
              >
                Good Condition
              </Box>
            </Box>

            <Box sx={{ p: 1.5, borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', mb: 1 }}>
                Field Evaluation Checklist
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
                {[
                  'Unit Structure & Walls: Safe & Isolated',
                  'Temporary MEP & Electrical Routing: Compliant with SOP',
                  'Corridor Floor & Wall Protection: Installed Properly',
                  'Fire Extinguisher & Safety PPE: Complete & Ready'
                ].map((item, idx) => (
                  <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircle size={16} weight="fill" color="#27b29b" />
                    <Typography sx={{ fontSize: '0.74rem', color: '#334155' }}>
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 1.5 }}>
          <Button
            fullWidth
            variant="contained"
            disableElevation
            disableRipple
            disableFocusRipple
            disableTouchRipple
            onClick={() => setEarlyInspectionDetailOpen(false)}
            sx={{
              backgroundColor: '#27b29b !important',
              color: '#ffffff !important',
              borderRadius: '10px',
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: 'none !important',
              transition: 'none !important',
              '&:hover, &:focus, &:active, &.MuiButton-root:hover, &.MuiButton-root:focus, &.MuiButton-root:active': {
                backgroundColor: '#1c8b78 !important',
                color: '#ffffff !important',
                boxShadow: 'none !important'
              }
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Daily Inspection Detail Dialog */}
      <Dialog
        open={Boolean(selectedDailyInspection)}
        onClose={() => setSelectedDailyInspection(null)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            p: 1
          }
        }}
      >
        <DialogTitle sx={{ pb: 1, pt: 1.5 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#1e293b' }}>
            Daily Inspection Detail
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          {selectedDailyInspection && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ p: 1.5, backgroundColor: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8' }}>Inspection Report Number</Typography>
                <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: '#27b29b' }}>{selectedDailyInspection.code}</Typography>
                
                <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8', mt: 1 }}>PIC & Inspector (Handled By)</Typography>
                <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: '#1e293b' }}>{selectedDailyInspection.handleBy} ({selectedDailyInspection.pic})</Typography>

                <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8', mt: 1 }}>Inspection Timestamp</Typography>
                <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155' }}>{selectedDailyInspection.inspectionDate}</Typography>

                <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8', mt: 1 }}>Daily Inspection Result</Typography>
                <Box
                  sx={{
                    backgroundColor: '#f0fdf4',
                    color: '#16a34a',
                    borderRadius: '100px',
                    px: 1.2,
                    py: 0.2,
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    width: 'fit-content',
                    mt: 0.3
                  }}
                >
                  {selectedDailyInspection.result}
                </Box>
              </Box>

              <Box sx={{ p: 1.5, borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', mb: 1 }}>
                  Daily Field Inspection Notes
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
                  {[
                    'Work area properly enclosed & tidy during working hours',
                    'Worker PPE complete (Safety Vest, Helmet, Shoes)',
                    'No leakage or disturbance to building MEP facilities',
                    'Working hours strictly adhered to active permit schedule'
                  ].map((item, idx) => (
                    <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircle size={16} weight="fill" color="#27b29b" />
                      <Typography sx={{ fontSize: '0.74rem', color: '#334155' }}>
                        {item}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 1.5 }}>
          <Button
            fullWidth
            variant="contained"
            disableElevation
            disableRipple
            disableFocusRipple
            disableTouchRipple
            onClick={() => setSelectedDailyInspection(null)}
            sx={{
              backgroundColor: '#27b29b !important',
              color: '#ffffff !important',
              borderRadius: '10px',
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: 'none !important',
              transition: 'none !important',
              '&:hover, &:focus, &:active, &.MuiButton-root:hover, &.MuiButton-root:focus, &.MuiButton-root:active': {
                backgroundColor: '#1c8b78 !important',
                color: '#ffffff !important',
                boxShadow: 'none !important'
              }
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {/* Worker Detail Dialog */}
      <Dialog
        open={Boolean(selectedWorker)}
        onClose={() => setSelectedWorker(null)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            p: 1
          }
        }}
      >
        <DialogTitle sx={{ pb: 1, pt: 1.5 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#1e293b' }}>
            Worker Information Detail
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          {selectedWorker && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ p: 1.5, backgroundColor: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8' }}>Full Name</Typography>
                <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b' }}>{selectedWorker.name}</Typography>
                
                <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8', mt: 1 }}>Role / Position</Typography>
                <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: '#27b29b' }}>{selectedWorker.role}</Typography>

                <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8', mt: 1 }}>National ID / KTP Number</Typography>
                <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155' }}>{selectedWorker.idCard}</Typography>

                <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8', mt: 1 }}>K3 Safety & Verification Status</Typography>
                <Box
                  sx={{
                    backgroundColor: '#f0fdf4',
                    color: '#16a34a',
                    borderRadius: '100px',
                    px: 1.2,
                    py: 0.2,
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    width: 'fit-content',
                    mt: 0.3
                  }}
                >
                  Verified & Induction Passed
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 1.5 }}>
          <Button
            fullWidth
            variant="contained"
            disableElevation
            disableRipple
            disableFocusRipple
            disableTouchRipple
            onClick={() => setSelectedWorker(null)}
            sx={{
              backgroundColor: '#27b29b !important',
              color: '#ffffff !important',
              borderRadius: '10px',
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: 'none !important',
              transition: 'none !important',
              '&:hover, &:focus, &:active, &.MuiButton-root:hover, &.MuiButton-root:focus, &.MuiButton-root:active': {
                backgroundColor: '#1c8b78 !important',
                color: '#ffffff !important',
                boxShadow: 'none !important'
              }
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
