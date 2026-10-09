import { useNavigate } from "react-router-dom";
import FooterLinks from "../data/FooterLinks";
import { FaBackward } from "react-icons/fa";

const Contentfeed = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full overflow-y-auto bg-black px-4 py-24 text-white sm:px-6 lg:px-10">

      <div className="mx-auto mb-8 w-full max-w-7xl">
        <button
          onClick={handleClick}
          aria-label="Go back home"
          className="flex h-10 w-10 items-center justify-center rounded-full
          bg-[#1f1f1f] text-gray-300 transition-all duration-200
          hover:bg-[#2a2a2a] hover:text-white
          focus:outline-none focus:ring-2 focus:ring-white"
        >
          <FaBackward className="text-sm" />
        </button>
      </div>

      <main className="mx-auto w-full max-w-7xl">

        <section className="mb-8">
          <h1 className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            What's New
          </h1>

          <p className="max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
            The latest releases from artists, podcasts and shows you follow.
          </p>
        </section>
        <div className="mb-12 flex flex-wrap items-center gap-3 sm:mb-16">
          <button
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold
            text-black transition-colors hover:bg-gray-200
            focus:outline-none focus:ring-2 focus:ring-white"
          >
            Music
          </button>

          <button
            className="rounded-full bg-[#2a2a2a] px-5 py-2 text-sm font-semibold
            text-white transition-colors hover:bg-[#3a3a3a]
            focus:outline-none focus:ring-2 focus:ring-white"
          >
            Podcast &amp; shows
          </button>
        </div>

        <section className="flex min-h-[280px] flex-col items-center justify-center px-2 py-10 text-center sm:min-h-[340px] sm:px-6">

          <h2 className="max-w-3xl text-2xl font-extrabold leading-tight
          tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
            We don't have any updates for you yet
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-6 text-gray-400
          sm:text-base sm:leading-7 lg:text-lg">
            When there’s news, we’ll post it here. Follow your favourite
            artists and podcasts to stay updated on them too.
          </p>

        </section>

        <footer className="mt-8 border-t border-white/10 py-10 sm:mt-12 sm:py-12">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10
          sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

            {FooterLinks.map((section, index) => (
              <div key={index} className="min-w-0">

                {section.title && (
                  <h3 className="mb-3 text-sm font-bold text-white sm:text-base">
                    {section.title}
                  </h3>
                )}

                {section.links && (
                  <ul className="space-y-2">
                    {section.links.map((link, i) => (
                      <li
                        key={i}
                        className="cursor-pointer text-sm leading-5 text-gray-400
                        transition-colors hover:text-white hover:underline"
                      >
                        {link}
                      </li>
                    ))}
                  </ul>
                )}

                {section.socials && (
                  <div className="mt-4 flex flex-wrap gap-4">
                    {section.socials.map((icon, i) => (
                      <span
                        key={i}
                        className="cursor-pointer text-lg text-gray-400
                        transition-colors hover:text-white"
                      >
                        {icon}
                      </span>
                    ))}
                  </div>
                )}

              </div>
            ))}

          </div>
        </footer>

      </main>
    </div>
  );
};

export default Contentfeed;
