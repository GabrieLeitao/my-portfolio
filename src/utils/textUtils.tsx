// src/utils/textUtils.tsx
import React from 'react';

/**
 * Helper function to turn URLs into clickable links and handle newlines.
 * Supports explicit markdown-style links [text](url) and auto-detection.
 */
export const renderDescription = (text: string, linkColor: string = '#6495ed') => {
  if (!text) return null;

  // Split by newlines first
  return text.split('\n').map((line, i) => {
    // Regex to match [text](url)
    const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    // Regex for auto-detecting URLs (fallback)
    const autoUrlRegex = /(https?:\/\/[^\s]+|(?:^|(?<=\s))(?=[a-zA-Z0-9-]+\.[a-z]{2,})[a-zA-Z0-9-]+\.[a-z]{2,}(?:\.[a-z]{2,})?(?:\/[^\s]*)?)/gi;

    const parts = [];
    let lastIndex = 0;
    let match;

    // 1. Process explicit markdown links [text](url)
    while ((match = markdownLinkRegex.exec(line)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        parts.push(line.substring(lastIndex, match.index));
      }

      let linkText = match[1];
      const linkUrl = match[2];
      const href = linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`;

      // Clean up link text (remove www.)
      linkText = linkText.replace(/^www\./i, '');

      parts.push(
        <a
          key={`link-${match.index}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: linkColor, textDecoration: 'underline' }}
          onClick={(e) => e.stopPropagation()}
        >
          {linkText}
        </a>
      );

      lastIndex = markdownLinkRegex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < line.length) {
      const remainingText = line.substring(lastIndex);
      
      // 2. Process auto-detected links in the remaining text as fallback
      const subParts = remainingText.split(autoUrlRegex);
      subParts.forEach((part, j) => {
        if (part && part.match(autoUrlRegex)) {
          const href = part.startsWith('http') ? part : `https://${part}`;
          if (part.includes('.') && part.length > 3) {
            // Clean up auto-detected link text (remove http://, https://, www.)
            const displayUrl = part.replace(/^(https?:\/\/)?(www\.)?/i, '');
            parts.push(
              <a
                key={`auto-${j}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: linkColor, textDecoration: 'underline' }}
                onClick={(e) => e.stopPropagation()}
              >
                {displayUrl}
              </a>
            );
          } else {
            parts.push(part);
          }
        } else {
          parts.push(part);
        }
      });
    }

    return (
      <span key={i}>
        {parts}
        {i < text.split('\n').length - 1 && <br />}
      </span>
    );
  });
};
