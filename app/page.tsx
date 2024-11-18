"use client";
import { Code } from "@nextui-org/code";
import { Link } from "@nextui-org/link";
import { Button, Card, CardBody, Image, Slider } from "@nextui-org/react";
import { Snippet } from "@nextui-org/snippet";
import { button as buttonStyles } from "@nextui-org/theme";
import React from "react";

import {
  GithubIcon,
  HeartIcon,
  NextIcon,
  PauseCircleIcon,
  PreviousIcon,
  RepeatOneIcon,
  ShuffleIcon,
} from "@/components/icons";
import { subtitle, title } from "@/components/primitives";
import { siteConfig } from "@/config/site";

export default function Home() {
  const [liked, setLiked] = React.useState(false);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl justify-center text-center">
        <span className={title()}>Make&nbsp;</span>
        <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
        <br />
        <span className={title()}>
          websites regardless of your design experience.
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern React UI library.
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={siteConfig.links.docs}
        >
          Documentation
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>

        <button className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3">
          Prettier
        </button>

        <Button color="primary" radius="full" variant="shadow">
          Shadow
        </Button>
      </div>

      <Card
        isBlurred
        className="max-w-[610px] border-none bg-background/60 dark:bg-default-100/50"
        shadow="sm"
      >
        <CardBody>
          <div className="grid grid-cols-6 items-center justify-center gap-6 md:grid-cols-12 md:gap-4">
            <div className="relative col-span-6 md:col-span-4">
              <Image
                alt="Album cover"
                className="object-cover"
                height={200}
                shadow="md"
                src="https://nextui.org/images/album-cover.png"
                width="100%"
              />
            </div>

            <div className="col-span-6 flex flex-col md:col-span-8">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-0">
                  <h3 className="font-semibold text-foreground/90">
                    Daily Mix
                  </h3>
                  <p className="text-small text-foreground/80">12 Tracks</p>
                  <h1 className="mt-2 text-large font-medium">
                    Frontend Radio
                  </h1>
                </div>
                <Button
                  isIconOnly
                  className="-translate-y-2 translate-x-2 text-default-900/60 data-[hover]:bg-foreground/10"
                  radius="full"
                  variant="light"
                  onPress={() => setLiked((v) => !v)}
                >
                  <HeartIcon
                    className={liked ? "[&>path]:stroke-transparent" : ""}
                    fill={liked ? "currentColor" : "none"}
                  />
                </Button>
              </div>

              <div className="mt-3 flex flex-col gap-1">
                <Slider
                  aria-label="Music progress"
                  classNames={{
                    track: "bg-default-500/30",
                    thumb: "w-2 h-2 after:w-2 after:h-2 after:bg-foreground",
                  }}
                  color="foreground"
                  defaultValue={33}
                  size="sm"
                />
                <div className="flex justify-between">
                  <p className="text-small">1:23</p>
                  <p className="text-small text-foreground/50">4:32</p>
                </div>
              </div>

              <div className="flex w-full items-center justify-center">
                <Button
                  isIconOnly
                  className="data-[hover]:bg-foreground/10"
                  radius="full"
                  variant="light"
                >
                  <RepeatOneIcon className="text-foreground/80" />
                </Button>
                <Button
                  isIconOnly
                  className="data-[hover]:bg-foreground/10"
                  radius="full"
                  variant="light"
                >
                  <PreviousIcon />
                </Button>
                <Button
                  isIconOnly
                  className="h-auto w-auto data-[hover]:bg-foreground/10"
                  radius="full"
                  variant="light"
                >
                  <PauseCircleIcon size={54} />
                </Button>
                <Button
                  isIconOnly
                  className="data-[hover]:bg-foreground/10"
                  radius="full"
                  variant="light"
                >
                  <NextIcon />
                </Button>
                <Button
                  isIconOnly
                  className="data-[hover]:bg-foreground/10"
                  radius="full"
                  variant="light"
                >
                  <ShuffleIcon className="text-foreground/80" />
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            Get started by editing <Code color="primary">app/page.tsx</Code>
          </span>
        </Snippet>
      </div>
    </section>
  );
}
