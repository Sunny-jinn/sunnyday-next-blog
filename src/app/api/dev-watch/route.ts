import fs from 'fs';
import path from 'path';

export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return new Response(null, { status: 404 });
  }

  const encoder = new TextEncoder();
  let watcher: fs.FSWatcher;
  let keepAlive: NodeJS.Timeout;

  const stream = new ReadableStream({
    start(controller) {
      const postsDir = path.join(process.cwd(), '_posts');
      watcher = fs.watch(postsDir, (_event, filename) => {
        if (filename?.endsWith('.mdx')) {
          controller.enqueue(encoder.encode('data: reload\n\n'));
        }
      });
      keepAlive = setInterval(() => {
        try { controller.enqueue(encoder.encode(': ping\n\n')); } catch {}
      }, 15000);
    },
    cancel() {
      watcher?.close();
      clearInterval(keepAlive);
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
    },
  });
}
