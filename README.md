# Portfolio content

The portfolio's editable text, links, project data, experience, testimonials, and image URLs live in one JSON document: [`src/data/content.json`](./src/data/content.json). This complete file is also the content to paste into a public GitHub Gist. Name the Gist file `portfolio_content.json` and paste the entire JSON document as-is.

## Connect your Gist

The site now loads your public Gist by default:
`https://gist.githubusercontent.com/karan2399/57dd5b27216e6925fd2b49877c87bc65/raw/portfolio_content.json`

To switch to a different Gist, create a **public** Gist containing `portfolio_content.json`, copy the file's **Raw** URL, and set it in `.env.local` at the project root:

   ```dotenv
   VITE_CONTENT_URL=https://gist.githubusercontent.com/USERNAME/GIST_ID/raw/portfolio_content.json
   ```

Restart the dev server or rebuild/redeploy the site after changing the URL. Subsequent edits to the Gist JSON are fetched by the deployed site without rebuilding.

If the hosted JSON cannot be fetched or is invalid, the site logs the error and keeps showing its included content.

## Editing content

Edit the matching fields in the JSON file. The top-level keys correspond to site metadata/navigation, each section, and the project/experiment/experience/testimonial lists. Links and image sources can be absolute `https://` URLs; local image paths (for example `/images/profile-photo.jpg`) use files included with the deployed site. A public Gist is visible to anyone, so do not put secrets or private information in it.

The contact form also requires the existing `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY` environment variables. These are separate from the public content document.
