#!/usr/bin/env python3
"""
Local dev server with API proxy to avoid CORS issues.
Serves static files + proxies /api/* requests to SigiloPay.
"""

import http.server
import json
import urllib.request
import urllib.error
import ssl

PORT = 8888
SIGILO_BASE = "https://app.sigilopay.com.br"

class ProxyHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path.startswith('/api/'):
            self.proxy_request()
        else:
            self.send_error(404)

    def proxy_request(self):
        # Read request body
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length) if content_length > 0 else b''

        # Build target URL: /api/v1/gateway/pix/receive → https://app.sigilopay.com.br/api/v1/gateway/pix/receive
        target_url = SIGILO_BASE + self.path

        # Forward headers
        headers = {
            'Content-Type': 'application/json',
            'x-public-key': self.headers.get('x-public-key', ''),
            'x-secret-key': self.headers.get('x-secret-key', ''),
        }

        try:
            req = urllib.request.Request(
                target_url,
                data=body,
                headers=headers,
                method='POST'
            )
            # Allow HTTPS
            ctx = ssl.create_default_context()
            
            with urllib.request.urlopen(req, context=ctx) as resp:
                response_body = resp.read()
                
                self.send_response(resp.status)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(response_body)

        except urllib.error.HTTPError as e:
            error_body = e.read()
            self.send_response(e.code)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(error_body)

        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())

    def do_OPTIONS(self):
        """Handle CORS preflight requests"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, x-public-key, x-secret-key')
        self.end_headers()

    def end_headers(self):
        # Add CORS headers to all responses
        if 'Access-Control-Allow-Origin' not in self._headers_buffer[0].decode() if self._headers_buffer else True:
            pass
        super().end_headers()

if __name__ == '__main__':
    with http.server.HTTPServer(('', PORT), ProxyHandler) as httpd:
        print(f'🚀 Server running at http://localhost:{PORT}')
        print(f'📡 API proxy: /api/* → {SIGILO_BASE}/api/*')
        httpd.serve_forever()
