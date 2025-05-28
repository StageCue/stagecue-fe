export const Spinner = () => (
  <span
    style={{
      display: 'inline-block',
      width: 20,
      height: 20,
      border: '3px solid #e0e0e2',
      borderTop: '3px solid #6a6a6a',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      verticalAlign: 'middle',
    }}
  />
);

const style = document.createElement('style');
style.innerHTML = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
document.head.appendChild(style);
