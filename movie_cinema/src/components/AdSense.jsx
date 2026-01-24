import { useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Google AdSense Component
 * @param {string} client
 * @param {string} slot
 * @param {string} format
 * @param {boolean} responsive
 * @param {string} style
 */
const AdSense = ({
  client = 'ca-pub-2029502431652074',
  slot = '',
  format = 'auto',
  responsive = true,
  style = { display: 'block' },
  className = ''
}) => {
  useEffect(() => {
    try {
      // Push ad to AdSense
      if (window.adsbygoogle && import.meta.env.NODE_ENV !== 'development') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  // Don't show ads in development
  if (import.meta.env.NODE_ENV === 'development') {
    return (
      <div
        className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 ${className}`}
        style={{ minHeight: '250px', ...style }}
      >
        <p className="text-sm">AdSense Placeholder (Dev Mode)</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
        data-adtest="on"    
      />
    </div>
  );
};

AdSense.propTypes = {
  client: PropTypes.string,
  slot: PropTypes.string,
  format: PropTypes.string,
  responsive: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string
};

export default AdSense;
