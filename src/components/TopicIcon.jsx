import React from 'react';
// Lucide icons, ISC license. Source: https://raw.githubusercontent.com/lucide-icons/lucide/20aef31db93fe4d9f398dbb15b120d99c48eef95/icons/
const icons = {
  'shield-check': <><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
  <path d="m9 12 2 2 4-4" /></>,
  'brain-circuit': <><path d="M12 13h4" />
  <path d="M12 18h6a2 2 0 012 2v1" />
  <path d="M12 8h8" />
  <path d="M12 9a4.17 4.17 0 01-3 4" />
  <path d="M16 8V5a2 2 0 012-2" />
  <path d="M6 18a4 4 0 01-2-7.465" />
  <path d="M6.004 5.125a4 4 0 00-2.526 5.77" />
  <path d="M6.294 6.294A3 3 0 1112 5v13a4 4 0 11-7.967-.518" />
  <circle cx="16" cy="13" r="0.5" fill="currentColor" />
  <circle cx="18" cy="3" r="0.5" fill="currentColor" />
  <circle cx="20" cy="21" r="0.5" fill="currentColor" />
  <circle cx="20" cy="8" r="0.5" fill="currentColor" /></>,
  'code-xml': <><path d="m18 16 4-4-4-4" />
  <path d="m6 8-4 4 4 4" />
  <path d="m14.5 4-5 16" /></>,
};

export default function TopicIcon({ name }) {
  return <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="#226f54" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{icons[name]}</svg>;
}
