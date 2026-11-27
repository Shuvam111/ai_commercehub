"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  const [message, setMessage] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("Thanks for reaching out. This demo does not send or save messages.");
    event.currentTarget.reset();
  };
  return <div className="page-container contact-page"><section className="page-intro"><span className="eyebrow">WE&apos;RE HERE, REALLY</span><h1>Let&apos;s have a chat.</h1><p>Questions, ideas or just a hello? Our sample team would love to hear from you.</p></section><div className="contact-layout"><form className="contact-form" onSubmit={submit}><h2>Drop us a note.</h2><label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" autoComplete="name" required /><label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" autoComplete="email" required /><label htmlFor="contact-topic">What&apos;s on your mind?</label><select id="contact-topic" name="topic" defaultValue=""><option value="" disabled>Choose a topic</option><option>Product question</option><option>Delivery and returns</option><option>Something else</option></select><label htmlFor="contact-message">A little more detail</label><textarea id="contact-message" name="message" rows={5} required /><button className="button button-dark" type="submit">Send a note <span aria-hidden="true">→</span></button>{message && <p className="contact-feedback" role="status">{message}</p>}</form><aside className="contact-details"><span className="eyebrow">COME SAY HELLO</span><h2>Find us in Kathmandu.</h2><p>We&apos;re a small team and a real person will always be on the other end.</p><div><span><MapPin aria-hidden="true" /></span><p><strong>Visit the shop</strong><small>Thamel, Kathmandu, Nepal</small></p></div><div><span><Phone aria-hidden="true" /></span><p><strong>Give us a call</strong><a href="tel:+97715550142">+977 1 555 0142</a></p></div><div><span><Mail aria-hidden="true" /></span><p><strong>Send an email</strong><a href="mailto:hello@juniperandloom.example">hello@juniperandloom.example</a></p></div><small className="sample-note">Sample contact details for the storefront preview.</small></aside></div></div>;
}
