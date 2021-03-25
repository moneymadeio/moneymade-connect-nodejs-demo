export function Error() {
  window.opener && window.opener.postMessage({ status: 'FAILED' }, '*');
  window.parent && window.parent.postMessage({ status: 'FAILED' }, '*');

  return (<div className='Centered'>
    <h1>
      Sorry, something went wrong
    </h1>
  </div>);
}