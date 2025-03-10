// ==UserScript==
// @name         GMail - pseudo Archive folder
// @description  Adds a folder-like button that redirects to query for archived messages
// @version      1.0.0
// @author       Jorenar
// @namespace    https://jorenar.com
// @license      MIT
// @match        https://mail.google.com/*
// @grant        window.onurlchange
// ==/UserScript==

"use strict";

// has:nouserlabels -in:Inbox -in:Sent -in:Draft -in:Chat
const URL = "https://mail.google.com/mail/u/0/#search/has%3Anouserlabels+-in%3AInbox+-in%3ASent+-in%3ADraft+-in%3AChat";

const interval = setInterval(function() {
  const inbox = document.querySelector('div:has(> div[data-tooltip="Inbox"] a[aria-label="Inbox"][href*="#inbox"])');

  if (!inbox) { return; }
  clearInterval(interval);

  const archive = inbox.cloneNode(true);
  archive.onclick = () => { window.location = URL; };
  archive.classList.remove('ain');

  const subdiv = archive.querySelector(':scope > div[data-tooltip="Inbox"]');
  subdiv.dataset.tooltip = 'Archived';
  subdiv.removeAttribute('id');
  subdiv.removeAttribute('jslog');

  const highlight = function() {
    if (window.location.href === URL) {
      subdiv.classList.add('nZ');
    } else {
      subdiv.classList.remove('nZ');
    }
  }
  highlight();
  window.onurlchange = highlight;

  const icon = subdiv.querySelector(':scope > div > div:first-child');
  icon.classList.add('brq');
  icon.parentNode.classList.remove('aHS-bnt');

  const a = subdiv.querySelector('a[aria-label="Inbox"]');
  a.href = URL;
  a.textContent = "Archived";
  a.setAttribute('aria-label', 'Archived');

  inbox.parentNode.appendChild(archive);
}, 500);
