'use client';

import React, { useState, useRef } from 'react';
import { User, Mail, Phone, FileText, Upload, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface JobApplicationFormProps {
  readonly jobTitle: string;
}

export function JobApplicationForm({ jobTitle }: JobApplicationFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, file: 'File size must be less than 5MB' }));
      } else {
        setFile(selectedFile);
        setErrors((prev) => {
          const next = { ...prev };
          delete next.file;
          return next;
        });
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      const validTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      if (!validTypes.includes(selectedFile.type)) {
        setErrors((prev) => ({ ...prev, file: 'Only PDF, DOC, or DOCX files are allowed' }));
      } else if (selectedFile.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, file: 'File size must be less than 5MB' }));
      } else {
        setFile(selectedFile);
        setErrors((prev) => {
          const next = { ...prev };
          delete next.file;
          return next;
        });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (!name.trim()) nextErrors.name = 'Full name is required';
    if (!email.trim()) {
      nextErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Please enter a valid email address';
    }
    if (!phone.trim()) nextErrors.phone = 'Phone number is required';
    if (!file) nextErrors.file = 'Please upload your resume';

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Mock network submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[20px] border border-mint/20 bg-white/[0.02] p-8 text-center">
        <CheckCircle2 className="mb-5 size-16 animate-bounce text-mint" />
        <h3 className="mb-3 font-heading text-2xl font-bold text-white">Application Submitted!</h3>
        <p className="mb-6 text-base leading-relaxed text-subtle">
          Thank you for applying for the <span className="font-semibold text-mint">{jobTitle}</span>{' '}
          position. Our recruitment team will review your application and contact you soon.
        </p>
        <button
          onClick={() => {
            setName('');
            setEmail('');
            setPhone('');
            setCoverLetter('');
            setFile(null);
            setIsSuccess(false);
          }}
          className="rounded-cta border border-white/20 px-6 py-2.5 text-xs font-bold uppercase text-white transition-all duration-300 hover:border-mint hover:text-mint"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-[20px] border border-white/[0.08] bg-white/[0.02] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.3)] max-bs-md:p-6">
      <h3 className="mb-6 font-heading text-2xl font-bold text-white">Apply for this Role</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Full Name */}
        <div className="relative">
          <input
            type="text"
            id="applicant-name"
            value={name}
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
            className={cn(
              'peer h-[55px] w-full rounded-[5px] border bg-field pl-12 pr-5 text-sm text-white outline-none transition-all duration-300 focus:placeholder-transparent',
              errors.name
                ? 'border-danger-soft focus:border-danger-soft'
                : 'border-white/20 focus:border-mint',
            )}
          />
          <label
            htmlFor="applicant-name"
            className={cn(
              'pointer-events-none absolute left-12 text-sm text-white/50 transition-all duration-300',
              name
                ? 'top-2.5 text-xs text-mint'
                : 'top-1/2 -translate-y-1/2 peer-focus:top-2.5 peer-focus:text-xs peer-focus:text-mint',
            )}
          >
            Full Name
          </label>
          <User
            className={cn(
              'absolute left-4 top-1/2 size-5 -translate-y-1/2 transition-colors duration-300',
              errors.name ? 'text-danger-soft' : 'text-white/40 peer-focus:text-mint',
            )}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-danger-soft" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Address */}
        <div className="relative">
          <input
            type="email"
            id="applicant-email"
            value={email}
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            className={cn(
              'peer h-[55px] w-full rounded-[5px] border bg-field pl-12 pr-5 text-sm text-white outline-none transition-all duration-300 focus:placeholder-transparent',
              errors.email
                ? 'border-danger-soft focus:border-danger-soft'
                : 'border-white/20 focus:border-mint',
            )}
          />
          <label
            htmlFor="applicant-email"
            className={cn(
              'pointer-events-none absolute left-12 text-sm text-white/50 transition-all duration-300',
              email
                ? 'top-2.5 text-xs text-mint'
                : 'top-1/2 -translate-y-1/2 peer-focus:top-2.5 peer-focus:text-xs peer-focus:text-mint',
            )}
          >
            Email Address
          </label>
          <Mail
            className={cn(
              'absolute left-4 top-1/2 size-5 -translate-y-1/2 transition-colors duration-300',
              errors.email ? 'text-danger-soft' : 'text-white/40 peer-focus:text-mint',
            )}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-danger-soft" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div className="relative">
          <input
            type="tel"
            id="applicant-phone"
            value={phone}
            placeholder="Phone Number"
            onChange={(e) => setPhone(e.target.value)}
            className={cn(
              'peer h-[55px] w-full rounded-[5px] border bg-field pl-12 pr-5 text-sm text-white outline-none transition-all duration-300 focus:placeholder-transparent',
              errors.phone
                ? 'border-danger-soft focus:border-danger-soft'
                : 'border-white/20 focus:border-mint',
            )}
          />
          <label
            htmlFor="applicant-phone"
            className={cn(
              'pointer-events-none absolute left-12 text-sm text-white/50 transition-all duration-300',
              phone
                ? 'top-2.5 text-xs text-mint'
                : 'top-1/2 -translate-y-1/2 peer-focus:top-2.5 peer-focus:text-xs peer-focus:text-mint',
            )}
          >
            Phone Number
          </label>
          <Phone
            className={cn(
              'absolute left-4 top-1/2 size-5 -translate-y-1/2 transition-colors duration-300',
              errors.phone ? 'text-danger-soft' : 'text-white/40 peer-focus:text-mint',
            )}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-danger-soft" role="alert">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Cover Letter */}
        <div className="relative">
          <textarea
            id="applicant-letter"
            value={coverLetter}
            placeholder="Introduce yourself / Cover letter..."
            onChange={(e) => setCoverLetter(e.target.value)}
            className={cn(
              'peer h-[120px] w-full resize-none rounded-[5px] border bg-field py-3.5 pl-12 pr-5 text-sm text-white outline-none transition-all duration-300 focus:placeholder-transparent',
              'border-white/20 focus:border-mint',
            )}
          />
          <label
            htmlFor="applicant-letter"
            className={cn(
              'pointer-events-none absolute left-12 text-sm text-white/50 transition-all duration-300',
              coverLetter
                ? 'top-2.5 text-xs text-mint'
                : 'top-4 peer-focus:top-2.5 peer-focus:text-xs peer-focus:text-mint',
            )}
          >
            Cover Letter (Optional)
          </label>
          <FileText
            className={cn(
              'absolute left-4 top-4 size-5 text-white/40 transition-colors duration-300 peer-focus:text-mint',
            )}
          />
        </div>

        {/* Custom Resume Upload Zone */}
        <div className="relative">
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              'flex cursor-pointer flex-col items-center justify-center gap-2.5 rounded-[5px] border border-dashed bg-field/30 p-6 text-center transition-all duration-300',
              errors.file
                ? 'border-danger-soft bg-danger/5 hover:border-danger-soft/80'
                : 'border-white/20 hover:border-mint/60 hover:bg-white/[0.04]',
            )}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              className="hidden"
            />
            <Upload className="size-8 text-white/40 transition-colors duration-300 hover:text-mint" />
            {file ? (
              <div className="text-sm">
                <span className="font-semibold text-mint">{file.name}</span>
                <p className="mt-1 text-xs text-subtle">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB • Click to replace
                </p>
              </div>
            ) : (
              <div className="text-sm text-subtle">
                <p className="font-medium text-white/80">Drag & drop your resume here</p>
                <p className="mt-1 text-xs">Accepts PDF, DOC, DOCX up to 5MB</p>
              </div>
            )}
          </div>
          {errors.file && (
            <p className="mt-1.5 text-xs text-danger-soft" role="alert">
              {errors.file}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-cta bg-mint py-4 text-sm font-bold uppercase tracking-wider text-ink transition-all duration-300',
            'shadow-[0_4px_25px_rgba(0,255,151,0.2)] hover:bg-white hover:text-ink hover:shadow-none',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none',
          )}
        >
          {isSubmitting ? (
            <>
              <svg
                className="-ml-1 mr-3 h-5 w-5 animate-spin text-ink"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submitting...
            </>
          ) : (
            'Submit Application'
          )}
        </button>
      </form>
    </div>
  );
}
