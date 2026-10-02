// Simple toast notification system (event-based, to avoid circular deps)
const toast = {
  _listeners: [],
  
  _dispatch(type, message, options = {}) {
    const event = { id: Date.now(), type, message, duration: options.duration || 4000, ...options };
    this._listeners.forEach((fn) => fn(event));
  },

  success(message, options) { this._dispatch('success', message, options); },
  error(message, options) { this._dispatch('error', message, { duration: 6000, ...options }); },
  warning(message, options) { this._dispatch('warning', message, options); },
  info(message, options) { this._dispatch('info', message, options); },

  subscribe(fn) {
    this._listeners.push(fn);
    return () => {
      this._listeners = this._listeners.filter((l) => l !== fn);
    };
  },
};

export default toast;
