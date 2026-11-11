==============================================================================
J.A. SOVEREIGN GOD LIMITED - cPanel Deployment Instructions
==============================================================================

How to deploy this website to cPanel:

STEP 1: Log in to your cPanel Dashboard
------------------------------------------------------------------------------
- Access your cPanel (usually yourdomain.com/cpanel or yourdomain.com:2083).
- Log in with your cPanel username and password.

STEP 2: Open File Manager
------------------------------------------------------------------------------
- Under the "Files" section, click on "File Manager".
- Navigate to the "public_html" directory (or the root directory of your domain/subdomain).
- If there is an existing default "index.html" or old files, back them up or delete them.

STEP 3: Upload and Extract
------------------------------------------------------------------------------
Option A (Recommended - Fast):
1. Click the "Upload" button at the top toolbar in File Manager.
2. Select the "dist.zip" (or "jasovereigngod-cpanel-dist.zip") file.
3. Once the upload finishes (100% / green bar), return to File Manager.
4. Select the uploaded zip file and click "Extract" in the top toolbar.
5. Choose "/public_html" as the extraction destination.
6. Verify that "index.html", "about.html", "services.html", "equipment.html", 
   "assets/", "images/", and ".htaccess" are now directly inside public_html.
7. Delete the uploaded zip file from the server to save space.

Option B:
1. Unzip "dist.zip" on your local computer.
2. Inside the unzipped folder, select all files and folders (index.html, about.html, assets, images, etc.).
3. Upload all of them directly into "public_html" using File Manager or an FTP client like FileZilla.

STEP 4: Test Your Live Site
------------------------------------------------------------------------------
- Open your domain in your web browser (e.g. https://yourdomain.com).
- Check navigation across all pages (Home, About, Services, Equipment, Training, Contact, FAQ, etc.).
- Confirm all images, fonts, styles, and forms load smoothly.

Contact / Support:
J.A. Sovereign God Limited
Tema, Ghana
Tel: 0244406085 / 0244406086
Email: jasovereigngod@gmail.com
==============================================================================
