"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const WHATSAPP_URL = "https://wa.me/5511933097553";
const INSTAGRAM_URL = "https://instagram.com/allumiclinic";
const LINKTREE_URL = "https://linktr.ee/Allumiclinic";

type Service = { title: string; desc: string };

type ServiceCategory = {
  id: string;
  label: string;
  icon: React.ReactNode;
  image: string;
  items: Service[];
};

function useInViewOnce<T extends Element>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, ...options },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView } as const;
}

function LogoMark({ className }: { className?: string }) {
  return (
    <div
      className={cx(
        "flex items-center gap-3",
        className,
      )}
      data-testid="brand-logo"
      aria-label="Allumi Clinic"
    >
      <div
        className="relative grid size-10 place-items-center overflow-hidden rounded-full border bg-white/55 backdrop-blur-sm"
        data-testid="brand-logomark"
      >
        <img src="/logo-allumi.png" alt="Allumi Logo" className="h-full w-full object-cover" />
      </div>
      <div className="leading-tight">
        <div
          className="font-serif text-[15px] tracking-[0.22em]"
          data-testid="text-brand"
        >
          ALLUMI
        </div>
        <div className="text-xs tracking-[0.32em] text-muted-foreground" data-testid="text-brand-sub">
          CLINIC
        </div>
      </div>
    </div>
  );
}

function SectionHeader({
  kicker,
  title,
  description,
  align = "left",
}: {
  kicker: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cx(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      <div className="lux-kicker" data-testid={`text-kicker-${kicker.toLowerCase().replace(/\s+/g, "-")}`}
      >
        {kicker}
      </div>
      <h2 className="lux-h2 mt-3" data-testid={`text-title-${title.toLowerCase().slice(0, 20).replace(/\s+/g, "-")}`}>
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground" data-testid="text-section-description">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, ease: [0.21, 0.9, 0.2, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full border bg-white/80 px-4 py-3 text-sm shadow-[0_20px_60px_-35px_rgba(0,0,0,0.5)] backdrop-blur-md transition hover:shadow-[0_20px_60px_-28px_rgba(0,0,0,0.6)]"
      data-testid="link-whatsapp-floating"
      aria-label="Falar no WhatsApp"
    >
      <span className="grid size-9 place-items-center rounded-full lux-gradient-gold text-black" data-testid="icon-whatsapp">
        <MessageCircle className="size-4" strokeWidth={2.2} />
      </span>
      <span className="hidden sm:inline" data-testid="text-whatsapp-cta">Falar no WhatsApp</span>
    </a>
  );
}

function GallerySlider() {
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const slides = useMemo(
    () => [
      {
        image: "/images/recepcao-1.jpg",
        title: "Recepção",
        caption: "Arquitetura contemporânea, iluminação suave e design minimalista transmitem elegância e acolhimento desde o primeiro momento.",
      },
      {
        image: "/images/recepcao-2.jpg",
        title: "Recepção",
        caption: "Arquitetura contemporânea, iluminação suave e design minimalista transmitem elegância e acolhimento desde o primeiro momento.",
      },
      {
        image: "/images/recepcao-3.jpg",
        title: "Recepção",
        caption: "Arquitetura contemporânea, iluminação suave e design minimalista transmitem elegância e acolhimento desde o primeiro momento.",
      },
      {
        image: "/images/espaco-dra-carol-1.jpg",
        title: "Consultório Dra. Carolline",
        caption: "Design contemporâneo e iluminação estratégica transmitem segurança e confiança, com excelência técnica e foco em resultados naturais.",
      },
      {
        image: "/images/espaco-dra-carol-2.jpg",
        title: "Consultório Dra. Carolline",
        caption: "Design contemporâneo e iluminação estratégica transmitem segurança e confiança, com excelência técnica e foco em resultados naturais.",
      },
      {
        image: "/images/espaco-dra-carol-3.jpg",
        title: "Consultório Dra. Carolline",
        caption: "Design contemporâneo e iluminação estratégica transmitem segurança e confiança, com excelência técnica e foco em resultados naturais.",
      },
      {
        image: "/images/sala-estetica-1.jpg",
        title: "Sala de Estética",
        caption: "Teto com céu estrelado e iluminação suave criam uma atmosfera acolhedora e sofisticada, perfeita para relaxamento e cuidado personalizado.",
      },
      {
        image: "/images/sala-estetica-2.jpg",
        title: "Sala de Estética",
        caption: "Teto com céu estrelado e iluminação suave criam uma atmosfera acolhedora e sofisticada, perfeita para relaxamento e cuidado personalizado.",
      },
      {
        image: "/images/sala-estetica-3.jpg",
        title: "Sala de Estética",
        caption: "Teto com céu estrelado e iluminação suave criam uma atmosfera acolhedora e sofisticada, perfeita para relaxamento e cuidado personalizado.",
      },
    ],
    [],
  );

  const [index, setIndex] = useState(0);
  const go = (dir: -1 | 1) => setIndex((i) => (i + dir + slides.length) % slides.length);

  const handleImageError = (slideIndex: number) => {
    setImageErrors((prev) => new Set(prev).add(slideIndex));
  };

  return (
    <div className="lux-card overflow-hidden">
      <div className="relative">
        <div
          className="relative aspect-[4/3] sm:aspect-[16/9] overflow-hidden"
          data-testid="gallery-viewport"
        >
          {/* Imagem de fundo - primeiro layer */}
          {slides[index]?.image && !imageErrors.has(index) ? (
            <img
              src={slides[index].image}
              alt={slides[index].title || "Galeria Allumi Clinic"}
              className="absolute inset-0 z-[1] h-full w-full object-contain sm:object-cover"
              onError={(e) => {
                console.error(`Erro ao carregar imagem: ${slides[index]?.image}`);
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                handleImageError(index);
              }}
              onLoad={() => {
                console.log(`Imagem carregada com sucesso: ${slides[index]?.image}`);
              }}
              loading={index === 0 ? "eager" : "lazy"}
            />
          ) : null}
          
          {/* Fallback quando imagem não existe ou erro */}
          {(!slides[index]?.image || imageErrors.has(index)) && (
            <div className="absolute inset-0 z-[1] bg-gradient-to-br from-primary/20 via-primary/10 to-background flex items-center justify-center">
              <div className="text-center p-8">
                <Sparkles className="mx-auto size-12 text-primary/40 mb-4" />
                <p className="text-sm text-muted-foreground">Imagem em breve</p>
              </div>
            </div>
          )}

          {/* Overlays - segundo layer (reduzidos para mostrar mais a imagem) */}
          <div className="absolute inset-0 z-[2] lux-grid opacity-[0.1]" />
          <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/0 via-black/10 to-black/50" />
          <div className="absolute inset-0 z-[2] lux-noise" />

          {/* Conteúdo - terceiro layer */}
          <div className="absolute inset-0 z-[3] flex items-end">
            <div className="w-full p-4 sm:p-6 lg:p-8">
              <div
                className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-2.5 py-1 text-[10px] sm:text-xs text-muted-foreground backdrop-blur"
                data-testid="badge-gallery"
              >
                <Sparkles className="size-2.5 sm:size-3" />
                Galeria
              </div>
              <div className="mt-3 sm:mt-4 max-w-lg">
                <div className="font-serif text-base sm:text-lg lg:text-xl leading-tight text-white drop-shadow-lg" data-testid="text-gallery-title">
                  {slides[index]?.title}
                </div>
                <div className="mt-1.5 sm:mt-2 text-[11px] sm:text-xs leading-relaxed text-white/90 drop-shadow-md line-clamp-2" data-testid="text-gallery-caption">
                  {slides[index]?.caption}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute right-2 top-2 sm:right-4 sm:top-4 flex items-center gap-1.5 sm:gap-2 z-[4]">
          <button
            type="button"
            onClick={() => go(-1)}
            className="grid size-8 sm:size-10 place-items-center rounded-full border bg-white/75 backdrop-blur transition hover:bg-white"
            data-testid="button-gallery-prev"
            aria-label="Anterior"
          >
            <ChevronLeft className="size-3.5 sm:size-4" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="grid size-8 sm:size-10 place-items-center rounded-full border bg-white/75 backdrop-blur transition hover:bg-white"
            data-testid="button-gallery-next"
            aria-label="Próximo"
          >
            <ChevronRight className="size-3.5 sm:size-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 border-t px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
        <div className="text-muted-foreground text-center sm:text-left" data-testid="text-gallery-indicator">
          {index + 1} / {slides.length}
        </div>
        <div className="flex items-center gap-1 flex-wrap justify-center">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={cx(
                "h-1.5 sm:h-2 w-6 sm:w-8 rounded-full border transition",
                i === index ? "lux-gradient-gold" : "bg-white/70",
              )}
              data-testid={`button-gallery-dot-${i}`}
              aria-label={`Ir para slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  const items = useMemo(
    () => [
      {
        name: "Atendimento impecável",
        text: "Me senti acolhida desde a primeira consulta. Resultado muito natural e do jeito que eu queria.",
      },
      {
        name: "Clínica linda e organizada",
        text: "Ambiente super clean, profissionais atenciosas e explicam tudo com calma. Voltarei com certeza.",
      },
      {
        name: "Tecnologia e cuidado",
        text: "O plano foi feito exatamente para minha necessidade. Acompanhamento incrível no pós.",
      },
    ],
    [],
  );

  const [i, setI] = useState(0);

  return (
    <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="lux-card p-6 sm:p-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="lux-kicker" data-testid="text-testimonials-kicker">Depoimentos</div>
            <div className="mt-3 font-serif text-2xl leading-tight" data-testid="text-testimonials-title">
              O que suas clientes sentem depois do primeiro passo
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={() => setI((v) => (v - 1 + items.length) % items.length)}
              className="grid size-10 place-items-center rounded-full border bg-white/70 backdrop-blur transition hover:bg-white"
              data-testid="button-testimonial-prev"
              aria-label="Anterior"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setI((v) => (v + 1) % items.length)}
              className="grid size-10 place-items-center rounded-full border bg-white/70 backdrop-blur transition hover:bg-white"
              data-testid="button-testimonial-next"
              aria-label="Próximo"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border bg-white/60 p-6 backdrop-blur" data-testid="card-testimonial">
          <div className="font-serif text-4xl leading-none text-muted-foreground/60" aria-hidden>
            "
          </div>
          <p className="mt-2 text-sm leading-relaxed" data-testid="text-testimonial">
            {items[i]?.text}
          </p>
          <div className="mt-4 text-xs tracking-[0.22em] text-muted-foreground" data-testid="text-testimonial-name">
            {items[i]?.name}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between text-sm">
          <a
            href={LINKTREE_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition"
            data-testid="link-linktree"
          >
            Ver link na bio <ArrowRight className="size-4" />
          </a>
          <div className="sm:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={() => setI((v) => (v - 1 + items.length) % items.length)}
              className="grid size-10 place-items-center rounded-full border bg-white/70 backdrop-blur transition hover:bg-white"
              data-testid="button-testimonial-prev-mobile"
              aria-label="Anterior"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setI((v) => (v + 1) % items.length)}
              className="grid size-10 place-items-center rounded-full border bg-white/70 backdrop-blur transition hover:bg-white"
              data-testid="button-testimonial-next-mobile"
              aria-label="Próximo"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="lux-card p-6 sm:p-8">
        <div className="lux-kicker" data-testid="text-rating-kicker">Avaliação média</div>
        <div className="mt-3 font-serif text-3xl" data-testid="text-rating-score">5.0</div>
        <div className="mt-2 text-sm text-muted-foreground" data-testid="text-rating-sub">
          Atendimento, resultados e cuidado que fazem você voltar.
        </div>
        <Separator className="my-6" />
        <ul className="space-y-3 text-sm">
          {[
            "Beleza que respeita sua essência",
            "Tecnologia a favor da sua naturalidade",
            "Onde ciência e estética se encontram",
          ].map((t, idx) => (
            <li key={t} className="flex items-start gap-3" data-testid={`row-proof-${idx}`}>
              <span className="mt-0.5 grid size-5 place-items-center rounded-full lux-gradient-gold text-black">
                <Check className="size-3" />
              </span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Allumi Clinic",
    "description": "Clínica de estética avançada em Suzano-SP especializada em estética facial, corporal e capilar com tecnologia de ponta e resultados naturais.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Suzano",
      "addressRegion": "SP",
      "addressCountry": "BR",
    },
    "telephone": "+5511933097553",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://allumiclinic.com.br",
    "sameAs": [
      "https://instagram.com/allumiclinic",
      "https://linktr.ee/Allumiclinic",
    ],
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "3",
    },
    "areaServed": {
      "@type": "City",
      "name": "Suzano",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default function Home() {
  const categories: ServiceCategory[] = useMemo(
    () => [
      {
        id: "facial",
        label: "Facial",
        icon: <Wand2 className="size-4" strokeWidth={2.2} />,
        image: "/images/service-facial.jpg",
        items: [
          { title: "Harmonização Facial", desc: "Equilíbrio e naturalidade em cada ângulo." },
          { title: "Preenchimento Labial", desc: "Volume e contorno com leveza e harmonia." },
          { title: "Preenchimento Full Face", desc: "Estratégia completa para rejuvenescimento." },
          { title: "Preenchimento de Olheiras", desc: "Aparência descansada com técnica precisa." },
          { title: "Botox", desc: "Suavize linhas preservando sua expressão." },
          { title: "Bioestimulador de Colágeno", desc: "Firmeza progressiva com resultado natural." },
          { title: "Rejuvenescimento Facial", desc: "Cuidado completo para viço e textura." },
          { title: "Limpeza de Pele", desc: "Pele limpa, glow real e toque macio." },
          { title: "Peeling Coreano (Lhalla Peel)", desc: "Renovação suave com luminosidade." },
          { title: "Peeling Ultrassônico", desc: "Tecnologia para limpeza profunda e delicada." },
        ],
      },
      {
        id: "tecnologias",
        label: "Tecnologias",
        icon: <Sparkles className="size-4" strokeWidth={2.2} />,
        image: "/images/service-tech.jpg",
        items: [
          { title: "Ultrassom Micro e Macro Focado", desc: "Definição e firmeza com precisão." },
          { title: "Laser Lavieen", desc: "Textura, poros e glow com tecnologia." },
        ],
      },
      {
        id: "corporal",
        label: "Corporal",
        icon: <Wand2 className="size-4" strokeWidth={2.2} />,
        image: "/images/service-body.jpg",
        items: [
          { title: "Harmonização Glútea", desc: "Proporção e definição com segurança." },
          { title: "Gordura Localizada", desc: "Protocolos direcionados por avaliação." },
          { title: "Protocolo para Emagrecimento", desc: "Plano estruturado e acompanhamento." },
          { title: "Drenagem Linfática", desc: "Leveza e bem-estar com técnica." },
          { title: "Massagem Modeladora", desc: "Definição com cuidado e conforto." },
          { title: "Massagem Relaxante", desc: "Pausa necessária para corpo e mente." },
        ],
      },
      {
        id: "capilar",
        label: "Capilar",
        icon: <Sparkles className="size-4" strokeWidth={2.2} />,
        image: "/images/service-hair.jpg",
        items: [
          { title: "Tricologia (Alopecia)", desc: "Diagnóstico e tratamento com ciência." },
          { title: "Calvice (Alopecia Androgenética)", desc: "Tratamento especializado para calvície masculina e feminina." },
          { title: "Eflúvio Telógeno (Queda Capilar Repentina)", desc: "Diagnóstico e tratamento para queda capilar súbita." },
          { title: "Estímulo do Crescimento Capilar", desc: "Tratamento para crescimento capilar e diminuição de queda." },
        ],
      },
      {
        id: "protocolos",
        label: "Protocolos",
        icon: <Sparkles className="size-4" strokeWidth={2.2} />,
        image: "/images/service-protocol.jpg",
        items: [
          { title: "Melhora de Qualidade de Pele", desc: "Viço, uniformidade e textura." },
          { title: "Protocolo para Emagrecimento", desc: "Estratégia completa e sustentável." },
          { title: "Rejuvenescimento Facial", desc: "Protocolo completo para renovação e vitalidade da pele." },
          { title: "Tratamento de Acne", desc: "Protocolo especializado para controle e tratamento de acne." },
        ],
      },
    ],
    [],
  );

  const [cat, setCat] = useState(categories[0]?.id ?? "facial");
  const active = categories.find((c) => c.id === cat) ?? categories[0]!;

  const navItems = useMemo(
    () => [
      { id: "sobre", label: "Sobre" },
      { id: "tratamentos", label: "Tratamentos" },
      { id: "diferenciais", label: "Diferenciais" },
      { id: "galeria", label: "Galeria" },
      { id: "depoimentos", label: "Depoimentos" },
      { id: "contato", label: "Contato" },
    ],
    [],
  );

  return (
    <>
      <StructuredData />
      <div className="min-h-screen">
        <header className="sticky top-0 z-40 border-b bg-background/75 backdrop-blur-md">
          <div className="lux-container">
            <div className="flex h-16 items-center justify-between gap-4">
              <a href="#top" className="shrink-0" data-testid="link-home" aria-label="Ir para o topo">
                <LogoMark />
              </a>

              <nav className="hidden lg:flex items-center gap-7 text-sm" aria-label="Navegação">
                {navItems.map((n) => (
                  <a
                    key={n.id}
                    href={`#${n.id}`}
                    className="text-muted-foreground hover:text-foreground transition"
                    data-testid={`link-nav-${n.id}`}
                  >
                    {n.label}
                  </a>
                ))}
              </nav>

              <div className="flex items-center gap-2">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-2 text-xs text-muted-foreground backdrop-blur transition hover:bg-white hover:text-foreground"
                  data-testid="link-instagram"
                >
                  <Instagram className="size-4" />
                  @allumiclinic
                </a>
                <Button
                  asChild
                  className="rounded-full lux-gradient-gold text-black shadow-none hover:opacity-95"
                >
                  <a href="#contato" data-testid="button-agendar-topo">
                    Agendar Consulta
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main id="top">
          <section className="relative overflow-hidden" aria-label="Hero">
            <div className="absolute inset-0">
              <div className="absolute inset-0 lux-grid opacity-[0.35]" />
              <div className="absolute -top-24 right-[-120px] h-[420px] w-[420px] rounded-full lux-gradient-gold opacity-25 blur-3xl" />
              <div className="absolute -bottom-32 left-[-140px] h-[520px] w-[520px] rounded-full bg-white opacity-50 blur-3xl" />
              <div className="absolute inset-0 lux-noise" />
            </div>

            <div className="lux-container relative">
              <div className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
                <div>
                  <div className="inline-flex items-center gap-3 rounded-full border bg-white/65 px-4 py-2 text-xs text-muted-foreground backdrop-blur" data-testid="badge-location">
                    <MapPin className="size-4" />
                    Suzano — SP
                    <span className="mx-1 text-muted-foreground/50">•</span>
                    Clínica de estética avançada
                  </div>

                  <h1 className="lux-h1 mt-6" data-testid="text-hero-title">
                    Onde sua beleza encontra sua melhor versão
                  </h1>
                  <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground" data-testid="text-hero-subtitle">
                    Estética Facial, Corporal e Capilar em Suzano-SP, com planejamento personalizado, tecnologia de ponta e foco em resultados naturais.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Button
                      asChild
                      className="rounded-full lux-gradient-gold text-black shadow-none hover:opacity-95"
                    >
                      <a href="#contato" data-testid="button-agendar-hero">
                        <Calendar className="mr-2 size-4" />
                        Agendar Consulta
                      </a>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      className="rounded-full bg-white/60 backdrop-blur-sm hover:bg-white"
                    >
                      <a href="#tratamentos" data-testid="button-conhecer-tratamentos">
                        Conheça nossos tratamentos
                        <ArrowRight className="ml-2 size-4" />
                      </a>
                    </Button>
                  </div>

                  <div className="mt-10 grid gap-3 sm:grid-cols-3" aria-label="Highlights">
                    {[{
                      title: "Resultados naturais",
                      desc: "Beleza que respeita sua essência.",
                    }, {
                      title: "Tecnologia avançada",
                      desc: "Segurança e eficácia em cada etapa.",
                    }, {
                      title: "Plano personalizado",
                      desc: "Um caminho feito para você.",
                    }].map((b, idx) => (
                      <div key={b.title} className="lux-card p-4" data-testid={`card-highlight-${idx}`}>
                        <div className="text-sm font-medium" data-testid={`text-highlight-title-${idx}`}>{b.title}</div>
                        <div className="mt-1 text-xs text-muted-foreground" data-testid={`text-highlight-desc-${idx}`}>{b.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="lux-card relative overflow-hidden p-6 sm:p-8" data-testid="card-hero-image">
                    <div className="absolute inset-0 lux-grid opacity-[0.35]" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/20 to-transparent" />
                    <div className="absolute inset-0 lux-noise" />

                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur" data-testid="badge-lux">
                          <Sparkles className="size-3" />
                          Lux Minimal
                        </div>
                        <div className="text-xs tracking-[0.22em] text-muted-foreground" data-testid="text-hero-badge">
                          ALLUMI CLINIC
                        </div>
                      </div>

                      <div className="mt-8 grid gap-4">
                        {["Descubra", "Realize", "Transforme"].map((t, idx) => (
                          <div
                            key={t}
                            className="group rounded-2xl border bg-white/60 p-4 backdrop-blur transition hover:bg-white"
                            data-testid={`row-hero-step-${idx}`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <div className="text-xs tracking-[0.25em] text-muted-foreground">PASSO {idx + 1}</div>
                                <div className="mt-1 font-serif text-xl">{t}</div>
                                <div className="mt-1 text-sm text-muted-foreground">
                                  {idx === 0
                                    ? "Uma avaliação que entende sua rotina e seus objetivos."
                                    : idx === 1
                                      ? "Um plano preciso, com escolhas elegantes e seguras."
                                      : "Resultados que valorizam você — sem excessos."}
                                </div>
                              </div>
                              <div className="grid size-10 place-items-center rounded-full lux-gradient-gold text-black opacity-90 transition group-hover:opacity-100">
                                <ArrowRight className="size-4" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Separator className="my-8" />

                      <div className="flex flex-wrap items-center gap-3">
                        <a
                          href={WHATSAPP_URL}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-4 py-2 text-sm backdrop-blur transition hover:bg-white"
                          data-testid="link-whatsapp-hero"
                        >
                          <MessageCircle className="size-4" />
                          Falar no WhatsApp
                        </a>
                        <a
                          href={LINKTREE_URL}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border bg-white/50 px-4 py-2 text-sm text-muted-foreground backdrop-blur transition hover:bg-white hover:text-foreground"
                          data-testid="link-linktree-hero"
                        >
                          Link na bio
                          <ArrowRight className="size-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="#sobre"
                className="mx-auto mb-10 flex w-fit items-center gap-2 rounded-full border bg-white/55 px-4 py-2 text-xs text-muted-foreground backdrop-blur transition hover:bg-white"
                data-testid="link-scroll"
              >
                Role para conhecer
                <ChevronDown className="size-4" />
              </a>
            </div>
          </section>

          <section id="sobre" className="py-14 sm:py-20">
            <div className="lux-container">
              <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                <FadeIn>
                  <SectionHeader
                    kicker="Sobre a clínica"
                    title="Viva esse momento"
                    description="Na Allumi Clinic, ciência e estética se encontram para revelar uma beleza natural, confiante e possível. Cada detalhe do seu atendimento é pensado para resultados eficazes, com segurança e planejamento personalizado."
                  />

                  <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    {[
                      { t: "Profissionalismo", d: "Acolhimento, técnica e transparência." },
                      { t: "Naturalidade", d: "Sem exageros — só harmonia." },
                      { t: "Tecnologia", d: "Equipamentos modernos e seguros." },
                    ].map((x, idx) => (
                      <div key={x.t} className="lux-card p-5" data-testid={`card-pillars-${idx}`}>
                        <div className="text-sm font-medium" data-testid={`text-pillar-title-${idx}`}>{x.t}</div>
                        <div className="mt-1 text-xs text-muted-foreground" data-testid={`text-pillar-desc-${idx}`}>{x.d}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button
                      asChild
                      className="rounded-full lux-gradient-gold text-black shadow-none hover:opacity-95"
                    >
                      <a href="#contato" data-testid="button-agendar-sobre">
                        Agendar Avaliação
                        <ArrowRight className="ml-2 size-4" />
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="rounded-full bg-white/60 backdrop-blur-sm hover:bg-white"
                    >
                      <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" data-testid="button-seguir-instagram">
                        Seguir no Instagram
                        <Instagram className="ml-2 size-4" />
                      </a>
                    </Button>
                  </div>
                </FadeIn>

                <FadeIn delay={0.08}>
                  <div className="lux-card relative overflow-hidden p-6 sm:p-8" data-testid="card-about-image">
                    <div className="absolute inset-0 lux-grid opacity-[0.35]" />
                    <div className="absolute -right-20 top-10 size-72 rounded-full lux-gradient-gold opacity-25 blur-3xl" />
                    <div className="absolute inset-0 lux-noise" />

                    <div className="relative">
                      <div className="flex items-center gap-3">
                        <span className="grid size-11 place-items-center rounded-2xl lux-gradient-gold text-black" aria-hidden>
                          <Sparkles className="size-5" />
                        </span>
                        <div>
                          <div className="text-sm font-medium" data-testid="text-about-card-title">
                            Beleza que respeita sua essência
                          </div>
                          <div className="text-xs text-muted-foreground" data-testid="text-about-card-sub">
                            Um atendimento que combina cuidado + estratégia
                          </div>
                        </div>
                      </div>

                      <div className="mt-7 grid gap-4">
                        {[
                          {
                            t: "Avaliação completa",
                            d: "Entendemos sua pele, suas queixas e seus objetivos.",
                          },
                          {
                            t: "Planejamento",
                            d: "Indicamos o que faz sentido agora — e o que pode esperar.",
                          },
                          {
                            t: "Acompanhamento",
                            d: "Você não fica sozinha: do pré ao pós, com orientação.",
                          },
                        ].map((x, idx) => (
                          <div key={x.t} className="rounded-2xl border bg-white/60 p-4 backdrop-blur" data-testid={`card-about-step-${idx}`}>
                            <div className="text-xs tracking-[0.25em] text-muted-foreground">DETALHE</div>
                            <div className="mt-1 font-serif text-lg">{x.t}</div>
                            <div className="mt-1 text-sm text-muted-foreground">{x.d}</div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-7 rounded-2xl border bg-white/65 p-4 backdrop-blur" data-testid="card-about-cta">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <div className="text-sm font-medium">Sua confiança começa aqui</div>
                            <div className="text-xs text-muted-foreground">Vamos desenhar a sua melhor versão?</div>
                          </div>
                          <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full lux-gradient-gold px-4 py-2 text-sm text-black"
                            data-testid="link-whatsapp-about"
                          >
                            <MessageCircle className="size-4" />
                            WhatsApp
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>

          <section id="tratamentos" className="py-14 sm:py-20">
            <div className="lux-container">
              <SectionHeader
                kicker="Serviços"
                title="Tratamentos para cada objetivo"
                description="Escolhas inteligentes, combinadas com técnica e tecnologia — para resultados seguros, elegantes e consistentes."
              />

              <div className="mt-8 grid gap-6 lg:grid-cols-[0.35fr_0.65fr]">
                <div className="lux-card p-4 sm:p-5">
                  <div className="text-xs tracking-[0.25em] text-muted-foreground" data-testid="text-service-cats">CATEGORIAS</div>
                  <div className="mt-3 space-y-2">
                    {categories.map((c) => {
                      const activeState = c.id === cat;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setCat(c.id)}
                          className={cx(
                            "flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition",
                            activeState
                              ? "bg-white/80 lux-ring"
                              : "bg-white/55 hover:bg-white/80",
                          )}
                          data-testid={`button-category-${c.id}`}
                          aria-pressed={activeState}
                        >
                          <span className="inline-flex items-center gap-2">
                            <span
                              className={cx(
                                "grid size-9 place-items-center rounded-xl border",
                                activeState ? "lux-gradient-gold text-black border-transparent" : "bg-white/60",
                              )}
                              aria-hidden
                            >
                              {c.icon}
                            </span>
                            <span className="font-medium">{c.label}</span>
                          </span>
                          <ChevronRight className="size-4 text-muted-foreground" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="lux-card relative aspect-[21/9] overflow-hidden sm:aspect-[32/10]" data-testid="card-category-hero">
                    <div className="absolute inset-0 lux-noise" />
                    <img
                      src={active.image}
                      alt={active.label}
                      className="absolute inset-0 h-full w-full object-cover opacity-80"
                      data-testid="img-category-hero"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
                    <div className="relative flex h-full items-center p-6 sm:p-10">
                      <div>
                        <div className="lux-kicker" data-testid="text-active-cat-kicker">Selecionado</div>
                        <div className="mt-2 font-serif text-3xl sm:text-4xl" data-testid="text-active-cat-title">
                          {active.label}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {active.items.map((s, idx) => (
                      <Card
                        key={s.title}
                        className="group rounded-2xl border bg-white/55 p-5 shadow-none backdrop-blur-sm transition hover:bg-white/80"
                        data-testid={`card-service-${active.id}-${idx}`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="text-sm font-medium" data-testid={`text-service-title-${active.id}-${idx}`}>
                              {s.title}
                            </div>
                            <div className="mt-1 text-xs text-muted-foreground" data-testid={`text-service-desc-${active.id}-${idx}`}>
                              {s.desc}
                            </div>
                          </div>
                          <div className="grid size-10 place-items-center rounded-full border bg-white/70 transition group-hover:border-transparent group-hover:lux-gradient-gold" aria-hidden>
                            <ArrowRight className="size-4" />
                          </div>
                        </div>
                        <a
                          href="#contato"
                          className="mt-4 inline-flex items-center gap-2 text-xs tracking-[0.22em] text-muted-foreground uppercase transition group-hover:text-foreground"
                          data-testid={`link-service-${active.id}-${idx}`}
                        >
                          Saiba mais <ArrowRight className="size-3" />
                        </a>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="diferenciais" className="py-14 sm:py-20">
            <div className="lux-container">
              <SectionHeader
                kicker="Diferenciais"
                title="Por que escolher a Allumi Clinic?"
                description="Técnica, transparência e cuidado. Um atendimento premium, mas humano — e sempre pensado na sua rotina."
              />

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    icon: <Sparkles className="size-4" />,
                    t: "Resultados Naturais",
                    d: "Valorizamos sua beleza única com técnicas que respeitam sua harmonia natural.",
                  },
                  {
                    icon: <Wand2 className="size-4" />,
                    t: "Tecnologia Avançada",
                    d: "Equipamentos de última geração para tratamentos seguros e eficazes.",
                  },
                  {
                    icon: <Phone className="size-4" />,
                    t: "Equipe Especializada",
                    d: "Profissionais qualificadas e em constante atualização.",
                  },
                  {
                    icon: <Check className="size-4" />,
                    t: "Planejamento Personalizado",
                    d: "Cada tratamento é desenvolvido especialmente para você.",
                  },
                ].map((x, idx) => (
                  <FadeIn key={x.t} delay={idx * 0.05}>
                    <div className="lux-card p-6" data-testid={`card-differential-${idx}`}>
                      <div className="flex items-center gap-3">
                        <span className="grid size-10 place-items-center rounded-2xl lux-gradient-gold text-black" aria-hidden>
                          {x.icon}
                        </span>
                        <div className="text-sm font-medium" data-testid={`text-diff-title-${idx}`}>{x.t}</div>
                      </div>
                      <div className="mt-3 text-sm text-muted-foreground" data-testid={`text-diff-desc-${idx}`}>{x.d}</div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          <section id="galeria" className="py-14 sm:py-20">
            <div className="lux-container">
              <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
                <FadeIn>
                  <SectionHeader
                    kicker="Galeria"
                    title="Conheça nossos ambientes"
                    description="Espaços cuidadosamente projetados para proporcionar conforto, tranquilidade e uma experiência única de cuidado e bem-estar."
                  />
                  <div className="mt-8 grid gap-4">
                    {[
                      "Teto com céu estrelado para uma experiência única",
                      "Iluminação suave que cria atmosfera acolhedora e tranquila",
                      "Ambiente sofisticado perfeito para relaxamento e cuidado",
                    ].map((t, idx) => (
                      <div key={t} className="flex items-start gap-3" data-testid={`row-gallery-point-${idx}`}>
                        <span className="mt-0.5 grid size-6 place-items-center rounded-full lux-gradient-gold text-black" aria-hidden>
                          <Check className="size-4" />
                        </span>
                        <div className="text-sm text-muted-foreground">{t}</div>
                      </div>
                    ))}
                  </div>
                </FadeIn>

                <FadeIn delay={0.08}>
                  <GallerySlider />
                </FadeIn>
              </div>
            </div>
          </section>

          <section id="depoimentos" className="py-14 sm:py-20">
            <div className="lux-container">
              <Testimonials />
            </div>
          </section>

          <section id="contato" className="py-14 sm:py-20">
            <div className="lux-container">
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <FadeIn>
                  <SectionHeader
                    kicker="Localização & Contato"
                    title="Suzano — SP"
                    description="Fale com a Allumi Clinic e agende sua avaliação. Se preferir, clique no WhatsApp e vamos te orientar no melhor tratamento para você."
                  />

                  <div className="mt-8 grid gap-4">
                    <div className="lux-card p-6" data-testid="card-contact-actions">
                      <div className="flex flex-wrap items-center gap-3">
                        <a
                          href={WHATSAPP_URL}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full lux-gradient-gold px-4 py-2 text-sm text-black"
                          data-testid="link-whatsapp-contact"
                        >
                          <MessageCircle className="size-4" />
                          WhatsApp
                        </a>
                        <a
                          href={INSTAGRAM_URL}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border bg-white/60 px-4 py-2 text-sm text-muted-foreground backdrop-blur transition hover:bg-white hover:text-foreground"
                          data-testid="link-instagram-contact"
                        >
                          <Instagram className="size-4" />
                          @allumiclinic
                        </a>
                        <a
                          href={LINKTREE_URL}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border bg-white/50 px-4 py-2 text-sm text-muted-foreground backdrop-blur transition hover:bg-white hover:text-foreground"
                          data-testid="link-linktree-contact"
                        >
                          Linktree
                          <ArrowRight className="size-4" />
                        </a>
                      </div>
                    </div>

                    <div className="lux-card overflow-hidden" data-testid="card-map">
                      <div className="flex items-center justify-between gap-4 border-b bg-white/55 px-6 py-4">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="size-4 text-muted-foreground" />
                          <span data-testid="text-address">Suzano - SP</span>
                        </div>
                        <div className="text-xs text-muted-foreground" data-testid="text-hours">Atendimento mediante agendamento</div>
                      </div>
                      <div className="relative aspect-[16/10]">
                        <iframe
                          title="Mapa — Suzano SP"
                          src="https://www.google.com/maps?q=Suzano%20SP&output=embed"
                          className="absolute inset-0 h-full w-full"
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          data-testid="iframe-map"
                        />
                      </div>
                    </div>
                  </div>
                </FadeIn>

                <FadeIn delay={0.06}>
                  <div className="lux-card relative overflow-hidden p-6 sm:p-8" data-testid="card-final-cta">
                    <div className="absolute inset-0 lux-gradient-gold opacity-[0.12]" />
                    <div className="absolute inset-0 lux-noise" />

                    <div className="relative">
                      <div className="inline-flex items-center gap-2 rounded-full border bg-white/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur" data-testid="badge-form">
                        <Sparkles className="size-3" />
                        CTA final
                      </div>
                      <div className="mt-4 font-serif text-3xl leading-tight" data-testid="text-final-cta-title">
                        Pronta para sua melhor versão?
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground" data-testid="text-final-cta-sub">
                        Entre em contato pelo WhatsApp e agende sua avaliação gratuita. Nossa equipe está pronta para te atender!
                      </div>

                      {/* Formulário comentado - será implementado depois */}
                      {/* <form
                        className="mt-6 grid gap-3"
                        onSubmit={(e) => e.preventDefault()}
                        data-testid="form-lead"
                      >
                        <Input
                          placeholder="Seu nome"
                          className="rounded-2xl bg-white/70"
                          data-testid="input-name"
                          aria-label="Nome"
                        />
                        <Input
                          placeholder="WhatsApp"
                          className="rounded-2xl bg-white/70"
                          data-testid="input-whatsapp"
                          aria-label="WhatsApp"
                        />

                        <Select>
                          <SelectTrigger className="rounded-2xl bg-white/70" data-testid="select-procedure">
                            <SelectValue placeholder="Procedimento de interesse" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.flatMap((c) => c.items.map((s) => s.title)).map((t) => (
                              <SelectItem key={t} value={t} data-testid={`option-procedure-${t.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                                {t}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Textarea
                          placeholder="Conte rapidamente o que você deseja melhorar"
                          className="min-h-[110px] rounded-2xl bg-white/70"
                          data-testid="input-message"
                          aria-label="Mensagem"
                        />

                        <Button
                          type="submit"
                          className="mt-2 rounded-2xl lux-gradient-gold text-black shadow-none hover:opacity-95"
                          data-testid="button-submit"
                        >
                          Agendar Avaliação Gratuita
                          <ArrowRight className="ml-2 size-4" />
                        </Button>

                        <div className="mt-2 text-xs text-muted-foreground" data-testid="text-form-note">
                          Ao enviar, você concorda em receber uma mensagem da Allumi Clinic. Sem spam.
                        </div>
                      </form> */}

                      <div className="mt-6">
                        <Button
                          asChild
                          className="w-full rounded-2xl lux-gradient-gold text-black shadow-none hover:opacity-95"
                          data-testid="button-whatsapp-cta"
                        >
                          <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-2"
                          >
                            <MessageCircle className="size-5" />
                            Falar no WhatsApp
                            <ArrowRight className="ml-2 size-4" />
                          </a>
                        </Button>
                        <div className="mt-3 text-xs text-center text-muted-foreground" data-testid="text-whatsapp-note">
                          Clique para abrir o WhatsApp e agendar sua avaliação gratuita
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>

          <footer className="border-t py-10">
            <div className="lux-container">
              <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <LogoMark />
                  <div className="mt-3 max-w-sm text-sm text-muted-foreground" data-testid="text-footer-desc">
                    Clínica de estética avançada em Suzano-SP. Onde sua beleza encontra sua melhor versão.
                  </div>
                </div>

                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <div className="text-xs tracking-[0.25em] text-muted-foreground" data-testid="text-footer-links">LINKS</div>
                    <div className="mt-4 grid gap-2 text-sm">
                      {["sobre", "tratamentos", "contato"].map((id) => (
                        <a
                          key={id}
                          href={`#${id}`}
                          className="text-muted-foreground hover:text-foreground transition"
                          data-testid={`link-footer-${id}`}
                        >
                          {id === "sobre" ? "Sobre" : id === "tratamentos" ? "Serviços" : "Contato"}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs tracking-[0.25em] text-muted-foreground" data-testid="text-footer-contact">CONTATO</div>
                    <div className="mt-4 grid gap-2 text-sm">
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition"
                        data-testid="link-footer-whatsapp"
                      >
                        <MessageCircle className="size-4" /> WhatsApp
                      </a>
                      <a
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition"
                        data-testid="link-footer-instagram"
                      >
                        <Instagram className="size-4" /> @allumiclinic
                      </a>
                      <a
                        href={LINKTREE_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition"
                        data-testid="link-footer-linktree"
                      >
                        <ArrowRight className="size-4" /> Linktree
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-8" />
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-muted-foreground">
                <div data-testid="text-footer-rights">© {new Date().getFullYear()} Allumi Clinic. Todos os direitos reservados.</div>
                <div className="inline-flex items-center gap-2" data-testid="text-footer-seo">
                  <MapPin className="size-3" /> clínica de estética Suzano
                </div>
              </div>
            </div>
          </footer>
        </main>

        <FloatingWhatsApp />
      </div>
    </>
  );
}

