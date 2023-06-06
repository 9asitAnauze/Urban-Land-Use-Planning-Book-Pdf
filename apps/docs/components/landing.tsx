import Link from "next/link";

export function Landing() {
  return (
    <div className="relative">
      <div className="mx-auto max-w-[80rem] px-12 py-32">
        <div className="flex flex-col items-center gap-8 md:items-start lg:gap-10">
          <h1 className="max-w-4xl text-center text-6xl font-bold text-blue-400 md:text-left md:text-7xl lg:text-8xl">
            Visually Edit React Three Fiber Components
          </h1>

          <span className="text-center text-xl text-neutral-300">
            Save your changes straight back to source code.
          </span>

          <Link
            href="/docs/overview"
            className="rounded-full border-[3px] border-blue-400 px-10 py-4 text-xl font-semibold text-blue-400 hover:bg-blue-400 hover:text-neutral-900 md:ml-auto lg:text-2xl xl:mr-28"
          >
            Get Started →
          </Link>
        </div>
      </div>
    </div>
  );
}