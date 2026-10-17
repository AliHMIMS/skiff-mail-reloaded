// // This is a wrapper above React-pdf made to lazy-load the library and handle specific worker logic in a central place
import pdfjsWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.js?url';
import { Document, Page, pdfjs } from 'react-pdf';

if (typeof window === 'object') {
  // don't do this when loading server-side with nextjs
  try {
    pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorkerUrl;
  } catch {
    // this doesn't work in a test environment when Jest is running it, in this case do nothing
  }
}

export { Document, Page };
