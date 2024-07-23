import Container from "../Container"

const CommunityHero = () => (
  <section className="relative">
    <div
      className="absolute -top-[20rem] -z-10 h-[900px] w-full max-w-full bg-cover bg-center bg-no-repeat lg:-top-[17rem]"
      style={{
        backgroundImage: `url(${process.env.__NEXT_ROUTER_BASEPATH}/images/community-hero-background.svg)`,
      }}
    />
    <Container className="mb-32 mt-28 flex flex-row justify-between">
      <div className="mx-auto pt-4 lg:mx-0">
        <div className="text-center text-[2.8rem] leading-tight lg:text-left">
          <strong className="text-pretty font-medium">
            Without our community,
          </strong>
          <br />
          we are <strong className="font-medium">nothing</strong>.
        </div>
      </div>
      <div className="hidden lg:block">
        <svg
          width="260"
          height="260"
          viewBox="0 0 220 220"
          xmlns="http://www.w3.org/2000/svg"
          className="max-w-full pl-4 [&_rect]:h-[35px] [&_rect]:w-[35px] [&_rect]:fill-primary"
        >
          <rect className="opacity-[0.22]" x="0" y="0" rx="3" ry="3" />
          <rect className="opacity-[0.38]" x="46.25" y="0" rx="3" ry="3" />
          <rect className="opacity-[0.59]" x="92.5" y="0" rx="3" ry="3" />
          <rect x="138.75" y="0" rx="3" ry="3" />
          <rect x="185" y="0" rx="3" ry="3" />

          <rect className="opacity-[0.14]" x="0" y="46.25" rx="3" ry="3" />
          <rect className="opacity-[0.31]" x="46.25" y="46.25" rx="3" ry="3" />
          <rect className="opacity-[0.38]" x="92.5" y="46.25" rx="3" ry="3" />
          <rect className="opacity-[0.77]" x="138.75" y="46.25" rx="3" ry="3" />
          <rect className="opacity-[0.77]" x="185" y="46.25" rx="3" ry="3" />

          <rect className="opacity-[0.14]" x="46.25" y="92.5" rx="3" ry="3" />
          <rect className="opacity-[0.38]" x="92.5" y="92.5" rx="3" ry="3" />
          <rect className="opacity-[0.59]" x="138.75" y="92.5" rx="3" ry="3" />
          <rect className="opacity-[0.77]" x="185" y="92.5" rx="3" ry="3" />

          <rect className="opacity-[0.22]" x="92.5" y="138.75" rx="3" ry="3" />
          <rect
            className="opacity-[0.22]"
            x="138.75"
            y="138.75"
            rx="3"
            ry="3"
          />
          <rect className="opacity-[0.38]" x="185" y="138.75" rx="3" ry="3" />

          <rect className="opacity-[0.14]" x="138.75" y="185" rx="3" ry="3" />
          <rect className="opacity-[0.31]" x="185" y="185" rx="3" ry="3" />
        </svg>
      </div>
    </Container>
  </section>
)

export default CommunityHero
