import { Github, Linkedin } from "lucide-react"

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-white font-black text-7xl md:text-8xl lg:text-9xl leading-none tracking-tighter">
          SHUN
          <br />
          KAKI
          <br />
          NOKI
        </h1>
      </div>
      <nav className="fixed bottom-8 flex items-center gap-6" aria-label="Social links">
        <a
          href="https://x.com/shunkakinoki"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-500 transition-colors hover:text-white"
          aria-label="X (Twitter)"
        >
          <XIcon className="size-5" />
        </a>
        <a
          href="https://github.com/shunkakinoki"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-500 transition-colors hover:text-white"
          aria-label="GitHub"
        >
          <Github className="size-5" />
        </a>
        <a
          href="https://linkedin.com/in/shunkakinoki"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-500 transition-colors hover:text-white"
          aria-label="LinkedIn"
        >
          <Linkedin className="size-5" />
        </a>
      </nav>
    </main>
  )
}
