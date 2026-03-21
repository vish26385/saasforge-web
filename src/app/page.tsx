import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-bold">
            SaaSForge Web
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
            >
              <span className="text-white">Start Free</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <span className="inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              AI Reply Assistant SaaS
            </span>

            <h1 className="text-5xl font-bold leading-tight">
              Turn customer messages into professional replies in seconds
            </h1>

            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              Help businesses reply faster on WhatsApp, Instagram, and Google
              Reviews. Paste a customer message, choose tone and platform, and
              generate a polished AI reply instantly.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
              >
                Start Free
              </Link>

              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Login
              </Link>
            </div>

            <div className="grid gap-4 pt-4 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-2xl font-bold">3x</p>
                <p className="mt-1 text-sm text-slate-600">
                  Faster customer replies
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-2xl font-bold">24/7</p>
                <p className="mt-1 text-sm text-slate-600">
                  Ready-to-use reply support
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-2xl font-bold">1 app</p>
                <p className="mt-1 text-sm text-slate-600">
                  For chats, reviews, and DMs
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-sm">
            <div className="space-y-4 rounded-2xl bg-white/10 p-5 backdrop-blur">
              <p className="text-sm font-medium text-slate-200">
                Customer message
              </p>
              <div className="rounded-xl bg-white/10 p-4 text-slate-100">
                Your cake delivery was late and I am disappointed.
              </div>
            </div>

            <div className="my-4 flex justify-center">
              <span className="rounded-full bg-indigo-500 px-4 py-2 text-sm font-semibold text-white">
                AI generates reply
              </span>
            </div>

            <div className="space-y-4 rounded-2xl bg-white p-5 text-slate-900 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Generated reply
              </p>
              <div className="rounded-xl bg-slate-50 p-4 leading-7">
                We sincerely apologize for the delay in your delivery. We
                understand how frustrating this must have been, and we truly
                appreciate your feedback. We will work to ensure a much better
                experience next time.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-bold">Why businesses use it</h2>
          <p className="text-slate-600">
            Built for real-world communication where fast, professional replies
            matter.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Reply faster</h3>
            <p className="mt-3 leading-7 text-slate-600">
              Stop wasting time typing every customer response from scratch.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Sound professional</h3>
            <p className="mt-3 leading-7 text-slate-600">
              Keep your brand tone polished across chats, reviews, and messages.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Handle difficult messages</h3>
            <p className="mt-3 leading-7 text-slate-600">
              Generate empathetic and clear replies for complaints or negative
              reviews.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-bold">How it works</h2>
          <p className="text-slate-600">
            Simple workflow for stores, freelancers, agencies, and service
            businesses.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white">
              1
            </div>
            <h3 className="text-xl font-semibold">Paste the message</h3>
            <p className="mt-3 leading-7 text-slate-600">
              Add a WhatsApp message, Instagram DM, or Google review.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white">
              2
            </div>
            <h3 className="text-xl font-semibold">Choose tone and platform</h3>
            <p className="mt-3 leading-7 text-slate-600">
              Select the style that matches your business communication.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white">
              3
            </div>
            <h3 className="text-xl font-semibold">Copy and send</h3>
            <p className="mt-3 leading-7 text-slate-600">
              Get a ready-to-send reply in seconds and use it with confidence.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-bold">Pricing</h2>
          <p className="text-slate-600">
            Start free and upgrade when your business needs more.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Free
            </p>
            <h3 className="mt-2 text-3xl font-bold">₹0</h3>
            <p className="mt-4 text-slate-600">
              For trying the product and testing reply generation.
            </p>

            <ul className="mt-6 space-y-3 text-slate-700">
              <li>• Basic AI reply generation</li>
              <li>• Limited monthly usage</li>
              <li>• Business profile setup</li>
            </ul>

            <Link
              href="/register"
              className="mt-8 inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Start Free
            </Link>
          </div>

          <div className="rounded-2xl border border-indigo-200 bg-white p-8 shadow-sm ring-2 ring-indigo-100">
            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
              Pro
            </p>
            <h3 className="mt-2 text-3xl font-bold">₹499/mo</h3>
            <p className="mt-4 text-slate-600">
              For serious businesses handling more customer conversations.
            </p>

            <ul className="mt-6 space-y-3 text-slate-700">
              <li>• Higher monthly reply limits</li>
              <li>• Faster workflow for daily use</li>
              <li>• Better scale for shops and agencies</li>
            </ul>

            <Link
              href="/register"
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              Upgrade to Pro
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-slate-900 px-8 py-12 text-center text-white shadow-sm">
          <h2 className="text-3xl font-bold">
            Ready to turn customer messages into better business communication?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300 leading-7">
            Start with your first AI-generated reply and build a faster, more
            professional support workflow.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              Start Free
            </Link>

            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Login
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}