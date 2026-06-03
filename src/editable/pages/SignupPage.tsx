import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#0f4f59] text-white">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[var(--editable-container)] items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.82fr_0.98fr] lg:px-8">
          <div className="rounded-lg border border-white/15 bg-white p-6 text-[#102a2f] shadow-[0_24px_70px_rgba(0,0,0,0.22)] sm:p-8">
            <h1 className="text-3xl font-black tracking-[-0.05em]">{pagesContent.auth.signup.formTitle}</h1>
            <EditableLocalSignupForm />
            <p className="mt-5 text-sm text-[#496266]">Already have an account? <Link href="/login" className="font-black text-[#0f4f59] underline-offset-4 hover:underline">{pagesContent.auth.signup.loginCta}</Link></p>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-white/60">{pagesContent.auth.signup.badge}</p>
            <h2 className="mt-5 max-w-xl text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">{pagesContent.auth.signup.title}</h2>
            <p className="mt-6 max-w-lg text-sm leading-8 text-white/68">{pagesContent.auth.signup.description}</p>
            <div className="mt-8 grid gap-3 text-sm font-bold text-white/80 sm:grid-cols-3">
              {['Publish articles', 'Follow topics', 'Use clean forms'].map((item) => <span key={item} className="rounded-lg border border-white/15 bg-white/10 px-4 py-3">{item}</span>)}
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
