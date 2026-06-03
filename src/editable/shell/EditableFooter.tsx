'use client'

import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const footerVars = { '--editable-footer-bg': '#081719', '--editable-footer-text': '#ffffff' } as CSSProperties
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()
  const site = globalContent.site
  const exploreLinks = globalContent.footer.columns[0]?.links || []

  return (
    <footer style={footerVars} className="bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.15fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg border border-white/15 bg-white">
              <img src="/favicon.png?v=20260413" alt={site.name} className="h-9 w-9 object-contain" />
            </span>
            <span className="text-3xl font-black tracking-[-0.05em]">{site.name}</span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/70">{globalContent.footer.description}</p>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.22em] text-white/55">Explore</h3>
          <div className="mt-4 grid gap-1">
            {exploreLinks
              .filter((item) => item.label !== 'Profiles' && item.href !== '/create')
              .map((item) => (
                <Link key={item.href} href={item.href} className="inline-flex items-center gap-2 border-b border-white/10 py-2 text-sm font-bold text-white/75 hover:text-white">
                  {item.label} <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.22em] text-white/55">Site</h3>
          <div className="mt-4 grid gap-1">
            {[
              ['About', '/about'],
              ['Contact', '/contact'],
              ...(session ? [['Create', '/create']] : [['Login', '/login'], ['Sign up', '/signup']]),
            ].map(([label, href]) => (
              <Link key={href} href={href} className="border-b border-white/10 py-2 text-sm font-bold text-white/75 hover:text-white">{label}</Link>
            ))}
            {session ? <button type="button" onClick={logout} className="border-b border-white/10 py-2 text-left text-sm font-bold text-white/75 hover:text-white">Logout {session.name}</button> : null}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs font-bold text-white/55">
        © {year} {site.name}. {globalContent.footer.bottomNote}
      </div>
    </footer>
  )
}
