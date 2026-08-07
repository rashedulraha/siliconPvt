"use client";

import React from "react";
import Link from "next/link";
import { Download, ArrowLeft, Printer, FileText, CheckCircle2, ShieldCheck } from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";

export default function MembershipFormPreviewPage() {
  return (
    <div className="bg-background text-foreground min-h-screen pb-24">
      {/* Top Navigation */}
      <div className="border-b border-border/50 bg-card/60 backdrop-blur-md sticky top-0 z-30 py-4">
        <SectionContainer>
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard/user"
              className="text-xs font-medium font-heading text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-4 h-9 rounded-xl bg-card border border-border/60 hover:border-primary/40 text-xs font-medium font-heading text-foreground inline-flex items-center gap-1.5 transition-all shadow-xs cursor-pointer">
                <Printer className="w-3.5 h-3.5 text-primary" />
                Print Page
              </button>
              <a
                href="/assets/silicon-membership-form.pdf"
                download
                className="px-4 h-9 rounded-xl bg-primary text-primary-foreground text-xs font-medium font-heading inline-flex items-center gap-1.5 transition-all shadow-xs hover:bg-primary/90">
                <Download className="w-3.5 h-3.5" />
                Download PDF
              </a>
            </div>
          </div>
        </SectionContainer>
      </div>

      {/* Form Content */}
      <SectionContainer className="py-10">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="bg-card border border-border/70 rounded-3xl p-8 sm:p-12 shadow-md space-y-8 relative">
            {/* Header Stamp */}
            <div className="border-b border-border/50 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-medium text-primary uppercase tracking-wider block">
                  DIGITAL FORM OUTLINE & PREVIEW
                </span>
                <h1 className="text-2xl font-semibold font-heading text-foreground">
                  Application Form for Membership in "Silicon City"
                </h1>
              </div>
              <div className="text-xs text-muted-foreground space-y-0.5 sm:text-right">
                <p className="font-semibold text-foreground">Silicon Real Estate (Pvt.) Ltd.</p>
                <p>2/3 (2nd Floor), Block-A, Iqbal Road, Mohammadpur, Dhaka-1207</p>
              </div>
            </div>

            {/* Instruction Notice */}
            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary text-xs font-light leading-relaxed flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                <strong>Instructions for Members:</strong> This digital preview outlines all official form fields. Please download the printable PDF, attach 2 recent passport photographs and NID copies, and submit at our Mohammadpur Corporate Office with the BDT 1,000 application fee.
              </span>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-muted/40 border border-border/40 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-mono font-medium text-primary uppercase tracking-wider block">
                  1. APPLICANT'S BASIC INFORMATION
                </span>
                <ul className="space-y-1.5 text-xs text-muted-foreground font-light">
                  <li>• Applicant's Full Name</li>
                  <li>• Father's Name / Husband's Name</li>
                  <li>• Mother's Name & Present/Permanent Address</li>
                  <li>• Phone / Mobile Number & NID Number</li>
                  <li>• Date of Birth, Occupation & Nationality</li>
                </ul>
              </div>

              <div className="bg-muted/40 border border-border/40 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-mono font-medium text-primary uppercase tracking-wider block">
                  2. REPRESENTATIVE & NOMINEE INFO
                </span>
                <ul className="space-y-1.5 text-xs text-muted-foreground font-light">
                  <li>• Representative Name & Relationship</li>
                  <li>• Representative Address, Mobile & NID</li>
                  <li>• Nominee / Legal Heir Name & Relationship</li>
                  <li>• Nominee Address & Special Instructions</li>
                </ul>
              </div>

              <div className="bg-muted/40 border border-border/40 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-mono font-medium text-primary uppercase tracking-wider block">
                  3. LAND & PLOT DETAILS
                </span>
                <ul className="space-y-1.5 text-xs text-muted-foreground font-light">
                  <li>• R.S. Dag Number (আর.এস. দাগ নম্বর)</li>
                  <li>• B.S. Dag Number (বি.এস. দাগ নম্বর)</li>
                  <li>• Land Amount in Decimals or Katha</li>
                </ul>
              </div>

              <div className="bg-muted/40 border border-border/40 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-mono font-medium text-primary uppercase tracking-wider block">
                  4. OFFICIAL VERIFICATION PANEL
                </span>
                <ul className="space-y-1.5 text-xs text-muted-foreground font-light">
                  <li>• Signature of Office Supervisor</li>
                  <li>• Signature of Director / Managing Director</li>
                  <li>• Signature of Chairman</li>
                </ul>
              </div>
            </div>

            {/* Applicant Declaration */}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 space-y-2">
              <span className="text-xs font-mono font-medium text-primary uppercase tracking-wider block">
                APPLICANT'S DECLARATION
              </span>
              <p className="text-xs text-muted-foreground font-light leading-relaxed italic">
                "I, being attracted to the 'Silicon City' project under Silicon Real Estate (Pvt.) Ltd., wish to include my land into this project and acquire official membership. My ultimate objective is to secure a fair development of my land and emerge as a proud plot owner in Silicon City. I declare that I am fully aware of all terms and conditions of Silicon Real Estate (Pvt.) Ltd. and pledge to abide by them."
              </p>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs text-muted-foreground font-heading">
                Hotlines: +880 12 345 678 / +880 1712 345 678
              </span>
              <a
                href="/assets/silicon-membership-form.pdf"
                download
                className="bg-primary text-primary-foreground h-11 px-6 rounded-xl text-xs font-medium font-heading inline-flex items-center justify-center gap-2">
                DOWNLOAD PRINTABLE FORM (PDF)
                <Download className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </SectionContainer>
    </div>
  );
}
