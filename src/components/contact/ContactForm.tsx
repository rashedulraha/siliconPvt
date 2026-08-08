"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useLeads } from "@/hooks/useLeads";

interface ContactFormProps {
	propertyId?: string;
	prefillName?: string;
	prefillEmail?: string;
}

export function ContactForm({
	propertyId,
	prefillName,
	prefillEmail,
}: ContactFormProps) {
	const { addLead } = useLeads();
	const [form, setForm] = useState({
		name: prefillName || "",
		email: prefillEmail || "",
		phone: "",
		subject: propertyId ? "Property Inquiry" : "General Inquiry",
		message: "",
	});
	const [status, setStatus] = useState<
		"idle" | "submitting" | "success" | "error"
	>("idle");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!form.name || !form.email || !form.message) {
			setStatus("error");
			return;
		}
		setStatus("submitting");
		setTimeout(() => {
			addLead({
				name: form.name,
				email: form.email,
				phone: form.phone,
				message: `[${form.subject}] ${form.message}`,
				propertyId,
			});
			setStatus("success");
			setForm({
				name: "",
				email: "",
				phone: "",
				subject: "General Inquiry",
				message: "",
			});
		}, 600);
	};

	if (status === "success") {
		return (
			<div className="rounded-xl border bg-accent/10 p-8 text-center">
				<CheckCircle className="h-12 w-12 mx-auto text-accent mb-4" />
				<h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
				<p className="text-muted-foreground mb-4">
					Thank you for reaching out. Our team will get back to you within 24
					hours.
				</p>
				<Button variant="outline" onClick={() => setStatus("idle")}>
					Send Another Message
				</Button>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="grid sm:grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="name">Full Name *</Label>
					<Input
						id="name"
						value={form.name}
						onChange={(e) => setForm({ ...form, name: e.target.value })}
						placeholder="John Doe"
						required
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="email">Email *</Label>
					<Input
						id="email"
						type="email"
						value={form.email}
						onChange={(e) => setForm({ ...form, email: e.target.value })}
						placeholder="john@example.com"
						required
					/>
				</div>
			</div>

			<div className="grid sm:grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="phone">Phone</Label>
					<Input
						id="phone"
						type="tel"
						value={form.phone}
						onChange={(e) => setForm({ ...form, phone: e.target.value })}
						placeholder="+1 (555) 000-0000"
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="subject">Subject</Label>
					<Input
						id="subject"
						value={form.subject}
						onChange={(e) => setForm({ ...form, subject: e.target.value })}
						placeholder="How can we help?"
					/>
				</div>
			</div>

			<div className="space-y-2">
				<Label htmlFor="message">Message *</Label>
				<Textarea
					id="message"
					value={form.message}
					onChange={(e) => setForm({ ...form, message: e.target.value })}
					placeholder="Tell us what you're looking for..."
					rows={5}
					required
				/>
			</div>

			{status === "error" && (
				<p className="text-sm text-destructive">
					Please fill in all required fields.
				</p>
			)}

			<Button
				type="submit"
				className="w-full"
				size="lg"
				disabled={status === "submitting"}
			>
				{status === "submitting" ? (
					"Sending..."
				) : (
					<>
						<Send className="h-4 w-4 mr-2" /> Send Message
					</>
				)}
			</Button>
		</form>
	);
}
