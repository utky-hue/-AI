import React from 'react';
import katex from 'katex';

interface MathRendererProps {
  content: string;
  className?: string;
  block?: boolean;
}

export const MathRenderer: React.FC<MathRendererProps> = ({
  content,
  className = '',
  block = false,
}) => {
  if (!content) return null;

  // Split content by inline \( ... \) or display \[ ... \] or $$ ... $$ or $ ... $
  const regex = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\$[^\$\n]+?\$|\\\([\s\S]*?\\\))/g;

  const parts = content.split(regex);

  return (
    <span className={`inline leading-relaxed ${className}`}>
      {parts.map((part, index) => {
        if (!part) return null;

        let math = '';
        let isDisplay = block;

        if (part.startsWith('$$') && part.endsWith('$$')) {
          math = part.slice(2, -2);
          isDisplay = true;
        } else if (part.startsWith('\\[') && part.endsWith('\\]')) {
          math = part.slice(2, -2);
          isDisplay = true;
        } else if (part.startsWith('\\(') && part.endsWith('\\)')) {
          math = part.slice(2, -2);
          isDisplay = false;
        } else if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
          math = part.slice(1, -1);
          isDisplay = false;
        } else {
          // Regular text
          return <span key={index}>{part}</span>;
        }

        try {
          const html = katex.renderToString(math.trim(), {
            displayMode: isDisplay,
            throwOnError: false,
          });

          return (
            <span
              key={index}
              dangerouslySetInnerHTML={{ __html: html }}
              className={isDisplay ? 'block my-2 text-center overflow-x-auto' : 'inline px-0.5'}
            />
          );
        } catch (err) {
          return <span key={index} className="font-mono">{part}</span>;
        }
      })}
    </span>
  );
};
