document.querySelector('[data-copy]').addEventListener('click', async function () {
 const status = document.querySelector('.copy-status');
 try { await navigator.clipboard.writeText(document.getElementById('bibtex').textContent); status.textContent = 'Copied.'; }
 catch { status.textContent = 'Select the text or use Download .bib.'; }
});
