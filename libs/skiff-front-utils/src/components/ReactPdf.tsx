// Wrapper around react-pdf: lazy-loaded, and the one place that configures the pdf.js worker
import pdfjsWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

if (typeof window === 'object') {
  // don't do this when loading server-side with nextjs
  try {
    pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorkerUrl;
  } catch {
    // not available in non-browser environments (tests); nothing to configure there
  }
}

export { Document, Page };
