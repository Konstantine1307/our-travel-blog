import Link from "next/link";
export default function PostTitle({ children }) {
  return (
    <section className="flex justify-between">
    <h1 className="text-2xl md:text-4xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left text-emerald-900">
      {children}
    </h1>
    <Link href="mailto:info@tgcottage.com" className="text-2xl font-semibold underline underline-offset-4">Get in touch</Link>
    </section>
  );
}
