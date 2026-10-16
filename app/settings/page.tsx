import Link from "next/link";

function page() {
  return (
    <section>
      <p>No settings page yet</p>
      <p>Navigate to dashboard</p>
      <span>
        <Link className="underline hover:text-red-600" href="/dashboard">
          Go to dashboard
        </Link>
      </span>
    </section>
  );
}

export default page;
