import Link from "next/link";

export default function Authorize() {
  return (
    <>
      <div>You&apos;re not logged in.</div>
      <h1>
        You can&nbsp;
        <Link href="/login">
          log in
        </Link>, or&nbsp;
        <Link href="/register">
          register
        </Link>.
      </h1>
    </>
  );
}