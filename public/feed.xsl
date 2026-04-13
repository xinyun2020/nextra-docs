<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" encoding="UTF-8" />
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title><xsl:value-of select="/rss/channel/title" /> — RSS Feed</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #fafafa; color: #374151; line-height: 1.6; padding: 2rem 1rem; }
          @media (prefers-color-scheme: dark) {
            body { background: #111; color: #d1d5db; }
            .card { background: #1a1a1a; border-color: #333; }
            a { color: #0AAFCE; }
            .hint { background: #1a2a2e; border-color: #0AAFCE33; }
          }
          .container { max-width: 640px; margin: 0 auto; }
          h1 { font-size: 1.5rem; font-weight: 600; margin-bottom: 0.25rem; }
          .description { color: #6b7280; font-size: 0.95rem; margin-bottom: 1.5rem; }
          .hint { background: #f0fdf4; border: 1px solid #0AAFCE22; border-radius: 8px; padding: 0.75rem 1rem; font-size: 0.85rem; color: #6b7280; margin-bottom: 2rem; }
          .hint strong { color: #0AAFCE; }
          .card { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1rem 1.25rem; margin-bottom: 0.75rem; }
          .card h2 { font-size: 1rem; font-weight: 500; margin-bottom: 0.25rem; }
          .card h2 a { color: #0AAFCE; text-decoration: none; }
          .card h2 a:hover { text-decoration: underline; }
          .card .meta { font-size: 0.8rem; color: #9ca3af; }
          .card .desc { font-size: 0.875rem; color: #6b7280; margin-top: 0.4rem; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1><xsl:value-of select="/rss/channel/title" /></h1>
          <p class="description"><xsl:value-of select="/rss/channel/description" /></p>
          <div class="hint">
            This is an <strong>RSS feed</strong>. Copy the URL from your browser's address bar and paste it into your RSS reader to subscribe.
          </div>
          <xsl:for-each select="/rss/channel/item">
            <div class="card">
              <h2><a href="{link}" target="_blank"><xsl:value-of select="title" /></a></h2>
              <div class="meta"><xsl:value-of select="pubDate" /></div>
              <xsl:if test="description != title">
                <div class="desc"><xsl:value-of select="description" /></div>
              </xsl:if>
            </div>
          </xsl:for-each>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
