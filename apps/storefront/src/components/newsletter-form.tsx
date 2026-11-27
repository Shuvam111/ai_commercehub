"use client";

import { useState, type FormEvent } from "react";

export function NewsletterForm() {
  const [message, setMessage] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("Thanks for subscribing. This demo does not save your email.");
    event.currentTarget.reset();
  };
  return <form className="newsletter-form" onSubmit={submit}><label className="sr-only" htmlFor="home-newsletter">Email address</label><input id="home-newsletter" type="email" placeholder="Your email address" autoComplete="email" required /><button type="submit">Join the list <span aria-hidden="true">→</span></button>{message && <span className="newsletter-message" role="status">{message}</span>}</form>;
}
