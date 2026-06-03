import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'
import { getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function getExcerpt(post?: SitePost | null, limit = 130) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

function getCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Article'
}

function SectionHeader({ title, href, cta = 'View all' }: { title: string; href?: string; cta?: string }) {
  return (
    <div className="border-t-4 border-[#0f4f59] bg-white px-4 py-3 shadow-[0_1px_0_rgba(15,79,89,0.12)]">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-base font-black uppercase tracking-[-0.01em] text-[#102a2f]">{title}</h2>
        {href ? <Link href={href} className="text-xs font-black uppercase tracking-[0.14em] text-[#0f4f59] hover:underline">{cta}</Link> : null}
      </div>
    </div>
  )
}

function HomeSidebar({ posts, primaryTask, primaryRoute }: { posts: SitePost[]; primaryTask: TaskKey; primaryRoute: string }) {
  const hot = posts.slice(0, 4)
  return (
    <aside className="grid gap-6 lg:sticky lg:top-32 lg:self-start">
      <section>
        <SectionHeader title="Keep in touch" />
        <div className="mt-4 grid grid-cols-2 gap-2">
          {[
            ['f', '27k', 'Readers'],
            ['t', '254', 'Updates'],
            ['in', '1.9k', 'Shares'],
            ['@', '190', 'Writers'],
          ].map(([icon, count, label], index) => (
            <div key={label} className={`min-h-24 p-4 text-center text-white ${index === 0 ? 'bg-[#38549c]' : index === 1 ? 'bg-[#21a7df]' : index === 2 ? 'bg-[#0f4f59]' : 'bg-[#c72f8f]'}`}>
              <p className="text-2xl font-black">{icon}</p>
              <p className="mt-2 text-xl font-black">{count}</p>
              <p className="text-xs font-bold">{label}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="border border-[var(--editable-border)] bg-white p-5">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0f4f59]">Editorial note</p>
        <p className="mt-3 text-sm font-semibold leading-7 text-[#496266]">Fresh article picks, useful explainers, and strong headlines are arranged for quick scanning and deeper reading.</p>
        <Link href="/create" className="mt-5 inline-flex rounded bg-[#0f4f59] px-4 py-2 text-sm font-black text-white">Create article</Link>
      </section>
      <section>
        <SectionHeader title="What's hot" />
        <div className="mt-4 grid gap-4 border border-[var(--editable-border)] bg-white p-4">
          {hot.map((post) => (
            <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="grid grid-cols-[82px_minmax(0,1fr)] gap-3">
              <img src={getEditablePostImage(post)} alt={post.title} className="h-20 w-full object-cover" />
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#71878a]">{getCategory(post)}</p>
                <h3 className="mt-1 line-clamp-3 text-sm font-black leading-tight text-[#102a2f]">{post.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </aside>
  )
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const heroTitle = pagesContent.home.hero.title.join(' ') || `Come for the ${taskLabel(primaryTask).toLowerCase()}. Stay for the connection.`
  const lead = posts[0]
  const sidePosts = posts.slice(1, 3)
  return (
    <section className={`${pal.creamBg} border-b border-black/[0.06]`}>
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:px-8 lg:py-14">
        <div>
          <p className={`${dc.type.eyebrow} ${pal.accentText}`}>{pagesContent.home.hero.badge}</p>
          <h1 className="mt-4 max-w-xl text-4xl font-black leading-[1.04] tracking-[-0.04em] sm:text-5xl lg:text-6xl">{heroTitle}</h1>
          <p className={`mt-5 max-w-lg text-base leading-relaxed ${pal.mutedText} sm:text-lg`}>{pagesContent.home.hero.description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={primaryRoute} className={dc.button.primary}>Browse {taskLabel(primaryTask).toLowerCase()} <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/search" className={dc.button.secondary}>Search archive</Link>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
          {lead ? (
            <Link href={postHref(primaryTask, lead, primaryRoute)} className="group relative min-h-[430px] overflow-hidden rounded-lg bg-black text-white shadow-[0_18px_50px_rgba(15,79,89,0.18)]">
              <img src={getEditablePostImage(lead)} alt={lead.title} className="absolute inset-0 h-full w-full object-cover opacity-78 transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.78))]" />
              <div className="relative z-10 flex min-h-[430px] flex-col justify-end p-6">
                <span className="w-fit bg-[#0f4f59] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em]">Top story</span>
                <h2 className="mt-4 max-w-xl text-3xl font-black leading-tight tracking-[-0.03em] sm:text-4xl">{lead.title}</h2>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/78">{getExcerpt(lead, 150)}</p>
              </div>
            </Link>
          ) : null}
          <div className="grid gap-4">
            {sidePosts.map((post, index) => (
              <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group relative min-h-[208px] overflow-hidden rounded-lg bg-black text-white">
                <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-76 transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.76))]" />
                <div className="relative z-10 flex min-h-[208px] flex-col justify-end p-5">
                  <span className="w-fit bg-[#0f4f59] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em]">Pick {index + 1}</span>
                  <h3 className="mt-3 line-clamp-3 text-xl font-black leading-tight">{post.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const top = posts.slice(0, 7)
  const lead = top[0]
  const list = top.slice(1, 5)
  if (!top.length) return null
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
        <div>
          <SectionHeader title="Top stories" href={primaryRoute} />
          {lead ? (
            <Link href={postHref(primaryTask, lead, primaryRoute)} className="group mt-6 block overflow-hidden bg-white">
              <div className="relative min-h-[390px] bg-black">
                <img src={getEditablePostImage(lead)} alt={lead.title} className="absolute inset-0 h-full w-full object-cover opacity-78 transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.78))]" />
                <div className="relative z-10 flex min-h-[390px] flex-col justify-end p-6 sm:p-8">
                  <span className="w-fit bg-[#0f4f59] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white">{getCategory(lead)}</span>
                  <h3 className="mt-4 max-w-3xl text-3xl font-black leading-tight tracking-[-0.03em] text-white sm:text-4xl">{lead.title}</h3>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-white/78">{getExcerpt(lead, 190)}</p>
                </div>
              </div>
            </Link>
          ) : null}
          <div className="mt-8 grid gap-7">
            {list.map((post) => (
              <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group grid gap-5 sm:grid-cols-[220px_minmax(0,1fr)]">
                <img src={getEditablePostImage(post)} alt={post.title} className="aspect-[16/11] w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
                <div>
                  <span className="bg-[#0f4f59] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white">{getCategory(post)}</span>
                  <h3 className="mt-3 text-2xl font-black leading-tight tracking-[-0.03em] text-[#102a2f]">{post.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#496266]">{getExcerpt(post, 170)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <HomeSidebar posts={posts.slice(5)} primaryTask={primaryTask} primaryRoute={primaryRoute} />
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const featured = posts.slice(0, 8)
  if (!featured.length) return null
  return (
    <section className="bg-[#f8fbfa]">
      <div className="mx-auto max-w-[var(--editable-container)] px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeader title="Trending now" href={primaryRoute} />
        <div className="mt-6 grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {featured.slice(0, 8).map((post) => (
            <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#d9e7e5]">
                <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <span className="mt-3 inline-flex bg-[#0f4f59] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white">{getCategory(post)}</span>
              <h3 className="mt-3 line-clamp-2 text-lg font-black leading-tight text-[#102a2f]">{post.title}</h3>
              <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#496266]">{getExcerpt(post, 135)}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const categoryPosts = timeSections.flatMap((section) => section.posts).length ? timeSections.flatMap((section) => section.posts) : posts.slice(8)
  const feature = categoryPosts[0] || posts[0]
  const mosaic = categoryPosts.slice(1, 5)
  const indexPosts = categoryPosts.slice(5, 14)
  return (
    <section className="bg-white">
      {feature ? (
        <div className="mx-auto max-w-[var(--editable-container)] px-4 py-12 sm:px-6 lg:px-8">
          <SectionHeader title="Editor's layout" href="/search" cta="Search" />
          <div className="mt-6 grid gap-1 lg:grid-cols-[1.15fr_0.85fr]">
            <Link href={postHref(primaryTask, feature, primaryRoute)} className="group relative min-h-[430px] overflow-hidden bg-black text-white">
              <img src={getEditablePostImage(feature)} alt={feature.title} className="absolute inset-0 h-full w-full object-cover opacity-72 transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.78))]" />
              <div className="relative z-10 flex min-h-[430px] flex-col justify-end p-7 sm:p-9">
                <span className="w-fit bg-[#0f4f59] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white">{getCategory(feature)}</span>
                <h3 className="mt-4 max-w-2xl text-4xl font-black leading-tight tracking-[-0.03em] sm:text-5xl">{feature.title}</h3>
              </div>
            </Link>
            <div className="grid gap-1 sm:grid-cols-2">
              {mosaic.map((post) => (
                <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group relative min-h-[214px] overflow-hidden bg-black text-white">
                  <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-76 transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.75))]" />
                  <div className="relative z-10 flex min-h-[214px] flex-col justify-end p-5">
                    <span className="w-fit bg-[#0f4f59] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em]">{getCategory(post)}</span>
                    <h3 className="mt-3 line-clamp-2 text-xl font-black leading-tight">{post.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {indexPosts.slice(0, 3).map((post) => (
              <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group block">
                <img src={getEditablePostImage(post)} alt={post.title} className="aspect-[16/11] w-full object-cover transition duration-700 group-hover:scale-[1.02]" />
                <span className="mt-3 inline-flex bg-[#0f4f59] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white">{getCategory(post)}</span>
                <h3 className="mt-3 text-2xl font-black leading-tight tracking-[-0.03em] text-[#102a2f]">{post.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#496266]">{getExcerpt(post, 150)}</p>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section id="get-app" className={`${pal.panelBg} relative scroll-mt-24 overflow-hidden border-t border-black/[0.06]`}>
      <div className="relative mx-auto max-w-[var(--editable-container)] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Have an article idea ready?</h2>
          <p className={`mt-4 text-lg ${pal.mutedText}`}>Create an account, draft your story details, and send a focused article submission through the publishing workspace.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4"><Link href="/create" className={dc.button.primary}>Create article</Link><Link href="/contact" className={dc.button.secondary}>Contact editorial</Link></div>
        </div>
      </div>
    </section>
  )
}
