import React from 'react';
import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';

const BlogContentRenderer = ({ content }) => {
  // Function to process and style blog content
  const processBlogContent = (htmlContent) => {
    // Sanitize the HTML content with broad tag and attribute support
    let sanitizedContent = DOMPurify.sanitize(htmlContent, {
      ADD_TAGS: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div', 'span', 'strong', 'em', 'ul', 'ol', 'li',
        'img', 'a', 'blockquote', 'code', 'pre', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
        'br', 'hr', 'sub', 'sup', 'u', 's', 'iframe', 'figure', 'figcaption', 'video', 'audio', 'source'
      ],
      ADD_ATTR: [
        'style', 'href', 'target', 'rel', 'alt', 'src', 'width', 'height', 'class',
        'align', 'title', 'frameborder', 'allowfullscreen', 'controls', 'poster'
      ],
    });

    // Create a temporary container to parse the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(sanitizedContent, 'text/html');

    // Function to map inline styles to Tailwind classes
    const mapInlineStyles = (styleString, element) => {
      const classes = [];
      if (!styleString) return classes;

      // Parse style string into key-value pairs
      const styles = styleString.split(';').reduce((acc, style) => {
        const [key, value] = style.split(':').map(s => s.trim());
        if (key && value) acc[key.toLowerCase()] = value.toLowerCase();
        return acc;
      }, {});

      // Map text alignment
      if (styles['text-align']) {
        const alignMap = {
          'left': 'text-left',
          'center': 'text-center',
          'right': 'text-right',
          'justify': 'text-justify'
        };
        classes.push(alignMap[styles['text-align']] || 'text-left');
      }

      // Map text colors
      if (styles['color']) {
        const colorMap = {
          '#ff6600': 'text-orange-600',
          'rgb(255, 102, 0)': 'text-orange-600',
          '#000000': 'text-black',
          '#ffffff': 'text-white',
          '#ff0000': 'text-red-600',
          '#00ff00': 'text-green-600',
          '#0000ff': 'text-blue-600',
          '#333333': 'text-gray-800',
          '#666666': 'text-gray-600',
          '#4d2c5e': '',
          '#9f7aea': 'text-purple-500'
        };
        const color = styles['color'];
        if (colorMap[color]) {
          classes.push(colorMap[color]);
        } else {
          // Preserve custom colors as inline style
          element.style.color = color;
        }
      }

      // Map font sizes with responsive scaling
      if (styles['font-size']) {
        const fontSizeMap = {
          '12px': 'text-xs sm:text-sm',
          '14px': 'text-sm sm:text-base',
          '16px': 'text-base sm:text-lg',
          '18px': 'text-lg sm:text-xl',
          '20px': 'text-xl sm:text-2xl',
          '24px': 'text-2xl sm:text-3xl',
          '30px': 'text-3xl sm:text-4xl',
          '36px': 'text-4xl sm:text-5xl'
        };
        classes.push(fontSizeMap[styles['font-size']] || 'text-base');
      }

      // Map font weight
      if (styles['font-weight']) {
        const fontWeightMap = {
          'bold': 'font-bold',
          '700': 'font-bold',
          '600': 'font-semibold',
          '400': 'font-normal',
          '300': 'font-light'
        };
        classes.push(fontWeightMap[styles['font-weight']] || 'font-normal');
      }

      // Map text decoration
      if (styles['text-decoration']) {
        const decorationMap = {
          'underline': 'underline',
          'line-through': 'line-through'
        };
        classes.push(decorationMap[styles['text-decoration']] || '');
      }

      // Map margins with responsive scaling
      if (styles['margin']) {
        const marginMap = {
          '0': 'm-0',
          '10px': 'm-2.5 sm:m-3',
          '20px': 'm-5 sm:m-6',
          'auto': 'mx-auto'
        };
        classes.push(marginMap[styles['margin']] || 'm-0');
      }

      // Map padding with responsive scaling
      if (styles['padding']) {
        const paddingMap = {
          '0': 'p-0',
          '10px': 'p-2.5 sm:p-3',
          '20px': 'p-5 sm:p-6'
        };
        classes.push(paddingMap[styles['padding']] || 'p-0');
      }

      // Map display
      if (styles['display']) {
        const displayMap = {
          'block': 'block',
          'inline': 'inline',
          'inline-block': 'inline-block'
        };
        classes.push(displayMap[styles['display']] || '');
      }

      return classes.filter(Boolean);
    };

    // Function to apply Tailwind classes to elements
    const applyStyles = (element) => {
      if (!element || !element.tagName) return;

      const tagName = element.tagName.toLowerCase();
      let classes = [];

      // Handle all possible tags from blog editor with blog-like styling
      switch (tagName) {
        case 'h1':
          classes.push('text-4xl sm:text-5xl font-bold  mb-6 sm:mb-8 mt-8 sm:mt-10 tracking-tight');
          break;
        case 'h2':
          classes.push('text-3xl sm:text-4xl font-semibold  mb-5 sm:mb-6 mt-6 sm:mt-8 tracking-tight');
          break;
        case 'h3':
          classes.push('text-2xl sm:text-3xl font-semibold  mb-4 sm:mb-5 mt-5 sm:mt-6');
          break;
        case 'h4':
          classes.push('text-xl sm:text-2xl font-semibold  mb-3 sm:mb-4 mt-4 sm:mt-5');
          break;
        case 'h5':
          classes.push('text-lg sm:text-xl font-semibold  mb-3 sm:mb-4 mt-3 sm:mt-4');
          break;
        case 'h6':
          classes.push('text-base sm:text-lg font-semibold  mb-2 sm:mb-3 mt-2 sm:mt-3');
          break;
        case 'p':
          classes.push('text-gray-700 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8');
          break;
        case 'div':
          classes.push('mb-6 sm:mb-8');
          break;
        case 'span':
          classes.push('inline');
          break;
        case 'ul':
          classes.push('list-disc pl-6 sm:pl-8 mb-6 sm:mb-8 text-gray-700');
          break;
        case 'ol':
          classes.push('list-decimal pl-6 sm:pl-8 mb-6 sm:mb-8 text-gray-700');
          break;
        case 'li':
          classes.push('text-base sm:text-lg mb-2 sm:mb-3 leading-relaxed');
          break;
        case 'img':
          classes.push('rounded-xl shadow-lg mb-6 sm:mb-8 mx-auto max-w-full h-auto object-cover');
          element.setAttribute('loading', 'lazy');
          break;
        case 'a':
          classes.push('text-orange-600 hover:underline font-medium transition-colors');
          element.setAttribute('target', '_blank');
          element.setAttribute('rel', 'noopener noreferrer');
          break;
        case 'blockquote':
          classes.push('border-l-4 border-purple-500 bg-purple-50 p-4 sm:p-6 rounded-lg mb-6 sm:mb-8 text-gray-600 italic text-base sm:text-lg leading-relaxed');
          break;
        case 'code':
          classes.push('bg-gray-100 text-red-600 px-1 sm:px-2 py-0.5 rounded font-mono text-sm sm:text-base');
          break;
        case 'pre':
          classes.push('bg-gray-100 p-4 sm:p-6 rounded-xl mb-6 sm:mb-8 overflow-x-auto text-sm sm:text-base font-mono');
          break;
        case 'table':
          classes.push('w-full border-collapse mb-6 sm:mb-8');
          break;
        case 'thead':
          classes.push('bg-purple-100');
          break;
        case 'th':
          classes.push('border border-gray-200 px-4 sm:px-6 py-3 text-left font-semibold  text-sm sm:text-base');
          break;
        case 'td':
          classes.push('border border-gray-200 px-4 sm:px-6 py-3 text-gray-700 text-sm sm:text-base');
          break;
        case 'hr':
          classes.push('border-t border-gray-300 my-6 sm:my-8');
          break;
        case 'br':
          classes.push('block');
          break;
        case 'sub':
          classes.push('text-xs sm:text-sm align-sub');
          break;
        case 'sup':
          classes.push('text-xs sm:text-sm align-super');
          break;
        case 'u':
          classes.push('underline');
          break;
        case 's':
          classes.push('line-through');
          break;
        case 'iframe':
          classes.push('w-full h-64 sm:h-96 rounded-xl mb-6 sm:mb-8');
          break;
        case 'video':
          classes.push('w-full rounded-xl mb-6 sm:mb-8');
          element.setAttribute('controls', 'true');
          break;
        case 'audio':
          classes.push('w-full mb-6 sm:mb-8');
          element.setAttribute('controls', 'true');
          break;
        case 'figure':
          classes.push('mb-6 sm:mb-8 text-center');
          break;
        case 'figcaption':
          classes.push('text-sm sm:text-base text-gray-500 italic mt-2 sm:mt-3');
          break;
        case 'strong':
          classes.push('font-bold text-gray-900');
          break;
        case 'em':
          classes.push('italic text-gray-800');
          break;
        default:
          // Fallback for unrecognized tags
          classes.push('text-gray-700 text-base sm:text-lg');
          break;
      }

      // Handle inline styles
      const style = element.getAttribute('style') || '';
      if (style) {
        classes.push(...mapInlineStyles(style, element));
      }

      // Handle align attribute for older editors
      const align = element.getAttribute('align');
      if (align) {
        const alignMap = {
          'left': 'text-left',
          'center': 'text-center',
          'right': 'text-right',
          'justify': 'text-justify'
        };
        classes.push(alignMap[align.toLowerCase()] || 'text-left');
      }

      // Apply classes if any
      if (classes.length > 0) {
        const existingClasses = element.getAttribute('class') || '';
        element.setAttribute('class', `${existingClasses} ${classes.join(' ')}`.trim());
      }

      // Recursively process child elements
      Array.from(element.children).forEach((child) => applyStyles(child));
    };

    // Apply styles to all elements in the document body
    Array.from(doc.body.children).forEach((child) => applyStyles(child));

    // Serialize the processed HTML back to a string
    return doc.body.innerHTML;
  };

  // Process the content if provided
  const processedContent = content ? processBlogContent(content) : '';

  return (
    <div className="w-full max-w-none">
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />
    </div>
  );
};

BlogContentRenderer.propTypes = {
  content: PropTypes.string.isRequired,
};

export default BlogContentRenderer;